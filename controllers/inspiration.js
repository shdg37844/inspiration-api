const Inspiration = require('../models/inspiration')
const FavIns = require('../models/fav-ins')
const Favorite = require('../models/favorite')

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

            const selectedFav = await Favorite.findFavName(id)
            const selectedFavName = selectedFav.name

            res.json({ error_code: 0, data: { img_urls, selectedFavName } })

        } catch (e) {
            res.json({ error_code: 1, message: e.message })
        }
    },
    showFavInsBond: async function (req, res, next) {
        try {
            const FavInsBind = await FavIns.all();
            const FavInsCount = await FavIns.countIns();

            res.json({ error_code: 0, data: { FavInsBind, FavInsCount } })
        } catch (e) {
            res.json({ error_code: 1, message: e.message })
        }
    },
    addBind: async function (req, res, next) {
        const ins_id = req.body.ins_id
        const fav_id = req.body.fav_id

        try {
            // 首先查询是否已存在相同的ins_id和fav_id的绑定
            const existingBind = await FavIns.knex('fav-ins')
                .where({ ins_id, fav_id })
                .first();

            // 如果已存在，则不添加新绑定
            if (existingBind) {
                return res.json({ error_code: 2, message: "已经收藏过该图片" });
            }

            // 如果不存在，添加新绑定
            await FavIns.insert({ ins_id, fav_id });
            res.json({ error_code: 0, message: "收藏成功" });

        } catch (e) {
            res.json({ error_code: 1, message: e.message })
        }
    }
}

module.exports = inspirationController;