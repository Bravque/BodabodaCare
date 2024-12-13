//import
const express = require('express');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

//set-up middleware
app.use(express.static(path.join(__dirname, '/')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.path}`);
    next();
});

// define routes
app.use('/auth', authRoutes)

// display registration page
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'register.html'));
});

// display login page
app.get('/login', (request, response) => {
    response.sendFile(path.join(__dirname, 'login.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// start the server
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`)
});

// API endpoint to get user data based on user id
app.get('/api/user/:id', (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User  not found' });
        }
        res.json(results[0]);
    });
});