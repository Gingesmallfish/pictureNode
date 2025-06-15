const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// 注册
router.post('/register', authController.register);

// 发送验证码
router.post('/send-code', authController.sendCode);

// 登录
router.post('/login', authController.handleLogin);

// 注销用户（需要用户 ID）
router.delete('/users/:id', authController.deleteUser); // DELETE /users/123

// 退出登录
router.post('/logout', authController.logout);

module.exports = router;