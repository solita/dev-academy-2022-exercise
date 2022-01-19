const { Farm, validate } = require("../models/farm")

exports.createFarm = async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.message })
    }

    const {
        farmName,
        data

    } = req.body;

    try {
        //check if a input data is not repeated since time can never be a duplicate value
        let farm = await Farm.findOne({
            farmName: farmName,
        })

        if (farm) {
            return res.status(400).send({ message: 'This farm already exists!' })
        } else {
            const newFarm = new Farm({
                farmName: farmName,
                data: data
            })

            const saveFarm = await newFarm.save()
            if (!saveFarm) throw Error("Error saving a new farm :(")

            return res.status(201).send({
                message: "Farm data created successfully"
            })
        }
    } catch (error) {
        return res.status(409).send({ message: "Critical error: " + error.message })
    }
}

//get all farms
exports.getAllData = async (req, res) => {
    const farms = await Farm.find();

    if (!farms) {
        res.status(400).send({ message: "No farms to display" })
    }
    return res.status(200).send(farms)
}

//fetch one farm's data
exports.getFarmsData = async (req, res) => {
    const {
        id
    } = req.params
    const farm = await Farm.findOne({ _id: id });

    if (!farm) {
        res.status(400).send({ message: "No farms to display" })
    }
    return res.status(200).send(farm)

}

//Append data to db
exports.appendFarmData = async (req, res) => {
    const { id } = req.params


    const body = req.body

    const farm = await Farm.findOneAndUpdate({
        _id: id
    }, {
        $push: {
            data: body
        }
    })

    if (body.length <= 0) {
        return res.status(400).send({ message: "The request body is empty " })
    } else if (!farm) {
        return res.status(400).send({ message: "Couldn't find the specified farm" })
    } else {
        return res.status(200).send({ message: "Successfuly appended the data!" })
    }


}

//Fetch farms by metric type
exports.getBySensorType = async (req, res) => {

    const { id } = req.params

    try {
        /*const body = await Farm.find({
            data: { $elemMatch: {sensorType: "temperature", value: "-8.0" }}
        });*/

        /*const body = await Farm.find({
            _id: id
        }).projection({ item: 1, status: 1, data: {$slice: -1}})

        return res.status(200).json({
            status: "success",
            data: body
        })*/

        /*const body = await Farm.find({
            "data.sensorType": "rainFall",
            "data.value": {
                "$gt": "1"
            }
        }, {"data.location": 0, "data.datetime": 0, "data.sensorType": 0})
        res.status(200).json(body)*/
        const body = await Farm.aggregate([
            {"$unwind": "$data"},
            {"$group": {
                "_id": "rainFall",
                "avgSize": {$avg: "$value"}
            }}
        ])
        res.status(200).json(body)

    } catch (e) {
        return res.status(400).send({ message: "Couldn't find any data" + e })
    }
}

//Fetch farms by month