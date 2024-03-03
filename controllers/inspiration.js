const Inspiration = require('../models/inspiration')

const inspirationController = {
    show: async function (req, res, next) {
        const selectedClassify = req.params.classify;
        try {
            const inspiration = await Inspiration.select(selectedClassify)
            res.json({ error_code: 0, data: { inspiration: inspiration } })
        } catch (e) {
            res.json({ error_code: 1, message: e.message })
        }
    },

}

module.exports = inspirationController;