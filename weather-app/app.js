// const request = require('request') // load in 'request' module
const geocode = require('./utils/geocode')//load in geocode.js from utils directory
const forecast = require('./utils/forecast') //load in forecast.js from utils directory


//section 6: 40. destructuring and shorthand challenge
//Goal: Use both deconstructuring and property shorthand in weather app

//1. Use destructuring in app.js, forecast.js, and geocode.js
//2. Use property shorthand in forecast.js and geocode.js

const address = process.argv[2]

if (!address) {
        console.log('Please provide an address')
} else {
    geocode(address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return console.log(error)
    }

    forecast(latitude,longitude,(error, forecastData) => { //changed argument name: data-->forecastData so that forecast callback function can access both data from forecast and geocode
        if (error){
            return console.log(error)
    }

        console.log(location)
        console.log(forecastData)
      })
    })
 }




// Additional Codes for notes purposes:

//Asynchronous Basics

// //nonblocking example:
// console.log('Starting')

// //allows us to run some code after a specific amount of time has passed
// setTimeout(()=> {
//     console.log('2 Second Timer')
// },2000) //2000 = 2 secs

// // registers an event with NODE.js APIs(called callback pair)--> event: wait 2 secs, callback: function to run

// setTimeout(() => {
//     console.log('0 Second Timer')
// }, 0)

// console.log('Stopping')




// const url = 'http://api.weatherstack.com/current?access_key=ae61cd878c28a361959748a64e898d22&query=37.8267,-122.4233' //store our url


// //Goal: Print a small forecast to the user

// //1.print: "It is currently 9 degrees out. It feels like 5 degrees out"
// //2.

// // function to make the request--with arguments(option,function) option:what we'd like to do (ex:url), function: function to run
// //json: true --> we would like a request to parse as JSON: don't have to manualy add the code everytime we're trying to make an http request from node.js
// request({url: url,json: true}, (error, response)=>{
//     // console.log(response.body.current)
//     console.log('It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike +' degrees out.')
// })
 //before unit conversion: "It is currently 12 degrees out. It feels like 10 degrees out."

// request({url: url}, (error, response)=>{
//     // // console.log(response)
//     const data = JSON.parse(response.body) //parse our data, lives on response.body
//     // // console.log(data) //to work with data
//     console.log(data.current) // to access a single property 
// }) 




// //stored url
// const url = 'http://api.weatherstack.com/current?access_key=ae61cd878c28a361959748a64e898d22&query=37.8267,-122.4233&units=f' //added another key value pair --convert units


// // function to make the request--with arguments(option,function) option:what we'd like to do (ex:url), function: function to run (error,response)
// //json: true --> we would like a request to parse as JSON: don't have to manualy add the code everytime we're trying to make an http request from node.js
// request({url: url,json: true}, (error, response) => {
//     // console.log(response.body.current)
//     //console.log('It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike +' degrees out.')
//     // "It is currently 54 degrees out. It feels like 50 degrees out."
//     console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike +' degrees out.')
//     // "Partly cloudy. It is currently 54 degrees out. It feels like 50 degrees out."
// }) 




//GEOCODE:

// //Geocoding 
// //Address -> Lat/long -> Weather

// //Goal: Print the lat/long for Los Angeles
// //
// //1. Fire off a new request to the URL explored in browser
// //2. Have the request to the URL explored in browser
// //3. Print both the latitude and longitude to the terminal

// //store our geocode url
// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2ViYW4xMDI1IiwiYSI6ImNsZTBudG92czBxaTIzcG84bG83eGJocWsifQ.BNBiJ2maIXBA3EBVPgj2tA&limit=1'
// //to make the request for long/lat
// request ({url:geocodeURL, json: true},(error, response) => {
//     const latitude = response.body.features[0].center[1]
//     const longitude = response.body.features[0].center[0]
//     console.log(latitude,longitude) //34.053691 -118.242766
// })

//stored url

// // const url = 'http://api.weatherstack.com/current?access_key=ae61cd878c28a361959748a64e898d22&query=37.8267,-122.4233' //store our url
// const url = 'http://api.weatherstack.com/current?access_key=ae61cd878c28a361959748a64e898d22&query=37.8267,-122.4233&units=f' //added another key value pair --convert units
// // const url = 'http://api.weatherstack.com/current?access_key=ae61cd878c28a361959748a64e898d22&query=&units=f' //--->broken coordinates: to test our 'else if' statement

// // function to make the request--with arguments(option,function) option:what we'd like to do (ex:url), function: function to run (error,response)
// //json: true --> we would like a request to parse as JSON: don't have to manualy add the code everytime we're trying to make an http request from node.js
// //useful error messages
// request({url: url,json: true}, (error, response) => {
//     if (error){
//         console.log('Unable to connect weather service!')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     }else {
//         console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike +' degrees out.')
//     }
// }) 
        //if: theres no connection to wifi, message 'Unable to connect weather service!' will print
        //else if: (if there is no/incorrect coordinates) message 'Unable to find location' will print
        //else: (if there is wifi) prints forecast



//Geocoding 

//Goal: Handle errors for geocoding request

//1.Setup an error handler for low-level errors
//2.Test by disabling network request and running the app
//3.Setup error handling for no matching results
//4.Test by altering the search term and running the app

//store our geocode url
// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2ViYW4xMDI1IiwiYSI6ImNsZTBudG92czBxaTIzcG84bG83eGJocWsifQ.BNBiJ2maIXBA3EBVPgj2tA&limit=1' 
// //const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/philadelphia.json?access_token=pk.eyJ1Ijoic2ViYW4xMDI1IiwiYSI6ImNsZTBudG92czBxaTIzcG84bG83eGJocWsifQ.BNBiJ2maIXBA3EBVPgj2tA&limit=1' ex: for philadelphia coodinates
// //const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/12what.json?access_token=pk.eyJ1Ijoic2ViYW4xMDI1IiwiYSI6ImNsZTBudG92czBxaTIzcG84bG83eGJocWsifQ.BNBiJ2maIXBA3EBVPgj2tA&limit=1' //broken URL to test ' else if' statement

// request ({url:geocodeURL, json: true},(error, response) => {
//     //
//     if (error) {
//         console.log('Unable to connect to location services!')
//     } else if(response.body.features.length === 0) { 
//         console.log('Unable to find location. Try another search.')
//     }else { 
//     //to make the request for long/lat
//     const latitude = response.body.features[0].center[1]
//     const longitude = response.body.features[0].center[0]
//     console.log(latitude,longitude) //34.053691 -118.242766
//     }
// })
// //*note: unsure if there is an error in the code but for 'else if': code does not execute if length === 0, however, for 'else': it only executes if length === 0 (is defined in 'else if' statement)

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

//from github:
// forecast(-75.7088, 44.1545, (error, data) => {
//   console.log('Error', error)
//   console.log('Data', data)
// })

//correct coordinates
// forecast(44.1545, -75.7088,(error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })


//callback chaining:
// //geocode('Boston', (error,data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//     forecast(44.1545, -75.7088,(error, data) => {
//         console.log('Error', error)
//         console.log('Data', data)
//       })
// })


// geocode(address, (error,data) => {
//     if (error) {
//         return console.log(error)
//     }

//     forecast(data.latitude, data.longitude,(error, forecastData) => { //changed argument name: data-->forecastData so that forecast callback function can access both data from forecast and geocode
//     if (error){
//         return console.log(error)
//     }

//     console.log(data.location)
//     console.log(forecastData)
//       })
// })



//section 6: 38.callback chaining

//Goal: Accept location via command line argument

//1.Access the command line argument without yargs
//2.Use the string value as the input for geocode
//3.Only geocode if a location was provided
 
// const address = process.argv[2]

// if (!address) {
//         console.log('Please provide an address')
// } else {
//     geocode(address, (error,data) => {
//         if (error) {
//             return console.log(error)
//     }

//     forecast(data.latitude, data.longitude,(error, forecastData) => { //changed argument name: data-->forecastData so that forecast callback function can access both data from forecast and geocode
//         if (error){
//             return console.log(error)
//     }

//         console.log(data.location)
//         console.log(forecastData)
//       })
//     })
//  }

// console.log(process.argv)


//callback chaining pattern: we'll be able to geocode an address, then take the coordinates and use as input for some other asynchronous IO operation, in this case we will pass the coordinates to forecast
//starts with a call to geo code, we start with the asynchronous operation, then the event loop is going to call our callbacks, kicking off another asynchronous IO operation, giving us access to the final data
