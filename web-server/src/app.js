const path = require('path')
const express = require('express')
const hbs = require('hbs') //working with partials
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')

//Goal: create a partial for the footer
//1. setup the template for the footer partial "Created by some name"
//2. render the partial at the bottom of all three pages

const app = express ()

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views') //to customize the views dir
const partialsPath = path.join(__dirname, '../templates/partials')

//dynamic webpage:
//setup handlebars engine and views locations
app.set('view engine', 'hbs')
//method app.set(): allows us to set a value given express setting--> (key: setting name, value: name of module)
////for dynamic websites: route does not need to include extension file 

app.set('views',viewPath)
hbs.registerPartials(partialsPath)
//registerPartials(): takes a path to the directory where your partials live

//static webpage:
//setup  static directory to serve
app.use(express.static(publicDirectoryPath))
//serve up the directory
//customize server
//function we are calling and passing return value to use
//static takes the path to the folder we want to serve up -->path.join(__dirname, '../public')
//static: do not change regardless of how many times we refresh page
//for static websites: route must include extension file ex:app.com/about.html


//route to serve up the template
//render index page
app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'HSamoen Eban'
    })
})

//render about page
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'HSamoen Eban'
    })
})


//Goal: Create a template for help page

//1. Setup a help template to render a help message to the screen
//2. Setup the help route and render the template with an example message

//render help page
app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'HSamoen Eban'
    })
})

//res.render(): allows us to render one of our views (handlebar templates)
//by using render--> express goes off and gets that view and converts it to HTML and makes sure that HTML gets back to the requester
//first arg: the name of the view to render ('index')
//sec arg: an object (which contains all of the values you want that view to be able to access)--> injecting both of these values into the template, it can take advantage of them


//Goal: Update weather endpoint to accept address

//1. No address? send back error message 
//2. Address? Sen back the static JSON
     // - add address property onto JSON which returns the provided address


//Goal: Wire up/weather
//1.require geocode/forecast into app.js
//2.use the address to geocode
//3.use the coordinates to get forecast


//Building JSON http endpoint
app.get('/weather',(req,res) => { 
    if (!req.query.address) {
        return res.send ({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {
        //= {} : by setting up default object for object we are trying to destructure; makes sure the code stills works even if no data is provided
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })

    })

    // res.send({
    //     forecast: 'It is partly cloudy',
    //     location: 'Charlotte',
    //     address: req.query.address
    // })
})


//second url to send back JSON
//add conditional logic into our function
//to make sure the searh is there before sending back products
app.get('/products', (req, res) => {
    console.log(req.query.search) //prints object to the console: query string with the request was parsed by express
    if (!req.query.search) {
        return res.send ({
            error: 'You must provide a search term' // runs if there is no search
        })
    } 

    console.log(req.query.search)
    res.send ({
        products: []
    })
})
//query strings:
// the client (ex: typing url in browser) can set up query string --> sends off to server --> server use that info with the request -->server sends request back

//404 routes

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'HSamoen Eban',
        errorMessage: 'Help article not found.'
    })
})
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'HSamoen Eban',
        errorMessage: 'Page not found.'
    })
})

// app.get('/help/*', (req,res) => {
//     res.send('Help article not found')
// })
// app.get('*', (req,res) => {
//     res.send('My 404 page')
// })
//using * (wild card character): we can match either every request or we can match a bunch of requests that match a specific pattern


//Goal: Create and render a 404 page with handlebars

//1. setup the template to render the header and footer
//2. setup the template to render an error message in a paragraph
//3. render the template for both 404 routes
   //Page not found
   //Help article not found.


app.listen(3000,() => {
    console.log('Server is up on port 3000.')
})
//method to start server up and listens on a specific port
//optional argument--> with callback func which runs when server is up and running

//use nodemon: refresh automatically --> without having to stop and restart our server every time we make changes
//when using partials: use nodemon with -e js,hbs (includes extention that nodemon should watch)







//Notes: --> codes throughout section 7

////Section 7: 43. Hello Express! : using express npm

// const express = require('express')
// const app = express ()


//set up our sever to send a response when someone tries to get something at a specific route

// app.get('',(req,res) => {
//     res.send('Hello express!') //<--handler
// }) 

// app.get('/help',(req,res) => {
//    res.send('Help page')
// })

// //Goal: Setup two new routes

// //1. Setup an about and render a page title
// //2. Setup a weather route and render a page title

// app.get('/about',(req,res) => {
//    res.send('About page')
// })

// app.get('/weather',(req,res) => {
//    res.send('Weather page')
// })


// app.listen(3000,() => {
//    console.log('Server is up on port 3000.')
// })


//app.get():
//lets us configure what the server should do when someone tries to get the resources at a specific URL: takes in two arg (route (ex: url), function(what we want to happen when someone visits that specific route (url))),
// function: gets called with two arguments-->(req ,res) = short for 'request' and 'response'
//req --> object: contains info about incoming request to the server
//res --> contains methods: allows us to customize wht we're going to send back to the requester

//res.send()--> sends response back to requester


//app.listen
//method to start server up and listens on a specific port
//optional argument--> with callback func which runs when server is up and running

//use nodemon: refresh automatically --> without having to stop and restart our server every time we make changes

//example:
//all run on a single express server
//app.com <---domain (root route)
//routes:
//app.com/help 
//app.com/about

//section 7: 44.serving up HTML and JSON

// app.get('',(req,res) => {
//     res.send('<h1>Weather</h1>') //<--handler
//      //using <h1> tags: must be in a string
    
// }) 

// app.get('/help',(req,res) => {
//     // res.send({
//     //     name: 'HSamoen',
//     //     age: 23
//     // }) //object
//         res.send ([{
//             name: 'HSamoen',
//         },{
//             name: 'Dylan'
//         }]) //array of objects
//     //sending back JSON
// })

// //Goal: Update routes

// //1. Setup about route to render a title with HTML
// //2. Setup a weather route to send back JSON
//       // - Object with forecast and location strings


// app.get('/about',(req,res) => {
//     res.send('<h1>This is the about page</h1>')
// })

// app.get('/weather',(req,res) => {
//     res.send({
//         forecast: 'It is partly cloudy',
//         location: 'Charlotte'
//     })
// })


// app.listen(3000,() => {
//     console.log('Server is up on port 3000.')
// })


//section 7: 45. Serving up Static Assets
// console.log(__dirname) //contains a path to the directory the current script lives in

// console.log(__filename) //provides the path to the file itself

//point to the public directory
// console.log(path.join(__dirname, '../public')) // returns the final path

// const app = express ()
// const publicDirectoryPath = path.join(__dirname, '../public')

// app.use(express.static(publicDirectoryPath))
// //serve up the directory
// //customize server
// //function we are calling and passing return value to use
// //static takes the path to the folder we want to serve up -->path.join(__dirname, '../public')


// //Goal: Create two more HTML files

// //1. Create a html page for about with "About" Title
// //2. Create a html page for help with "help" title
// //3. Remove the old route handler for both


// app.get('/weather',(req,res) => { 
//     res.send({
//         forecast: 'It is partly cloudy',
//         location: 'Charlotte'
//     })
// })


// app.listen(3000,() => {
//     console.log('Server is up on port 3000.')
// })




//static webpage:
// const path = require('path')
// const express = require('express')


// const app = express ()
// const publicDirectoryPath = path.join(__dirname, '../public')

// app.use(express.static(publicDirectoryPath))
// //serve up the directory
// //customize server
// //function we are calling and passing return value to use
// //static takes the path to the folder we want to serve up -->path.join(__dirname, '../public')
// //static: do not change regardless of how many times we refresh page


// app.get('/weather',(req,res) => { 
//     res.send({
//         forecast: 'It is partly cloudy',
//         location: 'Charlotte'
//     })
// })


// app.listen(3000,() => {
//     console.log('Server is up on port 3000.')
// })

