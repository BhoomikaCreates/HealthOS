const dotenv = require('dotenv');
dotenv.config(); 
const { GoogleGenerativeAI } = require("@google/generative-ai");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    systemInstruction: `You are a knowledgeable health advisor for HealthOS. Format every response like this:
- Use **bold** for key terms, headings, and important points.
- Use bullet points for lists, tips, or steps.
- Capitalize section headings (e.g. DIET, SLEEP, TIPS).
- Keep answers concise — under 120 words.
- Use a maximum of 1 emoji per response, only when genuinely useful.
- Never write walls of text. Always break into structured sections.
- Be direct, clear, and informative.`
    });

// Import the database blueprint we just created
const HealthData = require('./models/HealthData');


const app = express();
const PORT = process.env.PORT || 5005;

// Middlewares to parse JSON and allow cross-origin requests
app.use(cors({
  origin: ["https://health-os-mu.vercel.app", "http://localhost:5173", "http://localhost:5174"], // Specific frontend links
  credentials: true
}));
app.use(express.json());

// Establish MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🟢 DATABASE CONNECTED SUCCESSFULLY! 🎉");
  })
  .catch((err) => {
    console.log("🔴 Database connection failed:", err);
  });

  // ==========================================
// 🔐 AUTHENTICATION ROUTES (LOGIN & SIGNUP)
// ==========================================

// 1. SIGNUP ROUTE (Create a new account)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists! Log in instead, machha." });
    }

    // Hash the password (Security step)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user to MongoDB
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Create a token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email } });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Server crashed during signup." });
  }
});

// 2. LOGIN ROUTE
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found! Register first." });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Wrong password, guru!" });
    }

    // Create a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server crashed during login." });
  }
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

// GET API: Generate Dynamic Sassy AI Insight using Google Gemini
console.log("✅ AI Insight Route Loaded");
app.get('/api/ai-insight', async (req, res) => {
  try {
    // 1. Fetch the most recent health record from the database
    const latestData = await HealthData.findOne().sort({ date: -1 });
    
    // Fallback if the database is completely empty
    if (!latestData) {
      return res.status(200).json({ message: "Welcome machha! Log your first activity so I can judge your lifestyle! 🤖" });
    }

    // 2. Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 3. Construct the dynamic prompt using the user's actual data
const prompt = `You are a highly intelligent, witty, and sarcastic AI Health Advisor for a platform called HealthOS. 
Your objective is to provide evidence-based lifestyle, hydration, sleep, and cognitive health advice, but you must deliver it with sharp, dry sarcasm and a roasting (yet ultimately helpful) tone. 

CRITICAL INSTRUCTION: You must use standard, universally understood language. Strictly DO NOT use any regional slang, local dialects, or Bengaluru accent words (like 'maga', 'guru', 'machaa', or 'da'). Keep the sarcasm standard and corporate-friendly.

Based on the user's latest logged metrics:
- Sleep: ${userMetrics.sleep} hours
- Water Intake: ${userMetrics.water} Liters
- Steps: ${userMetrics.steps}
- Calories: ${userMetrics.calories} kcal

Provide a short, sarcastic, and actionable lifestyle tip in a maximum of 3 to 4 sentences. Roast the user slightly if their metrics are poor, but always include exactly how they can improve.`;

    // 4. Generate the response from the Gemini model
    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();
    
    // Send the AI generated text back to the frontend
    res.status(200).json({ message: aiResponse });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "The AI brain is currently experiencing downtime." });
  }
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Message is required" });
        const result = await model.generateContent(message);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Gemini API Error" });
    }
});
// Start the Express server
app.listen(PORT, () => {
  console.log(`✅ Backend Server running on Port ${PORT}`);
}); 

