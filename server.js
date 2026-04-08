const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const emailValidator = require('deep-email-validator');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Pavan@9639',
  database: process.env.DB_NAME || 'ecommerce_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    console.log('Please ensure MySQL is running, the database is created via database.sql, and the password is correct.');

  } else {
    console.log('Connected to MySQL database "ecommerce_db".');
  }
});

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

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Only allow Google authorized mails
  const isGoogleEmail = email.toLowerCase().endsWith('@gmail.com') || email.toLowerCase().endsWith('@googlemail.com');
  if (!isGoogleEmail) {
    return res.status(400).json({ error: 'Only Google authorized emails (@gmail.com) are allowed to register.' });
  }

  try {
    const { valid, reason, validators } = await emailValidator.validate({
      email: email,
      validateRegex: true,
      validateMx: true,
      validateTypo: true,
      validateDisposable: true,
      validateSMTP: false
    });
    if (!valid && reason !== 'smtp') {
      return res.status(400).json({ error: 'This email does not seem to exist. Please use a real email address.' });
    }
  } catch (error) {
    console.error('Email validation error:', error);
  }

  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err, results) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Email already exists' });
      }
      console.error('Database insertion error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'User registered successfully!' });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database fetch error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      const user = results[0];

      // Check if password matches
      if (user.password === password) {
        res.json({ id: user.id, name: user.name, email: user.email });
      } else {
        res.status(401).json({ error: 'Incorrect password' });
      }
    } else {
      // Email was not found in the database
      res.status(404).json({ error: 'Email does not exist' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Open your browser to see the ecommerce site.`);
});
