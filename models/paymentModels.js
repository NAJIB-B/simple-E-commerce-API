const mongoose = require("mongoose")


const paymentSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'A payment object must contain the product id']
  },
  user: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A payment object must contain the user id']
  }
})


const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment
