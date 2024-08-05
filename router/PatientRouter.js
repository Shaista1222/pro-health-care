const express = require('express');
const router = express.Router();
const Patient= require('../models/Patient');
const Doctor=require('../models/Doctor');
const bcrypt = require("bcrypt");


router.post('/Register', async(req, res,next) => {
    try {

        const { name,email,password,age } = req.body;
        const salt = await bcrypt.genSalt(10);
        const userPassword=await bcrypt.hash(password,salt);
        const userAvailable=await Patient.findOne({email})
        if(userAvailable){
            const err=new Error('User already registered')
            err.status = 'fail';
            err.statusCode=400
            next(err)
            // res.send({message:"User already registered"})
        }else {
            const newUser = await Patient.create({
                name: name,
                email: email,
                password: userPassword,
                age:age
            })
            // const saved= await newUser.save();
            const err=new Error('Successfully registered.')
            err.status = 'success';
            err.statusCode=200
            next(err)
        }
    }catch (e) {
        console.error(e);
        res.json({ success: false });
    }
})
router.post('/login',async(req, res,next) => {
    try {
        const {email,password} = req.body;

        const patient = await Patient.findOne({email});
        if (!patient) {
            const err=new Error('Please provide correct credentials to enter')
            err.status = 'fail';
            err.statusCode=400
            next(err)
            // return res.status(400).json({ errors: "Please provide correct credentials" });
        }
        let comparePass =await bcrypt.compare(password, patient.password)
        if (!comparePass) {
            const err=new Error('Please provide correct credentials to enter')
            err.status = 'fail';
            err.statusCode=400
            next(err)
            // return res.status(400).json({ errors: "Please provide correct credentials" });
        }

        if(patient && comparePass){

            return res.status(200).json({
                message:"Successfully logged in",
                token:await patient.generateToken(),
                id:patient._id.toString()});

        }else {
            const err=new Error('Wrong email or password')
            err.status = 'fail';
            err.statusCode=400
            next(err)
        }
    }catch (e) {
        console.error(e);
    }
})

router.get('/getPatientAgainstDoctor/:id',async(req, res,next)=>{
    try {

        const doctId=req.params.id;
        console.log("doctor id",doctId)
        const patients = await Patient.find({ doctor_id: doctId });
        console.log('Retrieved Patients:', patients);

        res.status(200).json(patients)

    }catch (e) {
        console.log(e)
        const err = new Error('Server error')
        err.status = 'fail';
        err.statusCode = 500
        next(err)
    }
})
router.post('/addPatientAgainstDoctor',async(req, res,next)=>{
    try {
       const {doctorId, name, email,password, age} = req.body;
       const doctor=await Doctor.findById(doctorId)
        console.log("doctor id",doctor)
        if(!doctor) {
            const err = new Error('Doctor is not valid')
            err.status = 'fail';
            err.statusCode = 400
            next(err)
        }
        const appointment=await Patient.create({
            name,email,age,password,
            doctor_id:doctor._id,
        })
        console.log("appointment", appointment)
        res.status(200).json(appointment)
    }catch (e) {
        console.log(e)
    }
})

router.delete('/deleteAll/:id',async (req,res,next)=>{
    try {
        const doctId=req.params.id;
        console.log("doctor id", doctId);
        const patients = await Patient.find({ doctor_id: doctId });
        console.log('Retrieved Patients:', patients);
        if(!patients){
            const err = new Error('There is no doctor against patient')
            err.status = 'fail';
            err.statusCode = 400
            next(err)
        }
        const deletePatient = await Patient.deleteMany({ doctor_id: doctId });
        res.status(200).json({deletePatient});
    }catch (e) {
        console.log(e)
        res.status(500).json({ error: e.message });
    }
})
//get all doctors with all their patients
router.get('/get',async (req,res,next)=>{
    try {
        const getAll=await Patient.aggregate([
            {
                $lookup:{
                    from:'doctors' +
                        '',
                    localField:'_id',
                    foreignField:'doctor_id',
                    as:'fetch'
                }
            },
            { $project:{
                    name:1,
                    age:1,
                    email:1
                }}
        ])
        if(getAll){
            res.status(200).json(getAll)
        }
        const err= new Error('There is not doctor against patient')
        err.status = 'fail';
        err.statusCode = 400
        next(err)
    }catch (e) {
        console.log(e)
    }

})

module.exports=router