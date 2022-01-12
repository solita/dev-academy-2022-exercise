const router = require("express").Router()
const farmController = require("../controllers/farmController")

router.get("/", farmController.getFarm)

module.exports = router