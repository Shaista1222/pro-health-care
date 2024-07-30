const express = require('express');
const router = express.Router();
const Doctor=require('../models/Doctor')
const mongoose = require("mongoose");
// const {authorize, authenticte} = require("../middleware/Auth");

router.post('/addDoctor',async (req,res,next)=>{
  try {
      const { name,email,role,age } = req.body;
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
          role:role,
          age:age
      })
      console.log(newUser)
      res.status(201).json(newUser)
  }catch (e) {
      console.log(e);
  }
})

router.get('/showDoctor',async (req, res) => {
    try {
        const doctorCollection = mongoose.connection.db.collection('doctors');
        const savedDoctors = await doctorCollection.find({}).toArray();
        res.status(200).json({savedDoctors});
    } catch (e) {
        console.error(e);
        res.status(500).json({error: 'An error occurred while fetching doctors'});
    }
})
router.delete('/deleteDoctor/:id',async (req,res)=>{
    try {
        const doctorId = req.params.id;
        const findToDelete = await Doctor.findById(doctorId);
        const detUser=await Doctor.deleteOne(findToDelete)
        res.status(200).json({detUser})
    }catch (e) {
        console.log(e)
    }
})

module.exports=router

