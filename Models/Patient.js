const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    gender:{
        type: String,
        required: true,
    },
    dob:{
        type: Date,
        required: true,
    },
    phoneNumber:{
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    }

})
const Patient = mongoose.model('Patient',patientSchema);
module.exports=Patient