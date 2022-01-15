const mongoose = require("mongoose")
const Joi = require("joi")

const farmSchema = mongoose.model('Farm', new mongoose.Schema({
    farmName: {
        type: String,
        required: true,
    },
    data: { 
        type: Array, 
        default: []
    }
}))

const validateFarmData = (farm) => {

    const schema = Joi.object({
        farmName: Joi.string().required(),
        data: Joi.array()
    })

    return schema.validate(farm)
}

exports.Farm = farmSchema
exports.validate = validateFarmData
