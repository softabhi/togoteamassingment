const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors')
const jwt = require('jsonwebtoken');
// const  verifyToken  = require('./middleware/VerifyToken.js');


const app = express();
const port = 8081;

app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "*" }));

// MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'togo',
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
    }
    console.log('Connected to MySQL database');
});


const jwtSecret = "fdsdeg4521serfs"


app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error retrieving users');
            return;
        }
        res.json(results);
    });
});



app.post('/register', (req, res) => {
    const { name, email, password, repassword } = req.body;

    const query = 'INSERT INTO users (name, email, password, repassword) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, password, repassword], (err, results) => {
        if (err) {
            console.error('Error registering user:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ success: true, message: 'User registered successfully' });
    });
});



app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }


        user = results[0];

        if (results.length > 0) {
            // User found, login successful


            // Create JWT token
            const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, {
                expiresIn: '1h', // Token expiration time
            });

            res.json({ success: true, message: 'Login successful', results, token });
        } else {
            // User not found or password incorrect
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});


// Token verification middleware
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
  
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
  
      req.user = decoded;
      next();
    });
  };


app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
  });



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
