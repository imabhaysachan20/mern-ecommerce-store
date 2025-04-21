
const Product = require("../../models/product")
const getFilteredProducts = async(req,res)=>{
    try {
        const {category=[],brand=[],sortBy="price-lowtohigh"} = req.query;
        let filters = {};
        if (category.length) {
            filters.category={$in:category.split(',')};
        }
        if (brand.length) {
            filters.brand = {$in:brand.split(',')}
        }
        
        let sort = {};
       console.log(filters)
        switch (sortBy) {
            case 'price-hightolow':
                sort.price=-1
                break
            case 'price-lowtohigh':
                sort.price = 1;
                break;
            case 'title-atoz':
                sort.title = 1;
                break;
            case 'title-ztoa':
                sort.title = -1;
                break;
            default:
                sort.price=1;
        }
    const result = await Product.find(filters).sort(sort);
    
    return res.status(200).json({
        success:true,
        data:result
    })
    }
    catch(e) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}
const getProductDetails = async(req,res)=>{
    try {
    const {id} = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({
            sucess:false,
            message:"Product not find"
        })
    }
    res.status(200).json({
        success: true,
        data: product,
      });

    }
    catch(e) {
        console.log(e)
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

module.exports = {getFilteredProducts,getProductDetails}