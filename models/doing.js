const mongoose = require('mongoose')

const DoingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    text: {
        type: String,
        trim: true
    },
    sort: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('doings', DoingSchema)