const request = require('supertest');
const {app} = require('../../index');


describe('POST /reg/auth/send-code', () => {
    test('应该发送验证码', async () => {
        const res = await request(app)
            .post('/api/auth/send-code')
            .send({email: '1847535232@qq.com'});

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            code: 200,
            success: true,
            message: '验证码已发送，请查收邮箱' // ✅ 验证完整结构
        });
    });

});


