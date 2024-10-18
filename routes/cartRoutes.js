const express = require("express")
const {body} = require("express-validator")

const {addToCart, getAllItems, updateCartItem, deleteCartItem} = require("../contollers/cartController")
const {protect} = require("../contollers/authController")

const router = express.Router()

router.use(protect)

router.route("/").get(getAllItems).post(
  [
    body("owner").notEmpty().withMessage('A cart must have an owner'),
    body("products").isArray({min: 1}).withMessage('product array must contain the productId and the quantity')
  ], addToCart
).put(
    [
    body("quantity").notEmpty().withMessage('A cart item  must have a quantity'),
    body("productId").notEmpty().withMessage('A cart item must have a productId'),
  ], updateCartItem

).delete(
      [
    body("productId").notEmpty().withMessage('A cart item must have a productId'),
  ], deleteCartItem

)

module.exports = router
