import { UserInfo } from '../../interface/user';
import router from '../../router/index';
import routerPath from '../../router/user-path';
import UserSql from '../service/user';

// 路由前缀
router.prefix('/users');

router.get(routerPath.LIST, async(ctx, next) => {
    try {
        const { pageSize, pageNum } = ctx.request.query;
        const query: UserInfo.page = {
            pageSize: +pageSize,
            pageNum: +pageNum,
        };
        const data = await UserSql.getList(query);
        if (data) {
            ctx.body = {
                code: 0,
                data,
                msg: 'success',
            };
            console.log('Success');
        }
    } catch (e) {
        ctx.body = {
            code: 1,
            msg: e.message,
            data: [],
        };
        throw new Error(e);
    }
});

router.post(routerPath.SELECTBYID, async(ctx, next) => {
    const {
        id,
        // @ts-ignore
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
        const data: any = await UserSql.getUserById(id);
        ctx.body = {
            data,
            code: 0,
            msg: 'Success',
        };
        console.log('Success');
    } catch (error) {
        console.log('查询失败', `id为--${id}`);
        ctx.body = {
            data: {},
            code: 1,
            msg: error.message,
        };
        throw new Error(error);
    }
});

router.post('/createOrUpdate', async(ctx, next) => {
    // @ts-ignore
    const { body } = ctx.request;
    try {
        const res = await UserSql.createOrUpdate(body);
        ctx.body = res;
    } catch (e) {
        console.error('数据插入失败', e);
    }
});
