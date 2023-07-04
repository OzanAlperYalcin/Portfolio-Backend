const mongoose = require('mongoose')

const BookmarkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Number,
        default: new Date().getTime()
    },
    // uid: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'users',
    //     required: true
    // }
})

module.exports = mongoose.model('bookmarks', BookmarkSchema)