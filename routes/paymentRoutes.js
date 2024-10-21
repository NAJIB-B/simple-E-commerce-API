const express = require("express")
const {body} = require("express-validator")

const {processPayment, getAllPayment} = require("../contollers/paymentController")
const {protect} = require("../contollers/authController")

const router = express.Router()

router.post("/makePayment",

    [
    body("quantity").notEmpty().withMessage('Payment must have quantity'),
    body("productId").notEmpty().withMessage('Payment must have productId'),
    body("email").notEmpty().isEmail().withMessage('Payment must have customer email'),
  ], processPayment
)

router.get("/", getAllPayment)


module.exports = router
