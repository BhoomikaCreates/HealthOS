import React, { useRef, useState } from 'react';
import { X, Download, Award } from 'lucide-react';
import html2canvas from 'html2canvas';

const AchievementModal = ({ isOpen, onClose, stats, userName, avatarSeed }) => {
  const cardRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  // Jadoo ka spell jo code ko image banayega 🪄
  const downloadStory = async () => {
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0f172a', // Match slate-900
        scale: 2, // High resolution for Insta
        useCORS: true,
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "HealthOS_Story.png";
      link.click();
    } catch (err) {
      console.error("Oops image nahi bani:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="flex flex-col items-center mt-10">
        
        {/* 👇 YEH WALA DIBBA IMAGE MEIN CONVERT HOGA 👇 */}
        <div 
          ref={cardRef}
          className="w-80 h-[500px] bg-gradient-to-br from-slate-900 to-teal-900 border border-teal-500/50 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between shadow-2xl"
        >
          {/* Background Decor */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl"></div>
          
          {/* Header */}
          <div className="flex items-center gap-3 z-10">
            <img src={`https://api.dicebear.com/9.x/micah/svg?seed=${avatarSeed}`} alt="avatar" className="w-12 h-12 rounded-full bg-teal-500/20 border border-teal-500/50" />
            <div>
              <h3 className="font-bold text-white">{userName}</h3>
              <p className="text-xs text-teal-400 tracking-wider font-mono">HEALTHOS DAILY</p>
            </div>
          </div>

          {/* User's Stats */}
          <div className="z-10 flex flex-col gap-4 mt-6">
            <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-slate-700/50 flex justify-between items-center">
              <span className="text-gray-300">💧 Water</span>
              <span className="font-bold text-blue-400">{stats.water}</span>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-slate-700/50 flex justify-between items-center">
              <span className="text-gray-300">😴 Sleep</span>
              <span className="font-bold text-purple-400">{stats.sleep}</span>
            </div>
            <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-slate-700/50 flex justify-between items-center">
              <span className="text-gray-300">👣 Steps</span>
              <span className="font-bold text-green-400">{stats.steps}</span>
            </div>
          </div>

          {/* Footer Badge */}
          <div className="z-10 mt-auto text-center">
            <Award size={40} className="text-yellow-400 mx-auto mb-2" />
            <h2 className="text-xl font-bold text-white">Crushing Goals! 🔥</h2>
            <p className="text-xs text-gray-400 mt-2">Join me on HealthOS</p>
          </div>
        </div>
        {/* 👆 IMAGE WALA DIBBA YAHAN KHATAM 👆 */}

        {/* Action Buttons (Yeh image mein nahi aayenge) */}
        <div className="flex gap-4 mt-6">
          <button onClick={onClose} className="bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white p-3 rounded-full transition-all border border-slate-700">
            <X size={24} />
          </button>
          <button onClick={downloadStory} disabled={isDownloading} className="bg-teal-500 hover:bg-teal-400 text-black font-bold py-3 px-6 rounded-full flex items-center gap-2 transition-all shadow-lg shadow-teal-500/20">
            {isDownloading ? "Generating..." : <><Download size={20} /> Download Story</>}
          </button>
        </div>

      </div>
    </div>
  );
}

export default AchievementModal;