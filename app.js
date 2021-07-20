const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const bodyParser = require('koa-body');
const routers = require('./router/index');
const routerPath = require('./router/router_path');

// const data = require('./data/test')

const app = new Koa();
const router = new Router();

// 接收 json 数据
app.use(bodyParser({
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

router.get(routerPath.LIST, async(ctx, next) => {
    await routers.getList(ctx, next);
});

router.post(routerPath.SELECTBYID, async(ctx, next) => {
    await routers.getInfoById(ctx, next);
});

// 开始服务并生成路由
app.use(router.routes())
    .use(router.allowedMethods())
    .use(cors)
    .listen(3100, () => {
        console.log('服务器已启动，请访问：localhost:3100/');
    });
