const express = require('express');
const app = express();
const Register=require('./router/Register');
const DoctorRouter = require('./router/DoctorRouter');
const PatientRouter = require('./router/PatientRouter');
const FileRouter= require('./router/FileRouter');
const Auth=require('./middleware/Auth');
require('dotenv').config();
const port = process.env.PORT || 3000;
const dbConnection = require('./Mongoose');
const logger=require('./middleware/Logger');
dbConnection()
// //express.json() middleware to your Express app. This middleware will parse incoming requests with JSON payloads.
// app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api',Register);
app.use('/doctor',DoctorRouter)
app.use('/patient',PatientRouter)
app.use('/file',FileRouter)
// app.use(express.urlencoded({limit: '5mb'}))

app.use((error, req, res, next)=>{
    error.statusCode=error.statusCode||500;
    error.status=error.status||'error'
    res.status(error.statusCode).json({
        message: error.message,
        status: error.statusCode,
    })
})

app.listen(port,()=>{
    console.log("Server running on port " + port);
})


