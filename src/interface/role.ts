/**
 * 分页
 */
export namespace RoleNameSpace{
    /**
     * 分页信息
     */
    export interface PageInfo {
        pageSize: number,
        pageNum: number,
    }

    /**
     * 用户列表
     */
    export interface RoleList {
        code: number,
        msg: string,
        data: {
            total: number,
            list: any[],
        },
    }
}
