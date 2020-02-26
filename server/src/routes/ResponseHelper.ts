import { Response } from "express";
import { ISearchResult } from "../entities/CommonType";

// 响应帮助类
export class ResponseHelper {
    /**
     * 响应错误
     * @param error
     * @param res
     */
    public static sendError(error:string|string[], res:Response){
        let err:string;
        if(Array.isArray(error)){
           err = error.join(";")
        }else{
           err = error
        }
        // 完成响应
        res.send({
            err,
            data:null,
            code:999,
        })
    }
    /**
     * 响应普通数据
     * @param data
     * @param res
     */
    public static sendData(data:any, res:Response){
        // 完成响应
        res.send({
            err:"",
            data,
            code:200,
        })
    }
    /**
     * 响应分页数据
     * @param result
     * @param res
     */
    public static sendPageData<T>(result:ISearchResult<T>, res:Response){
        if(result.errors.length > 0){
            this.sendError(result.errors, res)
        }else{
            res.send({
                err:"",
                data:result.data,
                total:result.count,
                code:200,
            })
        }
    }
}