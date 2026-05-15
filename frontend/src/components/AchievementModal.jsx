import React, { useRef, useState } from 'react';
import { X, Download, Award } from 'lucide-react';
import html2canvas from 'html2canvas';

const AchievementModal = ({ isOpen, onClose, stats, userName, avatarSeed }) => {
  const cardRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const downloadStory = async () => {
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0f172a',
        scale: 2,
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
    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="flex flex-col items-center mt-10">
        <div
          ref={cardRef}
          className="w-80 h-[520px] bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 border border-teal-500/20 rounded-[2.5rem] p-6 relative overflow-hidden shadow-[0_40px_120px_-70px_rgba(20,184,166,0.35)]"
        >
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-teal-500/15 rounded-full blur-3xl"></div>

          <div className="flex items-center gap-3 z-10">
            <img src={`https://api.dicebear.com/9.x/micah/svg?seed=${avatarSeed}`} alt="avatar" className="w-12 h-12 rounded-full bg-teal-500/20 border border-teal-500/30" />
            <div>
              <h3 className="font-bold text-white">{userName}</h3>
              <p className="text-xs text-teal-300 tracking-wider font-mono">HEALTHOS DAILY</p>
            </div>
          </div>

          <div className="z-10 flex flex-col gap-4 mt-8">
            <div className="bg-slate-900/70 backdrop-blur-xl p-4 rounded-3xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-300">💧 Water</span>
              <span className="font-bold text-cyan-300">{stats.water}</span>
            </div>
            <div className="bg-slate-900/70 backdrop-blur-xl p-4 rounded-3xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-300">😴 Sleep</span>
              <span className="font-bold text-violet-300">{stats.sleep}</span>
            </div>
            <div className="bg-slate-900/70 backdrop-blur-xl p-4 rounded-3xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-300">👣 Steps</span>
              <span className="font-bold text-emerald-300">{stats.steps}</span>
            </div>
          </div>

          <div className="z-10 mt-auto text-center">
            <Award size={44} className="text-amber-400 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-white">Crushing Goals! 🔥</h2>
            <p className="text-sm text-slate-400 mt-2">Join me on HealthOS for a premium wellness routine.</p>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button onClick={onClose} className="bg-slate-900/90 hover:bg-slate-800 text-slate-300 p-3 rounded-3xl transition-all border border-slate-700">
            <X size={24} />
          </button>
          <button onClick={downloadStory} disabled={isDownloading} className="bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-bold py-3 px-6 rounded-3xl flex items-center gap-2 transition-all shadow-xl shadow-teal-500/20">
            {isDownloading ? "Generating..." : <><Download size={20} /> Download Story</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AchievementModal;