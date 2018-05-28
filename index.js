const express = require('express');
const alert = require('./routes/alert')
const dashboard = require('./routes/dashboard')

const app = express();

// Enabling parson of JSON object in the body of request (Middleware)
app.use(express.json())

// Declaring route for an alert
app.use('/api/alert', alert)

// Declaring route for the main dashboard
app.use('/', dashboard)

const port = process.env.PORT || 3000
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})