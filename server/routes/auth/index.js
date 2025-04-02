const express = require('express')
const router = express.Router();
const {registerController,loginControllers,authMiddleware,logoutController} = require("../../controllers/auth/index")
router.post("/register",registerController)
router.post("/login",loginControllers);
router.post("/logout",logoutController)
router.get("/checkauth",authMiddleware,(req,res)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        message:'Authorization Successful',
        user
    })
});


module.exports = router