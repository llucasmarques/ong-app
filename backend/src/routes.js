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

const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();

//Lista Ongs
routes.get('/ongs', OngController.index);
//Cria Ongs
routes.post('/ongs', celebrate({
[Segments.BODY]: Joi.object().keys({ //Validação da criação de ONG
    name: Joi.string().required(), //Checa se o nome é uma string e o campo é obrigatório
    email: Joi.string().required().email(), //Checa se é um endereço de email, contendo '@' e a '.extensão' (.com, .com.br ...)
    whatsapp: Joi.string().required().min(10).max(11), // 00 0000-0000     ou     00 0 0000-0000
    city: Joi.string().required(),
    uf: Joi.string().required().length(2), //Tamanho de 2 caracteres - SP - PR - SC - RS ....
})
}), OngController.create);

//Login
routes.post('/sessions', SessionController.create);

//Cria Incidente
routes.post('/incidents', IncidentController.create);

//Lista Incidentes
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(), //Checagem para a paginação dos casos ser um número
    }), 
}),IncidentController.index);

//Deleta Incidente
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(), //Checa se está passando um id válido para deletar o caso
    })
}),IncidentController.delete);

//Pequisa os incidents de uma ong
routes.get('/profile', celebrate({ //Valida se o id da ONG foi passado para o Header
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(), 
    }).unknown(), //Descarta a verifação dos outros campos do Header e verifica apenas o que interessa para o acesso ao profile
}),ProfileController.index);

//Exportar uma variável
module.exports = routes;