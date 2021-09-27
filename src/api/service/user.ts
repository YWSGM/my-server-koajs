import userInfo from '../model/user';
import { UserInfo } from '../../interface/user';

/**
 * 服务器代码
 */
class UserSql {
    /**
     * 获取用户信息列表
     * @returns 用户信息列表
     */
    async getList(query: UserInfo.PageInfo = { pageNum: 1, pageSize: 10 }): Promise<UserInfo.UserList> {
        try {
            const { pageNum, pageSize } = query;
            const currentPageSize = (pageNum - 1) * 10;
            const user = await userInfo.findAndCountAll({
                limit: pageSize,
                offset: currentPageSize,
                where: {},
                order: [['id', 'DESC']],
            });
            return {
                code: 0,
                msg: '查询成功',
                data: {
                    total: user.count,
                    list: user.rows,
                },
            };
        } catch (error) {
            return {
                code: 1,
                msg: `查询失败，${error}`,
                data: {
                    total: 0,
                    list: [],
                },
            };
        }
    }

    /**
     * 根据 人员 id 获取 人员信息
     * @param {number} id
     * @returns 人员信息
     */
    async getUserById(id: number): Promise<UserInfo.UserList> {
        try {
            const user = await userInfo.findAll({
                where: {
                    id,
                },
            });
            return {
                code: 0,
                msg: '查询成功',
                data: {
                    total: user.length,
                    list: user,
                },
            };
        } catch (error) {
            console.error(error.message);
            return {
                code: 1,
                msg: `查询失败，${error}`,
                data: {
                    total: 0,
                    list: [],
                },
            };
        }
    }

    /**
     * 插入或更新人员
     * @param body 请求体
     * @returns
     */
    async createOrUpdate(body: any) {
        let data = {};
        if (body.id) {
            try {
                await userInfo.update(body, {
                    where: {
                        id: body.id,
                    },
                });
                data = {
                    msg: '更新成功',
                    data: {},
                    code: 0,
                };
            } catch (error) {
                console.error(`更新失败，${error.message}`);
                data = {
                    msg: `更新失败，${error.message}`,
                    data: {},
                    code: 1,
                };
            }
            return data;
        }
        try {
            await userInfo.create(body);
            data = {
                msg: '增加成功',
                data: {},
                code: 0,
            };
        } catch (error) {
            console.error('增加失败', error.mesage);

            data = {
                msg: `增加失败, ${error.mesage}`,
                data: {},
                code: 1,
            };
        }
        return data;

    }
}

const userSql = new UserSql();

export default userSql;
