const aliyunModel = require('../models/aliyun');

const aliyunController = {
    send: async function (req, res, next) {
        try {
            const name = req.body.name;
            const className = req.body.class_name;
            const date = req.body.date;
            const time = req.body.time;
            const phone = req.body.phone;
            const sendPhone = req.body.send_phone;

            if (!name || !className || !date || !time || !phone || !sendPhone) {
                res.json({ code: 0, message: '缺少参数' });
                return
            }

            const TemplateParam = JSON.stringify({
                name, className, date, time, phone
            })

            const smsResult = await aliyunModel
                .sms({
                    PhoneNumbers: sendPhone,
                    SignName: 'inspiration',
                    TemplateCode: 'SMS_465340652',
                    TemplateParam
                });

            if (smsResult.status === 1) {
                res.json({ code: 200, message: '短信发送成功', data: smsResult.data });
            } else {
                res.json({ code: 0, message: '短信发送失败', data: smsResult.data });
            }

        } catch (e) {
            res.json({ code: 0, message: '服务器错误' });
        }
    }
}

module.exports = aliyunController;