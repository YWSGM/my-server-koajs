const userInfo = require('../model/user');
const pool = require('../../modules/mysql/index');

/**
 * 服务器代码
 */
class UserSql {
    /**
     * 获取用户信息列表
     * @returns 用户信息列表
     */
    async getList() {
        try {
            // return new Promise((resolve, reject) => {
            //     pool.query('SELECT * from userInfo', (error, results, fields) => {
            //         if (error) {
            //             reject();
            //             throw new Error({
            //                 error,
            //                 fields,
            //             });
            //         }
            //         resolve(results);
            //         // console.log('The solution is: ', results[0].solution);
            //     });
            // });
            const user = await userInfo.userInfo.findAll();
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * 根据 人员 id 获取 人员信息
     * @param {number} id
     * @returns 人员信息
     */
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
