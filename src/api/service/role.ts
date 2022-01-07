/**
 *
 */
import RoleInfo from '../model/role';
import { CommonInterface } from '../../interface/common_interface';
import { RoleNameSpace } from '../../interface/role';
import { COMMON } from '../../common';

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
            data.msg = COMMON.MESSAGE.SUCCESS;
            data.data = {
                total: roleList.length,
                list: roleList,
            };
            return data;
        } catch (err) {
            data.msg = `${COMMON.MESSAGE.FAIL}，${err.mesage}`;
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
                    msg: `${COMMON.MESSAGE.UPDATESUCCESS}`,
                    data: {},
                };
            } catch (e) {
                return {
                    code: 1,
                    msg: `${COMMON.MESSAGE.UPDATESUCCESS}，${e}`,
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
            if (role.length !== 0) {
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

    /**
     * 获取角色详情
     * @param id 角色id
     */
    async getRoleDetail(id: number): Promise<RoleNameSpace.RoleDetail> {
        const data = {
            data: {},
            code: 1,
            msg: '查询失败',
        };
        try {
            const detail = await RoleInfo.findAll({
                where: {
                    id,
                },
            });
            data.data = detail;
            data.code = 0;
            data.msg = '查询成功';
            return data;
        } catch (e) {
            return data;
        }
    }

    /**
     * 删除角色
     * @param id 删除角色id
     * @returns 接口成功信息
     */
    async deleteRole(id: number): Promise<CommonInterface.FailInfo> {
        try {
            await RoleInfo.destroy({
                where: {
                    id,
                },
            });
            return {
                code: 0,
                msg: '删除成功',
                data: {},
            };
        } catch (e) {
            return {
                code: 1,
                msg: `删除失败，${e}`,
                data: {},
            };
        }
    }
}

const roleSql = new RoleSql();

export default roleSql;
