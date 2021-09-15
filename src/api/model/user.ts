import { DataTypes } from 'sequelize';
import mySequelize from '../../modules/db/index';

/**
 * 创建数据库实例
 */
const userInfo = mySequelize.define(
    'userInfo',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userName: {
            type: DataTypes.STRING,
        },
        sex: {
            type: DataTypes.STRING,
        },
        age: {
            type: DataTypes.INTEGER,
        },
        passWord: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
    },
    {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
        tableName: 'userInfo',
        timestamps: false,
    },
);

export default class user extends userInfo{}
