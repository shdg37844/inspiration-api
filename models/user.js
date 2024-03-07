const basicModel = require('./basicModel.js');

class userModel extends basicModel {
    constructor(props = "users") {
        super(props);
    }

    findByPhone(phone) {
        return this.knex(this.table)
            .select('users.*')
            .where('phone','=', phone)
            .first(); // 确保返回单个对象
    }

}

module.exports = new userModel();