const http=require('http')
const fs = require("fs");

const server=http.createServer((req,res)=>{
    fs.readFile('PatientProfile.json', (err, patData) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
            return;
        }
        const parsePatientData= JSON.parse(patData);

        fs.readFile('DoctorProfile.json', (err, docData) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
                return;
            }

            const parseDoctorData= JSON.parse(docData);
           //  console.log(parseToJson)
            // res.end(data)
            if(req.url==='/'){
                res.writeHead(200, { 'Content-Type': 'text/html' });
            }
            else if(req.url==='/Doctor'){
                res.writeHead(200, { 'Content-Type': 'text/html' });
                // res.end('<h1>Doctor Data</h1>');
                res.end(docData)

            }else if(req.url==='/Patient'){
                res.writeHead(200, { 'Content-Type': 'text/html' });
                // res.end('<h1>Patient Data</h1>');
                res.end(patData)
            }else{
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>Page not found</h1>');
            }
        })
    });
    // })
})

const port=3000
server.listen(port,()=>{
    console.log(`Server listening on port ${port}`)
})