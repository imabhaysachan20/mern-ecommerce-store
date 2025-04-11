const {handleImageUpload} = require("../../../config/cloudinary")
const product = require("../../../models/product")
const Product = require("../../../models/product")
const uploadImageHandler = async function (req,res) {
    if (!req?.file) {
        return res.status(400).json({
            success:false,
            message:"no file uploaded"
        })
    }
    console.log(req.file)
    try {
        const base64String = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${base64String}`;
        const data = await handleImageUpload(dataURI);
        return res.json({
            success:true,
            data
        })
    }
    catch(e) {
        console.log(e)
        return res.json({
            success:false,
            error:e,
            message:"there was an error"
        })
    }
}

const addProductHandler = async(req,res)=>{
    try {
        const {image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
    } = req.body;

    const newlyCreatedProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
    })

    await newlyCreatedProduct.save();

    return res.status(201).json({success:true,data:newlyCreatedProduct})

}
    catch (e) {
        console.log(e)
        return res.status(500).json({
            success:false,
            message:"there was an error"
        })
    }
}

const fetchAllProducts = async(req,res)=>{
    try {
     const allProducts = await Product.find({});
     res.status(200).json({
        success:true,
        data:allProducts
     })
    }
    catch (e) {
        return res.status(500).json({
            success:false,
            message:"there was an error"
        })
    }
}

const editProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }
         const {
            image,
                title,
                description,
                category,
                brand,
                price,
                salePrice,
                totalStock,
        } = req.body;

        product.title = title || product.title
        product.description = description || product.description
        product.category = category || product.category
        product.brand = brand || product.brand
        product.price = price || product.price
        product.salePrice = salePrice || product.salePrice
        product.totalStock = totalStock || product.totalStock
        product.image = image || product.image

        await product.save();
        res.status(200).json({
            status:true,
            data:product
        })

    }
    catch (e) {
        return res.status(500).json({
            success:false,
            message:"there was an error"
        })
    }
} 

const deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const product = product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                success:false,
                message:"product not found"
            })
        }
    }
    catch (e) {
        return res.status(500).json({
            success:false,
            message:"there was an error"
        })
    }
} 


module.exports = {uploadImageHandler,addProductHandler,editProduct,deleteProduct,fetchAllProducts};