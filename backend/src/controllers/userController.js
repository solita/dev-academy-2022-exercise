const { User, validate } = require("../models/user")
const bcrypt = require("bcryptjs")

exports.login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

        if (!user || user === null) {
            res.status(400).send({message: "An user with this e-mail doesn't exist!"})
            //compare passwords
        } else{
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                res.status(400).send({message: "Login information is incorrect"})
            } else if (isMatch && user != null){
                res.status(200).send({message: "You are logged in!" })
            }
        }

        /* TO-DO
            JWT token signing
        */
}

exports.createUser = async (req, res) => {

    const { error } = validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.message })
    }

    const {
        username,
        email,
        password,
    } = req.body;

    try {
        //check if user with this email already exists
        let user = await User.findOne({ email: email })

        if (user) {
            return res.status(400).send('An user with this email already exists')
        } else {

            //salt the password
            const salt = await bcrypt.genSalt(10);
            if (!salt) throw Error("Something critical happened code-0")
            const hash = await bcrypt.hash(password, salt)
            if (!hash) throw Error("Something critical happened code-1")

            const newUser = new User({
                username,
                email,
                password: hash
            })

            const saveUser = await newUser.save()
            if (!saveUser) throw Error("Error saving user")

            return res.status(201).json({
                message: "User created successfully"
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