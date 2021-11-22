export namespace CommonInterface{
    /**
     * 分页信息
     */
    export interface PageInfo {
        pageSize: number,
        pageNum: number,
    }

    export interface DataInfo {
        code: number,
        msg: string,
        data: {
            total: number,
            list: any[],
        },
    }

    export interface FailInfo {
        code: number,
        msg: string,
        data: {},
    }
}
