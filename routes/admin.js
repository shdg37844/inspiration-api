var express = require('express');
var router = express.Router();
const permissionController = require('./../controllers/permission.js')
const roleController = require('./../controllers/role.js')

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

module.exports = router;
