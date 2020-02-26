import { IsInt, Min } from "class-validator";
import { Type } from "class-transformer";
import { BaseEntity } from "./BaseEntity";

export class SearchCondition extends BaseEntity{ // 继承
    /**
     * 页码，页容量，查询关键字
     */
    @IsInt({message:'页码必须是整数'})
    @Min(1, {message:'页码最小值是1'})
    @Type(() => Number)
    public page:number = 1;

    @IsInt({message:'页容量必须是整数'})
    @Min(1, {message:'页容量最小值是1'})
    @Type(() => Number)
    public limit:number = 10;

    @Type(() => String)
    public key:string = ''

    public static transform( plainObject: object): SearchCondition {
        // 封装
        return super.baseTransform(SearchCondition, plainObject)
    }
}