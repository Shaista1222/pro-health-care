const AWS=require('aws-sdk')
const fs = require("node:fs");

let s3 = new AWS.S3();
let params = {Bucket: 'dev-s3-bucket-yt/thumbnails/Error.txt', Key: 'https://236718335809.signin.aws.amazon.com/console'}
let s3file = s3.getObject(params)

// s3.getObject(params, function(err, data) {
//     if (err) console.log(err, err.stack);
//     else console.log(data);
// });

fs.readFile(params.Bucket, (err, data) => {
    if (err) throw err;
    console.log(data)
})