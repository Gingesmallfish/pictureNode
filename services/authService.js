const {encryptPassword, generateSalt, comparePassword} = require('../utils/password');
const {generateToken} = require('../utils/token');
const db = require('../db');
const {sendVerificationCode} = require('./emailService');
const queries = require('../queries/userQueries'); // SQL 查询模块


/**
 * 用户注册逻辑
 * @param {string} email - 用户邮箱
 * @param {string} password - 用户密码
 */
async function registerUser(email, password) {
    try {
        // 检查邮箱是否已存在
        const [rows] = await db.execute(queries.findUserByEmail, [email]);
        if (rows.length > 0) {
            throw new Error('邮箱已存在');
        }


        // 加密密码
        const hashedPassword = encryptPassword(password);
        // 盐值
        const salt = generateSalt();
        // 注册新用户
        const [result] = await db.execute(queries.insertUser, [email, hashedPassword,  salt]);
        const userId = result.insertId; // 获取插入用户的 ID

        // 生成 Token
        const token = generateToken({ id: userId, email }, 'key',  '1d');

        return {
            code: 200,
            success: true,
            message: '注册成功',
            data: {
                token,
                userId,
                email
            }
        };
    } catch (error) {
        console.error('注册失败:', error);
        throw error;
    }
}



/**
 * 发送验证码
 * @param {string} email - 用户邮箱
 */
async function sendVerificationEmail(email) {
    try {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 当前时间加5分钟

        // 插入新的验证码并设置有效期
        await db.execute(queries.insertEmailCode, [email, code, expiresAt, false]);

        // 发送验证码邮件
        await sendVerificationCode(email, code);

        return {success: true, message: '验证码已发送'};
    } catch (error) {
        console.error('验证码发送失败:', error);
        throw error; // 抛出错误，由控制器处理
    }
}


/**
 * 用户登录逻辑
 * @param {Object} req - Express 请求对象
 * @param {string} email - 用户邮箱
 * @param {string} password - 用户密码
 */
async function loginUser(req, email, password) {
    try {
        // 查询用户信息
        const [rows] = await db.execute(queries.findUserByEmail, [email]);

        if (rows.length === 0) {
            return {
                code: 404,
                success: false,
                message: '用户不存在'
            };
        }

        const user = rows[0];
        const isPasswordValid = comparePassword(password, user.password);

        if (!isPasswordValid) {
            return {
                code: 401,
                success: false,
                message: '密码错误'
            };
        }

        // 生成 Token
        const token = generateToken({ id: user.id, email }, 'key', '1d');

        const userInfo = {
            token,
            id: user.id,
            email: user.email
        };

        // 将用户数据保存到 session 中
        req.session.user = userInfo;

        return {
            code: 200,
            success: true,
            data: userInfo
        };
    } catch (error) {
        console.error('登录失败:', error);
        throw error; // 抛出错误，由控制器处理
    }
}


// 注销用户
async function deleteUserById(userId) {
    try {
        const [result] = await db.execute(queries.logoutUser, [userId]);

        if (result.affectedRows === 0) {
            return {
                code: 404,
                success: false,
                message: '用户不存在'
            };
        }
        return {
            code: 200,
            success: true,
            message: '注销成功'
        };
    } catch (error) {
        console.error('注销失败:', error);
        throw error; // 抛出错误，由控制器处理
    }
}


// 退出登陆
function logoutUser(req) {
    // 检查用户的是否登陆
    if (!req.session || !req.session.user) {
        return {
            code: 401,
            success: false,
            message: '未登录，无法退出'
        }
    }

    // 销毁会话
    req.session.destroy((err) => {
        if (err) {
            console.error('退出登录失败:', err);
            return {
                code: 500,
                success: false,
                message: '退出登录失败'
            }
        }
    })


    return {
        code: 200,
        success: true,
        message: '退出登录成功'
    }
}


module.exports = {
    registerUser,
    sendVerificationEmail,
    loginUser,
    deleteUserById,
    logoutUser
};