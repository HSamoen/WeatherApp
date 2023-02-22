// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum


const add = (a,b,callback) => {
    setTimeout(() => {
        callback(a + b)
    },2000)
}

add(1, 4, (sum) => {
    console.log(sum) // prints 5
})