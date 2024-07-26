const express = require('express');
const app = express();
const Register=require('./Register');
const port = process.env.PORT || 3000;
const dbConnection = require('./mongoose');

dbConnection()
// //express.json() middleware to your Express app. This middleware will parse incoming requests with JSON payloads.
app.use(express.json())

app.use('/api',Register);

app.listen(port,()=>{
    console.log("Server running on port " + port);
})