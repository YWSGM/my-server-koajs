export namespace CommonInterface{
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
    export interface DataInfo {
        code: number,
        msg: string,
        data: {
            total: number,
            list: any[],
        },
    }
}
