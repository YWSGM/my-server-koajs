const router = require('../router/index');
const routerPath = require('../router/user-path');
const userSql = require('../modules/mysql/user');

router.get(routerPath.LIST, async(ctx, next) => {
    try {
        const data = await userSql.getList();
        if (data) {
            ctx.body = {
                code: 1,
                data,
                msg: 'success',
            };
            console.log('Success');
        } else {
            ctx.body = {
                data: {},
                code: 1,
                msg: '查询失败',
            };
            console.log('查询失败');
        }
    } catch (e) {
        throw new Error(e);
    }
});

router.post(routerPath.SELECTBYID, async(ctx, next) => {
    try {
        const {
            id,
        } = ctx.request.body;
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
        } else {
            ctx.body = {
                data: {},
                code: 1,
                msg: '查询失败',
            };
            console.log('查询失败');
        }
    } catch (error) {
        throw new Error(error);
    }
});
