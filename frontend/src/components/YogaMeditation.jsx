import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Wind, Headphones, Music, Sparkles } from 'lucide-react';
import Lottie from "lottie-react";
import zenAnimation from "../assets/medi_zen.json";

const YogaMeditation = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [cycleTime, setCycleTime] = useState(0);
  const [phase, setPhase] = useState('Ready');
  const [scale, setScale] = useState('scale-100');

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setCycleTime((prev) => (prev + 1) % 12);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setPhase('Done 🎉');
      setScale('scale-100');
    } else if (!isActive) {
      setCycleTime(0);
      setPhase('Paused');
      setScale('scale-100');
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (!isActive) return;
    if (cycleTime < 4) {
      setPhase('Breathe In');
      setScale('scale-[1.4]');
    } else if (cycleTime < 6) {
      setPhase('Hold');
      setScale('scale-[1.4]');
    } else if (cycleTime < 10) {
      setPhase('Breathe Out');
      setScale('scale-100');
    } else {
      setPhase('Hold');
      setScale('scale-100');
    }
  }, [cycleTime, isActive]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleSession = () => {
    if (phase === 'Ready' || phase === 'Done 🎉' || phase === 'Paused') setPhase('Starting...');
    setIsActive(!isActive);
  };

  const resetSession = () => {
    setIsActive(false);
    setTimeLeft(300);
    setCycleTime(0);
    setPhase('Ready');
    setScale('scale-100');
  };

  const musicTracks = [
    { name: 'Deep Focus Rain', icon: Wind, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { name: 'Binaural Beats', icon: Headphones, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { name: 'Tibetan Bowls', icon: Music, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { name: 'Forest Ambiance', icon: Wind, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { name: 'Ocean Waves', icon: Wind, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { name: 'Brown Noise', icon: Headphones, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-16 px-4">
      <div className="bg-gradient-to-br from-indigo-950 via-slate-950 to-teal-950/80 border border-teal-500/20 p-8 md:p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_40px_120px_-70px_rgba(20,184,166,0.18)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex-1">
          <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-4 tracking-tight">
            <Wind className="text-teal-400" size={36} /> Zen Space
          </h2>
          <p className="text-slate-300 mt-2 text-lg italic">Find your center. Breathe, relax, and focus with Box Breathing.</p>
        </div>
        <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 z-10">
          <Lottie animationData={zenAnimation} loop={true} className="w-full h-full drop-shadow-[0_0_20px_rgba(20,184,166,0.3)]" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 xl:col-span-8 bg-slate-950/95 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-slate-800 shadow-[0_40px_120px_-70px_rgba(15,23,42,0.35)] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Lottie animationData={zenAnimation} loop={true} className="w-full h-full object-cover" />
          </div>
          <div className={`absolute inset-0 rounded-[3rem] border-2 transition-colors duration-1000 ${isActive ? 'border-teal-500/20' : 'border-slate-800'}`}></div>

          <h3 className="text-2xl font-black text-slate-50 mb-10 z-10 flex items-center gap-3">
            Focus Session <Sparkles className="text-amber-300" size={20} />
          </h3>

          <div className="relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center mb-12 z-10">
            <div className={`absolute w-full h-full rounded-full border-2 border-teal-400/40 transition-all duration-[4000ms] ease-in-out ${isActive && phase === 'Breathe In' ? 'scale-[1.8] opacity-0' : 'scale-100 opacity-100'}`}></div>
            <div className={`absolute w-full h-full rounded-full border border-emerald-400/30 transition-all duration-[4000ms] ease-in-out delay-500 ${isActive && phase === 'Breathe In' ? 'scale-[1.6] opacity-0' : 'scale-100 opacity-100'}`}></div>

            <div className={`relative z-10 flex flex-col items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-300 shadow-[0_0_60px_rgba(20,184,166,0.35)] transition-transform duration-[4000ms] ease-in-out ${scale}`}>
              <span className="text-2xl font-black text-white tracking-widest drop-shadow-md text-center px-4 leading-tight">
                {phase}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center z-10 space-y-8">
            <div className="text-6xl md:text-7xl font-black text-slate-50 font-mono tracking-tighter drop-shadow-sm">
              {formatTime(timeLeft)}
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <button onClick={resetSession} className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-900 text-slate-300 flex items-center justify-center border border-slate-700 hover:bg-slate-800 hover:text-rose-400 transition-all active:scale-95 shadow-inner">
                <RotateCcw size={24} />
              </button>
              <button onClick={toggleSession} className="px-8 py-4 md:px-10 md:py-5 rounded-full bg-slate-950 text-teal-300 font-black text-lg md:text-xl hover:scale-105 transition-all flex items-center gap-3 shadow-xl shadow-teal-500/20 active:scale-95">
                {isActive ? <Pause size={24} /> : <Play size={24} />}
                {isActive ? "Pause" : "Start"}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4 bg-slate-950/95 p-8 rounded-[3rem] border border-slate-800 shadow-[0_40px_120px_-70px_rgba(15,23,42,0.35)] flex flex-col h-[600px] lg:h-auto max-h-[700px]">
          <h3 className="text-xl md:text-2xl font-black text-slate-50 mb-2 flex items-center gap-3">
            <Headphones className="text-purple-400" size={24} /> Soundscapes
          </h3>
          <p className="text-slate-400 text-sm mb-6 italic">(Coming Soon)</p>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {musicTracks.map((track, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-sm">
                <div className={`w-12 h-12 rounded-3xl flex items-center justify-center ${track.bg} ${track.color} border border-slate-900`}>
                  <track.icon size={22} />
                </div>
                <div>
                  <span className="font-bold text-slate-50">{track.name}</span>
                  <p className="text-xs text-slate-400 mt-0.5">Instrumental / Ambient</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YogaMeditation;