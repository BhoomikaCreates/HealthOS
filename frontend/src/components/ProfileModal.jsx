import React, { useState, useEffect } from 'react';
// Imported additional icons for the profile features
import { X, LogOut, Mail, User, Shield, Dices, Ruler, Scale, Droplets, Calendar, Check } from 'lucide-react';

const ProfileModal = ({ isOpen, onClose, onLogout, avatarSeed, setAvatarSeed }) => {
  if (!isOpen) return null;

  const userName = localStorage.getItem('userName') || 'User';
  const userEmail = localStorage.getItem('userEmail') || 'user@healthos.com';

  // Real-time states hooked directly to local storage for instant data availability
  const [height, setHeight] = useState(localStorage.getItem('userHeight') || '');
  const [weight, setWeight] = useState(localStorage.getItem('userWeight') || '');
  const [bloodGroup, setBloodGroup] = useState(localStorage.getItem('userBloodGroup') || '');
  const [age, setAge] = useState(localStorage.getItem('userAge') || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleShuffleAvatar = () => {
    const randomNum = Math.floor(Math.random() * 10000);
    const newSeed = `${userName}_${randomNum}`;
    localStorage.setItem('avatarSeed', newSeed);
    setAvatarSeed(newSeed);
  };

  const handleSaveMetrics = () => {
    localStorage.setItem('userHeight', height);
    localStorage.setItem('userWeight', weight);
    localStorage.setItem('userBloodGroup', bloodGroup);
    localStorage.setItem('userAge', age);
    
    // Show a quick success checkmark on the button
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleLogout = () => {
    localStorage.clear();
    onLogout();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex justify-center items-center z-[100] px-4">
      <div className="bg-slate-950/95 border border-teal-500/20 p-8 rounded-[2.5rem] w-full max-w-md relative shadow-[0_40px_120px_-70px_rgba(20,184,166,0.35)]">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="flex flex-col items-center mt-2">
          
          {/* Avatar Generation Section */}
          <div className="w-24 h-24 rounded-full bg-teal-500/10 border border-teal-400/20 p-2 relative group">
            <img src={`https://api.dicebear.com/9.x/micah/svg?seed=${avatarSeed}`} alt="Avatar" className="w-full h-full rounded-full transition-transform group-hover:scale-105" />
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-400 border-2 border-slate-950 rounded-full"></div>
          </div>

          <button
            onClick={handleShuffleAvatar}
            className="mt-3 inline-flex items-center gap-2 text-xs text-cyan-300 hover:text-cyan-200 bg-slate-900/70 px-3 py-1.5 rounded-full transition-colors border border-cyan-400/20"
          >
            <Dices size={14} />
            Shuffle Avatar
          </button>

          <h2 className="text-xl font-bold text-white mt-4">{userName}</h2>
          <span className="mt-1.5 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
            Pro Member
          </span>

          {/* User Details Section */}
          <div className="w-full bg-slate-900/50 rounded-3xl p-5 space-y-3.5 my-6 border border-slate-800/80">
            
            {/* Active Account Details */}
            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-800/60 text-slate-300 text-sm">
              <div className="flex items-center gap-2">
                <User size={16} className="text-cyan-400 flex-shrink-0" />
                <span className="truncate">{userName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-emerald-400 flex-shrink-0" />
                <span className="text-xs text-slate-400">Account Active</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <Mail size={16} className="text-cyan-400 flex-shrink-0" />
                <span className="truncate text-xs text-slate-400">{userEmail}</span>
              </div>
            </div>

            {/* V2.0 Core Clinical Metrics Form */}
            <div className="space-y-3 pt-1">
              <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">Biometric Parameters</h3>
              
              <div className="grid grid-cols-2 gap-3">
                {/* Height Input */}
                <div className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Ruler size={16} className="text-teal-400" />
                    <span className="text-xs">Height</span>
                  </div>
                  <input 
                    type="number" 
                    placeholder="--" 
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-12 bg-slate-900 text-right text-xs font-mono px-1.5 py-1 rounded text-teal-300 border border-slate-700 focus:border-teal-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500 ml-0.5">cm</span>
                </div>
                
                {/* Weight Input */}
                <div className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Scale size={16} className="text-teal-400" />
                    <span className="text-xs">Weight</span>
                  </div>
                  <input 
                    type="number" 
                    placeholder="--" 
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-12 bg-slate-900 text-right text-xs font-mono px-1.5 py-1 rounded text-teal-300 border border-slate-700 focus:border-teal-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500 ml-0.5">kg</span>
                </div>

                {/* Age Input */}
                <div className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar size={16} className="text-teal-400" />
                    <span className="text-xs">Age</span>
                  </div>
                  <input 
                    type="number" 
                    placeholder="--" 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-12 bg-slate-900 text-right text-xs font-mono px-1.5 py-1 rounded text-teal-300 border border-slate-700 focus:border-teal-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-500 ml-0.5">yrs</span>
                </div>

                {/* Blood Group Dropdown */}
                <div className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Droplets size={16} className="text-rose-400" />
                    <span className="text-xs">Blood</span>
                  </div>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="bg-slate-900 text-xs font-mono px-1 py-1 rounded text-teal-300 border border-slate-700 focus:border-teal-500 focus:outline-none cursor-pointer"
                  >
                    <option value="">--</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              {/* Save Metrics Button */}
              <button
                onClick={handleSaveMetrics}
                className={`w-full mt-2 text-xs font-bold py-2 rounded-xl transition-all border flex items-center justify-center gap-1.5 ${
                  isSaved 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                    : 'bg-teal-500 text-black border-transparent hover:bg-teal-400'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check size={14} /> Metrics Saved!
                  </>
                ) : (
                  'Update Health Profile'
                )}
              </button>

            </div>
          </div>

          <button onClick={handleLogout} className="w-full bg-gradient-to-r from-rose-500/10 to-pink-500/10 hover:from-rose-500 hover:to-pink-500 text-rose-400 hover:text-white border border-rose-500/20 hover:border-transparent font-bold py-2.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-rose-500/20 hover:scale-[1.01] text-sm">
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;