import { IMovie } from "../db/MovieSchema";

export interface ISearchResult<T> {
    count: number; // 数据总数
    data: T[];   // 查询数据
    errors:string[];
}