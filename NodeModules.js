const path = require('path');
const fs = require('fs');
//will gate the path where our project is
// console.log(path.dirname('C:/Users/DELL/WebstormProjects/untitled1/NodeModules.js'))
// //what is extence of our file
// console.log(path.extname('C:/Users/DELL/WebstormProjects/untitled1/NodeModules.js'))
// //our file name
// console.log(path.basename('C:/Users/DELL/WebstormProjects/untitled1/NodeModules.js'))
// //all  in one , you will know dir name extenson name file name
// console.log(path.parse('C:/Users/DELL/WebstormProjects/untitled1/NodeModules.js'))
// const getFileName=path.parse('C:/Users/DELL/WebstormProjects/untitled1/NodeModules.js')
// console.log('FileNam: ',getFileName.name)

//-----FS-----
// fs.writeFileSync("writeFile.txt","Its about priorities")
//overrite the data, if file is not creteed it will create
// fs.writeFileSync("writeFile.txt","Taking it as serious point,Its about priorities")
//will add that data
// fs.appendFileSync("writeFile.txt","\n new edition")
//now read that data
// const rea_data=fs.readFileSync("writeFile.txt")
// // it will show Buffer-use to store binary data
// convertToString=rea_data.toString()
// console.log(convertToString)

// fs.renameSync('writeFile.txt','renamedFile.txt');
//will show undefined
// fs.readFile("writeFile.txt",(res,data)=>{
//     console.log('Data of readFile',data)
// })

//we have to do error handling
fs.readFile('renamedFile.txt', 'utf8', (err, data) => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.error('File not found:', err.path);
        } else {
            console.error('Error reading file:', err);
        }
        return;
    }
    console.log('File content:\n', data);
});