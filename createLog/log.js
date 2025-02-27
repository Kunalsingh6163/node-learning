const http = require("http");
const fs = require("fs");
const { url } = require("inspector");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} New Req Received \n`;

  fs.appendFile("./createLog/test.txt", log, (err, data) => {
    if (err) {
      console.error("Error writing to log file:", err);
      res.end("Error logging request");
    } else {
      switch(req.url){
        case "/": res.end("HomePage");
        break
        case "/about": res.end("I am kunal this is About Page");
        break
        default: res.end("404 Not Found");
      }
    }
  });
});

myServer.listen(8002, () => {
  console.log("Log Server Started on port 8002");
});
