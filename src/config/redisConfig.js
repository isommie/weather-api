const Redis = require('ioredis');
const logger = require('../utils/logger');

const redisConfig = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
};

const redisClient = new Redis({
  host: redisConfig.host,
  port: redisConfig.port,
});

redisClient.on('connect', () => {
  logger.info('Connected to Redis.');
});

redisClient.on('error', (error) => {
  logger.error('Redis connection error:', error);
});

module.exports = redisClient;
