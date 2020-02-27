import axios from "axios"
import { IResponseData, IResponseError, ISearchCondition, IResponsePageData } from "./CommonTypes"

export interface IMovie {
    _id?: string;
    name: string;
    types: string[];
    areas: string[];
    timeLong: number;
    isHot: boolean;
    isComing: boolean;
    isClassic: boolean;
    description?: string;
    poster?: string;
}

export class MovieService {
    // 这里就可以详细的描述出返回的类型，方便后面then使用
    public static async add(movie: IMovie): Promise<IResponseData<IMovie> | IResponseError> {
        const { data } = await axios.post("/api/movie", movie)
        return data
    }

    // Partial 类型演算，所有属性变成可选
    public static async edit(id:string, movie: Partial<IMovie>): Promise<IResponseData<true> | IResponseError> {
        const { data } = await axios.put("/api/movie/" + id, movie)
        return data
    }

    public static async delete(id:string): Promise<IResponseData<true> | IResponseError> {
        const { data } = await axios.delete("/api/movie/" + id)
        return data
    }

    // 根据id来得到电影对象
    public static async getMovieById(id:string): Promise<IResponseData<IMovie | null>> {
        const { data } = await axios.delete("/api/movie" + id)
        return data
    }
    // 查询
    public static async getMovies(condition:ISearchCondition): Promise<IResponsePageData<IMovie>> {
        const { data } = await axios.get("/api/movie", {
            params:condition
        })
        return data
    }
}