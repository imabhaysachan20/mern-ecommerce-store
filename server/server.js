const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser');
const helmet = require('helmet')
const connectToDB = require('./db/connect')
const cors = require('cors')
const authRouter = require("./routes/auth/index")
const adminProductsRouter = require("./routes/admin/products")
const shopproductRouter = require("./routes/shop/product")
const shopcartRouter = require("./routes/shop/cart")

const express = require('express');
const app = express();
connectToDB();

const allowedOrigins = [
    'http://localhost:5173',
    'http://192.168.189.55:5173'
  ];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    methods:['GET','POST','PUT','DELETE','PATCH'],
    allowedHeaders:[
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],
    credentials:true
}))
app.use(helmet());


app.use(cookieParser()) 
app.use(express.json())


const PORT = process.env.PORT || 5000;


app.use("/api/auth",authRouter);
app.use("/api/admin/products",adminProductsRouter);
app.use("/api/shop",shopproductRouter)
app.use("/api/shop/cart",shopcartRouter)
app.listen(PORT,()=>{ 
    console.log("Server ruuning on port ", PORT)
})
