const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const crypto = require("crypto")

const User = require("../models/userModels");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendMail = require("../utils/email");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, res, statusCode) => {

  user.password = undefined;
  const token = signToken(user._id);

  res.status(statusCode).json({
    message: "success",
    token,
    user,
  });
}

exports.createUser = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new AppError(errors, 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new AppError("Password and confirmPassword has to the same", 400),
    );
  }

  const body = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const user = await User.create(body);

  createAndSendToken(user, res, 201)

});

exports.loginUser = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new AppError(errors, 400));
  }

  const user = await User.findOne({ email: req.body.email }).select(
    "+password",
  );

  if (
    !user ||
    !(await user.correctPassword(req.body.password, user.password))
  ) {
    return next(new AppError("email or password is not correct", 401));
  }


  createAndSendToken(user, res, 200)
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  if (!req.body.email) {
    return next(new AppError("Please provide an email address", 400));
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("No user found with this email", 404));
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/user/resetPassword/${resetToken}`;

  const message = `This email was sent to you because you forgot your password and you requested a change. 
    If you didn't request to change your password, just ignore this mail. This is the link to reset your password ${resetUrl}`;

  try {
    await sendMail({
      email: user.email,
      subject: "Password reset token (valid for 10min)",
      text: message,
    });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.passwordResetExpiresIn = undefined;

    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "There was an error sending the email. Try again later",
        500,
      ),
    );
  }

  res.status(200).json({
    status: "success",
    message: "Reset token sent to email successfully",
  });
});


exports.resetPassword = catchAsync(async(req, res, next) => {

  const resetToken = req.params.token

  if (!resetToken) {
    return next(new AppError('The reset Token in the url is missing', 400))
  }

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new AppError(errors, 400))
  }


  if (req.body.password !== req.body.confirmPassword) {

    return next(new AppError('password and confirm password should be the same', 400))
  }


  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  const user = await User.findOne({
    passwordResetToken : hashedToken,
    passwordResetExpiresIn: {$gt: Date.now()}
  })

  if (!user) {
    return next(new AppError("This token is invalid or expired", 404))
  }

  user.password = req.body.password
  user.passwordResetToken = undefined
  user.passwordResetExpiresIn = undefined

  await user.save()


  createAndSendToken(user, res, 200)

})


exports.updatePassword = catchAsync(async(req, res, next) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new AppError(errors, 400))
  }
  
  if (req.body.newPassword !== req.body.confirmNewPassword) {

    return next(new AppError('New password and confirm new password should be the same', 400))
  }

  const user = await User.findById(req.user._id).select('+password')

  const correctPassword = user.correctPassword(req.body.currentPassword, user.password)

  if (!correctPassword) {
    return next(new AppError("Your current password is wrong", 401))
  }

  user.password = req.body.newPassword
  await user.save()


  createAndSendToken(user, res, 201)


})
