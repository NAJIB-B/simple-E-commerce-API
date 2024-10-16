const express = require("express")
const {body} = require("express-validator")


const {createUser, loginUser} = require("../contollers/userController")



const router = express.Router()


router.post("/signup", 
  [
    body("name").notEmpty().withMessage(" A user must have a name"),
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("A user must have a valid email"),
    body("password")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage(
        "A user must have a password. with a minimum of 8 characters",
      ),
    body("confirmPassword")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage(
        "A user must confirm password. with a minimum of 8 characters",
      ),
  ],
createUser
)

router.post("/login", 
[
  
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("A user must have a valid email"),
    body("password")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage(
        "A user must have a password. with a minimum of 8 characters",
      )
]
,loginUser
)


module.exports = router
