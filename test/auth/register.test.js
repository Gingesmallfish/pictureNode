// __tests__/auth/register.test.html.js
const request = require('supertest');
const { app } = require('../../index');
const pool = require('../../db');
const { generateCode } = require('../../utils/helpers');

describe('POST /reg/auth/register', () => {
    const testEmail = '1952747218@qq.com';
    const testPassword = '123456';
    let validCode;

    beforeAll(async () => {
        // 生成有效验证码 ✅
        validCode = generateCode();

        await pool.query(
            'INSERT INTO email_codes (email, code, expires_at) VALUES (?, ?, NOW() + INTERVAL 5 MINUTE)',
            [testEmail, validCode]
        );
    });

    afterAll(async () => {
        await pool.query('DELETE FROM users WHERE email = ?', [testEmail]);
        await pool.query('DELETE FROM email_codes WHERE email = ?', [testEmail]);
    });

    it('应成功注册', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: testEmail, password: testPassword, code: validCode });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            code: 200,
            success: true,
            message: '注册成功'
        });
    });
});
