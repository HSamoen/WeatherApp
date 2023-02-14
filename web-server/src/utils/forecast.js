const request = require('request') //load in 'request' module


//use destructuring syntax
const forecast= (latitude,longitude,callback) => {
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



//before destructuring syntax:

// const forecast= (latitude,longitude,callback) => {
//     const url ='http://api.weatherstack.com/current?access_key=ae61cd878c28a361959748a64e898d22&query=' + latitude + ',' + longitude + '&units=f'

//     request({url: url, json:true }, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather service!', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location', undefined)
//         } else {
//             callback(undefined, response.body.current.weather_descriptions[0]+ '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike +' degrees out.')
//         }
//     })
// }