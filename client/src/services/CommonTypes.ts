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

// 把服务器响应的结果描述出来，其实这里也可以考虑使用继承，少写点代码
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

export enum SwitchType {
    isHot = "isHot",
    isComing = "isComing",
    isClassic = "isClassic"
}