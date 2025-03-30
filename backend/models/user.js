const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        hash: {
            type: String,
            required: true
        },
        salt: {
            type: String,
            required: true
        },
        blogs: {
            type: Number,
            default: 0
        },
        likedBlogs: {
            type: [mongoose.Schema.Types.ObjectId],
            default: []
        },
    }
)

module.exports = { userSchema }