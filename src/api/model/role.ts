import { DataTypes } from 'sequelize';
import mySequelize from '../../modules/db/index';

/**
 * 创建数据库实例
 */
const roleInfo = mySequelize.define(
    'role_info',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        roleName: {
            type: DataTypes.STRING,
            field: 'role_name',
        },
        roleDesc: {
            type: DataTypes.STRING,
            field: 'role_desc',
        },
    },
    {
        freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
        tableName: 'role_info',
        timestamps: false,
    },
);

export default class RoleInfo extends roleInfo {}
