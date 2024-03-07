exports.seed = function (knex) {
    return Promise.all([
        knex('users').insert([
            {
                phone: '1234567890', 
            },
        ]),

        knex('roles').insert([
            { id: 1, name: '管理员' },
        ]),

        knex('permission_groups').insert([
            { id: 1, name: '通用管理' },
            { id: 2, name: '设置' },
        ]),

        knex('permissions').insert([
            { id: 1, group_id: 1, slug: 'general-manager', name: '通用管理' },
            { id: 2, group_id: 2, slug: 'admin-manager', name: '管理员' },
        ]),

        knex('role_permissions').insert([
            { role_id: 1, permission_id: 1 },
            { role_id: 1, permission_id: 2 },
        ]),

        knex('user_roles').insert([
            { role_id: 1, user_id: 1 },
        ])
    ])
};
