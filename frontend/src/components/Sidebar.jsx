import React from "react";
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  // Smart logic: Check karta hai ki user kis page par hai
  const isActive = (path) => location.pathname === path;

  // Active aur Inactive buttons ke designs
  const activeStyle = "p-3 bg-teal-600 text-white rounded-lg cursor-pointer block transition-all font-bold shadow-lg shadow-teal-500/20";
  const inactiveStyle = "p-3 hover:bg-slate-800 text-gray-300 rounded-lg cursor-pointer block transition-all";

  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-5 fixed left-0 top-0 border-r border-slate-800 z-40">
      <h1 className="text-2xl font-bold text-teal-400 mb-10 flex items-center gap-2">
        🧘‍♀️ HealthOS
      </h1>
      
      <nav className="space-y-4">
        <Link to="/" className={isActive('/') ? activeStyle : inactiveStyle}>
          📊 Dashboard
        </Link>
        
        <Link to="/workout" className={isActive('/workout') ? activeStyle : inactiveStyle}>
          🏃‍♀️ Workout Tracker
        </Link>

        {/* 👇 NAYA CHATBOT ROUTE 👇 */}
        <Link to="/chat" className={isActive('/chat') ? activeStyle : inactiveStyle}>
          🤖 Health Advisor
        </Link>
        
        <Link to="/yoga" className={isActive('/yoga') ? activeStyle : inactiveStyle}>
          🧘 Yoga & Meditation
        </Link>
        
        <Link to="/sleep" className={isActive('/sleep') ? activeStyle : inactiveStyle}>
          😴 Sleep Schedule
        </Link>
        
        <Link to="/water" className={isActive('/water') ? activeStyle : inactiveStyle}>
          💧 Water Intake
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;