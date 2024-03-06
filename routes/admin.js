const express = require('express');
const router = express.Router();
const permissionController = require('./../controllers/permissions.js')
const roleController = require('./../controllers/role.js')
const classifyController = require('./../controllers/classify.js')
const aliyunController = require('./../controllers/aliyun.js');

// 角色管理
router.get('/role', roleController.index);
router.post('/role', roleController.store);
router.put('/role/:id', roleController.update);
router.delete('/role/:id', roleController.destroy);

// 用户角色管理
router.get('/role/:id/users', roleController.getUsers);
router.post('/role/:id/users', roleController.storeUsers);
router.delete('/role/:id/users', roleController.destoryUsers);

// 角色权限管理
router.get('/permissions', permissionController.index);
router.get('/role/:id/permissions', roleController.getPermissions);
router.put('/role/:id/permissions', roleController.updatePermissions);

//阿里云短信sms
router.post('/aliyun-sms', aliyunController.send);

//灵感类目
router.post('/classify', classifyController.insertClassify);
router.delete('/classify/:id', classifyController.deleteClassify);




module.exports = router;
