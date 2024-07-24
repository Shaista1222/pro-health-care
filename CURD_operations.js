
const express = require('express')
const app = express();
const dbConnection=require('./mongoose');
const Patient = require('./Models/Patient');
const {ObjectId} = require("mongodb");
//The mongoose. model() function of the mongoose module is used to create a collection of a particular database of MongoDB.
//find().where('pets').all(['dog', 'cat', 'ferret']);
dbConnection().then(()=>{
    console.log("Connected to the database");
}).catch(err=>{console.log(err)})
// Create a new user
async function createUser() {
    try {
        const newUser = new Patient({
            firstName: "John",
            lastName: "Doe",
            gender: "Male",
            dob: "1990-01-01",
            phoneNumber: "1234567890",
            address: "123 Main St"
        });
        const savedUser = await newUser.save();
        console.log('User created:', savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
    }

}
const patientArray=[{
    firstName: "Sohan",
    lastName: "Doe",
    gender: "Male",
    dob: "1990-01-01",
    phoneNumber: "1234567890",
    address: "123 Main St",
    age:45
},{
    firstName: "Zariyan",
    lastName: "Doe",
    gender: "Male",
    dob: "1990-01-01",
    phoneNumber: "1234567890",
    address: "123 Main St",
    age:23
}]
const queries=async () => {
    // await Patient.insertMany(patientArray);
    // const persons =
    //     await Patient.find().where('age').gte(28);
    // console.log(persons);
    // const equality =
    //     await Patient.find().where('age').equals(23);
    // console.log(equality);
    // const findAndUpdate =
    //     await Patient.findOneAndUpdate({age: {$age: 40}},{_id:new ObjectId('66a0e22a525e4824ca1deccd')});
    // console.log("Error in :",findAndUpdate);
    // const replaceOne = await Patient.replaceOne({age: {$gte:5} }, { firstName: 'Zariyan' });
    // console.log("Result:", replaceOne);
    const fetchData=await Patient.find({});
    console.log(fetchData)
    // const query = {
    //     _id: {
    //         $in: [
    //             new ObjectId("66a0e22a525e4824ca1deccc"),
    //             new ObjectId("66a0e22a525e4824ca1deccd")
    //         ]
    //     }
    // };
    // const delmany=await Patient.deleteMany(query)
    // console.log("deleted",delmany)
}

queries()
createUser()
const port =  5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

