/**
 * 角色接口
 */

import * as Router from 'koa-router';
import roleSql from '../service/role';

const router = new Router();

router.get('/list', async (ctx) => {
    const { pageSize, pageNum } = ctx.request.query as { pageSize: string; pageNum: string };
    const query = {
        pageSize: pageSize ? +pageSize : 10,
        pageNum: pageNum ? +pageNum : 1,
    };
    const list = await roleSql.getRoleList(query);
    ctx.body = list;
});

router.get('/roleDetail', async (ctx) => {
    const { id } = ctx.request.query as { id: string };
    if (!id) {
        ctx.body = {
            data: {},
            msg: '参数不合法',
            code: 1,
        };
        return;
    }
    const data = await roleSql.getRoleDetail(+id);
    ctx.body = data;
});

router.post('/creatOrUpdate', async (ctx, next) => {
    // @ts-ignore
    const { body } = ctx.request;
    const data = await roleSql.creatOrUpdateRoleInfo(body);
    ctx.body = data;
});

router.get('/deleteRole', async (ctx) => {
    const { id } = ctx.request.query as { id: string };
    const data = await roleSql.deleteRole(+id);
    ctx.body = data;
});

export default router;
