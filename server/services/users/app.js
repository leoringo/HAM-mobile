const express = require('express')
const app = express()
const cors = require('cors')
const MongoClientConnection = require('./config/connection.js')
const errorHandler = require('./middlewares/errorHandler.js')
const router = require('./routers')
const PORT = 4001


MongoClientConnection.connect()

app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use(router)
    .use(errorHandler)

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})