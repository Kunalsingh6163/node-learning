const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} New Req Received \n`;
  const myUrl = url.parse(req.url, true);

  fs.appendFile("./createLog/test.txt", log, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
      res.end("Error logging request");
      return; // Stop further execution if logging fails
    }

    let responseText = "";

    switch (req.url) {
      case "/":
        responseText = "HomePage";
        break;
      case "/about":
        const userName = myUrl.query.myName || "Guest";
        responseText = `I am Kunal, this is the About Page. Hi, ${userName}`;
        break;
      case "/contact":
        const userContact = myUrl.query.myName || "Guest";
        responseText = `Hi, ${userContact}`;
        break;
      default:
        responseText = "404 Not Found";
    }

    res.end(responseText);
  });
});

myServer.listen(8002, () => {
  console.log("Log Server Started on port 8002");
});
