const express = require('express');
const weatherRoutes = require('./routes/weatherRoutes');
const authRoutes = require('./routes/authRoutes');
const logger = require('./utils/logger');
const { errorHandler } = require('./utils/errorHandler');

const app = express();

// Middleware
app.use(express.json());

// Route Handlers
app.use('/api/weather', weatherRoutes);
app.use('/api/auth', authRoutes);

// Default Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Weather App API!' });
});

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
