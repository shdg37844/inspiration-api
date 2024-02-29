const basicModel = require('./basicModel.js');

class userRoleModel extends basicModel {
    constructor(props = "user_roles") {
        super(props);
    }
}

module.exports = new userRoleModel();