const http = require('http');
const dotenv = require('dotenv');
const redisClient = require('./src/config/redisConfig');
const dbConnect = require('./src/config/dbConfig');
const logger = require('./src/utils/logger');
const app = require('./src/app');

// Load environment variables
dotenv.config();

// Constants
const PORT = process.env.PORT || 3000;

// Initialize Redis
redisClient.on('connect', () => logger.info('Connected to Redis.'));
redisClient.on('error', (err) => logger.error(`Redis connection error: ${err.message}`));

// Initialize MongoDB
(async () => {
  try {
    await dbConnect();
    logger.info('Connected to MongoDB.');
  } catch (error) {
    logger.error(`Failed to connect to MongoDB: ${error.message}`);
    process.exit(1); // Exit if database connection fails
  }
})();

// Create HTTP Server
const server = http.createServer(app);

// Start Server
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Graceful Shutdown
process.on('SIGINT', async () => {
  logger.info('Shutting down server...');
  redisClient.quit();
  process.exit(0);
});
