const User = require('./../models/user')
const UserRole = require('./../models/user_role')
const Role = require('./../models/role')
const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const userController = {
    getCurrentUser: async function (req, res, next) {
        try {
            const token = req.headers.authorization
                ? req.headers.authorization.split(' ')[1]
                : '';

            const decoded = JWT.verify(token, JWT_SECRET);
            const user_id = decoded.user_id

            const user = await User.findById(user_id)

            if (!user) {
                return res.status(404).json({ code: 0, message: '用户不存在' });
            }

            res.json({ code: 1, data: { userInfo: user } })

        } catch (error) {
            res.status(500).json({ code: 0, message: '获取用户信息失败', error: error.message });
        }
    },
    getUsers: async function (req, res, next) {
        try {
            const usersResponse = await User.all();
            const user_roleResponse = await UserRole.all();
            const roleResponse = await Role.all();

            const users = usersResponse.map(data => {
                let relatedItem = user_roleResponse.find(item => item.user_id === data.id)
                let roleItem = roleResponse.find(item => item.id === relatedItem.role_id)
                let roleName = roleItem.name;

                return {
                    id: data.id,
                    phone: data.phone,
                    role: roleName
                }

            });

            res.json({ code: 1, data: { users: users } })
        } catch (error) {
            res.status(500).json({ code: 0, message: '获取用户失败', error: error.message });
        }
    }
}

module.exports = userController