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
        subject: '您的验证码 - 图床工具箱',
        html: `
            <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 5px; padding: 20px;">
            
            <h2 style="color: #333;">图床工具箱 - 验证码</h2>
            
            <p>您好！${email}</p>
            
            <p>您正在注册或登录图床工具箱，您的验证码是：</p>
            
            <div style="text-align: center; margin: 20px 0;">
            
            <span style="font-size: 24px; font-weight: bold; color: #409EFF; letter-spacing: 2px; padding: 10px 20px; background: #f5f5f5; border-radius: 4px;">
            
            ${code}
            
            </span>
            
            </div>
            
            <p>该验证码在5分钟内有效，请勿泄露给他人。</p>
            
            <p>如果您没有进行此操作，请忽略此邮件。</p>
            
            <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;">
            
            <p style="font-size: 12px; color: #999;">此邮件由系统自动发送，请勿直接回复。</p>
            
            </div>
`

    };

    await transporter.sendMail(mailOptions);
}

module.exports = {
    sendVerificationCode
};
