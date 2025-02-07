const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    author: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: Object,
        required: true
    },
    comments: {
        type: String,
    },
    likes: {
        default: 0,
        type: Number,
    },
    views: {
        default: 0,
        type: Number,
    },
    banner: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    draft: {
        type: Boolean,
        default: false
    }
});

module.exports = { blogSchema }