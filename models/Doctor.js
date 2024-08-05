const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const doctorsSchema = mongoose.Schema({
    patient_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient'
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
      type:String,
      required: true,
    },
    role:{
        type:String,
        enum:['doctor','admin'],
        default: 'user',
    },
    age:{
        type: Number,
        required: true,
    }
})
doctorsSchema.methods.generateToken=function async (){
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
const doctor = mongoose.model('Doctor',doctorsSchema);
module.exports=doctor