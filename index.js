const express = require('express');
const app = express();
const { fork } = require('child_process');

// Enabling parson of JSON object in the body of request (Middleware)
app.use(express.json())

// Array containing all alerts received via the app or the echo
let alerts = []

app.get('/', (req, res) => {
    res.send('Welcome to MLL');
});

app.get('/pullData', (req, res) => {
    const forked = fork('./processes/child.js');

    forked.on('message', (msg) => {
      console.log('Message from child', msg);
      if (msg.status === 'done'){
          console.log('Killing child process because it is done')
          forked.kill()
      }
    });
    
    forked.send('Starting child process');
});

// Example post request:http://localhost:3000/api/alert
// {
// 	"deviceType": "App", 
// 	"location": "1901 N 13th St, Philadelphia, PA 19122"
// }
// Postman set to raw, JSON
app.post('/api/alert', (req, res) => {
    let alertFromClient = {
        id: alerts.length + 1,
        deviceType: req.body.deviceType,
        location: req.body.location
    }

    alerts.push(alertFromClient)
    res.send(alertFromClient)

    const forked = fork('./processes/child.js');

    forked.on('message', (msg) => {
      console.log('Message from child', msg);
      if (msg.status === 'done'){
          console.log('Killing child process because it is done')
          forked.kill()
      }
    });
    
    forked.send('Starting child process');

});

const port = process.env.PORT || 3000
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})