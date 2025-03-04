const http = require('http');
const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.send('Hello World!');
});

app.get('/about', (req, res)=>{
   return res.send('Hello this is about page '+" hey " + req.query.name + " you are " + req.query.age);
});

//uing the outer http
// const myServer = http.createServer(app);
// myServer.listen(8005, () => {
//     console.log("Log Server Started on port 8005");
//   });

//using express we can run on the port

app.listen(8002, ()=> console.log("server started on 8002"))