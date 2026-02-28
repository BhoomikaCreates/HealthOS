import AchievementModal from './components/AchievementModal';
import IoTModal from './components/IoTModal';
import ProfileModal from './components/ProfileModal';
import Auth from "./components/Auth";
import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Lottie from "lottie-react";
import robotAnimation from "./assets/bot.json"; 
import { Droplets, Moon, Footprints, Flame, Plus, X, Sparkles, Target, Trophy, Zap, Watch, Share2, Menu } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import WorkoutTracker from "./components/WorkoutTracker/WorkoutTracker";
import { Routes, Route } from 'react-router-dom';
import WaterIntake from './components/WaterIntake';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [stats, setStats] = useState({ water: "Loading...", sleep: "...", steps: "...", calories: "..." });
  const [weeklyData, setWeeklyData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIotModalOpen, setIsIotModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ Drawer State
  const [formData, setFormData] = useState({ water: "", sleep: "", steps: "", calories: "" });
  const [aiMessage, setAiMessage] = useState("Analyzing your lifestyle... 🕵️‍♀️");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const userName = localStorage.getItem('userName') || 'User';
  const [avatarSeed, setAvatarSeed] = useState(localStorage.getItem('avatarSeed') || userName);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || !localStorage.getItem('theme')
  );

  // ✅ Dark Mode Controller
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const fetchHealthData = async () => {
    try {
      const response = await fetch("https://healthos-6tad.onrender.com/api/health-data");
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
      const response = await fetch("https://healthos-6tad.onrender.com/api/ai-insight");
      const data = await response.json();
      setAiMessage(data.message); 
    } catch (error) {
      setAiMessage("Guru, your backend is offline, but I'm still here! Go drink some water before I crash your laptop. 💧");
    }
  };

  useEffect(() => { 
    if(isAuthenticated) {
      fetchHealthData(); 
      fetchAIInsight(); 
    }
  }, [isAuthenticated]);

  const handleLogData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://healthos-6tad.onrender.com/api/health-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          water: parseFloat(formData.water), 
          sleep: parseFloat(formData.sleep), 
          steps: parseInt(formData.steps), 
          calories: parseInt(formData.calories) 
        })
      });
      if (response.ok) { 
        setIsModalOpen(false); 
        setFormData({ water: "", sleep: "", steps: "", calories: "" }); 
        fetchHealthData(); 
        fetchAIInsight(); 
      }
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
  <div className={`min-h-screen w-full transition-colors duration-300 ${darkMode ? 'dark bg-slate-950' : 'bg-slate-50'}`}>
    {!isAuthenticated ? (
      <Auth onLoginSuccess={() => setIsAuthenticated(true)} />
    ) : (
      <div className="flex min-h-screen relative overflow-x-hidden">
        
        {/* 1. SIDEBAR: Fixed on Laptop, Drawer on Mobile */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />

        {/* 2. MAIN CONTENT WRAPPER */}
        {/* 'flex-1' ensures it takes the remaining space next to sidebar on laptop */}
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
          
          {/* 📱 MOBILE HEADER (Hidden on Laptop) */}
          <header className="md:hidden flex items-center justify-between px-4 h-16 bg-white dark:bg-slate-900 border-b dark:border-slate-800 sticky top-0 z-40">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 dark:text-slate-300">
              <Menu size={24} />
            </button>
            <span className="font-bold text-slate-800 dark:text-white">HealthOS</span>
            <button onClick={() => setIsProfileOpen(true)} className="w-8 h-8 rounded-full border border-teal-500 overflow-hidden">
              <img src={`https://api.dicebear.com/9.x/micah/svg?seed=${avatarSeed}`} alt="Profile" />
            </button>
          </header>

          {/* 💻 SCROLLABLE CONTENT AREA */}
          {/* Added 'md:pl-64' only if Sidebar is 'fixed'. If Sidebar is part of Flex, remove md:pl-64 */}
          <main className="flex-1 p-4 md:p-10 md:ml-64"> 
            <div className="max-w-full lg:max-w-[1440px] mx-auto">
              
              {/* TOP HEADER SECTION */}
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-6">
                <div>
                  <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">{getGreeting()}</h1>
                  <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Your Personal AI Tracker 🤖</p>
                </div>
                <div className="flex items-center gap-3 w-full xl:w-auto">
                  <button onClick={() => setDarkMode(!darkMode)} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border dark:border-slate-800 shadow-sm transition-all hover:scale-110">
                    {darkMode ? '☀️' : '🌙'}
                  </button>
                  <button onClick={() => setIsIotModalOpen(true)} className="flex-1 md:flex-none bg-slate-900 dark:bg-slate-700 text-teal-400 border border-teal-500/30 font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2">
                    <Watch size={20} /> Sync
                  </button>
                  <button onClick={() => setIsModalOpen(true)} className="flex-1 md:flex-none bg-teal-500 hover:bg-teal-400 text-black font-black py-4 px-8 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-teal-500/20">
                    <Plus size={22} /> Log Activity
                  </button>
                </div>
              </div>

                <Routes>
                  {/* MAIN DASHBOARD */}
                  <Route path="/" element={
                    <>
                      {/* AI AGENT SECTION */}
                      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-teal-900/40 border border-teal-500/20 p-6 rounded-[2rem] mb-10 flex flex-col md:flex-row items-center gap-6 shadow-xl">
                        <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                          <Lottie animationData={robotAnimation} loop={true} className="w-full h-full" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <h2 className="text-teal-400 font-bold text-xl flex items-center justify-center md:justify-start gap-2 mb-2">Gemini Agent <Sparkles size={18} /></h2>
                          <div className="bg-black/30 backdrop-blur-sm border border-white/5 p-4 rounded-2xl">
                            <p className="text-slate-200 text-lg leading-relaxed font-medium italic">"{aiMessage}"</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* METRICS GRID */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          { label: "Water", val: stats.water, icon: Droplets, color: "text-blue-400", bg: "bg-blue-500/5", border: "border-blue-500/20" },
                          { label: "Sleep", val: stats.sleep, icon: Moon, color: "text-purple-400", bg: "bg-purple-500/5", border: "border-purple-500/20" },
                          { label: "Steps", val: stats.steps, icon: Footprints, color: "text-green-400", bg: "bg-green-500/5", border: "border-green-500/20" },
                          { label: "Calories", val: stats.calories, icon: Flame, color: "text-orange-400", bg: "bg-orange-500/5", border: "border-orange-500/20" }
                        ].map((item, i) => (
                          <div key={i} className={`bg-white dark:bg-slate-900 p-6 rounded-[2rem] border ${item.border} shadow-sm hover:shadow-md transition-all`}>
                            <div className="flex justify-between items-center mb-4 text-slate-400">
                              <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                              <item.icon className={item.color} size={20} />
                            </div>
                            <p className={`text-3xl font-black ${item.color}`}>{item.val}</p>
                          </div>
                        ))}
                      </div>

                      {/* CHART */}
                      <div className="mt-10 bg-white dark:bg-slate-900 p-6 rounded-[2rem] border dark:border-slate-800 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Weekly Progress Overview 📈</h2>
                        <div className="h-72 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={weeklyData}>
                              <defs>
                                <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                                <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/><stop offset="95%" stopColor="#a855f7" stopOpacity={0}/></linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                              <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                              <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                              <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '16px', color: '#fff' }} />
                              <Area type="monotone" dataKey="water" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorWater)" name="Water (L)" />
                              <Area type="monotone" dataKey="sleep" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorSleep)" name="Sleep (H)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* ACHIEVEMENTS */}
                      <div className="mt-10 mb-10">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">Achievements <Trophy className="text-yellow-400" size={22} /></h2>
                          <button onClick={() => setIsShareModalOpen(true)} className="bg-emerald-500 text-black text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2">
                             <Share2 size={16} /> Share
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            { title: "3 Day Streak", desc: "Consistent logger! 🔥", icon: Flame, color: "text-orange-500" },
                            { title: "Power User", desc: "All metrics logged.", icon: Zap, color: "text-blue-400" },
                            { title: "Goal Crusher", desc: "Target reached!", icon: Target, color: "text-teal-400" }
                          ].map((badge, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900/50 border dark:border-slate-800 p-5 rounded-3xl flex items-center gap-4">
                              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl"><badge.icon className={badge.color} size={28} /></div>
                              <div><h3 className="font-bold dark:text-white">{badge.title}</h3><p className="text-slate-500 text-sm">{badge.desc}</p></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  } />

                  <Route path="/water" element={<WaterIntake />} />
                  <Route path="/workout" element={<WorkoutTracker />} />
                  <Route path="/chat" element={<div className="flex flex-col items-center justify-center h-96"><h1 className="text-5xl font-bold text-teal-400 mb-4 text-center px-4">🤖 Health Advisor</h1><p className="text-slate-400">Under Construction by Partner...</p></div>} />
                  {/* ... Baki routes ... */}
                </Routes>
              </div>
            </main>
          </div>
          
          {/* MODALS */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex justify-center items-center z-[100] p-4">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] w-full max-w-md relative shadow-2xl">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-red-500"><X size={24} /></button>
                <h2 className="text-2xl font-black mb-6 text-slate-800 dark:text-white">Log Activity</h2>
                <form onSubmit={handleLogData} className="space-y-4">
                  <input type="number" step="0.1" required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 dark:text-white" value={formData.water} onChange={(e) => setFormData({...formData, water: e.target.value})} placeholder="Water (L)" />
                  <input type="number" step="0.5" required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 dark:text-white" value={formData.sleep} onChange={(e) => setFormData({...formData, sleep: e.target.value})} placeholder="Sleep (H)" />
                  <input type="number" required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 dark:text-white" value={formData.steps} onChange={(e) => setFormData({...formData, steps: e.target.value})} placeholder="Steps" />
                  <input type="number" required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 dark:text-white" value={formData.calories} onChange={(e) => setFormData({...formData, calories: e.target.value})} placeholder="Calories (Kcal)" />
                  <button type="submit" className="w-full bg-teal-500 text-black font-black py-4 rounded-2xl hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20">Save Activity 🚀</button>
                </form>
              </div>
            </div>
          )}

          <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} onLogout={() => {localStorage.clear(); window.location.reload();}} avatarSeed={avatarSeed} setAvatarSeed={setAvatarSeed} />
          <IoTModal isOpen={isIotModalOpen} onClose={() => setIsIotModalOpen(false)} />
          <AchievementModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} stats={stats} userName={userName} avatarSeed={avatarSeed} />

        </div>
      )}
    </div>
  );
}

export default App;