const { getWeather } = require('../services/weatherService');
const logger = require('../utils/logger');

const fetchWeather = async (req, res, next) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'Location query parameter is required.' });
  }

  try {
    const weatherData = await getWeather(location);
    logger.info(`Weather data fetched for location: ${location}`);
    res.status(200).json(weatherData);
  } catch (error) {
    logger.error(`Error fetching weather data: ${error.message}`);
    next(error); // Pass error to errorHandler middleware
  }
};

module.exports = { fetchWeather };
