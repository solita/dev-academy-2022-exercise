const User = require("../models/user")

exports.getUsers = async (req,res) => {
    try{
        const data = await User.find()

        res.status(200).json(data)
    }catch(error){
        res.status(404).json({message: error.message})
    }
}

exports.createUser = async (req,res) => {
    
    const user = req.body

    const newUser = new User(user)

    try{
        await newUser.save()

        res.status(201).json(newUser)
    }catch(error){
        res.status(409).json({message: error.message})
    }
}