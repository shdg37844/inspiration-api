const basicModel = require('./basicModel.js');

class inspirationModel extends basicModel {
    constructor(props = "inspiration") {
        super(props);
    }
}

module.exports = new inspirationModel();