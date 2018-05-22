process.on('message', (msg) => {
    console.log('Message from parent:', msg);
});
  
let counter = 0;

// Simulating a process that takes a while to execute
setInterval(() => {
    if(counter < 10) {
        process.send({ counter: counter++ });
    } else {
       process.send({
           status: 'done'
       })
    }
}, 1000);