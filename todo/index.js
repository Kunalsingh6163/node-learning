const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./dbconnection");
const { connection } = require('./db')
require("dotenv").config();

//mongo dbConnection 
dbConnection();

//mysql connection
// Step 1: Create the table if it doesn't exist
const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
)
`;

connection.query(createTableQuery, (err, result) => {
  if (err) throw err;
  console.log('✅ Users table created or already exists.');

  // Step 2: Insert dummy data
  const insertUser = `INSERT INTO users (name, email) VALUES (?, ?)`;
  connection.query(insertUser, ['Alice', 'alice@example.com'], (err, result) => {
    if (err) throw err;
    console.log('🧍 User inserted');

    // Step 3: Fetch the data
    connection.query('SELECT * FROM users', (err, rows) => {
      if (err) throw err;
      console.log('📄 Users:', rows);
    });
  });
});

//App.use configure
const app = express();
app.use(express.json());
app.use(cors());

//Api Routs imports

//Api calling

app.get("/", async(req, res)=>{
    let message = "Here is your data!"
    if(message){
        return res.json(message)
        
    }
    return res.status(400).json("hello")
})

let PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Server is Running on Port ", PORT);
});
