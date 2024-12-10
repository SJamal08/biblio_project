const express = require('express');
const connectDB = require('./src/config/db');
const bookRoutes = require('./src/route/book.routes');
const userRoutes = require('./src/route/user.routes');
const loanRoutes = require('./src/route/loan.routes');
const authRoutes = require('./src/route/auth.routes');
const cors = require('cors');

const app = express();
require('dotenv').config();


app.use(cors())  // if name of your backend is app

connectDB();

app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Library Management API');
});

module.exports = app;
