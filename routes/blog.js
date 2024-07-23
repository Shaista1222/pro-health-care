const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../PatientProfile.json');
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(500).send('Error occurred while sending the file.');
        }
    });
});
module.exports=router
