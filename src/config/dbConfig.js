const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectToDatabase = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      logger.info('Successfully connected to MongoDB.');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
      process.exit(1);
  }
};

module.exports = connectToDatabase;
