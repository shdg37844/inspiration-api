const basicModel = require('./basicModel.js');

class inspirationModel extends basicModel {
    constructor(props = "inspiration") {
        super(props);
    }

    getImages() {
        return this.knex(this.table)
            .select('img_url')
            .limit(300)
    }


}

module.exports = new inspirationModel();