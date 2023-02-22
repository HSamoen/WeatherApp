const request = require('request') //load in 'request' module

const forecast = (latitude,longitude,callback) => {
    const url ='http://api.weatherstack.com/current?access_key=ae61cd878c28a361959748a64e898d22&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json:true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0]+ '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike +' degrees out.')
        }
    })
}

module.exports = forecast

//comments:

//created a function that returns a forecast using the weatherstack API

//to create our forecast; pull object properties from json 

//function body returns an error for instances that forecast cannot be fetched 
//examples: no internet connection or mispelled location

//use of arrow functions and callback functions 