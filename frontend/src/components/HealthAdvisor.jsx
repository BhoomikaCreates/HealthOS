import React, { useState } from 'react';
import { Bot, Camera, Image, CheckCircle, Zap, Salad, Flame, Layers3, Target, Loader2 } from 'lucide-react';

const HealthAdvisor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const mockScannedData = {
    foodName: "Premium Avocado Toast",
    totalCalories: 380,
    macros: {
      protein: { grams: 12, percent: 13, color: "bg-red-500", icon: Layers3 },
      carbs: { grams: 45, percent: 47, color: "bg-blue-500", icon: Zap },
      fats: { grams: 35, percent: 40, color: "bg-yellow-500", icon: Flame }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setScanResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startScan = () => {
    if (!selectedImage) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(mockScannedData);
    }, 3000);
  };

  const ProteinIcon = scanResult?.macros.protein.icon;
  const CarbsIcon = scanResult?.macros.carbs.icon;
  const FatsIcon = scanResult?.macros.fats.icon;

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950/80 border border-orange-500/20 p-8 md:p-10 rounded-[2.5rem] shadow-[0_40px_120px_-70px_rgba(249,115,22,0.15)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex-1">
          <h2 className="text-3xl md:text-4xl font-black text-white flex items-center gap-4 tracking-tight">
            <Bot className="text-orange-400" size={40} /> Gemini AI Advisor
          </h2>
          <p className="text-slate-300 mt-2 text-lg italic">Scan your meal. Let the AI reveal what's really on your plate.</p>
        </div>
      </div>

      <div className="bg-slate-950/95 dark:bg-slate-900/90 backdrop-blur-xl p-8 md:p-10 rounded-[3rem] border border-slate-800 shadow-[0_40px_120px_-70px_rgba(15,23,42,0.35)] flex flex-col md:flex-row gap-10 items-center justify-center">
        <div className="relative group w-72 h-72 md:w-80 md:h-80 flex items-center justify-center overflow-hidden bg-slate-900/80 rounded-[2rem] border border-slate-800 transition-all shadow-xl">
          {selectedImage ? (
            <>
              <img src={selectedImage} alt="Food to scan" className="w-full h-full object-cover rounded-[2rem]" />
              {isScanning && (
                <div className="absolute left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-amber-400 shadow-[0_0_15px_rgba(251,146,60,0.8)] animate-scan-line top-0 z-20"></div>
              )}
            </>
          ) : (
            <div className="text-center p-6 space-y-4">
              <Salad size={48} className="mx-auto text-slate-500" />
              <p className="text-slate-300 font-bold">Upload Food Picture</p>
              <p className="text-xs text-slate-500">(Dal, Pizza, Salad, Roti...)</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5 w-full md:w-auto flex-1 max-w-sm">
          <input type="file" accept="image/*" id="foodUpload" onChange={handleFileChange} className="hidden" />
          <label htmlFor="foodUpload" className="cursor-pointer px-8 py-5 rounded-3xl bg-slate-900/90 border border-slate-800 text-slate-100 font-bold flex items-center gap-3 hover:bg-slate-900 transition-all shadow-lg">
            <Image size={24} className="text-orange-400" /> Upload from Gallery
          </label>
          <button className="cursor-not-allowed opacity-60 px-8 py-5 rounded-3xl bg-slate-900/90 border border-slate-800 text-slate-100 font-bold flex items-center gap-3 shadow-lg">
            <Camera size={24} className="text-orange-400" /> Take a Photo (App Only)
          </button>

          <button
            onClick={startScan}
            disabled={!selectedImage || isScanning}
            className={`px-8 py-5 mt-4 rounded-3xl text-white font-black text-xl flex items-center justify-center gap-3 shadow-xl transition-all relative ${!selectedImage || isScanning ? 'bg-slate-600 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-amber-400 hover:scale-105 shadow-orange-500/25 active:scale-95'}`}
          >
            {isScanning ? (
              <><Loader2 className="animate-spin" size={26} /> Analyzing Meal...</>
            ) : (
              <><CheckCircle size={26} /> Analyze with Gemini AI</>
            )}
          </button>
        </div>
      </div>

      {scanResult && (
        <div className="animate-fade-in space-y-8 mt-10">
          <div className="flex items-center gap-3 p-6 bg-emerald-500/10 rounded-3xl border border-emerald-500/20">
            <Target className="text-emerald-400" size={32} />
            <div>
              <h3 className="text-2xl font-black text-slate-50">Analysis Complete!</h3>
              <p className="text-slate-200">Meal detected: <span className="font-black text-emerald-300">{scanResult.foodName}</span></p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="col-span-2 md:col-span-1 p-6 rounded-[2rem] bg-gradient-to-br from-amber-500 to-orange-400 text-white shadow-xl shadow-orange-500/20 relative overflow-hidden">
              <Flame className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-10" />
              <span className="text-xs uppercase font-black tracking-wider text-orange-900/40">Estimated Energy</span>
              <p className="text-6xl font-black mt-2 drop-shadow-sm">{scanResult.totalCalories}</p>
              <p className="text-sm font-bold text-orange-950 mt-1">Total Kcal</p>
            </div>

            <div className="p-6 rounded-[2rem] bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs uppercase font-black tracking-wider text-slate-400">Protein</span>
                {ProteinIcon && <ProteinIcon className="text-red-400" size={20} />}
              </div>
              <p className="text-4xl font-black text-slate-50 my-3 font-mono">{scanResult.macros.protein.grams}g</p>
              <p className="text-xs text-slate-400">(~{scanResult.macros.protein.percent}%)</p>
              <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3">
                <div className={`h-full rounded-full ${scanResult.macros.protein.color}`} style={{width: `${scanResult.macros.protein.percent}%`}}></div>
              </div>
            </div>

            <div className="p-6 rounded-[2rem] bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs uppercase font-black tracking-wider text-slate-400">Carbs</span>
                {CarbsIcon && <CarbsIcon className="text-sky-400" size={20} />}
              </div>
              <p className="text-4xl font-black text-slate-50 my-3 font-mono">{scanResult.macros.carbs.grams}g</p>
              <p className="text-xs text-slate-400">(~{scanResult.macros.carbs.percent}%)</p>
              <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3">
                <div className={`h-full rounded-full ${scanResult.macros.carbs.color}`} style={{width: `${scanResult.macros.carbs.percent}%`}}></div>
              </div>
            </div>

            <div className="p-6 rounded-[2rem] bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs uppercase font-black tracking-wider text-slate-400">Fats</span>
                {FatsIcon && <FatsIcon className="text-yellow-400" size={20} />}
              </div>
              <p className="text-4xl font-black text-slate-50 my-3 font-mono">{scanResult.macros.fats.grams}g</p>
              <p className="text-xs text-slate-400">(~{scanResult.macros.fats.percent}%)</p>
              <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3">
                <div className={`h-full rounded-full ${scanResult.macros.fats.color}`} style={{width: `${scanResult.macros.fats.percent}%`}}></div>
              </div>
            </div>
          </div>

          <button className="w-full py-5 rounded-3xl bg-slate-900 text-orange-300 font-black text-xl hover:scale-[1.02] transition-transform shadow-xl shadow-orange-500/20">
            Log this Meal
          </button>
        </div>
      )}
    </div>
  );
};

export default HealthAdvisor;