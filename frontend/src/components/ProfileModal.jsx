import React from 'react';
// Imported additional icons for the upcoming profile features
import { X, LogOut, Mail, User, Shield, Dices, Lock, Ruler, Scale, Droplets } from 'lucide-react';

const ProfileModal = ({ isOpen, onClose, onLogout, avatarSeed, setAvatarSeed }) => {
  if (!isOpen) return null;

  const userName = localStorage.getItem('userName') || 'User';
  const userEmail = localStorage.getItem('userEmail') || 'user@healthos.com';

  const handleShuffleAvatar = () => {
    const randomNum = Math.floor(Math.random() * 10000);
    const newSeed = `${userName}_${randomNum}`;
    localStorage.setItem('avatarSeed', newSeed);
    setAvatarSeed(newSeed);
  };

  const handleLogout = () => {
    localStorage.clear();
    onLogout();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex justify-center items-center z-[100] px-4">
      <div className="bg-slate-950/95 border border-teal-500/15 p-8 rounded-[2.5rem] w-full max-w-sm relative shadow-[0_40px_120px_-70px_rgba(20,184,166,0.35)]">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="flex flex-col items-center mt-4">
          
          {/* Avatar Generation Section */}
          <div className="w-28 h-28 rounded-full bg-teal-500/10 border border-teal-400/20 p-2 relative group">
            <img src={`https://api.dicebear.com/9.x/micah/svg?seed=${avatarSeed}`} alt="Avatar" className="w-full h-full rounded-full transition-transform group-hover:scale-105" />
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-400 border-2 border-slate-950 rounded-full"></div>
          </div>

          <button
            onClick={handleShuffleAvatar}
            className="mt-3 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 bg-slate-900/70 px-3 py-1.5 rounded-full transition-colors border border-cyan-400/20"
          >
            <Dices size={16} />
            Shuffle Avatar
          </button>

          <h2 className="text-2xl font-bold text-white mt-4">{userName}</h2>
          <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            Pro Member
          </span>

          {/* User Details Section */}
          <div className="w-full bg-slate-900/80 rounded-3xl p-5 space-y-4 my-8 border border-slate-800">
            
            {/* Active Account Details */}
            <div className="flex items-center gap-3 text-slate-300">
              <User size={18} className="text-cyan-400" />
              <span className="text-sm">{userName}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <Mail size={18} className="text-cyan-400" />
              <span className="text-sm truncate">{userEmail}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <Shield size={18} className="text-cyan-400" />
              <span className="text-sm">Account Active</span>
            </div>

            {/* V2.0 Coming Soon Section (Locked Features Placeholder) */}
            <div className="pt-5 mt-2 border-t border-slate-700/50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-800 px-3 py-1 rounded-full border border-slate-600 flex items-center gap-1 shadow-lg">
                <Lock size={12} className="text-amber-400" />
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Unlocking in v2.0</span>
              </div>
              
              <div className="space-y-3 pt-2 opacity-50 pointer-events-none select-none">
                <div className="flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-3">
                    <Ruler size={18} className="text-slate-400" />
                    <span className="text-sm">Height</span>
                  </div>
                  <span className="text-xs font-mono bg-slate-950 px-2 py-1 rounded text-slate-500 border border-slate-800">-- cm</span>
                </div>
                
                <div className="flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-3">
                    <Scale size={18} className="text-slate-400" />
                    <span className="text-sm">Weight</span>
                  </div>
                  <span className="text-xs font-mono bg-slate-950 px-2 py-1 rounded text-slate-500 border border-slate-800">-- kg</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-3">
                    <Droplets size={18} className="text-slate-400" />
                    <span className="text-sm">Blood Group</span>
                  </div>
                  <span className="text-xs font-mono bg-slate-950 px-2 py-1 rounded text-slate-500 border border-slate-800">--</span>
                </div>
              </div>
            </div>
          </div>

          <button onClick={handleLogout} className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-3 rounded-3xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 hover:scale-[1.02]">
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;