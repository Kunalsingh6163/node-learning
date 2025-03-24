const express = require("express");
const { dbConnection } = require("./db");

const app = express();

const PORT = 8001;
//db connection
dbConnection();

app.listen(PORT, () => console.log("login server is running on ", PORT));
