export interface IResponseError {
    err: string,
    data: null,
    code:number
}

export interface IResponseData<T> {
    err: "",
    data: T,
    code:number
}

// 把服务器响应的结果描述出来
export interface IResponsePageData<T> {
    err: "",
    data: T[],
    code:number,
    total:number
}

// 查询条件
export interface ISearchCondition {
    page?:number,
    limit?:number,
    key?:string,
}

