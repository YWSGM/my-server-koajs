/**
 * 角色接口
 */

import router from '../../router';
import roleSql from '../service/role';

// 路由前缀
router.prefix('/role');

router.get('/list', async(ctx, next) => {
    const { pageSize, pageNum } = ctx.request.query as { pageSize: string; pageNum: string };
    const query = {
        pageSize: pageSize ? +pageSize : 10,
        pageNum: pageNum ? +pageNum : 1,
    };
    const list = await roleSql.getRoleList(query);
    ctx.body = list;
});
