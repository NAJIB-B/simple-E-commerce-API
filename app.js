const express = require("express")
const path = require("path")


const userRouter = require("./routes/userRoutes")
const productRouter = require("./routes/productRoutes")
const cartRouter = require("./routes/cartRoutes")
const paymentRouter = require("./routes/paymentRoutes")
const viewRouter = require("./routes/viewRoutes")
const AppError = require("./utils/appError")


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))


app.use("/api/v1/user", userRouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/payment", paymentRouter)
app.use("/", viewRouter)


app.all("*", (req, res, next) => {
  return next(new AppError("Not found please check the url and try again", 404))
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.statusCode).json({
    message: err.message,
    status: err.status,
    stack: err.stack
  })
})


module.exports = app

