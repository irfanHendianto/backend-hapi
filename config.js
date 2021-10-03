'use strict';

const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
    PORT,
    HOST,
    DB_PORT ,
    DB_HOST ,
    DB_USER ,
    DB_PASSWORD , 
    DB_NAME,
    OPEN_API
} = process.env

assert(PORT,'PORT is required');
assert(HOST,'HOST is required');



module.exports = {
    port: PORT,
    host: HOST,
    db_port: DB_PORT,
    db_host: DB_HOST,
    db_user: DB_USER,
    db_password: DB_PASSWORD,
    db_name: DB_NAME,
    open_api: OPEN_API
}
