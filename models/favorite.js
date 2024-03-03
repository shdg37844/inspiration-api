const basicModel = require('./basicModel.js');

class favoriteModel extends basicModel {
    constructor(props = "favorite") {
        super(props);
    }
}

module.exports = new favoriteModel();