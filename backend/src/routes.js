/**
 * Armazena as rotas da aplicação
 */


//Definir Rota / Recurso (O que queremos buscar)

/**
 * MÉTODOS HTTP:
 * 
 * GET: Buscar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
* Tipos de Parâmetros:
* 
* Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
* Route Params: Parâmetros utilizados para identificar recursos "/:nome_davariavel"
* Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
*/

/**
* SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server (Relacionais)
* NoSQL: MongoDB, CouchDB, etc (Não relacionais)
*/

/**
* Exemplo de QUERYS
* Driver: SELECT * FROM users
* Query Builder: table('users').select('*').where()
*/

const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

//Lista Ongs
routes.get('/ongs', OngController.index);
//Cria Ongs
routes.post('/ongs', OngController.create);

//Login
routes.post('/sessions', SessionController.create);

//Cria Incidente
routes.post('/incidents', IncidentController.create);
//Lista Incidentes
routes.get('/incidents', IncidentController.index);
//Deleta Incidente
routes.delete('/incidents/:id', IncidentController.delete);

//Pequisa os incidents de uma ong
routes.get('/profile', ProfileController.index);

//Exportar uma variável
module.exports = routes;