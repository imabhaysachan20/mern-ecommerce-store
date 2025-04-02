const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs')
const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        trim:true,
        minLength:[3,'username cant be smaller than 3 letters'],
        maxLength:[50,'username must be smaller than 50 letters']
    },
    email: {
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        match:[/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type:String,
        trim:true,
        required:true,
        minLength:[8,'password must be atleast 8 letters long']
    },
    role: {
        type:String,
        enum:["user","admin"],
        default:"user",
    }

},{timestamps:true})


userSchema.pre('save',async function(next){
    if (!this.isModified('password')) return next();
    const salt = await bcryptjs.genSalt(12);
    this.password = await bcryptjs.hash(this.password,salt);
    
    next();
})

userSchema.methods.comparePassword = async function (enteredPassword){
    
    const valid = await bcryptjs.compare(enteredPassword,this.password);
    return valid;
}

const User = mongoose.model('User',userSchema)
module.exports = User;