const authService = require('../services/authService');
const {
    successResponse,
    badRequestResponse,
    serverErrorResponse,
} = require('../utils/response');

/**
 * 注册
 * @param req 请求
 * @param res 响应
 * @returns {Promise<*>} 响应
 */
async function register(req, res) {
    const {email, password} = req.body;

    try {
        const result = await authService.registerUser(email, password);

        if (result.success) {
            return successResponse(res, '注册成功', result.data);
        }
    } catch (error) {
        badRequestResponse(res, '该邮箱已被注册，请直接登录或使用其他邮')
        return serverErrorResponse(res, '服务器内部错误');
    }
}

/**
 * 发送验证码
 * @param req 请求
 * @param res 响应
 * @returns {Promise<*>} 响应
 */
async function sendCode(req, res) {
    const {email} = req.body;

    try {
        const result = await authService.sendVerificationEmail(email);

        if (result.success) {
            return successResponse(res, result.message);
        }
    } catch (error) {
        return serverErrorResponse(res, '验证码发送失败');
    }
}

/**
 *  登录
 * @param req  请求
 * @param res   响应
 * @returns {Promise<*>} 响应
 */
async function handleLogin(req, res) {
    const {email, password} = req.body;

    if (!email || !password) {
        return badRequestResponse(res, '邮箱和密码不能为空');
    }

    try {
        const result = await authService.loginUser(req,email, password);

        if (result.success) {
            return successResponse(res, '登录成功', result.data);
        } else {
            return badRequestResponse(res, '邮箱或密码错误');
        }
    } catch (error) {
        return serverErrorResponse(res, '服务器内部错误');
    }
}

/**
 * 注销用户账户
 * @param {Object} req - 请求对象（需包含用户 ID）
 * @param {Object} res - 响应对象
 * @returns {Promise<*>} 响应结果
 */
async function deleteUser(req, res) {
    const userId = parseInt(req.params.id, 10); // 从 URL 参数中获取用户 ID

    if (isNaN(userId)) {
        return badRequestResponse(res, '无效的用户 ID');
    }

    try {
        const result = await authService.deleteUserById(userId);

        return successResponse(res, result.message);
    } catch (error) {
        return serverErrorResponse(res, error.message || '用户注销失败');
    }
}

// 用户退出控制器
function logout(req, res) {
    const result = authService.logoutUser(req); // 调用退出函数
    return successResponse(res, result.message);
}


module.exports = {
    register,
    sendCode,
    handleLogin,
    deleteUser,
    logout
};