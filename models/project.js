const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    github: {
        type: String,
        required: true,
        trim: true
    },
    live: {
        type: String,
        required: true,
        trim: true
    },
    about: {
        type: String,
        required: true,
    },
    techs: {
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

module.exports = mongoose.model('projects', ProjectSchema)