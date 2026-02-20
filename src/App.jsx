import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
// Added Zap (Streak) and Target (Plan) icons
import { Droplets, Moon, Footprints, Flame, Bot, Zap, Target } from "lucide-react";

function App() {
  const [stats, setStats] = useState({
    water: "Loading...",
    sleep: "...",
    steps: "...",
    calories: "..."
  });

  useEffect(() => {
    setStats({
      water: "1.2 Liters", 
      sleep: "4 Hours",    
      steps: "8,432",
      calories: "2,100 Kcal"
    });
  }, []);

  // 🧠 AI BRAIN 1: Time-based Namma Bengaluru Greetings
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning, machha";
    if (hour >= 12 && hour < 17) return "Good Afternoon, guru";
    if (hour >= 17 && hour < 22) return "Good Evening, bro";
    return "It's late night, maga";
  };

  // 🧠 AI BRAIN 2: Bengaluru Slang Sassy Messages
  const getSassyMessage = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour <= 4) return "Bro, what are you doing up at this hour? Go sleep maga, or tomorrow you'll be a zombie at work! 🦉";
    const sleepHours = parseInt(stats.sleep) || 0;
    if (stats.sleep !== "..." && sleepHours < 5) return "Guru, are you crazy? Just 4 hours of sleep? You're running on fumes machha. Go catch some Zs! 🧟‍♀️";
    const waterQty = parseFloat(stats.water) || 0;
    if (stats.water !== "Loading..." && waterQty < 2) return "Machha, did you forget water exists? You're going to dehydrate and dry up. Drink a glass right now! 💧";
    return "Everything is sorted, maga! You're crushing your goals today! 💪";
  };

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />

      <div className="ml-64 p-8 w-full">
        {/* Dynamic Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold">{getGreeting()}! ✨</h1>
            <p className="text-gray-400 mt-2">Your Personal AI Tracker 🤖</p>
          </div>
        </div>

        {/* 🚨 AI SASSY BOT ALERT BOX 🚨 */}
        <div className="bg-gradient-to-r from-teal-900 to-slate-900 border border-teal-500/50 p-5 rounded-2xl mb-10 flex items-center gap-4 shadow-lg shadow-teal-500/10">
          <div className="bg-teal-500 p-3 rounded-full text-black">
            <Bot size={32} />
          </div>
          <div>
            <h2 className="text-teal-300 font-bold text-lg">AI Health Agent</h2>
            <p className="text-slate-200 text-md mt-1">{getSassyMessage()}</p>
          </div>
        </div>
        
        {/* Pro Stats Grid with Lucide Icons */}
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

        {/* 🔥 NEW: Activity & Streak Section 🔥 */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
           
           {/* Today's Plan */}
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
           
           {/* Daily Streak */}
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
    </div>
  );
}

export default App;