const Joi = require('joi')
const fs = require('fs')
const express = require('express')
const path = require("path");
// const router = express().Router
const app=express()
let patientFile=null
let doctorFile=null

fs.readFile('PatientProfile.json', 'utf8', (err, data) => {
    if(err) {
        console.error('Error reading PatientProfile.json:', err);
        return;
    }
    const jsonConvered=JSON.parse(data)
    patientFile = jsonConvered;
});

// Read the doctor data file
fs.readFile('DoctorProfile.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading DoctorProfile.json:', err);
        return;
    }
    doctorFile = data;
});
const patientSchema=Joi.array().items(
    Joi.object({
        firstName: Joi.string().required(),
    })
)
app.get('/patient',(req,res)=>{
    res.send(patientFile)
})
app.get('/dataFile',(req,res)=>{
   res.sendFile(path.join('PatientProfile.json'))
})

const port=3000
app.listen(port, ()=>{
    console.log("Server is running on port " + port)
})