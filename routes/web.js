const express = require('express');
const router = express.Router();
const aliyunController = require('./../controllers/aliyunController')

router.post('/aliyun-sms', aliyunController.send);