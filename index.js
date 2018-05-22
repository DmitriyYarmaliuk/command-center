const express = require('express');
const alert = require('./routes/alert')

const app = express();

// Enabling parson of JSON object in the body of request (Middleware)
app.use(express.json())

// Declaring route for an alert from the app or echo
app.use('/api/alert', alert)


app.get('/', (req, res) => {
    res.send('Welcome to MLL');
});

const port = process.env.PORT || 3000
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})