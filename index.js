// const {add, sub} = require("./fileSystem/math");

const http = require("http");

const myServer = http.createServer((req, res) => {
  console.log("New req Recieve");
  res.end("Hello i am written in the server");
});

myServer.listen(8000, () => {
  console.log("Server Started");
});
