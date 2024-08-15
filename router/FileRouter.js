const express = require('express');
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const AWS=require('aws-sdk')
require('dotenv').config();
const uploads = multer();

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
// reading file from asw s3 bucket
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

function uploadToS3(file, callback) {

    const params = {
        Bucket: 'dev-s3-bucket-yt',
        Key: 'thumbnails/' + file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    s3.upload(params)
        .on('httpUploadProgress', function(evt) {
            console.log(`Progress: ${evt.loaded} of ${evt.total} bytes`);
        })
        .send(function(err, data) {
            if (err) {
                console.error('Error uploading to S3:', err);
                callback(err, null);
            } else {
                console.log('Successfully uploaded to S3:', data);
                callback(null, data);
            }
        });
}

router.post('/uploadOnS3', uploads.single('file'), (req, res) => {

    if (!req.file) {
        return res.status(400).send('No file received');
    }
    uploadToS3(req.file, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error uploading file', error: err.message });
        }
        res.status(200).json({ message: 'File uploaded successfully', data });
    });
});

function generatePresignedUrl(bucketName, key, expiresInSeconds) {

    const params = {
        Bucket: bucketName,
        Key: key,
        Expires: expiresInSeconds
    };

    const url = s3.getSignedUrl('getObject', params);

    return url;
}

// Usage example
const bucketName = 'dev-s3-bucket-yt';
const fileKey = 'thumbnails/FS_Task.txt'
const expirationTime = 60 * 5;

const presignedUrl = generatePresignedUrl(bucketName, fileKey, expirationTime);
console.log('Pre-signed URL:', presignedUrl);

module.exports=router