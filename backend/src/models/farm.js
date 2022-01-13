const mongoose = require("mongoose")

const farmSchema = mongoose.Schema({
    farmName: {
        type: String,
        required: true,
    },
    data: [
        {
            farmName: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                required: true,
            },
            metricType: {
                type: String,
            },
            metricValue: {
                type: mongoose.Decimal128,
                trim: true
            }
        }
    ]

})

const Farm = mongoose.model('Farm', farmSchema)

module.exports = Farm