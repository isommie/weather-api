const NodeSchedule = require('node-schedule');
const logger = require('./logger');
const weatherService = require('../services/weatherService');

const scheduleCacheUpdate = (interval = '0 * * * *') => {
  NodeSchedule.scheduleJob(interval, async () => {
    try {
      logger.info('Running scheduled cache update for weather data...');
      const locations = ['New York', 'London', 'Tokyo']; // Example locations
      for (const location of locations) {
        const weatherData = await weatherService.fetchWeather(location);
        if (weatherData) {
          await cache.set(`weather:${location}`, weatherData, 3600);
        }
      }
      logger.info('Cache update completed.');
    } catch (error) {
      logger.error('Error during scheduled cache update:', error);
    }
  });
};

module.exports = { scheduleCacheUpdate };
