const router = require("express").Router()
const farmController = require("../controllers/farmController")

router.post("/create-farm", farmController.createFarm)
router.get("/", farmController.getAllData)

module.exports = router