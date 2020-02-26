import Mongoose from 'mongoose' // 要安装声明文件，因为是JS写的
import { Movie } from '../entities/Movie'

// 继承两个属性，会用户属性和我们想要的方法, 比如ID之类的
export interface IMovie extends Movie, Mongoose.Document {}

const movieSchema = new Mongoose.Schema<IMovie>({
    // 这里面的是运行时候的类型
    name: String,
    types:[String],
    areas:[String],
    timeLong:Number,
    isHot:Boolean,
    isComing:Boolean,
    isClassic:Boolean,
    description:String,
    poster:String
}, {
    versionKey: false,
})

// 还得泛型告诉它是什么类型，导出数据库模型
export default Mongoose.model<IMovie>("Movie", movieSchema);
