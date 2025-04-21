const {userSignUpSchema,userLoginSchema} = require('../../utils/validators/index')
const jwt = require("jsonwebtoken")
const User = require("../../models/user")

const registerController = async (req,res,next) =>{
    
    const {error,value} = userSignUpSchema.validate(req.body);
    if (error) {
        
        return res.status(400).json({success:false,message:error.details.map((err)=>{return err.message}).join(' ')})
    }
    const {email,username,password} = value;
    const user = await User.findOne({email});
    if (user) {
        return res.status(400).json({
            success:false,
            message:"User Already Exists!"
        })
    }
    try {
    const newUser = new User({
        email,
        password,
        username
    })
    await newUser.save();
    res.status(200).json({success:true,message:"UserCreated"})
}
catch(err) {
    console.log(err)
    return res.status(500).json({message:"something went wrong"});
}
}

const loginControllers = async(req,res,next)=>{
    const {error,value} = userLoginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({success:false,message:error.details.map((err)=>{return err.message}).join(' ')})
    }
    const {email,password} = value;
    const user = await User.findOne({email});
    if (!user) {
        return res.status(400).json({
            success:false,
            message:"User Does Not Exist!"
        })
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
        return res.status(400).json({
            success:false,
            message:"Invalid Password"
        })
    }
        const token = jwt.sign({
            username:user.username,
            email:user.email,
            role:user.role,
            userName:user.username
        },process.env.JWT_SECRET,{expiresIn:'30m'})

        return res.cookie("token",token,{httpOnly:true,secure:false,expires: new Date(Date.now() + 24 * 60 * 60 * 1000)}).json({success:true,
            user:{
                email:user.email,
                role:user.role
            }})
}

const logoutController = async(req,res)=>{
    return res.clearCookie('token').json({
        success:true,
        message:"Logged out successfully"
    });
}


const authMiddleware = async(req,res,next)=>{
    console.log("hitted")
    const token = req.cookies.token;
    if (!token) return res.status(401).json({
        success:false,
        message:"Unauthorised User"
    })
    try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = decoded;
    next();
    }
    catch(err) {
        res.status(401).json({
            success:false,
            message:"Unauthorized user!",
            
        });
    }
}

module.exports  ={registerController,loginControllers,authMiddleware,logoutController}