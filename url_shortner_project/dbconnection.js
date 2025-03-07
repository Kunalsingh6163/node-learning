const mongoose = require("mongoose");

async function connectToDatabase() {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/url-shortner");
      console.log("Connected to the database");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
    }
  }
  
  module.exports = { connectToDatabase };
  
