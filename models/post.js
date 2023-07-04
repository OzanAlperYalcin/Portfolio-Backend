const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        trim: true
    },
    post: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    photoURL: String,
    createdAt: {
        type: Number,
        default: new Date().getTime()
    },
    hashtag: {
        type: String,
        required: true,
        trim: true
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    keywords: String
})

module.exports = mongoose.model('posts', PostSchema)