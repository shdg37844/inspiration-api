const UserRole = require('./../models/user_role.js');
const Permission = require('./../models/permission.js');
const RolePermission = require('./../models/role_permission.js');

const userService = {
    hasPermission: async function (user_id, permission) {
        const userPermissions = await userService.getUserPermission(user_id)
        const permissions = await Permission.where({ slug: permission })

        if (!userPermissions) {
            return false
        }

        if (!permissions.length) {
            return false
        }
        const permission_id = permissions[0].id;
        return userPermissions
            .some(data => data.permission_id = permission_id)
    },
    getUserPermission: async function (user_id) {
        const roles = await UserRole.where({ user_id })
        if (!roles.length) {
            return false
        }

        const roleIds = roles.map(data => data.role_id)
        const rolePermissions = await RolePermission.knex()
            .whereIn('role_id', roleIds)
        return rolePermissions
    },
    getUserPermissionSlug: async function (user_id) {
        const roles = await UserRole.where({ user_id })
        if (!roles.length) {
            return false
        }

        const roleIds = roles.map(data => data.role_id)
        const rolePermissions = await RolePermission.knex()
            .whereIn('role_id', roleIds)
            .select('permission_id')

        const permissionIds = rolePermissions.map(data => data.permission_id)

        const permissionSlug = await Permission.knex()
            .whereIn('id', permissionIds)
            .select('slug')

        return permissionSlug.map(data => data.slug);
    }
}

module.exports = userService;