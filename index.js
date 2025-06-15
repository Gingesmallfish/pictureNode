const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const session = require('express-session');


const reg = require('./reg')
// 引入配置文件
const config = require('./config')

require('dotenv').config(); // ✅ 必须加载
require('./db')

app.use(express.json()) // 支持 JSON 请求提


// 配置session 中间件
app.use(session({
    secret: 'your-secret-key', // 用于签名 session ID 的密钥
    resave: false,            // 是否每次请求都重新保存 session
    saveUninitialized: true,  // 是否保存未初始化的 session
    cookie: {
        secure: false,        // 如果使用 HTTPS，请设置为 true
        maxAge: 24 * 60 * 60 * 1000 // Session 过期时间（例如：24 小时）
    }

}))


// Middleware
app.use(bodyParser.json());

// 启用cors
app.use(cors(config.cors))

// 注册路由
app.use('/',  reg)

app.listen(config.port, () => {
    const baseUrl = `http://localhost:${config.port}`
    console.log(`✅ 服务已启动，访问地址: ${baseUrl}`)
})

// 导出 app 和 server 供测试使用
module.exports = { app };