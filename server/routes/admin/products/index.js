const express = require("express")
const { uploadImageHandler, addProductHandler, fetchAllProducts, deleteProduct, editProduct} = require("../../../controllers/admin/products/")
const { upload } = require("../../../config/cloudinary")


const router = express.Router()

router.post('/upload-image',upload.single('my-file'),uploadImageHandler);
router.post('/add',addProductHandler);
router.get('/get',fetchAllProducts);
router.delete('/delete/:id',deleteProduct);
router.patch('/update/:id',editProduct);
module.exports = router