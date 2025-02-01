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
});

module.exports = { blogSchema }