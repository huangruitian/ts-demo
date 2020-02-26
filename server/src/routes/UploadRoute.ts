import Express from "express";
import multer from "multer"
import path from "path"
import { ResponseHelper } from "./ResponseHelper";
const router = Express.Router()

// 文件保存的配置
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../../public/upload'),
    filename(req, file, cb) {
        // 文件名是什么，后缀名是什么？
        const time = new Date().getTime()
        const extname = path.extname(file.originalname)
        const r = Math.random()
        // 设置文件全称
        cb(null, `${time}${r}${extname}` + Date.now())
    }
})

// 限制的文件大小的配置
const limits = {
    fileSize: 1024 * 1024,
}

// 允许上传文件的后缀名
const allowedExtensions = ['.jpg', '.png', '.gif', '.bmp', '.jiff']

const upload = multer({
    storage,
    limits,
    fileFilter(req, file, cb) {
        const extname = path.extname(file.originalname)
        if (allowedExtensions.includes(extname)) {
            cb(null, true)
        } else {
            cb(new Error("文件类型不正确"))
        }
    }
}).single("imgfile");

// 客户端文件上传必须为post请求
// 格式一般是form-data格式，放在请求体里 content-type: multipart/form-data
// 服务器如何得到上传的图片？使用express中间件，npm i -D multer
// 约定文件名为imgfile
// 问题：
// 1.如何设置上传的文件名字？根据客户端文件后缀名决定
// 2.如何设置文件的大小？配置 limits
// 3.如何限制文件后缀名？ 配置 fileFilter
// 4.当发生错误时，如何响应给客户端；正确又如何响应？
// 4.1 正确响应文件的路径，错误就响应错误消息
// 5.静态资源如何被访问？设置 express
router.post("/", (req, res) => {
    // 先处理上传的文件
    upload(req, res, (err) => {
        if (err) {
            // 发生错误
            ResponseHelper.sendError(err.message, res)
        } else {
            // 一切都好
            const url = `/upload/${req.file.filename}`
            ResponseHelper.sendData(url, res)
        }
    })
})

export default router