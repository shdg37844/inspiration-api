const Inspiration = require('../models/inspiration')
const FavIns = require('../models/fav-ins')

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

    showPics: async function (req, res, next) {
        try {
            const images = await Inspiration.getImages()
            res.json({ error_code: 0, data: { images } })

        } catch (e) {
            res.json({ error_code: 1, message: e.message })
        }
    },
    showFavPics: async function (req, res, next) {
        const id = req.params.id

        try {
            const img_urls = await Inspiration.knex('inspiration')
                .join('fav-ins', 'inspiration.id', '=', 'fav-ins.ins_id')
                .where('fav-ins.fav_id', id)
                .select('inspiration.img_url')
            res.json({ error_code: 0, data: { img_urls } })

        } catch (e) {
            res.json({ error_code: 1, message: e.message })
        }
    }
}

module.exports = inspirationController;