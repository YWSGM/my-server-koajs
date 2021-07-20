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

class Mysql {
    getList() {
        try {
            return new Promise((resolve, reject) => {
                pool.query('SELECT * from userInfo', (error, results, fields) => {
                    if (error) {
                        reject();
                        throw new Error({
                            error,
                            fields,
                        });
                    }
                    resolve(results);

                    // console.log('The solution is: ', results[0].solution);

                });
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    getUserById(id) {
        try {
            return new Promise((resolve, reject) => {
                pool.query(`SELECT * FROM userInfo where id =${id}`, (error, results, fields) => {
                    if (error) {
                        reject();
                        throw new Error({
                            error,
                            fields,
                        });
                    }
                    resolve(results);
                });
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = new Mysql();
