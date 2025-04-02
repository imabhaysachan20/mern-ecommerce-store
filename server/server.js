const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser');
const helmet = require('helmet')
const connectToDB = require('./db/connect')
const cors = require('cors')
const authRouter = require("./routes/auth/index")
const express = require('express');
const app = express();
connectToDB();
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE'],
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

app.listen(PORT,()=>{
    console.log("Server ruuning on port ", PORT)
})
