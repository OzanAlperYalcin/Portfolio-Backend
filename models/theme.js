const mongoose = require('mongoose')

const ThemeSchema = new mongoose.Schema({
    logo: {
        type: String,
        required: true,
        trim: true
    },
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
    slogan: {
        type: String,
        required: true,
        trim: true
    },
    backgroundImage: {
        type: String,
        required: true,
        trim: true
    },
    aboutusImage: {
        type: String,
        required: true,
        trim: true
    },
    aboutusDescription: {
        type: String,
        required: true,
        trim: true
    },
    quotes: {
        type: Array,
        required: true,
        trim: true
    },
    workingHours: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    map: {
        type: String,
        required: true,
        trim: true
    },
    latitude: {
        type: String,
        required: true,
        trim: true
    },
    longitude: {
        type: String,
        required: true,
        trim: true
    },
})

module.exports = mongoose.model('themes', ThemeSchema)