const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    sort: {
        type: Number,
        trim: true,
        required: true
    },
})

module.exports = mongoose.model('teams', TeamSchema)