const express = require('express');
const router = express.Router();
const aliyunController = require('../controllers/aliyun')
const InspirationTypeController = require('../controllers/classify')

//sms短信
router.post('/aliyun-sms', aliyunController.send);

//灵感条目
router.get('/inspiration-type', InspirationTypeController.show)


module.exports = router;