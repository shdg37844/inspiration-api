const express = require('express');
const router = express.Router();
const aliyunController = require('../controllers/aliyun')
const classifyController = require('./../controllers/classify.js')
const inspirationController = require('./../controllers/classify.js')
const favoriteController = require('./../controllers/favorite.js')

//sms短信
router.post('/aliyun-sms', aliyunController.send);

//灵感条目
router.get('/classify', classifyController.show)

//灵感图
router.get('/inspiration/classify', inspirationController.show)

//灵感收藏夹
router.get('/favorite', favoriteController.show)
router.post('/favorite', favoriteController.insertFavorite);
router.delete('/favorite/:id', favoriteController.deleteFavorite);

module.exports = router;