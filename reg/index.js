const express = require('express');
const router = express.Router();
const authRouter = require('../router/authRouter');
// 注册接口 和验证码
router.use('/', authRouter)

module.exports = router;