const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); 

// Setup Secret Locker
dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// 🚀 MONGODB CONNECTION MAGIC 🚀
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🟢 DATABASE CONNECT HO GAYA! PARTY!! 🎉");
  })
  .catch((err) => {
    console.log("🔴 Database connection fail ho gaya bhai:", err);
  });

// API Route (Dummy data for now)
app.get('/api/dashboard', (req, res) => {
  res.json({
    water: "1.2 Liters",
    sleep: "4 Hours",
    steps: "8,432",
    calories: "2,100 Kcal",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Backend Server start ho gaya hai Port ${PORT} par!`);
});