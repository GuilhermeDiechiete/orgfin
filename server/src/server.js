
const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')


const server = express()
server.use(cors())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

const routes = require('./routes/routes.js')

server.use('/', routes)



server.listen(process.env.PORT, () => console.log('Server running on port: ' + process.env.PORT)) 