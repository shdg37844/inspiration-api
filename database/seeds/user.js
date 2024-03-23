exports.seed = function (knex) {
    return Promise.all([
        knex('users').insert([
            {
                phone: '19817822742', 
                name:'kazuki'
            },
        ]),

        knex('roles').insert([
            { id: 1, name: '超级管理员' },
        ]),

        knex('permission_groups').insert([
            { id: 1, name: '通用管理' },
            { id: 2, name: '设置' },
        ]),

        knex('permissions').insert([
            { id: 1, group_id: 1, slug: 'inspiration-manager', name: '灵感图管理' },
            { id: 2, group_id: 2, slug: 'role-index', name: '角色列表查看权限' },
            { id: 3, group_id: 2, slug: 'manager-index', name: '管理员列表查看权限' },
        ]),

        knex('role_permissions').insert([
            { role_id: 1, permission_id: 1 },
            { role_id: 1, permission_id: 2 },
            { role_id: 1, permission_id: 3 },
        ]),

        knex('user_roles').insert([
            { role_id: 1, user_id: 1 },
        ])
    ])
};
