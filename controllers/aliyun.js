const { aliyun, verificationModel } = require('../models/aliyun');
const Verification = new verificationModel();

const aliyunController = {
    send: async function (req, res, next) {
        try {
            const sendPhone = req.body.send_phone;

            if (!sendPhone) {
                res.json({ code: 0, message: '缺少参数' });
                return
            }

            // 生成四位随机验证码
            const code = Math.floor(1000 + Math.random() * 9000).toString();

            const expiresAt = new Date(Date.now() + 3 * 60 * 1000);  //验证码过期时间

            // 将验证码包装成JSON格式的字符串
            const TemplateParam = JSON.stringify({ code });

            const smsResult = await aliyun
                .sms({
                    PhoneNumbers: sendPhone,
                    SignName: 'inspiration',
                    TemplateCode: 'SMS_465340652',
                    TemplateParam
                });


            if (smsResult.status === 1) {
                // 检查是否已存在具有相同电话号码的验证码记录
                const existingRecord = await Verification.where({ phone: sendPhone }).first();

                if (existingRecord) {
                    // 如果存在，更新验证码和过期时间
                    await Verification.update(existingRecord.id, { code: code, expires_at: expiresAt });
                } else {
                    // 如果不存在，插入新记录
                    await Verification.insert({ phone: sendPhone, code: code, expires_at: expiresAt });
                }

                res.json({ code: 200, message: '短信发送成功', data: smsResult.data });
            } else {
                res.json({ code: 0, message: '短信发送失败', data: smsResult.data });
            }

        } catch (e) {
            console.log('发送短信过程中发生错误', e);
            res.json({ code: 0, message: '服务器错误' });
        }
    },
    verificationCode: async function (req, res, next) {

    }
}

module.exports = aliyunController;