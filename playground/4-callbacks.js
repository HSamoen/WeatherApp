// //callback to setTimeout -->node.js API
// setTimeout(()=>{
//     console.log('Two seconds are up')
// },2000)

// //callback function: function provide as an argument to another function with intention of having it called later on

// //callback filter: not defined by us but from javascript
// const names = ['HSamoen', 'Jen', 'Jess']
// const shortNames = names.filter((name) => {
//     return name.length <= 4
// })

// const geocode = (address,callback) => {
// setTimeout(()=>{
//     const data = {
//         latitude:0,
//         longitude: 0
//     }

//     callback(data)
// },2000)
// }

// geocode('philadelphia',(data) =>{
//     console.log(data)
// })
// //if our function is completely synchronous, we can use return to get a value out of the function and back to the part of the code called that function
// //if our code does something asynchronous, instead of return value, we take a callback in and call the callback with the value we want to send back



//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!


const add = (a,b,callback) => {
    setTimeout(() => {
        callback(a + b)
    },2000)
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})