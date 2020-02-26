import "reflect-metadata";// class-transformer 要用到这个库
import Express from "express";
import MovieRouter from "./routes/movieRoute";

// express、koa2 两个差不多
const app = Express()

// 配置中间件，用于解析请求消息体中的json格式
app.use(Express.json())

// 添加中间件, 请求这个地址，让 MovieRouter 处理
// postman可以测试接口
app.use("/api/movie", MovieRouter)

app.listen(3000)