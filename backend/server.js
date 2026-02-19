const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Test Route
// API Route - Ispe frontend request karega
// API Route - Personal Health Data
app.get('/api/dashboard', (req, res) => {
  res.json({
    water: "2.5 Liters",
    sleep: "7 Hours",
    steps: "8,432",
    calories: "2,100 Kcal",
    mood: "Happy 😊"
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});