const express = require("express")

const {getSuccessPage, getOverview, getCancelPage, getProductPage, getLoginPage, getCartPage} = require("../contollers/viewController")


const router = express.Router()



router.get("/", getOverview)

router.get("/success", getSuccessPage)
router.get("/cancel", getCancelPage)
router.get("/product", getProductPage)
router.get("/login", getLoginPage)
router.get("/cart", getCartPage)


module.exports = router

