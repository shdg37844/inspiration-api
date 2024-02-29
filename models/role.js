const basicModel = require('./basicModel.js');

class roleModel extends basicModel {
    constructor(props = "roles") {
        super(props);
    }
}

module.exports = new roleModel();