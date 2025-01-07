const express = require('express');
const path = require('path');
const weatherRoutes = require('./routes/weatherRoutes');
const authRoutes = require('./routes/authRoutes');
const logger = require('./utils/logger');
const { errorHandler } = require('./utils/errorHandler');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/auth', authRoutes);

// View Routes
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});
app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signin.html'));
});
app.get('/weather', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'weather.html'));
});

// Default Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Weather App API!' });
});

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
