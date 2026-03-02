import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Music, Wind, Headphones } from 'lucide-react';

const YogaMeditation = () => {
  // Timer State
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  // Breathing State
  const [breathPhase, setBreathPhase] = useState('Inhale');
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  // Breathing Animation Logic (4s Inhale, 4s Exhale)
  useEffect(() => {
    let breathInterval = null;
    if (isBreathingActive) {
      breathInterval = setInterval(() => {
        setBreathPhase(prev => prev === 'Inhale' ? 'Exhale' : 'Inhale');
      }, 4000); // Changes every 4 seconds
    } else {
      setBreathPhase('Ready');
    }
    return () => clearInterval(breathInterval);
  }, [isBreathingActive]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsTimerActive(!isTimerActive);
  const resetTimer = () => { setIsTimerActive(false); setTimeLeft(300); };
  const toggleBreathing = () => setIsBreathingActive(!isBreathingActive);

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-teal-900/40 to-slate-900 border border-teal-500/20 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <Wind className="text-teal-400" size={32} /> Zen Space
          </h2>
          <p className="text-slate-400 mt-2">Find your center. Breathe, relax, and focus.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* BREATHING EXERCISE SECTION */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-8">Guided Breathing</h3>
          
          {/* Animated Breathing Circle */}
          <div className="relative w-64 h-64 flex items-center justify-center mb-8">
            {/* Outer expanding ring */}
            <div className={`absolute w-full h-full rounded-full bg-teal-500/20 transition-all duration-[4000ms] ease-in-out ${isBreathingActive && breathPhase === 'Inhale' ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}></div>
            
            {/* Main breathing circle */}
            <div className={`relative z-10 flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 shadow-[0_0_40px_rgba(20,184,166,0.4)] transition-transform duration-[4000ms] ease-in-out ${isBreathingActive && breathPhase === 'Inhale' ? 'scale-125' : 'scale-100'}`}>
              <span className="text-3xl font-black text-white tracking-wider">
                {breathPhase}
              </span>
            </div>
          </div>

          <button 
            onClick={toggleBreathing}
            className="px-8 py-4 rounded-2xl bg-slate-800 text-teal-400 font-bold hover:bg-slate-700 transition-all flex items-center gap-2"
          >
            {isBreathingActive ? <Pause size={20} /> : <Play size={20} />}
            {isBreathingActive ? "Stop Breathing Exercise" : "Start Breathing"}
          </button>
        </div>

        {/* MEDITATION TIMER & MUSIC THERAPY */}
        <div className="space-y-8">
          
          {/* Focus Timer */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Meditation Timer</h3>
            <p className="text-slate-400 text-sm mb-6">Stay focused and silent.</p>
            
            <div className="text-7xl font-black text-slate-800 dark:text-white font-mono tracking-tight mb-8">
              {formatTime(timeLeft)}
            </div>
            
            <div className="flex items-center gap-4">
              <button onClick={toggleTimer} className="w-16 h-16 rounded-full bg-teal-500 text-slate-900 flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-teal-500/30">
                {isTimerActive ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
              </button>
              <button onClick={resetTimer} className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                <RotateCcw size={24} />
              </button>
            </div>
          </div>

          {/* Music Therapy Cards */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Headphones className="text-purple-500" size={24} /> Music Therapy
            </h3>
            
            <div className="space-y-4">
              {[
                { title: "Deep Focus Rain", type: "Nature Sound", color: "bg-blue-500" },
                { title: "Binaural Beats (Theta)", type: "Meditation", color: "bg-purple-500" },
                { title: "Tibetan Singing Bowls", type: "Healing", color: "bg-orange-500" }
              ].map((track, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:scale-[1.02] transition-transform cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg ${track.color}`}>
                      <Music size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-white">{track.title}</h4>
                      <p className="text-xs text-slate-500">{track.type}</p>
                    </div>
                  </div>
                  <button className="p-3 rounded-full bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 shadow-sm">
                    <Play size={16} className="ml-0.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default YogaMeditation;