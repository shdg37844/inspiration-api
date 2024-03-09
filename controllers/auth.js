const User = require('../models/user');
const { verificationModel } = require('../models/aliyun');
const Verification = new verificationModel();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

const authController = {
    login: async function (req, res) {
        const phone = req.body.phone;
        const writeCode = req.body.code;
        const inputCode = parseInt(writeCode, 10);

        try {
            // 查找最新的验证码记录
            const verificationRecord = await Verification.findLatestByPhone(phone);
            if (!verificationRecord) {
                return res.json({ code: 0, message: '验证码错误或不存在' });
            }

            // 验证码内容匹配检查
            if (verificationRecord.code !== inputCode) {
                return res.json({ code: 0, message: '验证码错误或不存在' });
            }

            // 验证码过期检查
            if (new Date() > new Date(verificationRecord.expires_at)) {
                return res.json({ code: 0, message: '验证码已过期' });
            }

            // 删除已使用的验证码记录
            await Verification.deleteByPhone(phone);

            let user = await User.findByPhone(phone);
            if (!user) {
                await User.insert({ phone: phone });
                user = await User.findByPhone(phone);  //插入后再获得user数据
            }

            // 使用用户的phone和id生成JWT token
            const token = jwt.sign({ user_id: user.id, phone: phone }, JWT_SECRET, {
                expiresIn: '24h' // token有效期24小时
            });

            res.json({ code: 1, data: { token: token }, message: '登录成功！' });
        } catch (e) {
            console.log('登录过程中出现错误：', e);
            res.json({ code: 0, message: '服务器错误', error: e.message });
        }
    }
};

module.exports = authController;
