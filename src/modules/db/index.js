const Sequelize = require('sequelize');
const db = require('./default');

/**
 * 使用 sequelize 定义
 */
const sequelize = new Sequelize(db.database.DATABASE, db.database.USERNAME, db.database.PASSWORD, {
    host: db.database.HOST,
    dialect: 'mysql',
    operatorAliases: false,
    poll: {
        max: 5,
        min: 0,
        ide: 5000,
    },
    define: {
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci',
        },
    },
});

sequelize.authenticate()
    .then(() => {
        console.info('数据库连接成功');
    })
    .catch((error) => {
        console.error('数据库连接成功');
    });

module.exports = sequelize;
