const path = require('path')
const express = require('express')
const hbs = require('hbs') //working with partials
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')
const app = express ()

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views') //to customize the views dir
const partialsPath = path.join(__dirname, '../templates/partials')

//dynamic webpage:
//setup handlebars engine and views locations
app.set('view engine', 'hbs')
//method app.set(): allows us to set a value given express setting--> (key: setting name, value: name of module)
//for dynamic websites: route does not need to include extension file 

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

//render help page
app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'HSamoen Eban'
    })
})

//res.render(): allows us to render one of our views (handlebar templates)
//by using render ---> express goes off and gets that view and converts it to HTML and makes sure that HTML gets back to the requester
//first arg: the name of the view to render ('index')
//sec arg: an object (which contains all of the values you want that view to be able to access)--> injecting both of these values into the template, it can take advantage of them

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

app.listen(3000,() => {
    console.log('Server is up on port 3000.')
})
//app.listen
//method to start server up and listens on a specific port
//optional argument--> with callback func which runs when server is up and running



//comments:

//using * (wild card character): we can match either every request or we can match a bunch of requests that match a specific pattern
//method to start server up and listens on a specific port
//optional argument--> with callback func which runs when server is up and running

//use nodemon: refresh automatically --> without having to stop and restart our server every time we make changes
//when using partials: use nodemon with -e js,hbs (includes extention that nodemon should watch) ---> nodemon src/app.js -e js,hbs

//app.get():
//lets us configure what the server should do when someone tries to get the resources at a specific URL: takes in two arg (route (ex: url), function(what we want to happen when someone visits that specific route (url))),
// function: gets called with two arguments-->(req ,res) = short for 'request' and 'response'
//req --> object: contains info about incoming request to the server
//res --> contains methods: allows us to customize wht we're going to send back to the requester