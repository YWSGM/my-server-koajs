import router from '../../router/index';
import routerPath from '../../router/user-path';
import UserSql from '../service/user';
import { CommonInterface } from '../../interface/common_interface';

// 路由前缀
router.prefix('/users');

router.get(routerPath.LIST, async(ctx, next) => {
    try {
        const { pageSize, pageNum } = ctx.request.query as { pageSize: string; pageNum: string };
        const query: CommonInterface.PageInfo = {
            pageSize: pageSize ? +pageSize : 10,
            pageNum: pageNum ? +pageNum : 1,
        };
        const data = await UserSql.getList(query);
        ctx.body = data;
    } catch (e) {
        ctx.body = {
            data: {
                list: [],
                total: 0,
            },
            code: 1,
            msg: `查询失败，${e}`,
        };
        throw new Error(e);
    }
});

router.get(routerPath.SELECTBYID, async(ctx, next) => {
    const {
        id,
        // @ts-ignore
    } = ctx.request.query;
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
        const data: any = await UserSql.getUserById(+id);
        ctx.body = data;
    } catch (error) {
        console.log('查询失败', `id为--${id}`);
        ctx.body = {
            data: {
                list: [],
                total: 0,
            },
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
