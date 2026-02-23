import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { Droplets, Moon, Footprints, Flame, Bot, Zap, Target, Plus, X } from "lucide-react";
// NEW: Recharts imports for rendering the progress graphs
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// NEW: Dummy data array for the weekly progress chart
const weeklyData = [
  { name: 'Mon', water: 1.5, sleep: 5 },
  { name: 'Tue', water: 2.0, sleep: 6 },
  { name: 'Wed', water: 2.5, sleep: 7 },
  { name: 'Thu', water: 1.8, sleep: 4.5 },
  { name: 'Fri', water: 3.0, sleep: 8 },
  { name: 'Sat', water: 2.8, sleep: 7.5 },
  { name: 'Sun', water: 2.2, sleep: 6.5 },
];

function App() {
  // 1. Dashboard Statistics State
  const [stats, setStats] = useState({
    water: "Loading...",
    sleep: "...",
    steps: "...",
    calories: "..."
  });

  // 2. Modal Visibility and Form Data State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    water: "",
    sleep: "",
    steps: "",
    calories: ""
  });

  // Populate initial dummy data on component mount
  useEffect(() => {
    setStats({
      water: "1.2 Liters", 
      sleep: "4 Hours",    
      steps: "8,432",
      calories: "2,100 Kcal"
    });
  }, []);

  // AI BRAIN 1: Dynamic time-based greeting logic (Bengaluru Theme)
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning, machha";
    if (hour >= 12 && hour < 17) return "Good Afternoon, guru";
    if (hour >= 17 && hour < 22) return "Good Evening, bro";
    return "It's late night, maga";
  };

  // AI BRAIN 2: Dynamic health analysis and sassy feedback
  const getSassyMessage = () => {
    const hour = new Date().getHours();
    
    // Check for late-night app usage
    if (hour >= 0 && hour <= 4) return "Bro, what are you doing up at this hour? Go sleep maga, or tomorrow you'll be a zombie at work! 🦉";
    
    // Check for sleep deprivation
    const sleepHours = parseInt(stats.sleep) || 0;
    if (stats.sleep !== "..." && sleepHours < 5) return "Guru, are you crazy? Just 4 hours of sleep? You're running on fumes machha. Go catch some Zs! 🧟‍♀️";
    
    // Check for dehydration
    const waterQty = parseFloat(stats.water) || 0;
    if (stats.water !== "Loading..." && waterQty < 2) return "Machha, did you forget water exists? You're going to dehydrate and dry up. Drink a glass right now! 💧";
    
    // Default positive reinforcement
    return "Everything is sorted, maga! You're crushing your goals today! 💪";
  };

  // Handle data submission from the activity logging modal
  const handleLogData = (e) => {
    e.preventDefault();
    console.log("Data ready to be dispatched to Database:", formData);
    
    // Optimistic UI update to reflect changes immediately
    setStats({
      water: `${formData.water || 0} Liters`,
      sleep: `${formData.sleep || 0} Hours`,
      steps: formData.steps || "0",
      calories: `${formData.calories || 0} Kcal`
    });
    
    // Close modal and reset form state
    setIsModalOpen(false); 
    setFormData({ water: "", sleep: "", steps: "", calories: "" }); 
  };

  return (
    <div className="flex bg-black min-h-screen text-white relative">
      <Sidebar />

      <div className="ml-64 p-8 w-full">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold">{getGreeting()}! ✨</h1>
            <p className="text-gray-400 mt-2">Your Personal AI Tracker 🤖</p>
          </div>
          
          {/* Trigger button for Activity Modal */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-teal-500 hover:bg-teal-400 text-black font-bold py-3 px-6 rounded-full flex items-center gap-2 transition-all shadow-lg shadow-teal-500/20"
          >
            <Plus size={20} /> Log Activity
          </button>
        </div>

        {/* AI Health Agent Feedback Banner */}
        <div className="bg-gradient-to-r from-teal-900 to-slate-900 border border-teal-500/50 p-5 rounded-2xl mb-10 flex items-center gap-4 shadow-lg shadow-teal-500/10">
          <div className="bg-teal-500 p-3 rounded-full text-black">
            <Bot size={32} />
          </div>
          <div>
            <h2 className="text-teal-300 font-bold text-lg">AI Health Agent</h2>
            <p className="text-slate-200 text-md mt-1">{getSassyMessage()}</p>
          </div>
        </div>
        
        {/* Core Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-blue-500 transition-all">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-400 text-sm font-bold uppercase">Water</h3>
              <Droplets className="text-blue-400" size={20} />
            </div>
            <p className="text-3xl font-bold text-blue-400">{stats.water}</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-purple-500 transition-all">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-400 text-sm font-bold uppercase">Sleep</h3>
              <Moon className="text-purple-400" size={20} />
            </div>
            <p className="text-3xl font-bold text-purple-400">{stats.sleep}</p>
          </div>
           <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-green-500 transition-all">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-400 text-sm font-bold uppercase">Steps</h3>
              <Footprints className="text-green-400" size={20} />
            </div>
            <p className="text-3xl font-bold text-green-400">{stats.steps}</p>
          </div>
           <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-orange-500 transition-all">
             <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-400 text-sm font-bold uppercase">Calories</h3>
              <Flame className="text-orange-400" size={20} />
            </div>
            <p className="text-3xl font-bold text-orange-400">{stats.calories}</p>
          </div>
        </div>

        {/* Weekly Progress Analytics Chart */}
        <div className="mt-10 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all">
          <h2 className="text-xl font-bold text-white mb-6">Weekly Progress Overview 📈</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  {/* Custom SVG Gradients for chart aesthetics */}
                  <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff', borderRadius: '12px' }} 
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="water" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorWater)" name="Water (Liters)" />
                <Area type="monotone" dataKey="sleep" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorSleep)" name="Sleep (Hours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Tasks and Streak Gamification Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
           
           {/* Action Plan Component */}
           <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:col-span-2 shadow-lg hover:border-slate-600 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-teal-500/20 p-2 rounded-lg">
                  <Target className="text-teal-400" size={24} />
                </div>
                <h2 className="text-xl font-bold text-white">Today's Action Plan</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="text-slate-300 font-medium">Morning Yoga (20 mins)</span> 
                  <span className="bg-green-500/10 text-green-400 px-4 py-1 rounded-full text-xs font-bold border border-green-500/20">Done ✅</span>
                </li>
                <li className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="text-slate-300 font-medium">Drink Water (3L Goal)</span> 
                  <span className="bg-yellow-500/10 text-yellow-400 px-4 py-1 rounded-full text-xs font-bold border border-yellow-500/20">In Progress ⏳</span>
                </li>
                <li className="flex justify-between items-center pb-1">
                  <span className="text-slate-300 font-medium">Evening Walk (10k steps)</span> 
                  <span className="bg-slate-800 text-slate-400 px-4 py-1 rounded-full text-xs font-bold border border-slate-700">Pending ⭕</span>
                </li>
              </ul>
           </div>
           
           {/* User Retention Streak Component */}
           <div className="bg-gradient-to-br from-orange-900/40 to-slate-900 border border-orange-500/30 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-lg shadow-orange-500/10 hover:border-orange-500/50 transition-all">
              <div className="bg-orange-500/20 p-4 rounded-full mb-4 animate-pulse">
                <Zap className="text-orange-400" size={40} />
              </div>
              <h2 className="text-lg font-bold text-orange-300 uppercase tracking-wider">Daily Streak</h2>
              <p className="text-6xl font-black text-white mt-2">12</p>
              <p className="text-orange-200/60 mt-2 font-medium">Days Active 🔥</p>
           </div>
        </div>
      </div>

      {/* Activity Input Modal Overlay */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl w-full max-w-md shadow-2xl relative">
            
            {/* Modal Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-white">Log Today's Activity</h2>
            
            {/* Activity Data Form */}
            <form onSubmit={handleLogData} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Water (Liters)</label>
                <input 
                  type="number" step="0.1" required
                  className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl p-3 focus:outline-none focus:border-teal-500"
                  value={formData.water}
                  onChange={(e) => setFormData({...formData, water: e.target.value})}
                  placeholder="e.g. 2.5"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Sleep (Hours)</label>
                <input 
                  type="number" step="0.5" required
                  className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl p-3 focus:outline-none focus:border-teal-500"
                  value={formData.sleep}
                  onChange={(e) => setFormData({...formData, sleep: e.target.value})}
                  placeholder="e.g. 7"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Steps Walked</label>
                <input 
                  type="number" required
                  className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl p-3 focus:outline-none focus:border-teal-500"
                  value={formData.steps}
                  onChange={(e) => setFormData({...formData, steps: e.target.value})}
                  placeholder="e.g. 8000"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Calories Burned (Kcal)</label>
                <input 
                  type="number" required
                  className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl p-3 focus:outline-none focus:border-teal-500"
                  value={formData.calories}
                  onChange={(e) => setFormData({...formData, calories: e.target.value})}
                  placeholder="e.g. 2100"
                />
              </div>
              
              {/* Form Submit Button */}
              <button 
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-400 text-black font-bold py-3 rounded-xl mt-4 transition-all"
              >
                Save to Database 🚀
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;