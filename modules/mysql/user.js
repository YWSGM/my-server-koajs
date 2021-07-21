const pool = require('./index');

class UserSql {
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

const userSql = new UserSql();

module.exports = userSql;
