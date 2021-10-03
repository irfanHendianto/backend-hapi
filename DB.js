'user strict'

const { Client } = require('pg');
const config = require('./config');


const client = new Client({
    host: config.db_host,
    port: config.db_port,
    user: config.db_user,
    password: config.db_password,
    database: config.db_name
});


module.exports = client 
