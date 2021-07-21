/**
 * 封装 sql
 */

const mysql = require('mysql');
const config = require('../db/default');

const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
});

module.exports = pool;
