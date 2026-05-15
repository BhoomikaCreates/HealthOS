import React, { useState, useEffect } from 'react';
import { Watch, X, CheckCircle, RefreshCw } from 'lucide-react';

const IoTModal = ({ isOpen, onClose }) => {
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsScanning(true);
      const timer = setTimeout(() => setIsScanning(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-slate-950/95 border border-teal-500/10 p-8 rounded-[2.5rem] w-full max-w-sm relative shadow-[0_40px_120px_-70px_rgba(20,184,166,0.35)]">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Sync Device</h2>
          <p className="text-slate-400 text-sm">Connect your smartwatch or fitness band.</p>
        </div>

        {isScanning ? (
          <div className="relative flex justify-center items-center mb-8 w-32 h-32 mx-auto">
            <div className="absolute w-full h-full rounded-full border-4 border-teal-500/20 animate-ping"></div>
            <div className="absolute w-24 h-24 rounded-full border-4 border-teal-400/40 animate-ping"></div>
            <div className="bg-slate-900 p-4 rounded-full border border-teal-500 relative z-10 shadow-[0_0_20px_rgba(20,184,166,0.45)]">
              <Watch size={40} className="text-teal-400 animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="relative flex justify-center items-center mb-8 w-32 h-32 mx-auto">
            <div className="bg-emerald-500/10 p-4 rounded-full border border-emerald-400 relative z-10 shadow-[0_0_20px_rgba(34,197,94,0.35)] scale-105">
              <CheckCircle size={40} className="text-emerald-400" />
            </div>
          </div>
        )}

        {isScanning ? (
          <div>
            <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
              <RefreshCw size={16} className="animate-spin text-teal-400" />
              Scanning for devices...
            </h3>
            <p className="text-slate-500 text-sm mt-2">Looking for Apple Watch, Fitbit, or Garmin.</p>
          </div>
        ) : (
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold text-emerald-300">Device Connected!</h3>
            <div className="bg-slate-900/80 p-4 rounded-3xl mt-4 border border-slate-800 w-full text-left space-y-2">
              <div className="flex justify-between text-sm text-slate-300"><span className="text-slate-500">Device:</span> <span className="font-bold text-white">Apple Watch Series 8</span></div>
              <div className="flex justify-between text-sm text-slate-300"><span className="text-slate-500">Heart Rate:</span> <span className="font-bold text-white">72 BPM</span></div>
              <div className="flex justify-between text-sm text-slate-300"><span className="text-slate-500">Last Sync:</span> <span className="font-bold text-white">Just now</span></div>
            </div>
            <button onClick={onClose} className="mt-6 w-full bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-bold py-3 rounded-3xl transition-all hover:brightness-110">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IoTModal;