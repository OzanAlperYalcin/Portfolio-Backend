const mongoose = require('mongoose')

const SocialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    sort: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('socials', SocialSchema)