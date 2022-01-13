const router = require("express").Router()

const userController = require("../controllers/userController")

router.post("/login", userController.login)
router.post("/signup", userController.createUser)
router.get("/users", userController.getUsers)
/* 
TO-DO
update user
delete user
*/

module.exports = router