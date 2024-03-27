const express = require('express');
const router = express.Router();
const aliyunController = require('../controllers/aliyun')
const classifyController = require('./../controllers/classify.js')
const inspirationController = require('./../controllers/inspiration.js')
const favoriteController = require('./../controllers/favorite.js')
const authController = require('./../controllers/auth.js');
const Auth = require('./../middlewares/auth.js')

//sms短信
router.post('/aliyun-sms', aliyunController.send);

//登录
router.post('/login', authController.login);

//灵感条目
router.get('/classify', classifyController.show)

//灵感图
router.get('/inspiration/classify', inspirationController.show)
router.get('/inspiration/images', inspirationController.showPics)  //获得首页全部图片
router.get('/inspiration/:id/images', inspirationController.showFavPics)  //获得收藏夹图片
router.get('/InsFav', inspirationController.showFavInsBond)
router.post('/InsFav', inspirationController.addBind)

//灵感收藏夹
router.get('/favorite', favoriteController.show)
router.post('/favorite', favoriteController.insertFavorite);
router.delete('/favorite/:id', favoriteController.deleteFavorite);

module.exports = router;