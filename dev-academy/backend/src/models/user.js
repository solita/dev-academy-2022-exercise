const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true, //remove whitespace
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
})

const User = mongoose.model('User', userSchema)

module.exports = User