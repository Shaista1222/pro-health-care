const express = require('express');
const app = express();
// const Register=require('./Register');
const port = process.env.PORT || 3000;
const dbConnection = require('./mongoose');
const User = require("./models/User");

dbConnection()
//express.json() middleware to your Express app. This middleware will parse incoming requests with JSON payloads.
app.use(express.json())
app.post('/Register', async(req, res) => {
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

app.post('/login',async(req, res) => {
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
// app.use('/Register',Register);

app.listen(port,()=>{
    console.log("Server running on port " + port);
})