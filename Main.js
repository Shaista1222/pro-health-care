// const express = require('express');
// const app = express();
// const Register=require('./router/Register');
// const DoctorRouter = require('./router/DoctorRouter');
// const PatientRouter = require('./router/PatientRouter');
// const Auth=require('./middleware/Auth');
// require('dotenv').config();
// const port = process.env.PORT || 3000;
// const dbConnection = require('./Mongoose');
// const logger=require('./middleware/Logger');
// dbConnection()
// // //express.json() middleware to your Express app. This middleware will parse incoming requests with JSON payloads.
// // app.use(express.json())
// app.use(express.urlencoded({extended:false}))
// app.use('/api',Register);
// app.use('/doctor',DoctorRouter)
// app.use('/patient',PatientRouter)
// // app.use(express.urlencoded({limit: '5mb'}))
//
// app.use((error, req, res, next)=>{
//     error.statusCode=error.statusCode||500;
//     error.status=error.status||'error'
//     res.status(error.statusCode).json({
//         message: error.message,
//         status: error.statusCode,
//     })
// })
//
// app.listen(port,()=>{
//     console.log("Server running on port " + port);
// })

const AWS=require('aws-sdk')
// require('aws-sdk/lib/maintenance_mode_message').suppress = true;

require('dotenv').config();
AWS.config.update({ region: 'eu-north-1' });
let s3 = new AWS.S3();
let params = {Bucket: 'dev-s3-bucket-yt', Key: 'thumbnails/Error.txt'}
// let s3file = s3.getObject(params)

s3.getObject(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else{
      const fileContnent= data.Body.toString()
        console.log(fileContnent)
    }
});

