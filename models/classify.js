const basicModel = require('./basicModel.js');

class classifyModel extends basicModel {
    constructor(props = "classify") {
        super(props);
    }
}

module.exports = new classifyModel();