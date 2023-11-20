const mongoose = require('mongoose')

const ReferenceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    sort: {
        type: Number,
        required: true,
        trim: true
    },
})

module.exports = mongoose.model('references', ReferenceSchema)