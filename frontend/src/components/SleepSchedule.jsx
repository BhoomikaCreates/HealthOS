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

  useEffect(() => {
    const calculateBedtimes = () => {
      const [hours, minutes] = wakeUpTime.split(':').map(Number);
      const wakeDate = new Date();
      wakeDate.setHours(hours, minutes, 0, 0);

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
    <div className="space-y-8 animate-fade-in pb-16 px-4">
      <div className="bg-gradient-to-br from-violet-950 via-slate-950 to-indigo-950/80 border border-indigo-500/20 p-8 md:p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_40px_120px_-70px_rgba(79,70,229,0.2)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex-1">
          <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-4 tracking-tight">
            <Moon className="text-indigo-400" size={36} /> Sleep Lab
          </h2>
          <p className="text-slate-300 mt-2 text-lg italic">Optimize your sleep cycles and wake up refreshed.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-slate-950/90 backdrop-blur-xl p-8 md:p-10 rounded-[3rem] border border-slate-800 shadow-[0_40px_120px_-70px_rgba(15,23,42,0.35)]">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-indigo-500/10 rounded-3xl text-indigo-300">
              <Sun size={24} />
            </div>
            <h3 className="text-2xl font-black text-slate-50">Smart Bedtime Calculator</h3>
          </div>

          <div className="bg-slate-900/85 p-6 rounded-[2rem] border border-slate-800 mb-8">
            <label className="block text-slate-400 font-bold mb-4">I want to wake up at:</label>
            <input
              type="time"
              value={wakeUpTime}
              onChange={(e) => setWakeUpTime(e.target.value)}
              className="w-full text-4xl font-black bg-transparent border-none text-slate-50 focus:outline-none focus:ring-0 p-0"
            />
          </div>

          <div className="space-y-4">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Info size={16} /> Suggested Bedtimes
            </p>
            <p className="text-xs text-slate-500 mb-4">Includes 15 minutes to fall asleep.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {suggestedBedtimes.map((bed, idx) => (
                <div key={idx} className={`p-5 rounded-3xl flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 ${idx === 1 ? 'bg-indigo-500 text-white border border-indigo-400 shadow-[0_20px_70px_-30px_rgba(99,102,241,0.35)]' : 'bg-slate-900 border border-slate-800 text-slate-200'}`}>
                  {idx === 1 && <span className="text-xs font-bold uppercase tracking-wider mb-2 text-indigo-200">Optimal</span>}
                  <span className="text-2xl font-black mb-1">{bed.time}</span>
                  <span className={`text-sm ${idx === 1 ? 'text-indigo-100' : 'text-slate-400'}`}>{bed.cycles} Cycles ({bed.hours}h)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="bg-slate-950/90 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-800 shadow-[0_40px_120px_-70px_rgba(15,23,42,0.35)]">
            <h3 className="text-xl font-black text-slate-50 mb-6 flex items-center gap-3">
              <BedDouble className="text-violet-400" size={24} /> Rate Last Night
            </h3>

            <div className="mb-6">
              <label className="block text-slate-400 text-sm font-bold mb-3">Hours Slept: <span className="text-violet-300">{hoursSlept}h</span></label>
              <input
                type="range"
                min="0" max="12" step="0.5"
                value={hoursSlept}
                onChange={(e) => setHoursSlept(parseFloat(e.target.value))}
                className="w-full accent-violet-400"
              />
            </div>

            <div className="flex justify-between items-center bg-slate-900/80 p-4 rounded-3xl border border-slate-800">
              <span className="font-bold text-slate-300">Quality:</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setSleepRating(star)}
                    className={`transition-all hover:scale-110 ${sleepRating >= star ? 'text-yellow-400' : 'text-slate-600'}`}
                  >
                    <Star fill={sleepRating >= star ? 'currentColor' : 'none'} size={28} />
                  </button>
                ))}
              </div>
            </div>
            <button className="w-full mt-6 bg-gradient-to-r from-violet-500 to-teal-400 text-slate-950 font-bold py-4 rounded-3xl hover:scale-[1.02] transition-transform shadow-xl shadow-violet-500/20">
              Log Sleep
            </button>
          </div>

          <div className="bg-slate-950/90 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-800 shadow-[0_40px_120px_-70px_rgba(15,23,42,0.35)] flex-1">
            <h3 className="text-xl font-black text-slate-50 mb-6 flex items-center gap-3">
              <Clock className="text-cyan-400" size={24} /> Wind Down Checklist
            </h3>

            <div className="space-y-3">
              {routine.map(item => (
                <div
                  key={item.id}
                  onClick={() => toggleRoutine(item.id)}
                  className={`flex items-center gap-4 p-4 rounded-3xl border cursor-pointer transition-all ${item.done ? 'bg-cyan-500/10 border-cyan-400/20' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'}`}
                >
                  <div className={`${item.done ? 'text-cyan-400' : 'text-slate-500'}`}>
                    {item.done ? (
                      <CheckCircle fill="currentColor" className="text-white" size={24} />
                    ) : (
                      <Circle size={24} />
                    )}
                  </div>
                  <span className={`font-bold transition-all ${item.done ? 'text-cyan-200 line-through opacity-80' : 'text-slate-200'}`}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-950/90 backdrop-blur-xl p-8 md:p-10 rounded-[3rem] border border-slate-800 shadow-[0_40px_120px_-70px_rgba(15,23,42,0.35)] mt-8">
        <div className="mb-8">
          <h3 className="text-2xl font-black text-slate-50 flex items-center gap-3">
            <Headphones className="text-indigo-400" size={28} /> Can't Sleep? SOS 🌙
          </h3>
          <p className="text-slate-400 mt-2">Soothing soundscapes and stories to help you drift off. (Audio integration coming soon)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-[2rem] bg-slate-900/85 border border-slate-800 flex flex-col gap-4 group hover:border-cyan-400 hover:shadow-[0_20px_80px_-40px_rgba(56,189,248,0.25)] transition-all">
            <div className="w-14 h-14 rounded-3xl bg-cyan-500/10 text-cyan-300 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-white transition-all">
              <Music size={26} />
            </div>
            <div>
              <h4 className="font-bold text-slate-50 text-lg">Heavy Rain & Thunder</h4>
              <p className="text-sm text-slate-400 mt-1">90 min • Ambient Noise</p>
            </div>
            <button className="mt-2 w-full py-3 rounded-3xl bg-slate-950 border border-slate-800 text-cyan-300 font-bold flex items-center justify-center gap-2 transition-colors hover:border-cyan-400 hover:text-white">
              <PlayCircle size={20} /> Play
            </button>
          </div>

          <div className="p-6 rounded-[2rem] bg-slate-900/85 border border-slate-800 flex flex-col gap-4 group hover:border-violet-400 hover:shadow-[0_20px_80px_-40px_rgba(129,140,248,0.25)] transition-all">
            <div className="w-14 h-14 rounded-3xl bg-violet-500/10 text-violet-300 flex items-center justify-center group-hover:bg-violet-400 group-hover:text-white transition-all">
              <BookOpen size={26} />
            </div>
            <div>
              <h4 className="font-bold text-slate-50 text-lg">The Midnight Train</h4>
              <p className="text-sm text-slate-400 mt-1">45 min • Sleep Story</p>
            </div>
            <button className="mt-2 w-full py-3 rounded-3xl bg-slate-950 border border-slate-800 text-violet-300 font-bold flex items-center justify-center gap-2 transition-colors hover:border-violet-400 hover:text-white">
              <PlayCircle size={20} /> Play
            </button>
          </div>

          <div className="p-6 rounded-[2rem] bg-slate-900/85 border border-slate-800 flex flex-col gap-4 group hover:border-indigo-400 hover:shadow-[0_20px_80px_-40px_rgba(129,140,248,0.25)] transition-all">
            <div className="w-14 h-14 rounded-3xl bg-indigo-500/10 text-indigo-300 flex items-center justify-center group-hover:bg-indigo-400 group-hover:text-white transition-all">
              <Moon size={26} />
            </div>
            <div>
              <h4 className="font-bold text-slate-50 text-lg">Deep Yoga Nidra</h4>
              <p className="text-sm text-slate-400 mt-1">30 min • Guided Meditation</p>
            </div>
            <button className="mt-2 w-full py-3 rounded-3xl bg-slate-950 border border-slate-800 text-indigo-300 font-bold flex items-center justify-center gap-2 transition-colors hover:border-indigo-400 hover:text-white">
              <PlayCircle size={20} /> Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepSchedule;