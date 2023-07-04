const mongoose = require('mongoose')

const TechSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    hashtag: {
        type: String,
        required: true,
        trim: true
    },
    sort: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('techs', TechSchema)