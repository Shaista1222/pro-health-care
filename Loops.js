const arr=[
    [2,3],[4,7],[1,9]
]
const fechtedEl=arr.flatMap((item)=>{
    return [
        item[0]+item[1]
    ]
})
console.log(fechtedEl)
const fechtedEle=arr.map((item)=>{
    return [
        item[0]+item[1]
    ]
})
console.log(fechtedEle)

const sentences = ["Hello world", "Map and FlatMap"];
const words = sentences.map(sentence => sentence.split(" "));
console.log(words);


const sentences1 = ["Hello world", "Map and FlatMap"];
const word = sentences1.flatMap(sentence => sentence.split(" "));
console.log(word)

//Filter--creates a new array from existing which satisfied the condition
const num=[2,4,6,8,35,7]
// const evenNumber=num.filter(item=>item%2===0)
// console.log(evenNumber)
const  evenNum=num.filter(item=>{
    if(item%2===0){
        return true;
    }
})
console.log(evenNum)

//Reduce--resulting ina single output
const newArr=[2,4,6,7,8,2]
const arra=newArr.reduce((a,b)=>{
    return a+b
})
console.log(arra)

//Foreach--
// const numbers = [1, 2, 3, 4, 5];
// numbers.forEach(n => console.log(n));
//While Loop--continues execute jitne tak ki usko condition m specified hai
// let i=0
// while(i<10){
//     console.log(i)
//     i++
// }
//Do-While--When you need to ensure that the loop executes at least once
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 5);

//For---Usage: When the number of iterations is known beforehand.
for(let b=0;b<2;b++){
    console.log(b);
}
//for-in----loop on object
const obj = {a: 1, b: 2, c: 3};
for (let key in obj) {
    console.log(key, obj[key]);
}

//for-of---iterate over iterable objects, such as arrays, strings, maps, sets, and more.


const numbers = [10, 20, 30, 40];

for (const number of numbers) {
    console.log(number);
}
// Output: 10 20 30 40
const str = "hello";

for (const char of str) {
    console.log(char);
}
// Output: h e l l o
const map = new Map([
    ['a', 1],
    ['b', 2],
    ['c', 3]
]);

for (const [key, value] of map) {
    console.log(`${key}: ${value}`);
}
// Output: a: 1
//         b: 2
//         c: 3
const set = new Set([1, 2, 3, 4]);

for (const value of set) {
    console.log(value);
}
// Output: 1 2 3 4
// Some
// some checks if at least one element meets the condition.
// every checks if all elements meet the condition.
// find retrieves the first element that meets the condition.

// some and every return a boolean.
//find returns the first element that matches the condition or undefined.
const number = [1, 2, 3, 4, 5];
const hasEven = number.some(num => num % 2 === 0); // true

// Every
const numbes = [2, 4, 6, 8];
const allEven = numbes.every(num => num % 2 === 0); // true

//find
const numers = [1, 3, 5, 7, 8];
const firstEven = numers.find(num => num % 2 === 0); // 8

//Dynamic import
import ('./NodeModules').then(obj=>{
    // obj.MyFUnction
    //we can not use it n a condition otherwise it will show file path not found error
    import('./newFile').then(funs=>funs.FunctionName)
}).catch(error=>{
    console.log("File path not found")
})


// Static Require
// const fs = require('fs');
// const someModule = require('./someModule');
//
// // Dynamic Require
// function loadModule(moduleName) {
//     const module = require(moduleName);
//     module.someFunction();
// }
//
// loadModule('./someModule.js');
// //////////////////////
// // Static Import
// import { readFile } from 'fs';
// import someDefaultExport from './someModule';
//
// // Dynamic Import
// async function loadModule() {
//     const module = await import('./someModule.js');
//     module.someFunction();
// }
//
// loadModule();
