const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    phone: String,
    image: {
        type: String,
        trim: true,
    },
    creeatedAt: {
        type: Number,
        default: new Date().getTime()
    },
    about: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('users', UserSchema)