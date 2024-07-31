const express = require('express');
const router = express.Router();
const Doctor=require('../models/Doctor')
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {authenticte, authorize, authorizeAll} = require("../middleware/Auth");
const {ObjectId} = require("mongodb");
// const {authorize, authenticte} = require("../middleware/Auth");

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

router.put('/editDoctor/:id',authenticte,authorizeAll('admin','doctor'),async (req,res)=>{
    try {
        const doctorId = req.params.id;
        const { name, email, password, age, role } = req.body;
        const salt = await bcrypt.genSalt(10);
        const doctorPassword=await bcrypt.hash(password,salt);
        const updatedDoctor = await Doctor.findOneAndUpdate(
            { _id: new ObjectId(doctorId) },
            {
                $set: {
                    name: name,
                    email: email,
                    password: doctorPassword,
                    age: age,
                    role: role
                }
            },
               { new: true }
            )
        res.status(200).json({updatedDoctor})
    }catch (e) {
        console.log(e)
    }
})

module.exports=router

