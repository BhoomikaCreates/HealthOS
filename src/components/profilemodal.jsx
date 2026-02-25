import React from 'react';
import { X, LogOut, Mail, User, Shield, Dices } from 'lucide-react';

const ProfileModal = ({ isOpen, onClose, onLogout, avatarSeed, setAvatarSeed }) => {
  if (!isOpen) return null;

  const userName = localStorage.getItem('userName') || 'User';
  const userEmail = localStorage.getItem('userEmail') || 'user@healthos.com';
  
  // Naya Avatar Generator Function
  const handleShuffleAvatar = () => {
    const randomNum = Math.floor(Math.random() * 10000);
    const newSeed = `${userName}_${randomNum}`;
    localStorage.setItem('avatarSeed', newSeed);
    setAvatarSeed(newSeed);
  };

  const handleLogout = () => {
    localStorage.clear(); // Ek jhatke mein sab saaf
    onLogout();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[100]">
      <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl w-full max-w-sm relative shadow-2xl shadow-teal-500/10">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
        
        <div className="flex flex-col items-center mt-4">
          
          {/* Dynamic Avatar */}
          <div className="w-24 h-24 rounded-full bg-teal-500/10 border-2 border-teal-500/50 p-2 relative group">
            <img src={`https://api.dicebear.com/9.x/micah/svg?seed=${avatarSeed}`} alt="Avatar" className="w-full h-full rounded-full transition-transform group-hover:scale-105" />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-slate-900 rounded-full"></div>
          </div>
          
          {/* 👇 THE SHUFFLE BUTTON 👇 */}
          <button 
            onClick={handleShuffleAvatar}
            className="mt-3 flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 bg-teal-500/10 px-3 py-1.5 rounded-full transition-colors border border-teal-500/20"
          >
            <Dices size={16} />
            Shuffle Avatar
          </button>
          
          <h2 className="text-2xl font-bold text-white mt-4">{userName}</h2>
          <p className="text-teal-400 text-sm font-medium mb-6">Pro Member ✨</p>
          
          {/* User Details Box */}
          <div className="w-full bg-slate-800/50 rounded-2xl p-4 space-y-4 mb-8 border border-slate-700">
            <div className="flex items-center gap-3 text-gray-300">
              <User size={18} className="text-teal-500" />
              <span className="text-sm">{userName}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Mail size={18} className="text-teal-500" />
              <span className="text-sm truncate">{userEmail}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Shield size={18} className="text-teal-500" />
              <span className="text-sm">Account Active</span>
            </div>
          </div>

          <button onClick={handleLogout} className="w-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;