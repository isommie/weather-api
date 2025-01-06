const express = require('express');
const { fetchWeather } = require('../controllers/weatherController');

const router = express.Router();

/**
 * @route   GET /api/weather
 * @desc    Fetch weather data for a given location
 * @access  Public
 */
router.get('/', fetchWeather);

module.exports = router;
