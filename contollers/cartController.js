const {validationResult} = require("express-validator")

const Cart = require("../models/cartModels")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")

const getUpdatedCart = async(owner) => {
  return await Cart.findOne({owner}).populate('products.productId', 'name price')
}


exports.addToCart = catchAsync(async(req, res, next) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new AppError(errors, 400))
  }

  const {productId, quantity} = req.body.products[0]
  if (!productId || !quantity) {
    return next(new AppError("Please specify productId and quantity", 400))
  }

  const owner = req.user._id

  const body = {
    owner,
    products: [ {productId, quantity}] 
  }

  // check if cart exist
  const cart = await Cart.findOne({owner: owner})
  //if the cart don't exist
  if (!cart) {
    const cart = await Cart.create(body)
    return res.status(201).json({
      message: 'Item added to cart successfully',
      cart
    })
  }

  //if the cart already exist, then check if the product already exist

  const productIndex = cart.products.findIndex((product) => product.productId.toString() === productId)

  //if it doesn't exist
  if (productIndex === -1) {
    cart.products.push({productId, quantity})
  } else {

  //if it exist
  cart.products[productIndex].quantity += +quantity
  }
  //save cart
  await cart.save()

  const updatedCart = await getUpdatedCart(owner)

  res.status(201).json({

      message: 'Item added to cart successfully',
      cart: updatedCart
  })
  
})

exports.getAllItems = catchAsync(async(req, res, next) => {
  const owner = req.user._id

  const cart = await getUpdatedCart(owner)

  res.status(200).json({
    message: 'success',
    cart
  })
})


exports.updateCartItem = catchAsync(async(req, res, next) => {
  
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new AppError(errors, 400))
  }
  const {productId, quantity} = req.body
  const owner = req.user._id

  const cart = await Cart.findOne({owner})

  if (!cart) {
    return next(new AppError("This user don't have a cart to update", 404))
  }

  const productIndex = cart.products.findIndex((product) => product.productId.toString() === productId)

  if (productIndex === -1) {

    return next(new AppError("This product is not in your cart", 400))
  }

  cart.products[productIndex].quantity = quantity

  await cart.save()

  const updatedCart = await getUpdatedCart(owner)

  res.status(201).json({

      message: 'Item updated successfully',
      cart: updatedCart
  })



})




exports.deleteCartItem = catchAsync(async(req, res, next) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new AppError(errors, 400))
  }
  const {productId} = req.body
  const owner = req.user._id

  const cart = await Cart.findOne({owner})

  if (!cart) {
    return next(new AppError("This user don't have a cart to delete item from", 404))
  }

  const productIndex = cart.products.findIndex((product) => product.productId.toString() === productId)


  if (productIndex === -1) {

    return next(new AppError("This product is not in your cart", 400))
  }

  cart.products.splice(productIndex, 1)

  await cart.save()



  res.status(204).json({

      message: 'Item deleted successfully',
  })
})
