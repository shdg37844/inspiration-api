const PermissionGroup = require('./../models/permission_group.js')
const Permission = require('./../models/permission.js')
const userService = require('./../services/user')

const permissionlController = {
    index: async function (req, res, next) {
        try {
            const permissionGroup = await PermissionGroup.all()
            const permissions = await Permission.all()
            const permissionGroupDiv = {}
            permissionGroup.forEach(data => {
                data.children = []
                permissionGroupDiv[data.id] = data
            })
            permissions.forEach(data => {
                permissionGroupDiv[data.group_id].children.push(data)
            })
            const permissionsTransform = Object.values(permissionGroupDiv)
            res.json({ error_code: 0, data: { permissions: permissionsTransform } })
        } catch (e) {
            res.json({ error_code: 1, message: e.message })
        }
    },
    getCurrentUserPermissions: async function (req, res, next) {
        const user_id = res.locals.user_id
        try {
            const permissions = await userService.getUserPermission(user_id);
            res.json({ code: 1, data: { permissions }, message: '获取当前用户权限成功' });
        } catch(e) {
            res.json({ error_code: 1, message: e.message })
        }
    }
}

module.exports = permissionlController;