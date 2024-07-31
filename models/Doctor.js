const mongoose = require('mongoose');

const doctorsSchema = mongoose.Schema({
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
        enum:['doctor','admin','patient'],
        default: 'user',
    },
    age:{
        type: Number,
        required: true,
    }
})
const doctor = mongoose.model('Doctor',doctorsSchema);
module.exports=doctor