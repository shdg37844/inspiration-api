const basicModel = require('./basicModel.js');

class favoriteModel extends basicModel {
    constructor(props = "favorite") {
        super(props);
    }

    findFavName(id) {
        return this.knex(this.table)
            .where('id', '=', id)
            .first()
    }
}

module.exports = new favoriteModel();