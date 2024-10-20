const express = require("express")
const {body} = require("express-validator")


const {createUser, loginUser, forgotPassword, resetPassword, updatePassword} = require("../contollers/userController")

const {protect} = require("../contollers/authController")



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

router.post("/forgotPassword", forgotPassword)

router.post("/resetPassword/:token",[

    body("password")
      .notEmpty()
      .withMessage(
        "Please provide your new password",
      ),
    body("confirmPassword")
      .notEmpty()
      .withMessage(
        "Please confirm your new password ",
      ),
] ,resetPassword)


router.post("/updatePassword",protect, [

    body("currentPassword")
      .notEmpty()
      .withMessage(
        "Please provide your current password",
      ),
    body("newPassword")
      .notEmpty()
      .withMessage(
        "Please provide your new password",
      ),
    body("confirmNewPassword")
      .notEmpty()
      .withMessage(
        "Please confirm your new password ",
      ),
], updatePassword)
module.exports = router
