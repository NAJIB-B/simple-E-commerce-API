const stripe = require("stripe")('sk_test_51LVtx0JLqChSiTdMWVbMBs53P8Fb4Xn5CxoG6RH75yGgJAclARhwm60wqZBPfHHIEN0Ag8x932zHDYteph7WPlnw00MHWbg4mS')
const {validationResult} = require("express-validator")


const catchAsync = require("../utils/catchAsync")
const  AppError = require("../utils/appError")
const Product = require("../models/productModels")



const Domain = 'http://127.0.0.1:3000';

exports.processPayment = catchAsync(async(req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new AppError(errors, 400))
  }

  const {productId, quantity} = req.body 

  const productReq = await Product.findById(productId)
  const priceReq = productReq.price
  
     // Create a product
    const product = await stripe.products.create({
      name: productReq.name,
    });

    // Create a price for the product
    const price = await stripe.prices.create({
      unit_amount: 100 * priceReq, // Amount in cents (e.g., 2000 cents = $20.00)
      currency: 'usd',
      product: product.id, // Link the price to the product
    });


  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: price.id,
        quantity
      }
    ],
    mode: 'payment',
    success_url: `${Domain}/success`,
    cancel_url: `${Domain}/cancel`


  })

  res.redirect(303, session.url);
}) 
