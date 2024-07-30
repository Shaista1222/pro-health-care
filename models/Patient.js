const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
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
const Patient = mongoose.model('Patient',patientSchema);
module.exports=Patient