const express = require('express');
// const path = require('path');
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



app.listen(port,()=>{
    console.log("Server started on port 3000");
})