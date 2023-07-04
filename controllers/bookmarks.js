const BookmarkSchema = require('../models/bookmark')

const getBookmarks = async (req, res) => {
    const { search } = req.query
    try {
        let bookmarks
        const totalCount = await BookmarkSchema.countDocuments()
        if (search) {
            const query = {}
            query.title = { $regex: search, $options: 'i' }
            bookmarks = await BookmarkSchema.find(query).sort({ _id: -1 })
            if (bookmarks.length === 0) {
                return res.status(404).json({ message: 'Yer imi bulunamadı.' });
            }
        } else {
            bookmarks = await BookmarkSchema.find().sort({ _id: -1 })
        }
        res.status(200).json({
            status: 'OK',
            totalCount,
            bookmarks
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getBookmarkDetails = async (req, res) => {
    const { id } = req.params
    try {
        const bookmark = await BookmarkSchema.findById(id)
        res.status(200).json({
            status: 'OK',
            bookmark
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const createBookmark = async (req, res) => {
    try {
        const newBookmark = await BookmarkSchema.create(req.body)
        res.status(200).json({
            status: 'OK',
            newBookmark
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const updateBookmark = async (req, res) => {
    const { id } = req.params
    try {
        const updateBookmark = await BookmarkSchema.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            status: 'OK',
            updateBookmark
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteBookmark = async (req, res) => {
    const { id } = req.params
    try {
        await BookmarkSchema.findByIdAndRemove(id)
        res.status(200).json({
            status: 'OK',
            message: 'Yer imleri başarıyla silindi.'
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { getBookmarks, getBookmarkDetails, createBookmark, updateBookmark, deleteBookmark }