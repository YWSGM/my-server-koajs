/**
 * 分页
 */
export namespace RoleNameSpace{
    export interface RoleInfo{
        roleName: string;
        roleDesc: string;
        id: number;
    }
    export interface RoleDetail {
        code: number;
        data: RoleInfo | {};
        msg: string;
    }
}
