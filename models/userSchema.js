const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        minlength: 2
    },
    favoriteGenre: {
        type: String,
        required: false,
        unique: false
    }
})

module.exports = mongoose.model("User", userSchema)
