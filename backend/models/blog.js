const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    blogTitle: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    comments: {
        type: String,
    },
    likes: {
        type: Number,
    },
    views: {
        type: Number,
    }
});

module.exports = { blogSchema }