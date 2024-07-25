const express = require('express');
const router = express.Router();
const User = require('./models/User');
const dbConnection = require('./mongoose');

dbConnection()

router.post('/Register', async(req, res) => {
    try {
        const { name,email,password } = req.body;
        const newUser= await User.create({
            name:name,
            email:email,
            password:password
        })
        // const saved= await newUser.save();
        res.json({ success: true, User: newUser });
        console.log("Successfully registered")
    }catch (e) {
        console.error(e);
        res.json({ success: false });
    }
})
router.post('/login',async(req, res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email, password});
        if(user){
            res.send("Welcome")
        }else res.send("Wrong email or password");
    }catch (e) {
        console.error(e);
    }
})

module.exports=router