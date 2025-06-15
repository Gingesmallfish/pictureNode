const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'QQ', // 使用QQ邮箱的服务
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendVerificationCode(email, code) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: '您的验证码',
        text: `您的验证码是 ${code} 5分钟有效😊`
    };

    await transporter.sendMail(mailOptions);
}

module.exports = {
    sendVerificationCode
};
