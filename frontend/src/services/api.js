//Conexão do front-end com o back-end
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api;