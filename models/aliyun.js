require('dotenv').config()
const Core = require('@alicloud/pop-core');

const aliyun = {
    sms: function ({ PhoneNumbers, SignName, TemplateCode, TemplateParam }) {
        const client = new Core({
            accessKeyId: process.env.ALIYUN_ACCESSKEY,
            accessKeySecret: process.env.ALIYUN_SECRETKEY,
            endpoint: 'https://dysmsapi.aliyuncs.com',
            apiVersion: '2017-05-25'
        });

        const params = {
            "RegionId": "cn-hangzhou",
            "PhoneNumbers": PhoneNumbers,
            "SignName": SignName,
            "TemplateCode": TemplateCode,
            "TemplateParam": TemplateParam
        }

        const requestOption = {
            method: 'POST'
        };

        // return client.request('SendSms', params, requestOption);
        return new Promise((resolve, reject) => {
            client.request('SendSms', params, requestOption)
                .then((result) => {
                    if (result.Code === 'OK') {
                        resolve({ status: 1, data: result });
                    } else {
                        reject({ status: 0, message: `发送失败，错误码：${result.Code}，错误消息：${result.Message}` });
                    }
                })
                .catch((error) => {
                    // 技术性错误处理，例如网络问题等
                    reject({ status: 0, message: `请求发送过程中出现错误：${error.message}` });
                });
        })
    }
}

module.exports = aliyun;