const express = require("express")
const {body} = require("express-validator")

const {processPayment} = require("../contollers/paymentController")

const router = express.Router()

router.post("/makePayment",

    [
    body("quantity").notEmpty().withMessage('Payment must have quantity'),
    body("productId").notEmpty().withMessage('Payment must have productId'),
  ], processPayment
)


module.exports = router
