const axios = require('axios');
const redisClient = require('../config/redisConfig');
const Weather = require('../models/Weather');
const logger = require('../utils/logger');

const WEATHER_CACHE_TTL = 3600; // 1 hour in seconds

const fetchWeatherFromAPI = async (location) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  try {
    const response = await axios.get(baseUrl, {
      params: { q: location, appid: apiKey, units: 'metric' },
    });

    return response.data;
  } catch (error) {
    logger.error(`Error fetching weather data from API: ${error.message}`);
    throw new Error('Failed to fetch weather data from API.');
  }
};

const getWeather = async (location) => {
  const cacheKey = `weather:${location.toLowerCase()}`;

  try {
    // Check Redis Cache first
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      logger.info(`Cache hit for location: ${location}`);
      return JSON.parse(cachedData);
    }

    // Check MongoDB as a fallback
    const dbData = await Weather.findOne({ location }).exec();
    if (dbData) {
      logger.info(`Database hit for location: ${location}`);
      redisClient.set(cacheKey, JSON.stringify(dbData.data), 'EX', WEATHER_CACHE_TTL);
      return dbData.data;
    }

    // Fetch from the API if not found in cache or DB
    const apiData = await fetchWeatherFromAPI(location);

    // Save fetched data to MongoDB for future use
    const weatherEntry = new Weather({ location, data: apiData });
    await weatherEntry.save();

    // Cache the API response in Redis for subsequent requests
    redisClient.set(cacheKey, JSON.stringify(apiData), 'EX', WEATHER_CACHE_TTL);

    return apiData;
  } catch (error) {
    logger.error(`Error in getWeather service: ${error.message}`);
    throw error; // Rethrow to be handled by controller
  }
};

module.exports = { getWeather };
