const aliyunModel = require('../models/aliyun');

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
            console.log('codeee',code)
            // 将验证码包装成JSON格式的字符串
            const TemplateParam = JSON.stringify({ code });

            const smsResult = await aliyunModel
                .sms({
                    PhoneNumbers: sendPhone,
                    SignName: 'inspiration',
                    TemplateCode: 'SMS_465340652',
                    TemplateParam
                });

            console.log('ss', smsResult.status)

            if (smsResult.status === 1) {
                res.json({ code: 200, message: '短信发送成功', data: code });
                console.log('发送成功！')
            } else {
                res.json({ code: 0, message: '短信发送失败', data: smsResult.data });
                console.log("发送失败！")
            }
        } catch (e) {
            console.log('发送短信过程中发生错误', e);
            res.json({ code: 0, message: '服务器错误' });
        }
    }
}

module.exports = aliyunController;