const mongoose = require("mongoose")
const bycrypt = require("bcrypt")
const crypto = require("crypto")


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
  },
  passwordResetToken: String,
  passwordResetExpiresIn: Date,
})


userSchema.pre('save', async function (next) {

  if (!this.isModified('password')) return next()

  this.password = await bycrypt.hash(this.password, 10)

  next()
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bycrypt.compare(candidatePassword, userPassword)
}


userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  this.passwordResetExpiresIn = Date.now() + 10 * 60 * 1000

  return resetToken
}

const User = mongoose.model('User', userSchema)

module.exports = User 
