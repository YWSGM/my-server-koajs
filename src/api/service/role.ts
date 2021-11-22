/**
 *
 */
import RoleInfo from '../model/role';
import { CommonInterface } from '../../interface/common_interface';
import { RoleNameSpace } from '../../interface/role';

class RoleSql {
    /**
     * 获取角色列表
     * @returns
     * @param query
     */
    async getRoleList(query: CommonInterface.PageInfo): Promise<CommonInterface.DataInfo> {
        const data: CommonInterface.DataInfo = {
            msg: '查询失败',
            code: 1,
            data: {
                total: 0,
                list: [],
            },
        };
        try {
            const roleList = await RoleInfo.findAll({
                limit: query.pageSize,
                offset: (query.pageNum - 1) * 10,
                // distinct: true, // 多表联查去重设置
                where: {},
                order: [['id', 'DESC']],
            });
            data.code = 0;
            data.msg = '查询成功';
            data.data = {
                total: roleList.length,
                list: roleList,
            };
            return data;
        } catch (err) {
            data.msg = `查询失败，${err.mesage}`;
            return data;
        }
    }

    /**
     * 新增或更新角色
     */
    async creatOrUpdateRoleInfo(query: RoleNameSpace.RoleInfo): Promise<CommonInterface.FailInfo> {
        if (query.id) {
            try {
                RoleInfo.update(query, {
                    where: {
                        id: query.id,
                    },
                });
                return {
                    code: 0,
                    msg: '更新成功',
                    data: {},
                };
            } catch (e) {
                return {
                    code: 1,
                    msg: `更新失败，${e}`,
                    data: {},
                };
            }
        }
        try {
            const role = await RoleInfo.findAll({
                where: {
                    roleName: query.roleName,
                },
            });
            if (role) {
                return {
                    code: 1,
                    msg: '新增失败，该角色已存在',
                    data: {},
                };
            }
            try {
                await RoleInfo.create(query);
                return {
                    code: 0,
                    msg: '新增成功',
                    data: {},
                };
            } catch (e) {
                return {
                    code: 1,
                    msg: `新增失败，${e}`,
                    data: {},
                };
            }
        } catch (e) {
            return {
                code: 1,
                msg: `新增失败，${e}`,
                data: {},
            };
        }
    }
}

const roleSql = new RoleSql();

export default roleSql;
