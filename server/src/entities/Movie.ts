import { IsNotEmpty, ArrayMinSize, IsInt, Min, Max, IsArray, validate } from "class-validator"
import { Type, plainToClass } from "class-transformer";
import { BaseEntity } from "./BaseEntity";

// 虽然这样写很麻烦，但是验证之后很安全
export class Movie extends BaseEntity{
    @IsNotEmpty({ message: "电影名称不能为空" })
    @Type(() => String)  // 这里String 一定要大写，因为JS里面是大写
    public name: string;

    @ArrayMinSize(1, { message: "电影类型至少得有一个" })
    @IsArray({ message: "电影类型必须是数组" })
    @Type(() => String)
    public types: string[];

    @ArrayMinSize(1, { message: "上映地区至少得有一个" })
    @IsArray({ message: "上映地区必须是数组" })
    @Type(() => String)
    public areas: string[];

    @IsNotEmpty({ message: "电影时常不能为空" })
    @IsInt({ message: "时长必须为整数" })
    @Min(1, { message: "时长最少一分钟" })
    @Max(999999, { message: "时常过长" })
    @Type(() => Number)
    public timeLong: number;

    @IsNotEmpty({ message: "是否热映不能为空" })
    @Type(() => Boolean)
    public isHot: boolean = false;

    @IsNotEmpty({ message: "是否即将上映不能为空" })
    @Type(() => Boolean)

    public isComing: boolean = false;
    @IsNotEmpty({ message: "是否是经典影片不能为空" })

    @Type(() => Boolean)
    public isClassic: boolean = false;

    @Type(() => String)
    public description?: string;

    @Type(() => String)
    public poster?: string;

    public static transform( plainObject: object): Movie {
        return super.baseTransform(Movie, plainObject)
    }
}