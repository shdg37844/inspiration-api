const basicModel = require('./basicModel.js');

class permissionModel extends basicModel {
    constructor(props = "permissions") {
        super(props);
    }
}

module.exports = new permissionModel();