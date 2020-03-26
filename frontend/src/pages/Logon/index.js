import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api';


import './style.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';


export default function Logon(){

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('/sessions',{id});

            localStorage.setItem('ongId', id);                   //armazena o id da ong
            localStorage.setItem('ongName', response.data.name); //armazena o nome da ong

            history.push('/profile');
        }catch{
            alert('Falha no Login, verifique se digitou seu ID corretamente!');
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo Heroes"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    
                    <input name={id} onChange={e => setId(e.target.value)} type="text" placeholder="Sua ID"/>
                    <button className="button" type="submit">Entrar</button>
                
                    <Link to="/register" className="link">
                    <FiLogIn size={16} color="#e02041"/>    
                    Não possuo cadastro</Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}