import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";

function App() {
  const [stats, setStats] = useState({
    water: "Loading...",
    sleep: "...",
    steps: "...",
    calories: "..."
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />

      <div className="ml-64 p-8 w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">Good morning User! ☀️</h1>
            <p className="text-gray-400 mt-2">Let's crush your goals today! 💪</p>
          </div>
          <button className="bg-teal-500 px-6 py-2 rounded-full font-bold hover:bg-teal-600 transition shadow-lg shadow-teal-500/30">
            + Log Workout
          </button>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Card 1: Water */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-blue-500 transition-all">
            <h3 className="text-gray-400 text-sm font-bold uppercase">Water Intake</h3>
            <p className="text-3xl font-bold text-blue-400 mt-2">{stats.water}</p>
            <p className="text-xs text-slate-500 mt-2">Goal: 3 Liters 💧</p>
          </div>

          {/* Card 2: Sleep */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-purple-500 transition-all">
            <h3 className="text-gray-400 text-sm font-bold uppercase">Sleep</h3>
            <p className="text-3xl font-bold text-purple-400 mt-2">{stats.sleep}</p>
            <p className="text-xs text-slate-500 mt-2">Quality: Deep 😴</p>
          </div>

           {/* Card 3: Steps */}
           <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-green-500 transition-all">
            <h3 className="text-gray-400 text-sm font-bold uppercase">Steps</h3>
            <p className="text-3xl font-bold text-green-400 mt-2">{stats.steps}</p>
            <p className="text-xs text-slate-500 mt-2">Keep walking! 🏃‍♀️</p>
          </div>

           {/* Card 4: Calories */}
           <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-orange-500 transition-all">
            <h3 className="text-gray-400 text-sm font-bold uppercase">Calories Burned</h3>
            <p className="text-3xl font-bold text-orange-400 mt-2">{stats.calories}</p>
            <p className="text-xs text-slate-500 mt-2">Yoga Session Included 🔥</p>
          </div>

        </div>

        {/* Activity Section */}
        <div className="mt-10 grid grid-cols-2 gap-8">
           <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
              <h2 className="text-xl font-bold mb-4">🧘‍♀️ Today's Plan</h2>
              <ul className="space-y-3">
                <li className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Morning Yoga</span> <span className="text-green-400">Done ✅</span>
                </li>
                <li className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Drink Water (2L)</span> <span className="text-yellow-400">In Progress ⏳</span>
                </li>
                <li className="flex justify-between pb-2">
                  <span>Evening Walk</span> <span className="text-gray-500">Pending ⭕</span>
                </li>
              </ul>
           </div>
           
           <div className="bg-gradient-to-r from-teal-900 to-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-center items-center text-center">
              <h2 className="text-2xl font-bold text-teal-300">Daily Streak 🔥</h2>
              <p className="text-6xl font-bold text-white mt-4">12</p>
              <p className="text-gray-300">Days Active</p>
           </div>
        </div>

      </div>
    </div>
  );
}

export default App;