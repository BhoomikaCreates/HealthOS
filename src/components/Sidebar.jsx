import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-5 fixed left-0 top-0 border-r border-slate-800">
      <h1 className="text-2xl font-bold text-teal-400 mb-10 flex items-center gap-2">
        🧘‍♀️ HealthOS
      </h1>
      <ul className="space-y-4">
        <li className="p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-teal-600 transition-all">
          📊 Dashboard
        </li>
        <li className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer transition-all">
          🏃‍♀️ Workout Tracker
        </li>
        <li className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer transition-all">
          🧘 Yoga & Meditation
        </li>
        <li className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer transition-all">
          😴 Sleep Schedule
        </li>
        <li className="p-3 hover:bg-slate-800 rounded-lg cursor-pointer transition-all">
          💧 Water Intake
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;