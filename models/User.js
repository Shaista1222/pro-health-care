const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        // minLength:3,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default: 'user',
    }
})
userSchema.methods.generateToken=function async (){
    try {
         return jwt.sign(
             {
                 id:this._id.toString(),
                 email:this.email,
                 role:this.role
             },
             process.env.JWT_SECRET_KEY,
             {expiresIn: '2d'})

    }catch (e) {
        console.error(e);
    }
}
const userModel=mongoose.model('User',userSchema)
module.exports=userModel