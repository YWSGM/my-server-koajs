/**
 * 分页
 */
export namespace UserInfo{
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
    export interface UserList {
        code: number,
        msg: string,
        data: {
            total: number,
            list: any[],
        },
    }
}
