const router = require('../../router/index');
const routerPath = require('../../router/user-path');
const userSql = require('../service/user');

// 路由前缀
router.prefix('/users');

router.get(routerPath.LIST, async(ctx, next) => {
    try {
        const data = await userSql.getList();
        if (data) {
            ctx.body = {
                code: 0,
                data,
                msg: 'success',
            };
            console.log('Success');
        }
    } catch (e) {
        throw new Error(e);
    }
});

router.post(routerPath.SELECTBYID, async(ctx, next) => {
    const {
        id,
    } = ctx.request.body;
    try {
        if (!id) {
            ctx.body = {
                data: null,
                code: 1,
                msg: '参数不合法',
            };
            console.log('参数不合法');
            return;
        }
        const data = await userSql.getUserById(id);
        if (data) {
            ctx.body = {
                data,
                code: 0,
                msg: 'Success',
            };
            console.log('Success');
        }
    } catch (error) {
        console.log('查询失败', `id为--${id}`);
        throw new Error(error);
    }
});
