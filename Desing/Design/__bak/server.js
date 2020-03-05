//Import modules "express" for HTTP server and "body-parser"
//Configure app name and port that is listening for input
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

//Decode form data
//Parse it as Json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Import module "router"
const router = require('./app/router')

// Receive HTTP GET requests form root URL "/"
app.get('/', (req, res) => res.json([]))

//Pass on get or post requests from users URL
// Use the router methods to handle the requests
app.get('/users', router.getUsers)
app.get('/users/:id', router.getUser)
app.post('/users', router.postUsers)

// Login a user
app.post('/login', router.postLogin)

//Collections
app.get('/collections', router.getCollections)
app.post('/collections', router.postCollections)


// Start the server on specified port
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
