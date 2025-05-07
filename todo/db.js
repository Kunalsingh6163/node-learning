// db.js
const mysql = require('mysql2');

// Create a connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'todo'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('✅ Connected to MySQL as id', connection.threadId);
});

// Export the connection
module.exports = {connection};
