import AchievementModal from './components/AchievementModal';
import IoTModal from './components/IoTModal';
import ProfileModal from './components/ProfileModal'; // Make sure the P and M are capital in filename!
import Auth from "./components/Auth";
import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Lottie from "lottie-react";
import robotAnimation from "./assets/bot.json"; 
import { Droplets, Moon, Footprints, Flame, Plus, X, Sparkles, Target, Trophy, Zap, Watch, Share2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import WorkoutTracker from "./components/WorkoutTracker/WorkoutTracker";

// 👇 NAYE IMPORTS 👇
import { Routes, Route } from 'react-router-dom';
import WaterIntake from './components/WaterIntake';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [stats, setStats] = useState({ water: "Loading...", sleep: "...", steps: "...", calories: "..." });
  const [weeklyData, setWeeklyData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIotModalOpen, setIsIotModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [formData, setFormData] = useState({ water: "", sleep: "", steps: "", calories: "" });
  const [aiMessage, setAiMessage] = useState("Analyzing your lifestyle... 🕵️‍♀️");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const userName = localStorage.getItem('userName') || 'User';
  const [avatarSeed, setAvatarSeed] = useState(localStorage.getItem('avatarSeed') || userName);

  const fetchHealthData = async () => {
    try {
      const response = await fetch("https://healthos-6tad.onrender.com");
      if (!response.ok) throw new Error();
      const data = await response.json();
      if (data.length > 0) {
        const latest = data[0];
        setStats({
          water: `${latest.water} Liters`, sleep: `${latest.sleep} Hours`,    
          steps: latest.steps.toLocaleString(), calories: `${latest.calories} Kcal`
        });
        setWeeklyData(data.reverse().map((item, index) => ({ name: `Day ${index + 1}`, water: item.water, sleep: item.sleep })));
      }
    } catch (error) {
      setStats({ water: "2.8 Liters", sleep: "6.5 Hours", steps: "8,432", calories: "2,150 Kcal" });
      setWeeklyData([{ name: 'Mon', water: 2.1, sleep: 6 }, { name: 'Tue', water: 2.5, sleep: 7 }, { name: 'Wed', water: 1.8, sleep: 5.5 }, { name: 'Thu', water: 3.0, sleep: 8 }, { name: 'Fri', water: 2.8, sleep: 6.5 }]);
    }
  };

  const fetchAIInsight = async () => {
    try {
      const response = await fetch("https://healthos-6tad.onrender.com/api/login");
      const data = await response.json();
      setAiMessage(data.message); 
    } catch (error) {
      setAiMessage("Guru, your backend is offline, but I'm still here! Go drink some water before I crash your laptop. 💧");
    }
  };

  useEffect(() => { fetchHealthData(); fetchAIInsight(); }, []);

  const handleLogData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5005/api/health-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ water: parseFloat(formData.water), sleep: parseFloat(formData.sleep), steps: parseInt(formData.steps), calories: parseInt(formData.calories) })
      });
      if (response.ok) { setIsModalOpen(false); setFormData({ water: "", sleep: "", steps: "", calories: "" }); fetchHealthData(); fetchAIInsight(); }
    } catch (error) { alert("Error saving data."); }
  };
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 23 || hour < 4) return "Midnight ah? Sleep schedule on leave aa, guru? 🌚"; 
    if (hour < 12) return "Good Morning Bro!💪";
    if (hour < 18) return "Good Afternoon maga!🤟";
    return "Good Evening Guru!🤸‍♀️";
  };

  return (
  <>
    {!isAuthenticated ? (
      <Auth onLoginSuccess={() => setIsAuthenticated(true)} />
    ) : (
      <div className="flex bg-black min-h-screen text-white relative">
      <Sidebar />
      <div className="ml-64 p-8 w-full h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold">{getGreeting()}</h1>
            <p className="text-gray-400 mt-2">Your Personal AI Tracker 🤖</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsIotModalOpen(true)} className="bg-slate-800 hover:bg-slate-700 text-teal-400 border border-teal-500/30 font-bold py-3 px-4 rounded-full flex items-center gap-2 transition-all">
              <Watch size={20} /> <span className="hidden sm:inline">Sync Device</span>
            </button>
            <button onClick={() => setIsModalOpen(true)} className="bg-teal-500 hover:bg-teal-400 text-black font-bold py-3 px-6 rounded-full flex items-center gap-2 shadow-lg shadow-teal-500/20">
              <Plus size={20} /> Log Activity
            </button>
            <button onClick={() => setIsProfileOpen(true)} className="w-12 h-12 rounded-full border-2 border-teal-500/50 hover:border-teal-400 hover:scale-105 overflow-hidden transition-all shadow-lg shadow-teal-500/20 p-0.5 bg-slate-800">
              <img src={`https://api.dicebear.com/9.x/micah/svg?seed=${avatarSeed}`} alt="Profile" className="w-full h-full rounded-full bg-teal-500/10" />            
            </button>
          </div>
        </div>

        {/* 👇 YAHAN SE ROUTES SHURU 👇 */}
        <Routes>
          
          {/* ROUTE 1: TERA MAIN DASHBOARD */}
          <Route path="/" element={
            <>
              {/* 🔥 ANIMATED AI AGENT SECTION */}
              <div className="bg-gradient-to-r from-slate-900 to-teal-900/30 border border-teal-500/40 p-6 rounded-3xl mb-10 flex items-center gap-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl"></div>
                <div className="relative z-10 w-32 h-32 flex-shrink-0 flex items-center justify-center">
                  <Lottie animationData={robotAnimation} loop={true} className="w-full h-full drop-shadow-[0_0_15px_rgba(20,184,166,0.4)]" />
                </div>
                <div className="flex-1 z-10">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-teal-300 font-bold text-xl flex items-center gap-2">Gemini Health Agent <Sparkles size={18} className="text-yellow-400" /></h2>
                    <div className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full border border-teal-500/30">
                      <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                      <span className="text-xs text-teal-400 font-mono tracking-wider">v1.5-FLASH</span>
                    </div>
                  </div>
                  <div className="bg-black/40 backdrop-blur-md border border-slate-700/50 p-4 rounded-2xl rounded-tl-none">
                    <p className="text-slate-100 text-lg leading-relaxed font-medium">"{aiMessage}"</p>
                  </div>
                </div>
              </div>
              
              {/* METRICS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[{ label: "Water", val: stats.water, icon: Droplets, color: "text-blue-400", border: "hover:border-blue-500" }, { label: "Sleep", val: stats.sleep, icon: Moon, color: "text-purple-400", border: "hover:border-purple-500" }, { label: "Steps", val: stats.steps, icon: Footprints, color: "text-green-400", border: "hover:border-green-500" }, { label: "Calories", val: stats.calories, icon: Flame, color: "text-orange-400", border: "hover:border-orange-500" }].map((item, i) => (
                  <div key={i} className={`bg-slate-900 p-6 rounded-2xl border border-slate-800 transition-all ${item.border}`}>
                    <div className="flex justify-between items-center mb-2"><h3 className="text-gray-400 text-sm font-bold uppercase">{item.label}</h3><item.icon className={item.color} size={20} /></div>
                    <p className={`text-3xl font-bold ${item.color}`}>{item.val}</p>
                  </div>
                ))}
              </div>

              {/* CHART SECTION */}
              <div className="mt-10 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
                <h2 className="text-xl font-bold text-white mb-6">Weekly Progress Overview 📈</h2>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyData}>
                      <defs>
                        <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                        <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/><stop offset="95%" stopColor="#a855f7" stopOpacity={0}/></linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
                      <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }} />
                      <Area type="monotone" dataKey="water" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorWater)" name="Water (L)" />
                      <Area type="monotone" dataKey="sleep" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorSleep)" name="Sleep (H)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 🔥 ACHIEVEMENTS SECTION */}
              <div className="mt-10 mb-10">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  Achievements & Badges <Trophy className="text-yellow-400" size={22} />
                </div>
                <button onClick={() => setIsShareModalOpen(true)} className="bg-gradient-to-r from-teal-500 to-emerald-500 text-black text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition-transform">
               <Share2 size={16} /> Share Progress
                </button>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 hover:border-teal-500/50 transition-all group">
                    <div className="bg-orange-500/10 p-3 rounded-xl group-hover:scale-110 transition-transform"><Flame className="text-orange-500" size={28} /></div>
                    <div><h3 className="font-bold text-white">3 Day Streak</h3><p className="text-gray-400 text-sm">Consistent logger! 🔥</p></div>
                  </div>
                  <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 hover:border-blue-500/50 transition-all group">
                    <div className="bg-blue-500/10 p-3 rounded-xl group-hover:scale-110 transition-transform"><Zap className="text-blue-400" size={28} /></div>
                    <div><h3 className="font-bold text-white">Power User</h3><p className="text-gray-400 text-sm">All metrics logged today.</p></div>
                  </div>
                  <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 hover:border-teal-500/50 transition-all group">
                    <div className="bg-teal-500/10 p-3 rounded-xl group-hover:scale-110 transition-transform"><Target className="text-teal-400" size={28} /></div>
                    <div><h3 className="font-bold text-white">Goal Crusher</h3><p className="text-gray-400 text-sm">Water target reached!</p></div>
                  </div>
                </div>
              </div>
            </>
          } />

          {/* ROUTE 2: TERA NAYA WATER INTAKE PAGE */}
          <Route path="/water" element={<WaterIntake />} />

          {/* DUMMY ROUTES (Taki sidebar pe click karne pe error na aaye) */}
          <Route path="/workout" element={<WorkoutTracker />} />
          <Route path="/chat" element={<div className="flex flex-col items-center justify-center h-full"><h1 className="text-5xl font-bold text-teal-400 mb-4">🤖 Health Advisor</h1><p className="text-gray-400">Partner is building this...</p></div>} />
          <Route path="/yoga" element={<div className="flex flex-col items-center justify-center h-full"><h1 className="text-5xl font-bold text-teal-400 mb-4">🧘 Yoga & Meditation</h1><p className="text-gray-400">Coming soon...</p></div>} />
          <Route path="/sleep" element={<div className="flex flex-col items-center justify-center h-full"><h1 className="text-5xl font-bold text-teal-400 mb-4">😴 Sleep Schedule</h1><p className="text-gray-400">Coming soon...</p></div>} />

        </Routes>
        {/* 👆 ROUTES YAHAN KHATAM 👆 */}

      </div>
      
      {/* LOG MODAL */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl w-full max-w-md relative shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button>
            <h2 className="text-2xl font-bold mb-6">Log Today's Activity</h2>
            <form onSubmit={handleLogData} className="space-y-4">
              <input type="number" step="0.1" required className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3" value={formData.water} onChange={(e) => setFormData({...formData, water: e.target.value})} placeholder="Water (L)" />
              <input type="number" step="0.5" required className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3" value={formData.sleep} onChange={(e) => setFormData({...formData, sleep: e.target.value})} placeholder="Sleep (H)" />
              <input type="number" required className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3" value={formData.steps} onChange={(e) => setFormData({...formData, steps: e.target.value})} placeholder="Steps" />
              <input type="number" required className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3" value={formData.calories} onChange={(e) => setFormData({...formData, calories: e.target.value})} placeholder="Calories (Kcal)" />
              <button type="submit" className="w-full bg-teal-500 text-black font-bold py-3 rounded-xl hover:bg-teal-400 transition-all">Save Activity 🚀</button>
            </form>
          </div>
        </div>
      )}
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        onLogout={() => setIsAuthenticated(false)} 
        avatarSeed={avatarSeed}       
        setAvatarSeed={setAvatarSeed}
      />
      <IoTModal isOpen={isIotModalOpen} onClose={() => setIsIotModalOpen(false)} />
      <AchievementModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        stats={stats} 
        userName={userName} 
        avatarSeed={avatarSeed} 
      />

      
        </div>
      )}
    </>
  );
}

export default App;