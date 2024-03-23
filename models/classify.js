const basicModel = require('./basicModel.js');

class classifyModel extends basicModel {
    constructor(props = "classify") {
        super(props);
    }

    getSpaceClassify() {
        return this.knex(this.table)
            .where('parent_id', '=', 1)
    }

    getStyleClassify() {
        return this.knex(this.table)
            .where('parent_id', '=', 2)
    }


}

module.exports = new classifyModel();