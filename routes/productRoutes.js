const express = require("express");
const { body } = require("express-validator");

const {
  getAllProducts,
  addProduct,
  getAProduct,
  updateProduct,
  deleteProduct
} = require("../contollers/productController");

const {protect} = require("../contollers/authController")

const router = express.Router();

router.use(protect)

router
  .route("/")
  .get(getAllProducts)
  .post(
    [
      body("name").notEmpty().withMessage("A product must have a name"),
      body("price")
        .notEmpty()
        .isInt()
        .withMessage("A product must have a price"),
      body("quantity")
        .notEmpty()
        .isInt()
        .withMessage("A product must have quantity"),
    ],

    addProduct,
  );

router.route("/:productId").get(getAProduct).patch(updateProduct).delete(deleteProduct)

module.exports = router;
