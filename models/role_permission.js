const basicModel = require('./basicModel.js');

class rolePermissionModel extends basicModel {
    constructor(props = "role_permissions") {
        super(props);
    }
}

module.exports = new rolePermissionModel();