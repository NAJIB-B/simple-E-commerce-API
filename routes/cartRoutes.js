const express = require("express")
const {body} = require("express-validator")


const router = express.Router()


router.route("/").get().post(
  [
    body("owner").notEmpty().withMessage('A cart must have an owner'),
    body("products").isArray({min: 1}).withMessage('product array must contain the productId and the quantity')
  ]
).patch().delete()

module.exports = router
