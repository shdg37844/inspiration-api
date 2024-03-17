const basicModel = require('./basicModel.js');

class rolePermissionModel extends basicModel {
    constructor(props = "role_permissions") {
        super(props);
    }

    deleteById(params) {
        return this.knex(this.table)
            .where(params)
            .del()
    }
}

module.exports = new rolePermissionModel();