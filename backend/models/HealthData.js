const mongoose = require('mongoose');

// Define the structure of our health data document
const healthDataSchema = new mongoose.Schema({
  water: {
    type: Number,
    required: true,
  },
  sleep: {
    type: Number,
    required: true,
  },
  steps: {
    type: Number,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});
// Export the model to use it in our server routes
module.exports = mongoose.model('HealthData', healthDataSchema);