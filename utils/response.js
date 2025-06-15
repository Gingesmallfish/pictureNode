
/**
 * 成功响应
 * @param {Object} res - Express 的 Response 对象
 * @param {string} message - 响应消息
 * @param {any} data - 响应数据（可选）
 */
function successResponse(res, message, data = null, ) {
    return res.status(200).json({
        code: 200,
        success: true,
        message,
        data
    });
}

/**
 * 客户端错误响应（400 Bad Request）
 * @param {Object} res - Express 的 Response 对象
 * @param {string} message - 错误消息
 */
function badRequestResponse(res, message) {
    return res.status(400).json({
        code: 400,
        success: false,
        message
    });
}

/**
 * 资源冲突响应（409 Conflict）
 * @param {Object} res - Express 的 Response 对象
 * @param {string} message - 错误消息
 */
function conflictResponse(res, message) {
    return res.status(409).json({
        success: false,
        message
    });
}

/**
 * 服务器错误响应（500 Internal Server Error）
 * @param {Object} res - Express 的 Response 对象
 * @param {string} message - 错误消息
 */
function serverErrorResponse(res, message) {
    return res.status(500).json({
        success: false,
        message
    });
}




module.exports = {
    successResponse,
    badRequestResponse,
    conflictResponse,
    serverErrorResponse,

};