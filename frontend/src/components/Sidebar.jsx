import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import Chatbot from "./Chatbot/chatbot";

// ✅ Props add kiye: isOpen aur toggleSidebar
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isActive = (path) => location.pathname === path;
  
  const activeStyle = "p-3 bg-teal-600 text-white rounded-xl cursor-pointer block transition-all font-bold shadow-lg shadow-teal-500/20";
  const inactiveStyle = "p-3 hover:bg-slate-800 text-gray-400 rounded-xl cursor-pointer block transition-all";

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={toggleSidebar} />
      )}

      {/* ✅ Sidebar Drawer Logic */}
      <div className={`fixed top-0 left-0 h-screen w-64 bg-slate-900 text-white p-5 border-r border-slate-800 z-50 flex flex-col transition-transform duration-300 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        
        <h1 className="text-2xl font-bold text-teal-400 mb-10 flex items-center gap-2">
          🧘‍♀️ HealthOS
        </h1>
        
        <nav className="space-y-3 flex-1 overflow-y-auto">
          <Link to="/" onClick={toggleSidebar} className={isActive('/') ? activeStyle : inactiveStyle}>📊 Dashboard</Link>
          <Link to="/workout" onClick={toggleSidebar} className={isActive('/workout') ? activeStyle : inactiveStyle}>🏃‍♀️ Workout Tracker</Link>
          <Link to="/chat" onClick={toggleSidebar} className={isActive('/chat') ? activeStyle : inactiveStyle}>🤖 Health Advisor</Link>
          <Link to="/yoga" onClick={toggleSidebar} className={isActive('/yoga') ? activeStyle : inactiveStyle}>🧘 Yoga & Meditation</Link>
          <Link to="/sleep" onClick={toggleSidebar} className={isActive('/sleep') ? activeStyle : inactiveStyle}>😴 Sleep Schedule</Link>
          <Link to="/water" onClick={toggleSidebar} className={isActive('/water') ? activeStyle : inactiveStyle}>💧 Water Intake</Link>
          <Link to="/puzzles" onClick={toggleSidebar} className={isActive('/puzzles') ? activeStyle : inactiveStyle}>🧠 Mind Puzzles</Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;