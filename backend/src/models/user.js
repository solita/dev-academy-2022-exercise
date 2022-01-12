const mongoose = require("mongoose")
const Joi = require("Joi")

const userSchema = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 5
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
}))

const validateUser = (user) =>{
    
    const schema = Joi.object({
        username: Joi.string().min(3).max(20).required(),
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(8).required(),
    })

    return schema.validate(user)
}

exports.User = userSchema
exports.validate = validateUser