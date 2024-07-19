const http = require('http');
const fs = require("fs");

let patientData = null;
let doctorData = null;

// Read the patient data file
fs.readFile('PatientProfile.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading PatientProfile.json:', err);
        return;
    }
    patientData = data;
});

// Read the doctor data file
fs.readFile('DoctorProfile.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading DoctorProfile.json:', err);
        return;
    }
    doctorData = data;
});

const server = http.createServer((req, res) => {
    if (!patientData || !doctorData) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Data not loaded yet, please try again later.');
        return;
    }

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to the Health Data Server</h1>');
    } else if (req.url === '/Doctor') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(doctorData);
    } else if (req.url === '/Patient') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(patientData);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Page not found</h1>');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
