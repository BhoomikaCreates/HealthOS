import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import Chatbot from "./Chatbot/chatbot";

const Sidebar = () => {
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isActive = (path) => location.pathname === path;
  const activeStyle = "p-3 bg-teal-600 text-white rounded-lg cursor-pointer block transition-all font-bold shadow-lg shadow-teal-500/20";
  const inactiveStyle = "p-3 hover:bg-slate-800 text-gray-300 rounded-lg cursor-pointer block transition-all";

  return (
    // ✅ FIX 1: restored exact original width w-64, added flex flex-col for bottom button
    <div className="w-64 h-screen bg-slate-900 text-white p-5 fixed left-0 top-0 border-r border-slate-800 z-40 flex flex-col">
      <h1 className="text-2xl font-bold text-teal-400 mb-10 flex items-center gap-2">
        🧘‍♀️ HealthOS
      </h1>
      
      <nav className="space-y-4 flex-1">
        <Link to="/" className={isActive('/') ? activeStyle : inactiveStyle}>
          📊 Dashboard
        </Link>
        
        <Link to="/workout" className={isActive('/workout') ? activeStyle : inactiveStyle}>
          🏃‍♀️ Workout Tracker
        </Link>

        {/* ✅ FIX 2: Health Advisor nav link kept — clicking trigger below opens chat */}
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

      {/* ✅ FIX 2: Trigger only toggles chatbot popup, does NOT navigate */}
      <div
        onClick={() => setIsChatOpen(prev => !prev)}
        className="mt-4 p-4 bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl cursor-pointer hover:from-teal-500 hover:to-teal-400 transition-all shadow-lg shadow-teal-500/30"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🤖</span>
          <div>
            <p className="text-sm font-bold text-white">AI Health Agent</p>
            <p className="text-xs text-teal-100">Ask anything...</p>
          </div>
          <span className="ml-auto text-white text-lg">{isChatOpen ? '✕' : '↑'}</span>
        </div>
      </div>

      {/* ✅ FIX 3: isChatOpen passed correctly — close button in Chatbot will call setIsOpen(false) */}
      <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
};

export default Sidebar;
