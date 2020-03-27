import React, {useState, useEffect} from 'react';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {

    const [incidents, setIncidents] = useState([]); //armazena os incidentes num array de incidentes
    const [total, setTotal] = useState(0); //armazena o total de itens
    const [page, setPage] = useState(1); //Inicia na página um, utilizando esse estado para criar a paginação infita na rolagem
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(incident){ //Quando pressionado, redireciona para a págida de detalhes do incidente, passando como parâmetro todos os dados do incidente
        navigation.navigate('Detail', {incident});
    }

    async function loadIncidents(){ 
        if(loading){ //Se já estiver carregando, não deixa fazer outra requisição de carregamento
            return;
        }

        if(total > 0 && incidents.length == total){ //Caso já tenha carregado todas as informações não permite o recarregamento de tela
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: {page}
        });

        setIncidents([... incidents, ... response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() =>{
        loadIncidents();
    }, []

    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem vindo(a)!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>


            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator = {false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item: incident}) => (
                <View style={styles.incident}>
                    <Text style={styles.incidentTitle}>ONG:</Text>
                    <Text style={styles.incidentDescription}>{incident.name}</Text>

                    <Text style={styles.incidentTitle}>CASO:</Text>
                    <Text style={styles.incidentDescription}>{incident.title}</Text>

                    <Text style={styles.incidentTitle}>VALOR:</Text>
                    <Text style={styles.incidentDescription}>{
                    Intl.NumberFormat('pt-BR',{
                        style: 'currency', currency: 'BRL'
                        }).format(incident.value)}</Text>

                    <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041"></Feather>
                    </TouchableOpacity>
                </View>)}
            />



        </View>
    );
}