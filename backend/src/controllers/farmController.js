const { Farm, validate} = require("../models/farm")

exports.createFarm = async (req, res) => {

    const { error } = validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.message })
    }

    const {
        location,
        datetime,
        sensorType,
        value
    } = req.body;

    try {
        //check if a input data is not repeated since time can never be a duplicate value
        let farm = await Farm.findOne({
            location: location,
            datetime: datetime,
            sensorType: sensorType,
            value: value
         })

        if (farm) {
            return res.status(400).send('Data with the exact time already exists')
        } else {

            const newData = new Farm({
                location,
                datetime,
                sensorType,
                value
            })

            const saveFarm = await newFarm.save()
            if (!saveFarm) throw Error("Error saving farm's data")

            return res.status(201).json({
                message: "Farm data created successfully"
            })
        }
    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
}

exports.getUsers = async (req, res) => {

    try {
        const users = await User.find();

        if (!users) {
            console.log('Sorry, no users to display')
        }


        return res.status(200).send(users).json({
            message: `User found!`
        });

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }

}