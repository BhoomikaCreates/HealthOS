import React, { useState, useEffect } from 'react';
import { Moon, Sun, Clock, Star, CheckCircle, BedDouble, Info, Headphones, Music, Circle, BookOpen, PlayCircle } from 'lucide-react';

const SleepSchedule = () => {
  const [wakeUpTime, setWakeUpTime] = useState('07:00');
  const [suggestedBedtimes, setSuggestedBedtimes] = useState([]);
  const [sleepRating, setSleepRating] = useState(0);
  const [hoursSlept, setHoursSlept] = useState(7.5);

  const [routine, setRoutine] = useState([
    { id: 1, task: 'No screens 1 hour before bed', done: false },
    { id: 2, task: 'Read a book for 15 mins', done: false },
    { id: 3, task: 'Set room temp to cool', done: false },
    { id: 4, task: 'Dim the lights', done: false },
  ]);

  // Sleep Cycle Calculator Logic
  useEffect(() => {
    const calculateBedtimes = () => {
      const [hours, minutes] = wakeUpTime.split(':').map(Number);
      const wakeDate = new Date();
      wakeDate.setHours(hours, minutes, 0, 0);

      // 90-min cycles: 6 cycles (9h), 5 cycles (7.5h), 4 cycles (6h)
      // Adding 15 mins to fall asleep
      const cycles = [6, 5, 4]; 
      const times = cycles.map(c => {
        const bedTime = new Date(wakeDate.getTime() - (c * 90 * 60000) - (15 * 60000));
        return {
          time: bedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cycles: c,
          hours: (c * 90) / 60
        };
      });
      setSuggestedBedtimes(times);
    };

    calculateBedtimes();
  }, [wakeUpTime]);

  const toggleRoutine = (id) => {
    setRoutine(routine.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950/80 border border-indigo-500/20 p-8 md:p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex-1">
          <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-4 tracking-tighter drop-shadow-lg">
            <Moon className="text-indigo-400 fill-indigo-400" size={36} /> Sleep Lab
          </h2>
          <p className="text-slate-300 mt-2 text-lg italic">Optimize your sleep cycles and wake up refreshed.</p>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Sleep Calculator */}
        <div className="lg:col-span-7 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 md:p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl text-indigo-500">
              <Sun size={24} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">Smart Bedtime Calculator</h3>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 mb-8">
            <label className="block text-slate-500 dark:text-slate-400 font-bold mb-4">I want to wake up at:</label>
            <input 
              type="time" 
              value={wakeUpTime}
              onChange={(e) => setWakeUpTime(e.target.value)}
              className="w-full text-4xl font-black bg-transparent border-none text-slate-800 dark:text-white focus:ring-0 p-0"
            />
          </div>

          <div className="space-y-4">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Info size={16} /> Suggested Bedtimes
            </p>
            <p className="text-xs text-slate-500 mb-4">Includes 15 minutes to fall asleep.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {suggestedBedtimes.map((bed, idx) => (
                <div key={idx} className={`p-5 rounded-2xl border flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 ${idx === 1 ? 'bg-indigo-500 text-white border-indigo-400 shadow-lg shadow-indigo-500/30' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white'}`}>
                  {idx === 1 && <span className="text-xs font-bold uppercase tracking-wider mb-2 text-indigo-200">Optimal</span>}
                  <span className="text-2xl font-black mb-1">{bed.time}</span>
                  <span className={`text-sm ${idx === 1 ? 'text-indigo-100' : 'text-slate-500'}`}>{bed.cycles} Cycles ({bed.hours}h)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Logger & Routine */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* Quick Logger */}
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
            <h3 className="text-xl font-black text-slate-800 dark:text-white mb-6 flex items-center gap-3">
              <BedDouble className="text-violet-500" size={24} /> Rate Last Night
            </h3>
            
            <div className="mb-6">
              <label className="block text-slate-500 text-sm font-bold mb-3">Hours Slept: <span className="text-violet-500">{hoursSlept}h</span></label>
              <input 
                type="range" 
                min="0" max="12" step="0.5" 
                value={hoursSlept} 
                onChange={(e) => setHoursSlept(parseFloat(e.target.value))}
                className="w-full accent-violet-500"
              />
            </div>

            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
              <span className="font-bold text-slate-600 dark:text-slate-300">Quality:</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star} 
                    onClick={() => setSleepRating(star)}
                    className={`transition-all hover:scale-110 ${sleepRating >= star ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`}
                  >
                    <Star fill={sleepRating >= star ? 'currentColor' : 'none'} size={28} />
                  </button>
                ))}
              </div>
            </div>
            <button className="w-full mt-6 bg-slate-900 dark:bg-white text-violet-400 dark:text-violet-600 font-bold py-4 rounded-2xl hover:scale-[1.02] transition-transform">
              Log Sleep
            </button>
          </div>

          {/* Wind Down Routine */}
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl flex-1">
            <h3 className="text-xl font-black text-slate-800 dark:text-white mb-6 flex items-center gap-3">
              <Clock className="text-blue-500" size={24} /> Wind Down Checklist
            </h3>
            
            <div className="space-y-3">
              {routine.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => toggleRoutine(item.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${item.done ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30' : 'bg-slate-50 dark:bg-slate-800/50 border-transparent hover:border-slate-200 dark:hover:border-slate-700'}`}
                >
                  <div className={`${item.done ? 'text-blue-500' : 'text-slate-400 dark:text-slate-500'}`}>
                    
                    {item.done ? (
                      <CheckCircle fill="currentColor" className="text-white dark:text-slate-900" size={24} />
                    ) : (
                      <Circle size={24} />
                    )}
                  </div>
                  <span className={`font-bold transition-all ${item.done ? 'text-blue-700 dark:text-blue-400 line-through opacity-70' : 'text-slate-700 dark:text-slate-300'}`}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 NEW: CAN'T SLEEP SOS SECTION (PLACEHOLDERS) */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 md:p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl mt-8">
        <div className="mb-8">
          <h3 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3">
            <Headphones className="text-indigo-500" size={28} /> Can't Sleep? SOS 🌙
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Soothing soundscapes and stories to help you drift off. (Audio integration coming soon)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Rain Sounds */}
          <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex flex-col gap-4 group cursor-pointer hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all">
              <Music size={26} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-white text-lg">Heavy Rain & Thunder</h4>
              <p className="text-sm text-slate-500 mt-1">90 min • Ambient Noise</p>
            </div>
            <button className="mt-2 w-full py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2 font-bold group-hover:border-blue-500 group-hover:text-blue-500 transition-colors">
              <PlayCircle size={20} /> Play
            </button>
          </div>

          {/* Card 2: Sleep Story */}
          <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex flex-col gap-4 group cursor-pointer hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              <BookOpen size={26} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-white text-lg">The Midnight Train</h4>
              <p className="text-sm text-slate-500 mt-1">45 min • Sleep Story</p>
            </div>
            <button className="mt-2 w-full py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2 font-bold group-hover:border-indigo-500 group-hover:text-indigo-500 transition-colors">
              <PlayCircle size={20} /> Play
            </button>
          </div>

          {/* Card 3: Guided Nidra */}
          <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex flex-col gap-4 group cursor-pointer hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all">
              <Moon size={26} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-white text-lg">Deep Yoga Nidra</h4>
              <p className="text-sm text-slate-500 mt-1">30 min • Guided Meditation</p>
            </div>
            <button className="mt-2 w-full py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2 font-bold group-hover:border-purple-500 group-hover:text-purple-500 transition-colors">
              <PlayCircle size={20} /> Play
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default SleepSchedule;