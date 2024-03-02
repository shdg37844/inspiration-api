const Classify = require('../models/classify')

const ClassifyController = {
    show: async function (req, res, next) {
        try {
            const classify = await Classify.all()
            res.json({ error_code: 0, data: { classify: classify } })
        } catch (e) {
            res.json({ error_code: 1, message: e.message })
        }
    },
    insertClassify: async function (req, res, next) {
        let classify = req.body.classify;
        try {
            const insertClassifyId = await Classify.insert(classify);
            res.json({ code: 200, data: insertClassifyId })
        } catch (e) {
            res.json({ code: 0, data: e })
        }
    },
    deleteClassify: async function (req, res, next) {
        const id = req.params.id;
        try {
            const deleteClassifyId = await Classify.delete(id);
            res.json({ code: 200, data: deleteClassifyId })
        } catch (e) {
            res.json({ code: 0, data: e })
        }
    }
}

module.exports = ClassifyController;