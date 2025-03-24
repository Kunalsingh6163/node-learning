const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/logintest";

async function dbConnection() {
  try {
    await mongoose.connect(url);
    console.log("db connected");
  } catch (err) {
    console.error("Error connecting to database", err);
  }
}

module.exports = {
    dbConnection,
}