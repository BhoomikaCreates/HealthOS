import React, { useState, useEffect } from 'react';
import { Watch, X, CheckCircle, RefreshCw } from 'lucide-react';

const IoTModal = ({ isOpen, onClose }) => {
  const [isScanning, setIsScanning] = useState(true);

  // 3 second baad scanning khatam karke connected dikhayega
  useEffect(() => {
    if (isOpen) {
      setIsScanning(true);
      const timer = setTimeout(() => setIsScanning(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl w-full max-w-sm relative shadow-2xl flex flex-col items-center text-center">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-2">Sync Device</h2>
        <p className="text-gray-400 mb-8 text-sm">Connect your smartwatch or fitness band</p>

        {isScanning ? (
          <div className="relative flex justify-center items-center mb-8 w-32 h-32">
            {/* Radar Animation */}
            <div className="absolute w-full h-full border-4 border-teal-500/30 rounded-full animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
            <div className="absolute w-24 h-24 border-4 border-teal-500/50 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
            <div className="bg-slate-800 p-4 rounded-full border border-teal-500 relative z-10 shadow-[0_0_20px_rgba(20,184,166,0.5)]">
              <Watch size={40} className="text-teal-400 animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="relative flex justify-center items-center mb-8 w-32 h-32">
            <div className="bg-green-500/10 p-4 rounded-full border border-green-500 relative z-10 shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all scale-110">
              <CheckCircle size={40} className="text-green-400" />
            </div>
          </div>
        )}

        {isScanning ? (
          <div>
            <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
              <RefreshCw size={16} className="animate-spin text-teal-500" />
              Scanning for devices...
            </h3>
            <p className="text-slate-500 text-sm mt-2">Looking for Apple Watch, Fitbit, or Garmin</p>
          </div>
        ) : (
          <div className="animate-[fadeIn_0.5s_ease-in-out]">
            <h3 className="text-xl font-bold text-green-400">Device Connected!</h3>
            <div className="bg-slate-800 p-4 rounded-xl mt-4 border border-slate-700 w-full text-left space-y-2">
              <div className="flex justify-between text-sm"><span className="text-gray-400">Device:</span> <span className="text-white font-bold">Apple Watch Series 8</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Heart Rate:</span> <span className="text-white font-bold">72 BPM</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Last Sync:</span> <span className="text-white font-bold">Just now</span></div>
            </div>
            <button onClick={onClose} className="mt-6 w-full bg-teal-500 hover:bg-teal-400 text-black font-bold py-3 rounded-xl transition-all">
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default IoTModal;