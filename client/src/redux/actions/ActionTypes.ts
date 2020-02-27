
/**
 * 这里其实也可以使用官方的类型，看声明文件
 */
export interface IAction<T extends string, P>{
   type:T,
   payload:P
}