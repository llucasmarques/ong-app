const knex = require('knex');
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV == 'test' ? configuration.test : configuration.development; //Se a varíavel for de teste, utiliza o banco de teste, se não utiliza o banco de desenvolvimento

const connection = knex(config);

module.exports = connection;