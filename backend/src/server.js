const cors = require("cors")
const express = require("express")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const userRoutes = require("./routes/users")
const farmRoutes = require("./routes/farms")
const bodyParser = require("body-parser")

const PORT = process.env.PORT || 8081;
const app = express()
app.use(cors())

app.use(bodyParser.json({extended: false}))
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', userRoutes);
app.use('/farms', farmRoutes)

app.get("/", (req, res) => {
    res.send("King of all routes")
})

app.get("*", (req, res) => {
    res.send("This route doesn't exist!")
})


mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Succesfully connected to MongoDB")
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    })
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })