module.exports = {
    // 查询指定邮箱的最新验证码记录
    findLatestEmailCode: `
        SELECT id, code, expires_at, used
        FROM email_codes
        WHERE email = ?
        ORDER BY created_at DESC
        LIMIT 1
    `,

    // 插入新用户信息到 users 表
    insertUser: `INSERT INTO users (email, password, salt)
                 VALUES (?, ?, ?)`,

    // 用户注册/登录时查询是否存在该邮箱
    findUserByEmail: `SELECT *
                      FROM users
                      WHERE email = ?`,

    // 插入新的邮箱验证码记录
    insertEmailCode: `INSERT INTO email_codes (email, code, expires_at, used)
                      VALUES (?, ?, ?, ?)`,


    // 标记指定 ID 的验证码为已使用
    markEmailCodeAsUsed: `UPDATE email_codes
                          SET used = TRUE
                          WHERE id = ?`,


    // 注销用户账户 (从users表中删除用户)
    logoutUser: `DELETE
                 FROM users
                 WHERE id = ?`,
};
