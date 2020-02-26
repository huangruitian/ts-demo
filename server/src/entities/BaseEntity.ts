import { validate } from "class-validator"
import { plainToClass } from "class-transformer"
import { ClassType } from "class-transformer/ClassTransformer"

// 定义为抽象的，方便继承才能用
// 静态的共有方法是可以被继承的
export abstract class BaseEntity {
    /**
     * @param skipMissing 是否跳过缺失的属性
     */
    public async validateThis(skipMissing = false): Promise<string[]> {
        const errors = await validate(this, {
            skipUndefinedProperties: skipMissing
        })
        const result: string[] = []
        const temp = errors.map(e => Object.values(e.constraints))
        temp.forEach(item => result.push(...item))
        return result
    }

    /**
     * @param plainObject // 平面对象, 父类提供基础的方法
     */
    protected static baseTransform<T>(cls:ClassType<T>, plainObject: object): T {
        // TS在运行的时候类型检查就不存在了，下面不能直接直接instanceof T，可以传参判断
        if (plainObject instanceof cls) {
            return plainObject
        }
        return plainToClass(cls, plainObject)
    }
}