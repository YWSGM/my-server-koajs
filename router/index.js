// 封装 router
const mysql = require('../config/mysql');

async function getList(ctx, next) {
    try {
        const data = await mysql.getList();
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
}

async function getInfoById(ctx, next) {
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
        const data = await mysql.getUserById(id);
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
}

module.exports = {
    getList,
    getInfoById,
};
