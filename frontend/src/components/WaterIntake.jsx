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
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="bg-slate-950/95 p-8 rounded-[2.5rem] border border-slate-800 shadow-[0_40px_120px_-70px_rgba(59,130,246,0.25)] relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
          <Droplets className="text-cyan-300" size={40} />
          Hydration Tracker
        </h1>
        <p className="text-slate-400 mb-8">Track your daily water intake. Goal: {goal} glasses.</p>

        <div className="flex flex-col items-center justify-center bg-slate-900/80 p-10 rounded-[2rem] border border-slate-800 mb-8">
          <div className="flex gap-4 mb-8 flex-wrap justify-center">
            {[...Array(goal)].map((_, index) => (
              <div
                key={index}
                className={`w-12 h-16 rounded-b-3xl border-2 transition-all duration-500 flex items-end p-1 ${index < glasses ? 'border-cyan-400 bg-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.25)]' : 'border-slate-700 bg-slate-900'}`}
              >
                <div className={`w-full bg-cyan-400 rounded-b-full transition-all duration-500 ${index < glasses ? 'h-full' : 'h-0'}`}></div>
              </div>
            ))}
          </div>
          <h2 className="text-3xl font-black text-white mb-2">
            {glasses} / {goal} <span className="text-sm text-slate-400 font-medium">Glasses</span>
          </h2>
          {glasses >= goal && (
            <p className="text-emerald-300 font-medium animate-pulse mt-2">Goal Reached! Awesome job! 🎉</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={addGlass} disabled={glasses >= goal} className="bg-gradient-to-r from-cyan-400 to-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 px-8 py-4 rounded-3xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20">
            <Plus size={24} /> Drink a Glass
          </button>
          <button onClick={resetWater} className="bg-slate-900 hover:bg-slate-800 text-slate-200 px-6 py-4 rounded-3xl font-bold flex items-center gap-2 transition-all border border-slate-700">
            <Trash2 size={20} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaterIntake;