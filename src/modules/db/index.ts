import dbConfig from './default';

// @ts-ignore
import * as Sequelize from 'sequelize';

/**
 * 使用 sequelize 定义
 */
const sequelize = new Sequelize.Sequelize(dbConfig.database.DATABASE, dbConfig.database.USERNAME, dbConfig.database.PASSWORD, {
    host: dbConfig.database.HOST,
    dialect: 'mysql',
    // operatorAliases: false,
    // poll: {
    //     max: 5,
    //     min: 0,
    //     ide: 5000,
    // },
    define: {
        charset: 'utf8',
        // dialectOptions: {
        //     collate: 'utf8_general_ci',
        // },
    },
});

sequelize.authenticate()
    .then(() => {
        console.info('数据库连接成功');
    })
    .catch((error: any) => {
        console.error('数据库连接失败', error);
    });

export default sequelize;
