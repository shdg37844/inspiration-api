const basicModel = require('./basicModel.js');

class userModel extends basicModel {
    constructor(props = "users") {
        super(props);
    }

    findByPhone(phone) {
        return this.knex(this.table)
            .select('users.*')
            .where('phone', '=', phone)
            .first(); // 确保返回单个对象
    }

    findById(user_id) {
        return this.knex(this.table)
            .select('id', user_id)
            .first()
    }

}

module.exports = new userModel();