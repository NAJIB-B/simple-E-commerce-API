const stripe = require("stripe")(process.env.STRIP_API_KEY)
const {validationResult} = require("express-validator")


const catchAsync = require("../utils/catchAsync")
const User = require("../models/userModels")
const Cart = require("../models/cartModels")
const Payment = require("../models/paymentModels")
const  AppError = require("../utils/appError")
const Product = require("../models/productModels")



const Domain = 'http://127.0.0.1:3000';

exports.processPayment = catchAsync(async(req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new AppError(errors, 400))
  }

  const {productId, quantity, email} = req.body 

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
    customer_email: email,
    client_reference_id: productId,
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

const fulfillCheckout = async(sessionId) => {

  const productId = sessionId.client_reference_id;
  const userEmail = sessionId.customer_email  

  const userId= (await User.findOne({ email: userEmail })).id;


//Add payment to payment history
  const payment = await Payment.create({
    product: productId,
    user: userId
  })
  console.log('payment created')
//delete Item from cart

  const cart = await Cart.findOne({owner: userId})

  const productIndex = cart.products.findIndex((product) => product.productId.toString() === productId)

  if (productIndex === -1) {

    return next(new AppError("This product is not in your cart", 400))
  }

  cart.products.splice(productIndex, 1)

  await cart.save()
  console.log('cart item deleted successfully')



}

exports.webhookCheckout = (req, res, next) => {
  
//  const signature = req.headers['stripe-signature'];

  const payloadString = req.body

// create a signature/header for the event. for testing
  const header = stripe.webhooks.generateTestHeaderString({
  payload: payloadString,
  secret: process.env.STRIPE_WEBHOOK_SECRET

});

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      header,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
   console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {

    fulfillCheckout(event.data.object);
  }

  res.status(200).json({ received: true });
};

exports.getAllPayment = catchAsync(async(req, res, next) => {
  const payments = await Payment.find().populate('product', 'name price').populate('user', 'name email')

  res.status(200).json({
    message: 'success',
    payments
  })
})
