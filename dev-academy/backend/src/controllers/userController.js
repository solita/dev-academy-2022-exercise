const { User, validate } = require("../models/user")
const bcrypt = require("bcryptjs")

exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!user){
            throw Error("An user with this e-mail doesn't exist!")
        //compare passwords
        }else if(!isMatch){
            throw Error("Login information is incorrect!")
        }else{
            res.status(200).json({message: "User logged in!"})
        }

        /* TO-DO
            JWT token signing
        */
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
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

            res.status(201).json({
                message: "User created successfully"
            })
        }
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}