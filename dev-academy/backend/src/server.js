const cors = require("cors")
const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
dotenv.config()
const userRoutes = require("./routes/users")
const farmRoutes = require("./routes/farms")

const PORT = process.env.PORT || 3000;
const app = express()

app.use('/', userRoutes);
app.use('/farms', farmRoutes)

app.get("/", (req, res) => {
    res.send("King of all routes")
})

app.get("*", (req, res) => {
    res.send("This route doesn't exist!")
})

app.use(cors())


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