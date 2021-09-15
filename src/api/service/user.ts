import userInfo from '../model/user';

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
            const user = await userInfo.findAll();
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
    async getUserById(id: number) {
        try {
            // return new Promise((resolve, reject) => {
            //     query(`SELECT * FROM userInfo where id =${id}`, (error, results, fields) => {
            //         if (error) {
            //             reject();
            //             throw new Error({
            //                 error,
            //                 fields,
            //             });
            //         }
            //         resolve(results);
            //     });
            // });
            const user = await userInfo.findAll({
                where: {
                    id,
                }
            })
            return user;
        } catch (error) {
            console.error(error.message)
            return error.message;
        }
    }

    /**
     * 插入或更新人员
     * @param body 请求体
     * @returns
     */
    async createOrUpdate(body: any) {
        if (body.id) {
            try {
                userInfo.update(body, {
                    where: {
                        id: body.id,
                    }
                });
                return {
                    msg: '更新成功',
                    data: {},
                    code: 0
                }
            } catch (error) {
                console.error(`更新失败，${error.message}`);
                return {
                    msg: `更新失败，${error.message}`,
                    data: {},
                    code: 1
                }
            }
        } else {
            userInfo.create(body);
        }
    }
}

const userSql = new UserSql();

export default userSql;
