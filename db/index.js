const index = require('mysql2')
const config = require('../config')

const pool = index.createPool({
  host: config.dbConfig.host,
  user: config.dbConfig.user,
  password: config.dbConfig.password,
  database: config.dbConfig.database,
  port: config.dbConfig.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// 测试连接
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ 连接数据库失败:', err.message)
    return
  }
  console.log('✅ 成功连接到 MySQL 数据库')
  connection.release()
})

module.exports = pool.promise()
