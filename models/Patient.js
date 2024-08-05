const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const patientSchema = mongoose.Schema({
    doctor_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
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
      type: String,
      required: true,
    },
    age:{
        type: Number,
        required: true,
    }

})
patientSchema.methods.generateToken=function async (){
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
const Patient = mongoose.model('Patient',patientSchema);
module.exports=Patient