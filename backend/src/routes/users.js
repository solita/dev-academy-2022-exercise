const router = require("express").Router()
const { check, validationResult} = require("express-validator")

const userController = require("../controllers/userController")

router.post("/login", [
    check("email", "Email must be correctly formated")
    .exists()
    .isEmail()
    .normalizeEmail(),
    check("password", "Password must be minimum 8 characters long")
    .exists()
    .isLength({
        min: 8
    })
], userController.login)

router.post("/signup", [
    check("username", "Username must be longer than 3 characters")
    .exists()
    .isLength({
        min: 3,
        max: 20
    })
    .trim()
    .matches(/^[A-ZÕÄÖÜa-zõäöü]+$/),
    check("email", "Email must be correctly formated")
    .exists()
    .isEmail()
    .normalizeEmail(),
    check("password", "Password must be at least 8 characters long")
    .exists()
    .isLength({
        min: 8
    })
],userController.createUser)

router.get("/users",userController.getUsers)
/* 
TO-DO
update user
delete user
*/

module.exports = router