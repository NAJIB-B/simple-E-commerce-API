const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    unique: [true, 'A product name must be unique']
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price']
  },
  quantity: {
    type: Number,
    required: [true, 'A product must have quantity']
  },
  description: {
    type: String,
  }
})


const Product = mongoose.model('Product', productSchema)

module.exports = Product

