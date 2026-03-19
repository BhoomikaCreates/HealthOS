import React, { useState } from 'react';
import { Bot, Camera, Image, CheckCircle, Zap, Salad, Flame, Layers3, Target, Loader2 } from 'lucide-react';

const HealthAdvisor = () => {
  // State for image handling and scanning animation
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // DUMMY DATA: Ye data baad mein asli Gemini AI se aayega
  const mockScannedData = {
    foodName: "Premium Avocado Toast",
    totalCalories: 380,
    macros: {
      protein: { grams: 12, percent: 13, color: "bg-red-500", icon: Layers3 },
      carbs: { grams: 45, percent: 47, color: "bg-blue-500", icon: Zap },
      fats: { grams: 35, percent: 40, color: "bg-yellow-500", icon: Flame }
    }
  };

  // Simulate file upload (Since camera access on web needs HTTPS/Native wrapper)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setScanResult(null); // Reset previous scan
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulated Scanning Function
  const startScan = () => {
    if (!selectedImage) return;
    setIsScanning(true);
    // Mimic API delay of 3 seconds
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(mockScannedData);
    }, 3000);
  };

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      
      {/* HEADER SECTION (Enhanced Gradient like Zen/Sleep) */}
      <div className="bg-gradient-to-br from-teal-950 via-slate-950 to-orange-950/70 border border-orange-500/20 p-8 md:p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex-1">
          <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-4 tracking-tighter drop-shadow-lg">
            <Bot className="text-orange-400" size={40} /> Gemini AI Advisor
          </h2>
          <p className="text-slate-300 mt-2 text-lg italic">Scan your meal. Let the AI reveal what's really on your plate.</p>
        </div>
      </div>

      {/* THE SCANNER BOX */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 md:p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl flex flex-col md:flex-row gap-10 items-center justify-center">
        
        {/* Upload/Preview Area */}
        <div className="relative group w-72 h-72 md:w-80 md:h-80 flex items-center justify-center overflow-hidden bg-slate-100 dark:bg-slate-800 rounded-[2rem] border-2 border-dashed border-slate-300 dark:border-slate-700 transition-all">
          {selectedImage ? (
            <>
              <img src={selectedImage} alt="Food to scan" className="w-full h-full object-cover rounded-[2rem]" />
              {/* ✅ THE SCANNING LINE EFFECT ✅ */}
              {isScanning && (
                <div className="absolute left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-amber-500 shadow-[0_0_15px_rgba(251,146,60,0.8)] animate-scan-line top-0 z-20"></div>
              )}
            </>
          ) : (
            <div className="text-center p-6 space-y-4">
              <Salad size={48} className="mx-auto text-slate-400 dark:text-slate-600" />
              <p className="text-slate-600 dark:text-slate-400 font-bold">Upload Food Picture</p>
              <p className="text-xs text-slate-500">(Dal, Pizza, Salad, Roti...)</p>
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex flex-col gap-5 w-full md:w-auto flex-1 max-w-sm">
          {/* File Input */}
          <input type="file" accept="image/*" id="foodUpload" onChange={handleFileChange} className="hidden" />
          
          <label htmlFor="foodUpload" className="cursor-pointer px-8 py-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-bold flex items-center gap-3 hover:scale-[1.02] transition-transform shadow-md group">
            <Image size={24} className="text-amber-500" /> Upload from Gallery
          </label>
          
          <button className="cursor-not-allowed opacity-60 px-8 py-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-bold flex items-center gap-3 shadow-md">
            <Camera size={24} className="text-amber-500" /> Take a Photo (App Only)
          </button>

          <button 
            onClick={startScan}
            disabled={!selectedImage || isScanning}
            className={`px-8 py-5 mt-4 rounded-2xl text-white font-black text-xl flex items-center justify-center gap-3 shadow-xl transition-all relative ${!selectedImage || isScanning ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-amber-400 hover:scale-105 shadow-orange-500/20 active:scale-95'}`}
          >
            {isScanning ? (
              <><Loader2 className="animate-spin" size={26} /> Analyzing Meal...</>
            ) : (
              <><CheckCircle size={26} /> Analyze with Gemini AI</>
            )}
          </button>
        </div>
      </div>

      {/* ✅ RESULTS AREA (Populates after scan) ✅ */}
      {scanResult && (
        <div className="animate-fade-in space-y-8 mt-10">
          <div className="flex items-center gap-3 p-6 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl border border-emerald-200 dark:border-emerald-500/30">
            <Target className="text-emerald-500" size={32} />
            <div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white">Analysis Complete!</h3>
              <p className="text-slate-700 dark:text-slate-300">Meal detected: <span className="font-black text-emerald-600 dark:text-emerald-400">{scanResult.foodName}</span></p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Calories Card (Special Large Card) */}
            <div className="col-span-2 md:col-span-1 p-6 rounded-[2rem] bg-gradient-to-br from-amber-500 to-orange-400 text-white shadow-xl shadow-orange-500/20 relative overflow-hidden group hover:scale-[1.02] transition-transform">
              <Flame className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-[0.05]" size={60} />
              <span className="text-xs uppercase font-black tracking-wider text-orange-900/60">Estimated Energy</span>
              <p className="text-6xl font-black mt-2 drop-shadow-sm">{scanResult.totalCalories}</p>
              <p className="text-sm font-bold text-orange-950 mt-1">Total Kcal</p>
            </div>

            {/* Protein Card */}
            <div className="p-6 rounded-[2rem] bg-white dark:bg-slate-900 border dark:border-slate-800 shadow-xl flex flex-col justify-between hover:border-red-500/50 transition-colors">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs uppercase font-black tracking-wider text-slate-500">Protein</span>
                <scanResult.macros.protein.icon className="text-red-500" size={20}/>
              </div>
              <p className="text-4xl font-black text-slate-800 dark:text-white my-3 font-mono">{scanResult.macros.protein.grams}g</p>
              <p className="text-xs text-slate-500">(~{scanResult.macros.protein.percent}%)</p>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-3"><div className={`h-full rounded-full ${scanResult.macros.protein.color}`} style={{width: `${scanResult.macros.protein.percent}%`}}></div></div>
            </div>

            {/* Carbs Card */}
            <div className="p-6 rounded-[2rem] bg-white dark:bg-slate-900 border dark:border-slate-800 shadow-xl flex flex-col justify-between hover:border-blue-500/50 transition-colors">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs uppercase font-black tracking-wider text-slate-500">Carbs</span>
                <scanResult.macros.carbs.icon className="text-blue-500" size={20}/>
              </div>
              <p className="text-4xl font-black text-slate-800 dark:text-white my-3 font-mono">{scanResult.macros.carbs.grams}g</p>
              <p className="text-xs text-slate-500">(~{scanResult.macros.carbs.percent}%)</p>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-3"><div className={`h-full rounded-full ${scanResult.macros.carbs.color}`} style={{width: `${scanResult.macros.carbs.percent}%`}}></div></div>
            </div>

            {/* Fats Card */}
            <div className="p-6 rounded-[2rem] bg-white dark:bg-slate-900 border dark:border-slate-800 shadow-xl flex flex-col justify-between hover:border-yellow-500/50 transition-colors">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs uppercase font-black tracking-wider text-slate-500">Fats</span>
                <scanResult.macros.fats.icon className="text-yellow-500" size={20}/>
              </div>
              <p className="text-4xl font-black text-slate-800 dark:text-white my-3 font-mono">{scanResult.macros.fats.grams}g</p>
              <p className="text-xs text-slate-500">(~{scanResult.macros.fats.percent}%)</p>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-3"><div className={`h-full rounded-full ${scanResult.macros.fats.color}`} style={{width: `${scanResult.macros.fats.percent}%`}}></div></div>
            </div>

          </div>
          
          <button className="w-full py-5 rounded-2xl bg-slate-900 dark:bg-white text-orange-400 dark:text-orange-600 font-black text-xl hover:scale-[1.02] transition-transform shadow-xl">
            Log this Meal
          </button>
        </div>
      )}
    </div>
  );
};

export default HealthAdvisor;