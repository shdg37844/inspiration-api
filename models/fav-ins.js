const basicModel = require('./basicModel.js');

class FavoriteInspirationModel extends basicModel {
    constructor(props = "fav-ins") {
        super(props);
    }
}

module.exports = new FavoriteInspirationModel();