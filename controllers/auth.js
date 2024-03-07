const User = require('../models/user');
const { verificationModel } = require('../models/aliyun');
const Verification = new verificationModel();

const authController = {
    login: async function (req, res) {
        const phone = req.body.phone;
        const writeCode = req.body.code;
        const inputCode = parseInt(writeCode, 10);

        try {
            console.log(`开始验证流程，电话号码：${phone}，输入的验证码：${writeCode}`);

            // 查找最新的验证码记录
            console.log(`开始查找电话号码为 ${phone} 的最新验证码记录`);
            const verificationRecord = await Verification.findLatestByPhone(phone);
            if (!verificationRecord) {
                console.log(`电话号码为 ${phone} 的验证码记录未找到`);
                return res.json({ code: 0, message: '验证码错误或不存在' });
            }
            console.log(`找到验证码记录：`, verificationRecord);

            // 验证码内容匹配检查
            if (verificationRecord.code !== inputCode) {
                console.log(`输入的验证码与记录中的验证码不匹配`);
                return res.json({ code: 0, message: '验证码错误或不存在' });
            }

            // 验证码过期检查
            if (new Date() > new Date(verificationRecord.expires_at)) {
                console.log(`验证码已过期`);
                return res.json({ code: 0, message: '验证码已过期' });
            }

            // 删除已使用的验证码记录
            console.log(`开始删除电话号码为 ${phone} 的验证码记录`);
            await Verification.deleteByPhone(phone);
            console.log(`成功删除电话号码为 ${phone} 的验证码记录`);

            // 检查用户是否存在
            console.log(`查询用户信息，电话号码：${phone}`);
            let user = await User.findByPhone(phone);
            if (!user) {
                console.log(`用户未找到，创建新用户，电话号码：${phone}`);
                await User.insert({ phone: phone });
                console.log(`用户创建成功，电话号码：${phone}`);
            } else {
                console.log(`找到用户：`, user);
            }

            res.json({ code: 1, message: '登录成功' });
        } catch (e) {
            console.log('登录过程中出现错误：', e);
            res.json({ code: 0, message: '服务器错误', error: e.message });
        }
    }
};

module.exports = authController;
