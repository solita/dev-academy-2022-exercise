const router = require("express").Router()

const userController = require("../controllers/userController")

router.get("/login", userController.login)
router.post("/signup", userController.createUser)
/* 
TO-DO
update user
delete user
create user
login user
*/

module.exports = router