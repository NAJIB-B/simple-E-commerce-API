const express = require("express")

const {getSuccessPage, getOverview, getCancelPage} = require("../contollers/viewController")


const router = express.Router()



router.get("/", getOverview)

router.get("/success", getSuccessPage)
router.get("/cancel", getCancelPage)


module.exports = router

