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
import YogaMeditation from './components/YogaMeditation';
import SleepSchedule from './components/SleepSchedule';
import HealthAdvisor from './components/HealthAdvisor';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [stats, setStats] = useState({ water: "Loading...", sleep: "...", steps: "...", calories: "..." });
  const [weeklyData, setWeeklyData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIotModalOpen, setIsIotModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({ water: "", sleep: "", steps: "", calories: "" });
  const [aiMessage, setAiMessage] = useState("Analyzing your lifestyle... 🕵️‍♀️");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const userName = localStorage.getItem('userName') || 'User';
  const [avatarSeed, setAvatarSeed] = useState(localStorage.getItem('avatarSeed') || userName);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || !localStorage.getItem('theme')
  );

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
    <div className={`min-h-screen w-full transition-colors duration-700 ${darkMode ? 'dark bg-slate-950 text-white' : 'bg-gradient-to-br from-slate-50 via-slate-100 to-cyan-100 text-slate-900'}`}>
      {!isAuthenticated ? (
        <Auth onLoginSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <div className="flex min-h-screen relative overflow-x-hidden">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />

          <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
            <header className="md:hidden flex items-center justify-between px-4 h-16 bg-slate-950/95 border-b border-slate-800 sticky top-0 z-40">
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-300">
                <Menu size={24} />
              </button>
              <span className="font-bold text-white">HealthOS</span>
              <button onClick={() => setIsProfileOpen(true)} className="w-10 h-10 rounded-full border border-teal-500/50 overflow-hidden">
                <img src={`https://api.dicebear.com/9.x/micah/svg?seed=${avatarSeed}`} alt="Profile" />
              </button>
            </header>

            <main className="flex-1 p-4 md:p-10 md:ml-64">
              <div className="relative max-w-full lg:max-w-[1440px] mx-auto">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] overflow-hidden">
                  <div className="absolute left-1/2 top-[-6rem] w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl -translate-x-1/2"></div>
                  <div className="absolute right-0 top-24 w-96 h-96 rounded-full bg-fuchsia-500/10 blur-3xl"></div>
                </div>
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-6 relative">
                  <div className="max-w-3xl">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-50">
                      {getGreeting()}
                    </h1>
                    <p className="mt-3 text-slate-300 text-lg max-w-2xl">
                      Your personal AI wellness dashboard with premium insights and refined summaries.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className="rounded-full px-5 py-4 bg-slate-950/90 border border-slate-700 text-slate-200 shadow-[0_22px_60px_-30px_rgba(15,23,42,0.8)] hover:shadow-[0_24px_70px_-35px_rgba(15,23,42,0.8)] transition-all"
                    >
                      {darkMode ? '☀️ Light' : '🌙 Dark'}
                    </button>
                    <button
                      onClick={() => setIsIotModalOpen(true)}
                      className="rounded-full px-5 py-4 bg-gradient-to-r from-cyan-400 to-teal-500 text-slate-950 font-semibold shadow-xl shadow-cyan-500/20 hover:brightness-105 transition-all"
                    >
                      <Watch size={18} className="inline-block mr-2" /> Sync Device
                    </button>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="rounded-full px-6 py-4 bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 font-black shadow-2xl shadow-emerald-400/20 hover:scale-[1.02] transition-all"
                    >
                      <Plus size={20} className="inline-block mr-2" /> Log Activity
                    </button>
                  </div>
                </div>

                <Routes>
                  <Route path="/" element={
                    <>
                      <div className="bg-slate-950/95 border border-slate-700/70 p-6 rounded-[2.5rem] mb-10 flex flex-col md:flex-row items-center gap-6 shadow-[0_40px_120px_-70px_rgba(14,165,233,0.18)] backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute -left-16 -top-16 w-44 h-44 bg-cyan-500/15 rounded-full blur-3xl"></div>
                        <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                          <Lottie animationData={robotAnimation} loop={true} className="w-full h-full" />
                        </div>
                        <div className="flex-1 text-center md:text-left relative z-10">
                          <h2 className="text-teal-300 font-bold text-xl flex items-center justify-center md:justify-start gap-2 mb-2">
                            Gemini Agent <Sparkles size={18} />
                          </h2>
                          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 p-5 rounded-3xl">
                            <p className="text-slate-200 text-lg leading-relaxed font-medium italic">"{aiMessage}"</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          { label: "Water", val: stats.water, icon: Droplets, color: "text-sky-400" },
                          { label: "Sleep", val: stats.sleep, icon: Moon, color: "text-violet-400" },
                          { label: "Steps", val: stats.steps, icon: Footprints, color: "text-emerald-400" },
                          { label: "Calories", val: stats.calories, icon: Flame, color: "text-orange-400" }
                        ].map((item, i) => (
                          <div key={i} className={`bg-white/10 dark:bg-slate-900/80 border border-white/10 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-[0_32px_90px_-40px_rgba(15,23,42,0.24)] hover:shadow-[0_40px_110px_-40px_rgba(15,23,42,0.28)] transition-all`}>
                            <div className="flex justify-between items-center mb-4 text-slate-300">
                              <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                              <item.icon className={`${item.color}`} size={22} />
                            </div>
                            <p className={`text-3xl font-black ${item.color}`}>{item.val}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-10 bg-slate-950/95 dark:bg-slate-900/90 border border-slate-800/80 p-6 rounded-[2.5rem] shadow-[0_30px_80px_-30px_rgba(15,23,42,0.3)]">
                        <h2 className="text-xl font-bold text-slate-50 mb-6">Weekly Progress Overview 📈</h2>
                        <div className="h-72 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={weeklyData}>
                              <defs>
                                <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.45}/>
                                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.45}/>
                                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                              <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                              <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '16px', color: '#fff' }} />
                              <Area type="monotone" dataKey="water" stroke="#38bdf8" strokeWidth={3} fillOpacity={1} fill="url(#colorWater)" name="Water (L)" />
                              <Area type="monotone" dataKey="sleep" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorSleep)" name="Sleep (H)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="mt-10 mb-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                          <h2 className="text-xl font-bold text-slate-50 flex items-center gap-2">
                            Achievements <Trophy className="text-amber-300" size={22} />
                          </h2>
                          <button onClick={() => setIsShareModalOpen(true)} className="rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 text-sm font-semibold px-5 py-3 shadow-lg shadow-emerald-400/25 hover:brightness-110 transition-all">
                             <Share2 size={16} /> Share Progress
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            { title: "3 Day Streak", desc: "Consistent logger! 🔥", icon: Flame, color: "text-orange-400" },
                            { title: "Power User", desc: "All metrics logged.", icon: Zap, color: "text-sky-400" },
                            { title: "Goal Crusher", desc: "Target reached!", icon: Target, color: "text-emerald-400" }
                          ].map((badge, idx) => (
                            <div key={idx} className="bg-slate-950/80 border border-slate-800 p-6 rounded-[2rem] shadow-[0_22px_50px_-18px_rgba(15,23,42,0.35)] transition-all hover:-translate-y-0.5">
                              <div className="bg-slate-900/70 p-4 rounded-3xl">
                                <badge.icon className={badge.color} size={28} />
                              </div>
                              <div className="mt-4">
                                <h3 className="font-bold text-slate-50">{badge.title}</h3>
                                <p className="text-slate-400 text-sm mt-1">{badge.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  } />

                  <Route path="/water" element={<WaterIntake />} />
                  <Route path="/workout" element={<WorkoutTracker />} />
                  <Route path="/chat" element={<HealthAdvisor />} />
                  <Route path="/yoga" element={<YogaMeditation />} />
                  <Route path="/sleep" element={<SleepSchedule />} />
                </Routes>
              </div>
            </main>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex justify-center items-center z-[100] p-4">
              <div className="bg-slate-950/95 border border-slate-800 p-8 rounded-[2.5rem] w-full max-w-md relative shadow-[0_40px_120px_-70px_rgba(14,165,233,0.35)]">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white"><X size={24} /></button>
                <h2 className="text-2xl font-black mb-6 text-slate-50">Log Activity</h2>
                <form onSubmit={handleLogData} className="space-y-4">
                  <input type="number" step="0.1" required className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400" value={formData.water} onChange={(e) => setFormData({...formData, water: e.target.value})} placeholder="Water (L)" />
                  <input type="number" step="0.5" required className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500" value={formData.sleep} onChange={(e) => setFormData({...formData, sleep: e.target.value})} placeholder="Sleep (H)" />
                  <input type="number" required className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400" value={formData.steps} onChange={(e) => setFormData({...formData, steps: e.target.value})} placeholder="Steps" />
                  <input type="number" required className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-400" value={formData.calories} onChange={(e) => setFormData({...formData, calories: e.target.value})} placeholder="Calories (Kcal)" />
                  <button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 font-black py-4 rounded-3xl hover:brightness-110 transition-all shadow-xl shadow-teal-500/20">Save Activity 🚀</button>
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