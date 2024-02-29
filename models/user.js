const basicModel = require('./basicModel.js');

class userModel extends basicModel {
    constructor(props = "users") {
        super(props);
    }
}

module.exports = new userModel();