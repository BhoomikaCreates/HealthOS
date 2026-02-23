const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); 

// Import the database blueprint we just created
const HealthData = require('./models/HealthData');

dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares to parse JSON and allow cross-origin requests
app.use(cors());
app.use(express.json());

// Establish MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🟢 DATABASE CONNECTED SUCCESSFULLY! 🎉");
  })
  .catch((err) => {
    console.log("🔴 Database connection failed:", err);
  });

// 🚀 POST API: Save new activity log to the database
app.post('/api/health-data', async (req, res) => {
  try {
    const { water, sleep, steps, calories } = req.body;
    
    // Create a new record using our Mongoose model
    const newEntry = new HealthData({
      water,
      sleep,
      steps,
      calories
    });

    // Save it permanently to MongoDB
    await newEntry.save();
    
    res.status(201).json({ message: "Data saved successfully!", data: newEntry });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Failed to save data to the server." });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log('✅ Backend Server running on Port ${PORT}');
});

// GET API: Fetch the latest 7 days of health data for the dashboard charts
app.get('/api/health-data', async (req, res) => {
  try {
    const data = await HealthData
      .find()
      .sort({ date: -1 })   // newest first
      .limit(7);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch data from the server." });
  }
});