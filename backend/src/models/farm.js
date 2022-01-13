const mongoose = require("mongoose")
const Joi = require("joi")

const farmSchema = mongoose.model('Farm', new mongoose.Schema({
    farmName: {
        type: String,
        required: true,
    },
    data: { type: Array, default: []
           /* location: {
                type: String,
                required: true,
                default: []
            },
            datetime: {
                type: Date,
                required: true,
            },
            sensorType: {
                type: String,
            },
            metricValue: {
                type: mongoose.Decimal128,
                trim: true
            }*/
        }
}))

const validateFarmData = (farm) => {

    const schema = Joi.object({
        farmName: Joi.string().required(),
        data: Joi.array(),/*[{
            farmName: Joi.string().required(),
            datetime: Joi.date().required(),
            sensorType: Joi.string(),
            metricValue: Joi.number()
        }]*/
    })

    return schema.validate(farm)
}

exports.Farm = farmSchema
exports.validate = validateFarmData
