const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Database connection configuration
// User needs to update this with their MySQL password
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Pavan@9639', // Update with your local MySQL password
  database: 'ecommerce_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    console.log('Please ensure MySQL is running, the database is created via database.sql, and the password is correct.');
    // We do not exit here so the frontend can still load and show the error gracefully.
  } else {
    console.log('Connected to MySQL database "ecommerce_db".');
  }
});

// API endpoint to get all products
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err.message);
      res.status(500).json({ error: 'Database server error. Please check your connection.' });
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Open your browser to see the ecommerce site.`);
});
