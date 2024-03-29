const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2
    },
    born: {
        type: Number
    },
    bookCount: {
        type: Number
    }
})

module.exports = mongoose.model("Author", authorSchema)
