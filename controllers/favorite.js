const Favorite = require('../models/favorite')

const favoriteController = {
    show: async function (req, res, next) {
        try {
            const favorite = await Favorite.all()
            res.json({ error_code: 0, data: { favorite: favorite } })
        } catch (e) {
            res.json({ error_code: 1, message: e.message })
        }
    },
    insertFavorite: async function (req, res, next) {
        let favorite = req.body.favorite;
        try {
            const insertFavoriteId = await Favorite.insert(favorite);
            res.json({ code: 200, data: insertFavoriteId })
        } catch (e) {
            res.json({ code: 0, data: e })
        }
    },
    deleteFavorite: async function (req, res, next) {
        const id = req.params.id;
        try {
            const deleteFavoriteId = await Favorite.delete(id);
            res.json({ code: 200, data: deleteFavoriteId })
        } catch (e) {
            res.json({ code: 0, data: e })
        }
    }
}

module.exports = favoriteController;