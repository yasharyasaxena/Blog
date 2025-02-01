const mongoose = require("mongoose");

async function dbConnect(path) {
    try {
        await mongoose.connect(path)
        console.log("MongoDB connected!")
    } catch (err) {
        console.log(err)
    }
}

module.exports = { dbConnect }
