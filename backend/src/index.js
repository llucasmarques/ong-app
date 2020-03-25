const express = require('express'); //pacote
const routes = require('./routes'); //caminho
const cors = require('cors');
const app = express();

//Antes das requisições, fala pro express ir lá no body da requisição e converter o JSON em um objeto entendível pela aplicação
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);