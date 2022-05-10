import * as Application from 'koa';
import * as cors from 'koa2-cors';
import * as bodyParser from 'koa-body';
import config from './modules/db/default';

import router from './router/index';

// 新添加的接口必须在这里注册
// import user from './api/controller/user';
// import './api/controller/role';

// 添加模块代码
// require('./api/controller/user');

// const data = require('./data/test')

const app = new Application();

// eslint-disable-next-line consistent-return
app.use(async (ctx: { request: { path: string, method: string }, set: Function, body: any, response: any }, next: any) => {
    // /** 请求路径 */
    const { path } = ctx.request;

    ctx.set({
        'Access-Control-Allow-Origin': '*', // 指定请求域，* 就是所有域名都可访问，即跨域打开
        // "Content-Type": "application/json", // 设置请求类型
        // "Access-Control-Allow-Credentials": "true",
        // "Access-Control-Allow-Methods": "OPTIONS, GET, PUT, POST, DELETE", // 设置允许的请求方式，一般不做设置
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        // "Content-Security-Policy": `script-src "self"` // 只允许页面`script`引入自身域名的地址
        // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    });

    const hasPath = router.stack.some((item: { path: string; }) => item.path === path);
    // 判断是否 404
    if (path !== '/' && !hasPath) {
        // eslint-disable-next-line no-return-assign
        return ctx.body = {
            data: {},
            code: 404,
            msg: 'fail',
        };
    }
    // 如果前端设置了 XHR.setRequestHeader("Authorization", "xxxx") 那对应的字段就是 Authorization
    // 并且这里要转换一下状态码
    // console.log(ctx.request.method);
    if (ctx.request.method === 'OPTIONS') {
        ctx.response.status = 200;
    }

    try {
        await next();
        return null;
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message: err.message,
            code: err.statusCode || err.status || 500,
            data: {},
        };
    }
});

// 接收 json 数据
app.use(bodyParser({
    // @ts-ignore
    enableTypes: ['json', 'form', 'text'],
    multipart: true, // ***** 就是这个 (是否支持 multipart-formdate 的表单)
}));

/*
    const bodyparser = require('koa-body')({ // 如果你在这里配置了一次参数
        multipart: true
    })

    app.use(bodyparser({ // 这里又配置一次，name这个配置会覆盖上面的，也就是说上面的配置不生效
    enableTypes: ['json', 'form', 'text'],
    }))
*/

// 开始服务并生成路由
app.use(router.routes())
    .use(router.allowedMethods())
    .use(cors)
    .listen(config.port, () => {
        console.log(`服务器已启动，请访问：localhost:${config.port}/`);
    });
