import "reflect-metadata";// class-transformer 要用到这个库
import Express from "express";
import MovieRouter from "./routes/MovieRoute";
import UploadRoute from "./routes/UploadRoute";

// express、koa2 两个差不多
const app = Express()

// 请求静态文件，当请求/upload，访问 "public/upload"
app.use("/upload", Express.static("public/upload"))

// 配置中间件，用于解析请求消息体中的json格式
app.use(Express.json())

// 添加中间件, 请求这个地址，让 MovieRouter 处理
// postman可以测试接口
app.use("/api/movie", MovieRouter)

// 文件上传
// 通常情况下，服务器会提供一个统一的接口，处理上传的图片
app.use("/api/upload", UploadRoute)

app.listen(3001)