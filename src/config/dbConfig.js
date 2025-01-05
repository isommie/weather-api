const mongoose = require('mongoose');
const logger = require('../utils/logger');

const dbConfig = {
  uri: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongodb:27017/${process.env.MONGO_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbConfig.uri, dbConfig.options);
    logger.info('Successfully connected to MongoDB.');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectToDatabase;
