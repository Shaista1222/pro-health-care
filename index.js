const express = require('express');
const fs=require('fs');
const path = require('path');
const port=3000
const blog=require('./routes/blog')
const runApp=require('./MongooseConnection')

// const blog=require('./routes/blog.js');
const app = express();


app.use("/", blog);



app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.get('/blog/:name/:address', (req, res) => {
    res.send('Hello '+req.params.name+" I live in "+req.params.address);
    const name=req.params.name
    const address=req.params.address
    const obj=JSON.stringify({firstName:name,lastName:address});
//we have to read first and then add it , otherwise it will destroy your array, because it will append in last after closing blacket
    
    fs.appendFile('PatientProfile.json',obj,(err)=>{
        if (err){
            console.log(err);
        }
        console.log("Successfully appended the data",obj)
    })
})
app.listen(port,()=>{
    console.log("Server started on port 3000");
})