const pool = require('../db') // 引入你的数据库连接模块
//
describe('MySQL 数据库连接测试', () => {
  test('应该能够成功连接到数据库', async () => {
    try {
      const [rows] = await pool.query('SELECT NOW() AS currentTime')
      expect(rows).toBeDefined()
      expect(rows[0].currentTime).toBeDefined()
    } catch (error) {
      fail(`数据库连接失败: ${error.message}`)
    }
  })
})
