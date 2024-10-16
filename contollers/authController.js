const jwt = require("jsonwebtoken")

const {promisify} = require("util")

const User = require("../models/userModels")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")


exports.protect = catchAsync(async(req, res, next) => {
  let token
  if (req.headers.authorization && (req.headers.authorization).startsWith('Bearer')) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) {
    return next(new AppError('You are not logged in, please login to access this route', 401))
  }
  
const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  const user = await User.findById(decoded.id)

  if (!user) {
    return next(new AppError('The user that owns this token no longer exits', 401))
  }


  req.user = user
  next()
})
