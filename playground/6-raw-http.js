//HTTP requests without a library

//two ways that request can be called:
//http module for standard requests
//https module for requests to a secure server

const http = require('http')
const url ='http://api.weatherstack.com/current?access_key=ae61cd878c28a361959748a64e898d22&query=45,-75&units=f' 

const request = http.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => { 
        data= data + chunk.toString()
        console.log(chunk)
    })
    response.on('end', ()=> {
        // console.log(data)
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', (error) => {
    console.log('An error', error)
})
request.end()

//this callback grabs individual chunks that come through since we don't have access to the complete response body
//http data can be streamed in multiple parts; means we have to listen for individual chunks to come in and for when all chunks have arrived and request is done
//response.on(): function that allows us to register a handler
//callback funct for event (data): provide event name as the first argument as string and callback that's going to fire whe new data comes in: 'chunk' of the response
//callback funct for event (end): end for the event. doesn't get any arguments
//create a var: let data = '' to store chunk that comes in---> then parse as JSON
//To fire off request---> const request(store the var that comes back as the return value from request) with request.end()--->prints buffer
//add data to the data var ---> data = data + chunk.toString() : (old data) + (new data-->string)
//JSON.parse(data)---> parse to get an object that we can actually pull properties off of
//set up another listener: request.on() --->listen for error