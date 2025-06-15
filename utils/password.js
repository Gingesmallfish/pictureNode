const bcrypt = require('bcrypt');

/**
 * 生成盐值（salt）
 */
function generateSalt() {
    return bcrypt.genSaltSync(10); // 10 是迭代次数，默认即可
}


/**
 * 加密密码
 * @param {string} password - 明文密码
 * @returns {string} - 加密后的密码
 */
function encryptPassword(password) {
    const salt = generateSalt(); // 动态生成盐值
    return bcrypt.hashSync(password, salt); // 使用生成的盐值加密密码
}


/**
 * 验证密码
 * @param {string} inputPassword - 用户输入的明文密码
 * @param {string} hashedPassword - 数据库存储的加密密码
 * @returns {boolean} - 验证结果
 */
function comparePassword(inputPassword, hashedPassword) {
    return bcrypt.compareSync(inputPassword, hashedPassword);
}

module.exports = {
    generateSalt,
    encryptPassword,
    comparePassword,
};