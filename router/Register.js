const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/Register', async(req, res) => {
    try {

        const { name,email,password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hasedPass=await bcrypt.hash(password,salt);
        const userAvailable=await User.findOne({email})
        if(userAvailable){
            res.send({message:"User already registered"})
        }else {
            const newUser = await User.create({
                name: name,
                email: email,
                password: hasedPass
            })
            // const saved= await newUser.save();
            res.json({success: true, User: newUser});
            console.log("Successfully registered")
        }
    }catch (e) {
        console.error(e);
        res.json({ success: false });
    }
})
router.post('/login',async(req, res) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email});
        let comparePass = bcrypt.compare(password, user.password)
        if (!comparePass) {
            return res.status(400).json({ errors: "Please provide correct crendials" });
        }
        if(user && comparePass){
            res.send("Welcome")
        }else res.send("Wrong email or password");
    }catch (e) {
        console.error(e);
    }
})

module.exports=router