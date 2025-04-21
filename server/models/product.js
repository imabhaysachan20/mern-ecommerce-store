const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    salePrice:{
        type:Number,
        required:true
    },
    totalStock:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


module.exports = mongoose.models.Product || mongoose.model('Product',productSchema)