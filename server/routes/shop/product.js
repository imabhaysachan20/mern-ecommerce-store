const express = require("express");
const { getFilteredProducts, getProductDetails } = require("../../controllers/product/product");

const router = express.Router();

router.get('/products/get',getFilteredProducts);
router.get('/products/get/:id',getProductDetails);


module.exports = router