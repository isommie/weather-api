const express = require('express');
const cors = require('cors');
const logger = require('./src/utils/logger');
const errorHandler = require('./src/utils/errorHandler');
const { scheduleCacheUpdate } = require('./src/utils/scheduler');
const weatherRoutes = require('./src/routes/weatherRoutes');
const connectToDatabase = require('./src/config/dbConfig');
const redisClient = require('./src/config/redisConfig');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/weather', weatherRoutes);

// Error Handling Middleware
app.use(errorHandler);

// MongoDB Connection
connectToDatabase();

// Example Redis Usage (for debugging/testing purposes)
redisClient.set('startup_check', 'Redis is working!', 'EX', 60, (err, reply) => {
  if (err) {
    logger.error('Error setting Redis key:', err);
  } else {
    logger.info('Redis startup check reply:', reply);
  }
});

// Schedule periodic cache updates
scheduleCacheUpdate();

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
