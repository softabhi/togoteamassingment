// const express = require('express');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');
// const cors = require('cors')
// const jwt = require('jsonwebtoken');
import  express  from 'express';

import bodyParser from 'body-parser';
import cors from 'cors'
import users from './routes/userRoutes.js'
import { db } from './db/database.js';
// const  verifyToken  = require('./middleware/VerifyToken.js');


const app = express();
const port = 8081;

app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: "*" }));
app.use('/uploads',express.static('uploads'))

// MySQL connection configuration
// export const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'togo',
// });

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
    }
    console.log('Connected to MySQL database');
});


const jwtSecret = "fdsdeg4521serfs"

app.use('/api/v1',users)

// app.get('/users', (req, res) => {
//     const query = 'SELECT * FROM users';

//     db.query(query, (err, results) => {
//         if (err) {
//             console.error('Error executing query:', err);
//             res.status(500).send('Error retrieving users');
//             return;
//         }
//         res.json(results);
//     });
// });


// app.delete('/delete',(req,res) => {
//     const { name } = req.body;

//     const query = 'DELETE FROM users WHERE name = ?';

//     db.query(query ,[name], (err) =>{
//         if(err) throw err;
//         res.json({message: "user deleted successfully"});
//     })
// })



// Delete
// app.delete('/items/:name', (req, res) => {
//     const name = req.params.name;
//     const query = 'DELETE FROM users WHERE name=?';

//     db.query(query, [name], (err) => {
//         if (err) throw err;
//         res.json({ message: 'Item deleted successfully', name });
//     });
// });



// app.post('/register', (req, res) => {
//     const { name, email, password, repassword } = req.body;

//     const query = 'INSERT INTO users (name, email, password, repassword) VALUES (?, ?, ?, ?)';
//     db.query(query, [name, email, password, repassword], (err, results) => {
//         if (err) {
//             console.error('Error registering user:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }
//         res.json({ success: true, message: 'User registered successfully' });
//     });
// });



// app.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
//     db.query(query, [email, password], (err, results) => {
//         if (err) {
//             console.error('Error during login:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }


//         user = results[0];

//         if (results.length > 0) {
//             // User found, login successful


//             // Create JWT token
//             const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, {
//                 expiresIn: '1h', // Token expiration time
//             });

//             res.json({ success: true, message: 'Login successful', results, token });
//         } else {
//             // User not found or password incorrect
//             res.status(401).json({ error: 'Invalid credentials' });
//         }
//     });
// });


// Token verification middleware
// const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization;
  
//     if (!token) {
//       return res.status(403).json({ error: 'Unauthorized' });
//     }
  
//     jwt.verify(token, jwtSecret, (err, decoded) => {
//       if (err) {
//         return res.status(403).json({ error: 'Unauthorized' });
//       }
  
//       req.user = decoded;
//       next();
//     });
//   };


// app.get('/protected', verifyToken, (req, res) => {
//     res.json({ message: 'This is a protected route', user: req.user });
//   });



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
