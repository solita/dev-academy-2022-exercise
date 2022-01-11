const router = require("express").Router()

const userController = require("../controllers/userController")

router.get("/users", userController.getUsers)
router.get("/create-user", userController.createUser)
/* 
TO-DO
update user
delete user
create user
login user
*/

module.exports = router