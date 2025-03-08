const express = require("express");
const { connectToDatabase } = require("./dbconnection");

const app = express();
const PORT = 8002;

//db connection and schema
connectToDatabase();

app.use(express.json());
//api call

app.listen(PORT, () => console.log("CRUD Server is runnning on " + PORT));
