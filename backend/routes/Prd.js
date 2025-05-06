const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require("../controllers/productControllers.js");

//@Get all products from db
//@route GET /api/products
//@access Public
router.get("/", getAllProducts);

//@Get a product by ID from db
//@route GET /api/products/:id
//@access Public
router.get("/:id", getProductById);

module.exports = router;
