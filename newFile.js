// const express = require('express');
// // const bodyParser = require('body-parser');
// //design API for patient
// const app = express();
//
// // app.use(bodyParser.json());
// // app=express.Router();
// app.get('/patient', (req, res) => {
//     const patient = [
//         { firstName: 'Alice', lastName: 'Smith', gender: 'Female', dob: '1980-04-04', phoneNumber: '2222222222', address: '321 Pine St', specialties: ['Cardiology', 'Internal Medicine'] }
//         ,{ firstName: 'anaya', lastName: 'shu', gender: 'Female', dob: '1990-04-04', phoneNumber: '2222222222', address: '321 Pine St', specialties: ['Cardiology', 'Internal Medicine'] }
//         ,{ firstName: 'john', lastName: 'wan', gender: 'male', dob: '1999-04-04', phoneNumber: '2222222222', address: '321 Pine St', specialties: ['Cardiology', 'Internal Medicine'] }
//         ,{ firstName: 'marrie ', lastName: 'annie', gender: 'Female', dob: '2000-04-04', phoneNumber: '2222222222', address: '321 Pine St', specialties: ['Cardiology', 'Internal Medicine'] }
//     ];
//     const arrayOfRecords=patient.map((value)=>{
//         // const sp=value.specialties.map(val=>{
//         //     console.log(sp)
//         // })
//         console.log(value.firstName,value.lastName)
//     })
//     res.json(patient);
// });
//
// app.post('/patient', (req, res) => {
//     // code to add a new patient...
//     res.json(req.body);
// });
//
// app.put('/patient/:id', (req, res) => {
//     const { id } = req.params;
//     // code to update a patient...
//     res.json(req.body);
// });
//
// app.delete('/patient/:id', (req, res) => {
//     const { id } = req.params;
//     // code to delete a patient...
//     res.json({ deleted: id });
// });
//
// app.listen(3000, () => console.log('server started'));
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    fs.readFile('example.txt', (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(data);
    });
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

console.log("Hello-1")
process.nextTick(()=>{
    console.log("Hello-2")
})
console.log("Hello-3")