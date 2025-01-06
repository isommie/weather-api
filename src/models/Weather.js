const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Weather', WeatherSchema);
