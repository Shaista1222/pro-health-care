const fs=require('fs');
//
const patientData=[
    { firstName: 'John', lastName: 'Doe', gender: 'Male', dob: '1990-01-01', phoneNumber: '1234567890', address: '123 Main St' },
    { firstName: 'marie', lastName: 'Doe', gender: 'Male', dob: '1990-01-01', phoneNumber: '1234567890', address: '123 Main St' },
    { firstName: 'selena', lastName: 'gombez', gender: 'Male', dob: '1990-01-01', phoneNumber: '1234567890', address: '123 Main St' },
    { firstName: 'zain', lastName: 'malik', gender: 'Male', dob: '1990-01-01', phoneNumber: '1234567890', address: '123 Main St' },
]
const doctorData=[
    { firstName: 'Alice', lastName: 'Smith', gender: 'Female', dob: '1980-04-04', phoneNumber: '2222222222', address: '321 Pine St', specialties: ['Cardiology', 'Internal Medicine'] },
    { firstName: 'Alice', lastName: 'Smith', gender: 'Female', dob: '1980-04-04', phoneNumber: '2222222222', address: '321 Pine St', specialties: ['Cardiology', 'Internal Medicine'] },
    { firstName: 'Alice', lastName: 'Smith', gender: 'Female', dob: '1980-04-04', phoneNumber: '2222222222', address: '321 Pine St', specialties: ['Cardiology', 'Internal Medicine'] },
    { firstName: 'Alice', lastName: 'Smith', gender: 'Female', dob: '1980-04-04', phoneNumber: '2222222222', address: '321 Pine St', specialties: ['Cardiology', 'Internal Medicine'] },
]
//The JSON. stringify() method converts JavaScript objects into strings.
const parsedPatientData=JSON.stringify(patientData)
const parsedDoctorData=JSON.stringify(doctorData)

// fs.writeFile("PatientProfile.json",parsedPatientData,(err)=>{
//     if(err){
//         throw err;
//     }
//     console.log("data")
// })
// fs.writeFile("doctorProfile.json",parsedDoctorData,(err)=>{
//     if(err)
//         throw err;
//     console.log("data saved")
// })

///now read the data
fs.readFile("doctorProfile.json","utf8",(err,data)=>{
    if (err) {
        if (err.code === 'ENOENT') {
            console.error('File not found:', err.path);
        } else {
            console.error('Error reading file:', err);
        }
        return;
    }
    const parseToJson= JSON.parse(data);
    console.log(parseToJson)
    parseToJson.map(item=>{
        console.log(item.firstName);
    })
    // const splitByComma=parseToJson.split(',')
    // for(let i=0;i<splitByComma.length;i++){
    //     console.log(splitByComma[i])

    // }
})
fs.readFile("PatientProfile.json","utf8",(error,datas)=>{
    if (error) {
        if (error.code === 'ENOENT') {
            console.error('File not found:', error.path);
        } else {
            console.error('Error reading file:', error);
        }
        return;
    }
    const parseToJson= JSON.parse(datas);
    console.log(parseToJson)
    parseToJson.map(item=>{
        console.log(item.firstName+' '+item.lastName);

    })
})
        // fs.unlink('doctorProfile.txt', ((err => {
//     if (err) console.log(err);
//     else {
//         console.log("\nDeleted file: example_file.txt");
//     }
// })))
