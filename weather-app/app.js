const geocode = require('./utils/geocode')//load in geocode.js from utils directory
const forecast = require('./utils/forecast') //load in forecast.js from utils directory

const address = process.argv[2]

if (!address) {
        console.log('Please provide an address')
} else {
    geocode(address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return console.log(error)
    }
    forecast(latitude,longitude,(error, forecastData) => { //changed argument name: data --> forecastData so that forecast callback function can access both data from forecast and geocode
        if (error){
            return console.log(error)
    }
        console.log(location)
        console.log(forecastData)
      })
    })
 }


 //comments:

//application takes in an address and returns the location name (ex:city and state) ---> using geocode

//the applcation uses the location to the return the forecast data ---> forecast

//function body returns error if there was no address input; else runs the geocode and forecast


//additional notes:

// // function to make the request--with arguments(option,function) option:what we'd like to do (ex:url), function: function to run

// //json: true --> we would like a request to parse as JSON: don't have to manualy add the code everytime we're trying to make an http request from node.js


//GEOCODE: Address/ location name -> Lat/long -> Weather

// // function to make the request--with arguments(option,function) option:what we'd like to do (ex:url), function: function to run (error,response)
// //json: true --> we would like a request to parse as JSON: don't have to manualy add the code everytime we're trying to make an http request from node.js
// //useful error messages
        //if: theres no connection to wifi, message 'Unable to connect weather service!' will print
        //else if: (if there is no/incorrect coordinates) message 'Unable to find location' will print
        //else: (if there is wifi) prints forecast

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
 
//callback chaining pattern: we'll be able to geocode an address, then take the coordinates and use as input for some other asynchronous IO operation, in this case we will pass the coordinates to forecast
//starts with a call to geo code, we start with the asynchronous operation, then the event loop is going to call our callbacks, kicking off another asynchronous IO operation, giving us access to the final data
