console.log('Client side javascript file is loaded');


const weatherForm = document.querySelector('form')
//to wire up client side javascript code
//when someone clicks submit button on form 
const search = document.querySelector('input')
//gives us access to 'search'
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevents default refreshing

    const location = search.value //extracts input value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => { 
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})
//takes input/request from browser --> fetch from server --> returns back to browser = user interface!




//section 8: 57.Browser http requests with fetch
//fetch API
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })
 //url generates a random puzzle
 //fetch url then give us the reponse
 //with fetch API, use .then on the return value from fetch --with callback func we want to run (response)
 //response can extract data and render to browser or just dump into console


 //function:
 //fetches JSON data from a URL
 //parse it into a javascript object
 //dump it to console


 
 //Goal: fetch weather!

 //1.setup a call to fetch weather for boston
 //2.get the parse JSON response
        //if error property, print error
        //if no error property, print location and forecast

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => { 
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })


//section 8: 58.Creating a search form:

//Goal: Use input value to get weather 

//1.Migrate fetch call into the submit callback
//2.Use the search text as the address query string value

// const weatherForm = document.querySelector('form')
// //to wire up client side javascript code
// //when someone clicks submit button on form 
// const search = document.querySelector('input')
//gives us access to 'search'

// weatherForm.addEventListener('submit', (e) => {
//     e.preventDefault() //prevents default refreshing

//     const location = search.value //extracts input value
    
//     fetch('http://localhost:3000/weather?address=' + location).then((response) => {
//         response.json().then((data) => { 
//             if (data.error) {
//                 console.log(data.error)
//             } else {
//                 console.log(data.location)
//                 console.log(data.forecast)
//             }
//         })
//     })
// })
// //fetch user input from browser and logs into console

//section 8: 59. wiring up the user interface
//Goal: Render content to paragraphs
//1.select the second message p from javascript
//2.just before render, render loading message and empty p
//3.if error, render error
//4.if no error, render location and forecast


// const weatherForm = document.querySelector('form')
// //to wire up client side javascript code
// //when someone clicks submit button on form 
// const search = document.querySelector('input')
// //gives us access to 'search'
// const messageOne = document.querySelector('#message-1')
// const messageTwo = document.querySelector('#message-2')

// // messageOne.textContent = 'From Javascript'

// weatherForm.addEventListener('submit', (e) => {
//     e.preventDefault() //prevents default refreshing

//     const location = search.value //extracts input value

//     messageOne.textContent = 'Loading...'
//     messageTwo.textContent = ''
    
//     fetch('http://localhost:3000/weather?address=' + location).then((response) => {
//         response.json().then((data) => { 
//             if (data.error) {
//                 messageOne.textContent = data.error
//             } else {
//                 messageOne.textContent = data.location
//                 messageTwo.textContent = data.forecast
//             }
//         })
//     })
// })
// //fetch user input from browser to server --> return back to browser