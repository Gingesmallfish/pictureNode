require('dotenv').config()
module.exports = {
    // 服务端口
    port: 3000,

    // 是否开启调试模式
    debug: true,
    // 数据库配置
    dbConfig: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT)
    },

    // 配置跨域
    // CORS 配置
    cors: {
        origin: '*', // 前端地址
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true // 是否允许发送 cookies
    }
}