const Redis = require('ioredis');
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

module.exports = {
  set: async (key, value, ttl) => {
    try {
      const data = typeof value === 'string' ? value : JSON.stringify(value);
      await redis.set(key, data, 'EX', ttl);
    } catch (error) {
      console.error(`Error setting cache for key ${key}:`, error);
    }
  },

  get: async (key) => {
    try {
      const data = await redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error getting cache for key ${key}:`, error);
      return null;
    }
  },

  delete: async (key) => {
    try {
      await redis.del(key);
    } catch (error) {
      console.error(`Error deleting cache for key ${key}:`, error);
    }
  },
};
