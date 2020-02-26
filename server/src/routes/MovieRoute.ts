import Express from "express";
import { MovieService } from "../services/MovieService";
import { ResponseHelper } from "./ResponseHelper";
const router = Express.Router()

router.get("/:id", async (req, res) => {
    try {
        const movieId = req.params.id
        const movie = await MovieService.findById(movieId)
        // 响应结果，相应结果往往有一种标准格式
        ResponseHelper.sendData(movie, res)
    } catch (error) {
        // 避免前端乱传导致出错
        ResponseHelper.sendData(null, res)
    }
})

router.get("/", async (req, res) => {
    try {
        const query = req.query
        const movieList = await MovieService.find(query)
        ResponseHelper.sendPageData(movieList, res)
    } catch (error) {
        // 避免前端乱传导致出错
        ResponseHelper.sendData(null, res)
    }
})


router.post("/", async (req, res) => {
    const result = await MovieService.add(req.body);
    if(Array.isArray(result)){
        ResponseHelper.sendError(result, res)
    }else{
        ResponseHelper.sendData(result, res)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const result = await MovieService.edit(req.params.id, req.body)
        if(result.length > 0){
           ResponseHelper.sendError(result, res)
        }else{
           ResponseHelper.sendData(true, res)
        }
    } catch (error) {
        ResponseHelper.sendError("id错误", res)
    }
})


router.delete("/:id", async (req, res) => {
    try {
        await MovieService.delete(req.params.id)
        ResponseHelper.sendData(true, res)
    } catch (error) {
        ResponseHelper.sendError("id错误", res)
    }
})

export default router