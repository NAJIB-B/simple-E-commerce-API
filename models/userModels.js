const mongoose = require("mongoose")
const bycrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name']
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: [true, 'This email is already in use'],
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    min: [8, 'Password must be above 7 characters'],
    select: false
  }
})


userSchema.pre('save', async function (next) {
  this.password = await bycrypt.hash(this.password, 10)

  next()
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bycrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema)

module.exports = User 
