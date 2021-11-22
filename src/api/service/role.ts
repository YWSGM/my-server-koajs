/**
 *
 */
import RoleInfo from '../model/role';
import { CommonInterface } from '../../interface/common_interface';

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
}

const roleSql = new RoleSql();

export default roleSql;
