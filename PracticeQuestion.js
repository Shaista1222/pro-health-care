// ///Write a JavaScript conditional statement to find the sign of the product of three numbers. Display an alert box with the specified sign.
// const checkSign=(num)=>{
//     if(num<0){
//         console.log("the numver is ngative :","-",num)
//     }else{
//         console.log("the number is positve :","+",num
//         )
//     }
// }
// checkSign(1)
//
// //Write a JavaScript for loop that iterates from 0 to 15. For each iteration, it checks if the current number is odd or even, and displays a message on the screen.
// // for (let i=0;i<15;i++){
// //     if(i%2===0){
// //         console.log(i," is a even")
// //     }else{
// //         console.log(i," is a odd")
// //     }
// // }
//
// //. Write a JavaScript program that iterates integers from 1 to 100. But for multiples of three print "Fizz"
// // instead of the number and for multiples of five print "Buzz". For numbers multiples of both three and five print "FizzBuzz"
//
// for(let b=1;b<=100;b++){
//     if(b%3===0){
//         console.log(b ,"Fizz")
//     }else if(b%5===0){
//         console.log(b ,"Buzz")
//     }else if (b%5===0 && b%3===0){
//         console.log(b , "FizzBuzz")
//     }else{
//        console.log("Not multiple of 5 and 3")
//     }
//
// }
//
// ///////////
// let chr,y
// for(let c=1;c<5;c++){
//     for ( y = 4; y >= c; y--) {
//          chr = chr + (y);
//     }
//     console.log(chr);
//     chr = '';
// }
//
// //Write a JavaScript function to check whether an `input` is an array or not.
// const isArrayInput=inp=>{
//     const checkInput=Array.isArray(inp);
//     if(checkInput){
//         console.log("user enter an Array")
//     }else{
//         console.log("user not enter Array")
//
//     }
// }
// isArrayInput("[2,4]")
// //clone of an Array
// var array_Clone = function(arra1) {
//     //shallow copy of the input array
//     return arra1.slice(0);
// };
// console.log(array_Clone([1, 2, 4, 0]));
// console.log(array_Clone([1, 2, [4, 0]]));
//
// //3. Write a JavaScript function to get the first element of an array. Passing the parameter 'n' will return the first 'n' elements of the array.
// // Test Data :
// // console.log(first([7, 9, 0, -2]));
// // console.log(first([],3));
// // console.log(first([7, 9, 0, -2],3));
// // console.log(first([7, 9, 0, -2],6));
// // console.log(first([7, 9, 0, -2],-3));
// // Expected Output :
// // 7
// // []
// // [7, 9, 0]
// // [7, 9, 0, -2]
// // []
// // const getFirstElemenet=(ele)=>{
// //     if(Array.isArray(ele)){
// //         console.log(ele[0])
// //     }else{
// //         let splitedVal=ele.split(',')
// //         console.log(splitedVal[0])
// //     }
// // }
// // getFirstElemenet(2,[7, 9, 0, -2],2)
//
//
// function first(array, n) {
//     if (!Array.isArray(array) || n < 0) {
//         return [];
//     }
//     if (n === undefined) {
//         return array[0];
//     }
//     return array.slice(0, n);
// }
//
// // Test Data:
// console.log(first([7, 9, 0, -2])); // 7
// console.log(first( 3)); // []
// console.log(first([7, 9, 0, -2], 3)); // [7, 9, 0]
// console.log(first([7, 9, 0, -2], 6)); // [7, 9, 0, -2]
// console.log(first([7, 9, 0, -2], -3)); // []
//
// //4. Write a JavaScript function to get the last element of an array. Passing the parameter 'n' will return the last 'n' elements of the array.
// // Test Data :
// // console.log(last([7, 9, 0, -2]));
// // console.log(last([7, 9, 0, -2],3));
// // console.log(last([7, 9, 0, -2],6));
// // Expected Output :
// // -2
// // [9, 0, -2]
// // [7, 9, 0, -2]
//
// // const lastEle=(element,num)=>{
// //     if(!Array.isArray(element) || num<0){
// //         return []
// //     }if(num===undefined){
// //         return element[element.length - 1]
// //     }
// //     //The slice method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included)
// //     return element.slice(-num);
//
// // }
//
// console.log(lastEle([7, 9, 0, -2]));
// console.log(lastEle([7, 9, 0, -2],3));
// console.log(lastEle([7, 9, 0, -2],6));
//
// // Write a simple JavaScript program to join all elements of the following array into a string.
// // Sample array : myColor = ["Red", "Green", "White", "Black"];
// // Expected Output :
// // "Red,Green,White,Black"
// // "Red,Green,White,Black"
// // "Red+Green+White+Black"
// // let getElement;
// // const stringArrayCheck=(arr)=>{
// //     if (arr.length===0){
// //         return []
// //     }
// //     for(let i=0;i<arr.length;i++){
// //        return  getElement+=arr("+",arr[i]);
// //     }
// // }
// // console.log(stringArrayCheck(["Red", "Green", "White", "Black"]))
//
// let myColor = ["Red", "Green", "White", "Black"];
//
// const joinArray = (arr, separator) => {
//     if (!Array.isArray(arr) || arr.length === 0) {
//         return '';
//     }
//     //The join() method returns an array as a string.
//     return arr.join(separator);
// }
//
// // Test Data:
// console.log(joinArray(myColor, ',')); // "Red,Green,White,Black"
// console.log(joinArray(myColor, '+')); // "Red+Green+White+Black"
//
// //7. Write a JavaScript program to sort the items of an array.
// // Sample array : var arr1 = [ -3, 8, 7, 6, 5, -4, 3, 2, 1 ];
// // Sample Output : -4,-3,1,2,3,5,6,7,8
//
const sortedArr = (myColor)=>{
    return myColor.sort()
}
console.log(sortedArr([2,4,2,6]))
//8. Write a JavaScript program to find the most frequent item in an array.
// Sample array : var arr1=[3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3];
// Sample Output : a ( 5 times )
