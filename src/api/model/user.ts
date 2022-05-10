import { DataTypes } from 'sequelize';
import mySequelize from '../../modules/db/index';

/**
 * 创建数据库实例
 */
const userInfo = mySequelize.define(
    'user_info',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userName: {
            type: DataTypes.STRING,
            field: 'user_name',
        },
        sex: {
            type: DataTypes.STRING,
            field: 'sex',
        },
        age: {
            type: DataTypes.INTEGER,
            field: 'age',
        },
        passWord: {
            type: DataTypes.STRING,
            field: 'pass_word',
        },
        phone: {
            type: DataTypes.STRING,
            field: 'phone',
        },
    },
    {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
        tableName: 'user_info',
        timestamps: false,
    },
);

export default class user extends userInfo {
}
