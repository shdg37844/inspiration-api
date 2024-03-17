exports.up = function (knex) {
    return knex.schema
        // 用户
        .createTable('users', function (table) {
            table.increments('id');
            table.string('phone', 255).unique();
            table.string('name', 255).unique();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('visited_at').defaultTo(knex.fn.now());
        })
        // 角色
        .createTable('roles', function (table) {
            table.increments('id');
            table.string('name', 255).unique();
        })
        .createTable('user_roles', function (table) {
            table.integer('user_id', 11)
            table.integer('role_id', 11)
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
        // 权限
        .createTable('permission_groups', function (table) {
            table.increments('id');
            table.string('name', 255).unique();
        })
        .createTable('permissions', function (table) {
            table.increments('id');
            table.integer('group_id')
            table.string('slug').unique();
            table.string('name', 255).unique();
        })
        .createTable('role_permissions', function (table) {
            table.integer('role_id', 11)
            table.integer('permission_id', 11)
        })
        //灵感库收藏夹
        .createTable('favorite', function (table) {
            table.increments('id');
            table.string('name', 255).unique();
        })
        //灵感库收藏夹图片
        .createTable('fav-ins', function (table) {
            table.increments('id');
            table.integer('ins_id')
            table.integer('fav_id')
        })
        //验证码
        .createTable('verification', function (table) {
            table.increments('id');
            table.string('phone', 255).unique();
            table.integer('code');
            table.timestamp('created_at').defaultTo(knex.fn.now());  //创建时间
            table.timestamp('expires_at').nullable();   //过期时间
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTable("users")
        .dropTable("roles")
        .dropTable("user_roles")
        .dropTable("permission_groups")
        .dropTable("permissions")
        .dropTable("role_permissions")
        .dropTable("fav-ins")
        .dropTable("favorite")
        .dropTable("verification")
};

exports.config = { transaction: false };