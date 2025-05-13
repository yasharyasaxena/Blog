const mongoose = require("mongoose");

async function dbConnect(path) {
    try {
        await mongoose.connect(path, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB connected!")
    } catch (err) {
        console.log(err)
    }
}

module.exports = { dbConnect }
