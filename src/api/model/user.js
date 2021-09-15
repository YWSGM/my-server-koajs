const Sequelize = require('sequelize');
const mySequelize = require('../../modules/db/index');

/**
 * 创建数据库实例
 */
const userInfo = mySequelize.define(
    'userInfo',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userName: {
            type: Sequelize.STRING,
        },
        sex: {
            type: Sequelize.STRING,
        },
        age: {
            type: Sequelize.INTEGER,
        },
        passWord: {
            type: Sequelize.STRING,
        },
        phone: {
            type: Sequelize.STRING,
        },
    },
    {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
        // tableName: 'userInfo',
        timestamps: false,
    },
);

module.exports = {
    userInfo,
};
