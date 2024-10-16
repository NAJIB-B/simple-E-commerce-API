const mongoose = require("mongoose")



const cartSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A cart must have an owner']
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'A cart must contain a product']
      },
      quantity: {
        type: Number,
        min: [1, 'Items added to cart must be above 0'],
        required: [true, 'A cart product must have a quantity']
      }
    }
  ]
}, {timestamps: true})


const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
