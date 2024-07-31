const express = require('express');
const router = express.Router();
const Doctor=require('../models/Doctor')
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {authenticte, authorize, authorizeAll} = require("../middleware/Auth");
const {ObjectId} = require("mongodb");

router.post('/addDoctor',authenticte,authorize('admin'),async (req,res,next)=>{
  try {
      const { name,email,password,role,age } = req.body;
      const salt = await bcrypt.genSalt(10);
      const doctorPassword=await bcrypt.hash(password,salt);
      const userAvailable=await Doctor.findOne({email})
      if(userAvailable){
          const err=new Error('User already registered')
          err.status = 'fail';
          err.statusCode=400
          next(err)
      }
      const newUser = await Doctor.create({
          name: name,
          email: email,
          password:doctorPassword,
          role:role,
          age:age
      })
      console.log(newUser)
      res.status(201).json(newUser)
  }catch (e) {
      console.log(e);
  }
})

router.get('/showDoctor',authenticte,authorize('admin'),async (req, res) => {
    try {
        const doctorCollection = mongoose.connection.db.collection('doctors');
        const savedDoctors = await doctorCollection.find({}).toArray();
        res.status(200).json({savedDoctors});
    } catch (e) {
        console.error(e);
        res.status(500).json({error: 'An error occurred while fetching doctors'});
    }
})
router.delete('/deleteDoctor/:id',authenticte,authorize('admin'),async (req,res)=>{
    try {
        const doctorId = req.params.id;
        const findToDelete = await Doctor.findById(doctorId);
        const detUser=await Doctor.deleteOne(findToDelete)
        res.status(200).json({detUser})
    }catch (e) {
        console.log(e)
    }
})

router.put('/editDoctor/:id', authenticte, authorizeAll('admin', 'doctor'), async (req, res, next) => {
    try {
        const doctorId = req.params.id;
        const { name, email, password, age, role } = req.body;

        let updateFields = { name, email, age, role };
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateFields.password = await bcrypt.hash(password, salt);
        }

        const updatedDoctor = await Doctor.findOneAndUpdate(
            { _id: new ObjectId(doctorId) },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedDoctor) {
            return res.status(404).json({ status: 'fail', message: 'Doctor not found' });
        }

        res.status(200).json({ status: 'success', message: 'Doctor successfully edited', data: updatedDoctor });
    } catch (e) {
        next(e);
    }
});

router.post('/login',async(req, res,next) => {
    try {
        const {email,password} = req.body;

        const doctor = await Doctor.findOne({email});
        if (!doctor) {
            const err=new Error('Please provide correct credentials to enter')
            err.status = 'fail';
            err.statusCode=400
            next(err)
            // return res.status(400).json({ errors: "Please provide correct credentials" });
        }
        let comparePass =await bcrypt.compare(password, doctor.password)
        if (!comparePass) {
            const err=new Error('Please provide correct credentials to enter')
            err.status = 'fail';
            err.statusCode=400
            next(err)
            // return res.status(400).json({ errors: "Please provide correct credentials" });
        }

        if(doctor && comparePass){

            return res.status(200).json({
                message:"Successfully logged in",
                token:await doctor.generateToken(),
                id:doctor._id.toString()});

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
module.exports=router

