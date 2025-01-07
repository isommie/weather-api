const express = require('express');
const { fetchWeather } = require('../controllers/weatherController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @route   GET /api/weather
 * @desc    Fetch weather data for a given location
 * @access  Private
 */
router.get('/', authenticateToken, fetchWeather);

module.exports = router;
