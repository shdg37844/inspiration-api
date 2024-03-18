const express = require('express');
const router = express.Router();
const permissionController = require('./../controllers/permissions.js')
const roleController = require('./../controllers/role.js')
const classifyController = require('./../controllers/classify.js')
const aliyunController = require('./../controllers/aliyun.js');
const authController = require('./../controllers/auth.js');
const userController = require('./../controllers/user.js');
const Auth = require('./../middlewares/auth.js')

// 角色管理
router.get('/role', Auth.isLogin, roleController.index);
router.post('/role', Auth.isLogin, roleController.store);
router.put('/role/:id', Auth.isLogin, roleController.update);
router.delete('/role/:id', Auth.isLogin, roleController.destroy);

// 用户角色管理
router.get('/role/:id/users', Auth.isLogin, roleController.getUsers);
router.post('/role/:id/users', Auth.isLogin, roleController.storeUsers);
router.delete('/role/:id/users', Auth.isLogin, roleController.destoryUsers);

// 角色权限管理
router.get('/permissions', Auth.isLogin, permissionController.getCurrentUserPermissions);
router.get('/role/:id/permissions', Auth.isLogin, roleController.getPermissions);
router.put('/role/:id/permissions', Auth.isLogin, roleController.updatePermissions);
router.post('/role/:id/permissions', Auth.isLogin, roleController.storeRolePermission)

//阿里云短信sms
router.post('/aliyun-sms', aliyunController.send);

//灵感类目
router.post('/classify', Auth.isLogin, classifyController.insertClassify);
router.delete('/classify/:id', Auth.isLogin, classifyController.deleteClassify);

//后台登录
router.post('/login', authController.login);

//用户
router.get('/users/user-info', Auth.isLogin, userController.getCurrentUser);
router.get('/users', Auth.isLogin, userController.getUsers);

module.exports = router;
