import React, { useState } from 'react';
import { Droplets, Plus, Trash2 } from 'lucide-react';

const WaterIntake = () => {
  const [glasses, setGlasses] = useState(0);
  const goal = 8;

  const addGlass = () => {
    if (glasses < goal) setGlasses(glasses + 1);
  };

  const resetWater = () => setGlasses(0);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <Droplets className="text-blue-400" size={40} />
          Hydration Tracker
        </h1>
        <p className="text-gray-400 mb-8">Track your daily water intake. Goal: {goal} glasses.</p>

        <div className="flex flex-col items-center justify-center bg-slate-900/50 p-10 rounded-2xl border border-slate-700/50 mb-8">
          <div className="flex gap-4 mb-8 flex-wrap justify-center">
            {[...Array(goal)].map((_, index) => (
              <div 
                key={index} 
                className={`w-12 h-16 rounded-b-xl border-2 transition-all duration-500 flex items-end p-1
                  ${index < glasses ? 'border-blue-500 bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-slate-600 bg-slate-800'}`}
              >
                <div className={`w-full bg-blue-500 rounded-b-lg transition-all duration-500 ${index < glasses ? 'h-full' : 'h-0'}`}></div>
              </div>
            ))}
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {glasses} / {goal} <span className="text-lg text-gray-400 font-normal">Glasses</span>
          </h2>
          {glasses >= goal && (
            <p className="text-green-400 font-medium animate-pulse mt-2">Goal Reached! Awesome job! 🎉</p>
          )}
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={addGlass} disabled={glasses >= goal} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all">
            <Plus size={24} /> Drink a Glass
          </button>
          <button onClick={resetWater} className="bg-slate-700 hover:bg-red-500/20 hover:text-red-400 text-gray-300 px-6 py-4 rounded-xl font-bold flex items-center gap-2 transition-all">
            <Trash2 size={20} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaterIntake;