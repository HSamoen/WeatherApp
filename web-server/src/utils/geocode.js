const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2ViYW4xMDI1IiwiYSI6ImNsZTBudG92czBxaTIzcG84bG83eGJocWsifQ.BNBiJ2maIXBA3EBVPgj2tA&limit=1' //dynamic url

    request({ url, json: true }, (error,{ body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined) //*undefined is the default 
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
                
            })
        }
    })
}

module.exports = geocode //allows us to easily require anywhere we want to use it ----> app.js

//comments:

//geocode function converts/reverse our location name/coordinates 

//function body returns error if data cannot be fetched. ex: no internet connection/ wrong location name/coordinates

//used desructuring syntax

//used callbacks to make geocode flexible and arrow functions to make code more readible