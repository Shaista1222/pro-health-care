const express = require('express');
const router = express.Router();
const Patient= require('../models/Patient');
const Doctor=require('../models/Doctor');
const bcrypt = require("bcrypt");
const joi=require('joi')
const fs = require("fs");
const path = require("path");
const multer=require('multer')
const uploadDir = path.join(__dirname,'../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
router.post('/Register', async(req, res,next) => {
    try {
        const schema=joi.object().keys({
            name:joi.string().required().min(3).max(250),
            email:joi.string().email().required(),
            password:joi.string().required().min(4),
            age:joi.number().required(),
        })
        const { body } = req;
        const { name, email, password, age } = body;
        const { error } = schema.validate(body);

        if (error) {
            return res.status(400).send('Validation failed');
        }
        console.log("successfully registered")
        const salt = await bcrypt.genSalt(10);
        const userPassword=await bcrypt.hash(password,salt);
        const userAvailable=await Patient.findOne({email})
        if (userAvailable) {
            const err = new Error('User already registered');
            err.status = 'fail';
            err.statusCode = 400;
            return next(err);
        } else {
            const newUser = await Patient.create({
                name,
                email,
                password: userPassword,
                age
            });

            return res.status(201).json({
                status: 'success',
                message: 'Successfully registered.',
                user: newUser
            });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
router.post('/login',async(req, res,next) => {
    try {
        const {email,password} = req.body;

        const patient = await Patient.findOne({email});
        if (!patient) {
            const err=new Error('Please provide correct credentials to enter')
            err.status = 'fail';
            err.statusCode=400
            next(err)
            // return res.status(400).json({ errors: "Please provide correct credentials" });
        }
        let comparePass =await bcrypt.compare(password, patient.password)
        if (!comparePass) {
            const err=new Error('Please provide correct credentials to enter')
            err.status = 'fail';
            err.statusCode=400
            next(err)
            // return res.status(400).json({ errors: "Please provide correct credentials" });
        }

        if(patient && comparePass){

            return res.status(200).json({
                message:"Successfully logged in",
                token:await patient.generateToken(),
                id:patient._id.toString()});
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

router.get('/getPatientAgainstDoctor/:id',async(req, res,next)=>{
    try {

        const doctId=req.params.id;
        console.log("doctor id",doctId)
        const patients = await Patient.find({ doctor_id: doctId });
        console.log('Retrieved Patients:', patients);

        res.status(200).json(patients)

    }catch (e) {
        console.log(e)
        const err = new Error('Server error')
        err.status = 'fail';
        err.statusCode = 500
        next(err)
    }
})
router.post('/addPatientAgainstDoctor',async(req, res,next)=>{
    try {
       const {doctorId, name, email,password, age} = req.body;
       const doctor=await Doctor.findById(doctorId)
        console.log("doctor id",doctor)
        if(!doctor) {
            const err = new Error('Doctor is not valid')
            err.status = 'fail';
            err.statusCode = 400
            next(err)
        }
        const appointment=await Patient.create({
            name,email,age,password,
            doctor_id:doctor._id,
        })
        console.log("appointment", appointment)
        res.status(200).json(appointment)
    }catch (e) {
        console.log(e)
    }
})

router.delete('/deleteAll/:id',async (req,res,next)=>{
    try {
        const doctId=req.params.id;
        console.log("doctor id", doctId);
        const patients = await Patient.find({ doctor_id: doctId });
        console.log('Retrieved Patients:', patients);
        if(!patients){
            const err = new Error('There is no doctor against patient')
            err.status = 'fail';
            err.statusCode = 400
            next(err)
        }
        const deletePatient = await Patient.deleteMany({ doctor_id: doctId });
        res.status(200).json({deletePatient});
    }catch (e) {
        console.log(e)
        res.status(500).json({ error: e.message });
    }
})
//get all doctors with all their patients
router.get('/get', async (req, res, next) => {
    try {
        const getAll = await Patient.aggregate([
            {
                $lookup: {
                    from: 'doctors',
                    localField: 'doctor_id',
                    foreignField: '_id',
                    as: 'doctor'
                },
            },
            {
                $project: {
                    name: 1,
                    age: 1,
                    email: 1,
                    doctor: {
                        email: 1,
                        name: 1
                    }
                }
            }
        ]);

        if (getAll && getAll.length > 0) {
            return res.status(200).json(getAll);
        } else {
            const err = new Error('There are no doctors associated with the patients');
            err.status = 'fail';
            err.statusCode = 400;
            return next(err);
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

// router.get('/file',async (req,res,next)=>{
//     try {
//         fs.readFile("file.json","utf8",(error,datas)=>{
//             if (error) {
//                 if (error.code === 'ENOENT') {
//                     console.error('File not found:', error.path);
//                 } else {
//                     console.error('Error reading file:', error);
//                 }
//                 return;
//             }
//             const parseToJson= JSON.parse(datas);
//             res.status(200).json(parseToJson)
//
//         })
//     }catch (e) {
//         console.log(e)
//     }
// })
router.post("/upload", async (req, res) => {

    let data = [];
    req.on("data", (chunk) => {
        data.push(chunk);
    });
    console.log(data)

    req.on("end", () => {
        let fileData = Buffer.concat(data); //joining all the parts pushed to the array in a completely formed
        fs.writeFile(
            'file.json',
            fileData,
            "base64",
            (err) => {
                if (err) {
                    res.statusCode = 500;
                }
            }
        );
    });
});
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

// Create the multer instance
const upload = multer({ storage: storage,limits: {
        fileSize: 1024*1024*5
    } });

router.post('/file' ,upload.single('file'), (req, res,next) => {
    if (req.file) {
        res.json({ message: 'File uploaded successfully!'});
    } else {
        res.json({ message: 'Failed to upload file!' });
    }
});



module.exports=router