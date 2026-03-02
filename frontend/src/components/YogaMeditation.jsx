import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Wind, Headphones, Music, Sparkles } from 'lucide-react';
import Lottie from "lottie-react";
// ✅ IMPORT LOTTIE ANIMATION (Make sure src/assets/zen.json exists!)
import zenAnimation from "../assets/Zen.json"; 

const YogaMeditation = () => {
  // Combined State for Session
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [cycleTime, setCycleTime] = useState(0); // Tracks the 12-second breathing cycle
  const [phase, setPhase] = useState('Ready');
  const [scale, setScale] = useState('scale-100');

  // Master Timer & Cycle Logic
  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setCycleTime((prev) => (prev + 1) % 12); // 12-second total cycle
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setPhase('Done 🎉');
      setScale('scale-100');
    } else if (!isActive) {
      // Reset cycle visuals when paused, but keep timer intact
      setCycleTime(0);
      setPhase('Paused');
      setScale('scale-100');
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Breathing Phases (4s Inhale, 2s Hold, 4s Exhale, 2s Hold)
  useEffect(() => {
    if (!isActive) return;

    if (cycleTime < 4) {
      setPhase('Breathe In');
      setScale('scale-[1.5]');
    } else if (cycleTime < 6) {
      setPhase('Hold');
      setScale('scale-[1.5]'); // Maintain size
    } else if (cycleTime < 10) {
      setPhase('Breathe Out');
      setScale('scale-100');
    } else {
      setPhase('Hold');
      setScale('scale-100'); // Maintain size
    }
  }, [cycleTime, isActive]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleSession = () => {
    if (phase === 'Ready' || phase === 'Done 🎉' || phase === 'Paused') {
      setPhase('Starting...');
    }
    setIsActive(!isActive);
  };

  const resetSession = () => {
    setIsActive(false);
    setTimeLeft(300);
    setCycleTime(0);
    setPhase('Ready');
    setScale('scale-100');
  };

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      
      {/* HEADER SECTION (Enhanced Gradient & Lottie) */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-950 to-teal-950/70 border border-teal-500/20 p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        {/* Background decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex-1">
          <h2 className="text-4xl font-black text-white flex items-center gap-4 tracking-tighter drop-shadow-lg">
            <Wind className="text-teal-400" size={40} /> Zen Space
          </h2>
          <p className="text-slate-300 mt-3 text-lg leading-relaxed max-w-xl italic">Find your center. Breathe, relax, and focus with Box Breathing.</p>
        </div>
        
        {/* SMALL LOTTIE FOR HEADER */}
        <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 z-10">
          <Lottie animationData={zenAnimation} loop={true} className="w-full h-full drop-shadow-[0_0_15px_rgba(20,184,166,0.3)]" />
        </div>
      </div>

      {/* COMBINED FOCUS SESSION CARD (Atmospheric Background Lottie) */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-10 md:p-14 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* ✅ LOTTIE ATMOSPHERE BACKGROUND (Subtle) */}
        <div className="absolute inset-0 w-full h-full opacity-[0.05] dark:opacity-[0.03] scale-110 pointer-events-none">
          <Lottie animationData={zenAnimation} loop={true} className="w-full h-full object-cover" />
        </div>

        {/* Dynamic Glowing Border Effect based on status */}
        <div className={`absolute inset-0 rounded-[3rem] border-2 transition-colors duration-1000 ${isActive ? 'border-teal-500/30' : 'border-slate-100 dark:border-slate-800'}`}></div>

        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-16 z-10 flex items-center gap-3">Focus Session <Sparkles className="text-yellow-400" size={20} /></h3>
        
        {/* THE BREATHING ORB (Enhanced Gradient & Glow) */}
        <div className="relative w-72 h-72 flex items-center justify-center mb-16 z-10">
          
          {/* Animated Outer Rings (Enhanced Ripples) */}
          <div className={`absolute w-full h-full rounded-full border-2 border-teal-400/40 transition-all duration-[4000ms] ease-in-out ${isActive && phase === 'Breathe In' ? 'scale-[2.2] opacity-0' : 'scale-100 opacity-100'}`}></div>
          <div className={`absolute w-full h-full rounded-full border border-emerald-400/30 transition-all duration-[4000ms] ease-in-out delay-500 ${isActive && phase === 'Breathe In' ? 'scale-[2] opacity-0' : 'scale-100 opacity-100'}`}></div>
          <div className={`absolute w-full h-full rounded-full border border-indigo-400/20 transition-all duration-[4000ms] ease-in-out delay-1000 ${isActive && phase === 'Breathe In' ? 'scale-[1.8] opacity-0' : 'scale-100 opacity-100'}`}></div>
          
          {/* Core Breathing Circle (More Premium Palette) */}
          <div className={`relative z-10 flex flex-col items-center justify-center w-52 h-52 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-300 shadow-[0_0_60px_rgba(20,184,166,0.6)] transition-transform duration-[4000ms] ease-in-out ${scale}`}>
            <span className="text-3xl font-black text-white tracking-widest drop-shadow-md text-center px-6 leading-tight">
              {phase}
            </span>
          </div>
        </div>

        {/* TIMER AND CONTROLS */}
        <div className="flex flex-col items-center z-10 space-y-10">
          
          <div className="text-7xl font-black text-slate-800 dark:text-white font-mono tracking-tighter drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
            {formatTime(timeLeft)}
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={resetSession} 
              className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center border dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:-rotate-90 hover:text-red-500 active:scale-95 shadow-inner"
            >
              <RotateCcw size={24} />
            </button>

            <button 
              onClick={toggleSession}
              className="px-12 py-6 rounded-full bg-slate-900 dark:bg-white text-teal-400 dark:text-teal-600 font-black text-xl hover:scale-105 transition-all flex items-center gap-3 shadow-xl shadow-teal-500/30 active:scale-95"
            >
              {isActive ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
              {isActive ? "Pause Session" : "Start Session"}
            </button>
          </div>
        </div>

      </div>

      {/* MUSIC THERAPY (Polished Placeholder UI) */}
      <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-500">
        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-3 flex items-center gap-3">
          <Headphones className="text-purple-500" size={28} /> Music Therapy
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 italic">Enhance your focus with nature soundscapes. (Coming Soon)</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60 grayscale pointer-events-none">
          {[
            { name: 'Deep Focus Rain', icon: Wind, color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { name: 'Binaural Beats', icon: Headphones, color: 'text-purple-400', bg: 'bg-purple-500/10' },
            { name: 'Tibetan Bowls', icon: Music, color: 'text-orange-400', bg: 'bg-orange-500/10' }
          ].map((track, i) => (
            <div key={i} className="flex items-center gap-5 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border dark:border-slate-700 shadow-inner">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${track.bg} ${track.color} border border-transparent`}>
                <track.icon size={26} />
              </div>
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300 text-lg">{track.name}</span>
                <p className="text-xs text-slate-500 mt-1">Instrumental/Ambient</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default YogaMeditation;