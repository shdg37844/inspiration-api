const basicModel = require('./basicModel.js');

class userRoleModel extends basicModel {
    constructor(props = "user_roles") {
        super(props);
    }

    deleteById(id) {
        return this.knex(this.table)
            .select('role_id',id)
            .del()
    } 
}

module.exports = new userRoleModel();