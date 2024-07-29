const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../middleware/Auth');

router.post('/Register', async(req, res) => {
    try {

        const { name,email,password,role } = req.body;
        const salt = await bcrypt.genSalt(10);
        const userPassword=await bcrypt.hash(password,salt);
        const userAvailable=await User.findOne({email})
        if(userAvailable){
            res.send({message:"User already registered"})
        }else {
            const newUser = await User.create({
                name: name,
                email: email,
                password: userPassword,
                role:role
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
router.post('/login',async(req, res,next) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if (!user) {
            const err=new Error('Please provide correct credentials to enter')
            err.status = 'fail';
            err.statusCode=400
            next(err)
           // return res.status(400).json({ errors: "Please provide correct credentials" });
        }
        let comparePass =await bcrypt.compare(password, user.password)
        if (!comparePass) {
            const err=new Error('Please provide correct credentials to enter')
            err.status = 'fail';
            err.statusCode=400
            next(err)
            // return res.status(400).json({ errors: "Please provide correct credentials" });
        }

        if(user && comparePass){

           return res.status(200).json({
                message:"Successfully logged in",
                token:await user.generateToken(),
                id:user._id.toString()});

        }else res.send("Wrong email or password");
    }catch (e) {
        console.error(e);
    }
})
router.get('/protected', auth, (req, res) => {
    res.json({ msg: 'This is a protected route' });
});

module.exports=router