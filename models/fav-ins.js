const basicModel = require('./basicModel.js');

class FavoriteInspirationModel extends basicModel {
    constructor(props = "fav-ins") {
        super(props);
    }

    countIns() {
        return this.knex(this.table)
            .select('fav_id')
            .count('ins_id as insCount')
            .groupBy('fav_id')
            
    }
}

module.exports = new FavoriteInspirationModel();