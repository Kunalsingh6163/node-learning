const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
async function queryDatabase(query, params) {
  const client = await pool.connect();
  try {
    return await client.query(query, params);
    console.log("postgre db Connected");
  } finally {
    client.release();
  }
}

module.exports = { dbConnection, queryDatabase };
