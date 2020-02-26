import { Movie } from "../entities/Movie";
import { IMovie } from "../db/MovieSchema";
import { MovieModel } from "../db";
import { SearchCondition } from "../entities/SearchCondition";
import { ISearchResult } from "../entities/CommonType";

// 服务类
export class MovieService {
    // 其实这里也可以用装饰器完成验证转换的功能 分离关注点。AOP面向切面编程
    public static async add(movie: Movie): Promise<IMovie | string[]> {
        // 1.有可能是个平面对象，需要转换；和实体类相关
        movie = Movie.transform(movie)
        // 2.数据验证，和实体类相关
        const errors = await movie.validateThis()
        if (errors.length > 0) {
            return errors
        }
        // 3.添加到数据库
        const result = await MovieModel.create(movie)
        return result
    }
    public static async edit(id: string, movie: Movie): Promise<string[]> {
        // 这里不能覆盖原来的movie，会导致默认值重置
        const movieObj = Movie.transform(movie)
        const errors = await movieObj.validateThis(true)
        if (errors.length > 0) {
            return errors
        }
        // 3.添加到数据库
        await MovieModel.updateOne({ _id: id }, movie)
        return errors
    }
    public static async delete(id: string): Promise<void> {
        await MovieModel.deleteOne({ _id: id })
    }
    public static async findById(id: string): Promise<IMovie | null> {
        const result = await MovieModel.findById(id);
        return result
    }
    /**
     * @param condition page/limit/key
     */
    public static async find(condition: SearchCondition): Promise<ISearchResult<Movie>> {
        const conObj = SearchCondition.transform(condition)
        const errors = await conObj.validateThis(true)
        if (errors.length > 0) {
            return {
                count:0,
                data: [],
                errors
            }
        }
        // 查询
        const movies = await MovieModel.find({
            name: { $regex: new RegExp(conObj.key) }
        }).skip((conObj.page - 1) * conObj.limit) // 跳过多少条数据
          .limit(conObj.limit) // 获取多少条

        const count = await MovieModel.find({
            name: { $regex: new RegExp(conObj.key) }
        }).countDocuments();

        return {
            count,
            data:movies,
            errors:[]
        }
    }
}