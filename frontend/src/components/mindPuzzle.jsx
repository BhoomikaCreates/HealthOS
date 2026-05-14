import React, { useState, useEffect, useCallback } from 'react';
import { Brain, Target, Palette, Type, RotateCcw, Play, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

const MindPuzzles = () => {
  const [activeGame, setActiveGame] = useState('reaction');

  // ==========================================
  // GAME 1: REACTION TRACKER LOGIC
  // ==========================================
  const [reactionState, setReactionState] = useState('idle'); // idle, waiting, click, finished
  const [reactionStartTime, setReactionStartTime] = useState(0);
  const [reactionResults, setReactionResults] = useState([]);
  const [reactionTimeout, setReactionTimeout] = useState(null);

  const startReaction = () => {
    setReactionResults([]);
    triggerNextRound(0);
  };

  const triggerNextRound = (count) => {
    if (count >= 5) {
      setReactionState('finished');
      return;
    }
    setReactionState('waiting');
    const delay = Math.floor(Math.random() * 2000) + 1200;
    const timeout = setTimeout(() => {
      setReactionState('click');
      setReactionStartTime(Date.now());
    }, delay);
    setReactionTimeout(timeout);
  };

  const handleReactionClick = () => {
    if (reactionState === 'waiting') {
      clearTimeout(reactionTimeout);
      alert("Too Early! Focus on the screen.");
      setReactionState('idle');
    } else if (reactionState === 'click') {
      const diff = Date.now() - reactionStartTime;
      const updated = [...reactionResults, diff];
      setReactionResults(updated);
      triggerNextRound(updated.length);
    }
  };

  const avgReaction = reactionResults.length ? Math.round(reactionResults.reduce((a, b) => a + b, 0) / reactionResults.length) : 0;

  // ==========================================
  // GAME 2: COLOR CLASH (STROOP TEST) LOGIC
  // ==========================================
  const [colorState, setColorState] = useState('idle'); 
  const [colorScore, setColorScore] = useState(0);
  const [colorTimer, setColorTimer] = useState(30);
  const [currentPuzzle, setCurrentPuzzle] = useState({ word: '', color: {} });

  const COLORS = [
    { name: 'RED', hex: '#ef4444', text: 'text-red-500' },
    { name: 'BLUE', hex: '#3b82f6', text: 'text-blue-500' },
    { name: 'GREEN', hex: '#22c55e', text: 'text-green-500' },
    { name: 'YELLOW', hex: '#eab308', text: 'text-yellow-500' },
    { name: 'PURPLE', hex: '#a855f7', text: 'text-purple-500' }
  ];

  const nextColorPuzzle = () => {
    const w = COLORS[Math.floor(Math.random() * COLORS.length)];
    const c = COLORS[Math.floor(Math.random() * COLORS.length)];
    setCurrentPuzzle({ word: w.name, color: c });
  };

  const startColorGame = () => {
    setColorScore(0);
    setColorTimer(30);
    setColorState('playing');
    nextColorPuzzle();
  };

  useEffect(() => {
    let t;
    if (colorState === 'playing' && colorTimer > 0) {
      t = setInterval(() => setColorTimer(p => p - 1), 1000);
    } else if (colorTimer === 0) setColorState('finished');
    return () => clearInterval(t);
  }, [colorState, colorTimer]);

  const handleColorSelection = (name) => {
    if (name === currentPuzzle.color.name) setColorScore(p => p + 1);
    else setColorScore(p => Math.max(0, p - 1));
    nextColorPuzzle();
  };

  // ==========================================
  // GAME 3: WORD SCRAMBLE LOGIC
  // ==========================================
  const WORDS = ['HEALTH', 'OXYGEN', 'BRAIN', 'ENERGY', 'HYDRATE', 'VITAMIN', 'RELAX', 'MUSCLE'];
  const [scrambleState, setScrambleState] = useState('idle');
  const [scrambleScore, setScrambleScore] = useState(0);
  const [scrambleTarget, setScrambleTarget] = useState('');
  const [scrambleDisplay, setScrambleDisplay] = useState('');
  const [userInput, setUserInput] = useState('');

  const setupScramble = () => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    const scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
    setScrambleTarget(word);
    setScrambleDisplay(scrambled);
    setUserInput('');
  };

  const startScramble = () => {
    setScrambleScore(0);
    setScrambleState('playing');
    setupScramble();
  };

  const checkScramble = (e) => {
    e.preventDefault();
    if (userInput.toUpperCase() === scrambleTarget) {
      setScrambleScore(p => p + 1);
      if (scrambleScore >= 4) setScrambleState('finished');
      else setupScramble();
    } else {
      alert("Wrong word! Try again.");
      setUserInput('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-700">
      
      {/* 🧠 HEADER SECTION */}
      <div className="relative bg-slate-950 border border-slate-800 p-8 rounded-[3rem] shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-xl shadow-cyan-500/20">
            <Brain className="text-slate-950" size={48} />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Cognitive Hub</h1>
            <p className="text-slate-400 text-lg mt-2 font-medium">Verify your mental focus, reflexes and logic in real-time.</p>
          </div>
        </div>
      </div>

      {/* 🎮 NAVIGATION TABS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { id: 'reaction', label: 'Reaction Tracker', icon: Target, color: 'cyan' },
          { id: 'color', label: 'Color Clash', icon: Palette, color: 'rose' },
          { id: 'word', label: 'Word Scramble', icon: Type, color: 'indigo' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveGame(tab.id)}
            className={`p-6 rounded-[2rem] border-2 transition-all flex items-center justify-center gap-4 font-black text-xl ${
              activeGame === tab.id 
                ? `bg-slate-900 border-${tab.color}-500 text-${tab.color}-400 shadow-lg` 
                : 'bg-slate-950 border-slate-900 text-slate-500 hover:border-slate-800'
            }`}
          >
            <tab.icon size={28} /> {tab.label}
          </button>
        ))}
      </div>

      {/* 🕹️ MAIN GAME CANVAS */}
      <div className="bg-slate-950 border border-slate-800 min-h-[600px] rounded-[4rem] shadow-inner flex flex-col items-center justify-center p-8 relative">
        
        {/* --- GAME 1: REACTION TRACKER UI --- */}
        {activeGame === 'reaction' && (
          <div className="w-full max-w-3xl text-center space-y-8">
            {reactionState === 'idle' && (
              <div className="space-y-6">
                <Target size={80} className="mx-auto text-cyan-400" />
                <h2 className="text-4xl font-black text-white">Reflex Engine</h2>
                <p className="text-slate-400 text-lg max-w-md mx-auto">Click immediately when the box turns <span className="text-emerald-400 font-bold">GREEN</span>. We test 5 rounds.</p>
                <button onClick={startReaction} className="px-12 py-5 bg-cyan-500 text-slate-950 font-black rounded-full text-xl hover:scale-105 transition-all">START ENGINE</button>
              </div>
            )}
            {(reactionState === 'waiting' || reactionState === 'click') && (
              <div 
                onClick={handleReactionClick}
                className={`w-full h-96 rounded-[3rem] flex items-center justify-center cursor-pointer transition-all duration-75 border-8 ${
                  reactionState === 'waiting' ? 'bg-rose-500/10 border-rose-500 text-rose-500' : 'bg-emerald-500 border-emerald-300 text-slate-950 shadow-[0_0_100px_rgba(52,211,153,0.4)]'
                }`}
              >
                <span className="text-5xl font-black">{reactionState === 'waiting' ? 'WAIT FOR GREEN...' : 'CLICK NOW!'}</span>
              </div>
            )}
            {reactionState === 'finished' && (
              <div className="space-y-6">
                <CheckCircle2 size={80} className="mx-auto text-emerald-400" />
                <h2 className="text-5xl font-black text-white">{avgReaction} <span className="text-2xl text-slate-500">ms</span></h2>
                <p className="text-slate-400">Your average cognitive response speed.</p>
                <div className="flex gap-4 justify-center">
                  <button onClick={() => setReactionState('idle')} className="p-5 bg-slate-900 text-white rounded-full"><RotateCcw /></button>
                  <button onClick={() => alert("Saved!")} className="px-10 py-5 bg-cyan-500 text-slate-950 font-black rounded-full">SAVE SCORE 🚀</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- GAME 2: COLOR CLASH UI --- */}
        {activeGame === 'color' && (
          <div className="w-full max-w-3xl text-center space-y-8">
            {colorState === 'idle' && (
              <div className="space-y-6">
                <Palette size={80} className="mx-auto text-rose-400" />
                <h2 className="text-4xl font-black text-white">Stroop Focus</h2>
                <p className="text-slate-400 text-lg max-w-md mx-auto">Click the button matching the <span className="text-rose-400 font-bold">INK COLOR</span>, not the text word.</p>
                <button onClick={startColorGame} className="px-12 py-5 bg-rose-500 text-slate-950 font-black rounded-full text-xl hover:scale-105 transition-all">INITIATE TEST</button>
              </div>
            )}
            {colorState === 'playing' && (
              <div className="space-y-12 w-full">
                <div className="flex justify-between text-2xl font-black px-12">
                  <span className="text-slate-500">TIMER: <span className="text-rose-500">{colorTimer}s</span></span>
                  <span className="text-slate-500">SCORE: <span className="text-emerald-500">{colorScore}</span></span>
                </div>
                <div className="bg-slate-900/50 py-16 rounded-[3rem] border border-slate-800">
                  <span className={`text-8xl font-black tracking-tighter uppercase ${currentPuzzle.color.text}`}>
                    {currentPuzzle.word}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-4">
                  {COLORS.map(c => (
                    <button key={c.name} onClick={() => handleColorSelection(c.name)} className="py-6 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all" style={{ backgroundColor: c.hex }}></button>
                  ))}
                </div>
              </div>
            )}
            {colorState === 'finished' && (
              <div className="space-y-6">
                <h2 className="text-8xl font-black text-rose-500">{colorScore}</h2>
                <p className="text-slate-400 text-xl font-bold uppercase tracking-widest">Focus Efficiency Score</p>
                <div className="flex gap-4 justify-center">
                  <button onClick={() => setColorState('idle')} className="p-5 bg-slate-900 text-white rounded-full"><RotateCcw /></button>
                  <button onClick={() => alert("Saved!")} className="px-10 py-5 bg-rose-500 text-slate-950 font-black rounded-full">SAVE RESULTS 🚀</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- GAME 3: WORD SCRAMBLE UI --- */}
        {activeGame === 'word' && (
          <div className="w-full max-w-3xl text-center space-y-8">
            {scrambleState === 'idle' && (
              <div className="space-y-6">
                <Type size={80} className="mx-auto text-indigo-400" />
                <h2 className="text-4xl font-black text-white">Logic Scramble</h2>
                <p className="text-slate-400 text-lg max-w-md mx-auto">Unscramble the health-related word as fast as possible.</p>
                <button onClick={startScramble} className="px-12 py-5 bg-indigo-500 text-slate-950 font-black rounded-full text-xl hover:scale-105 transition-all">START DECODING</button>
              </div>
            )}
            {scrambleState === 'playing' && (
              <form onSubmit={checkScramble} className="space-y-12">
                <div className="text-2xl font-black text-indigo-400">LEVEL: {scrambleScore + 1} / 5</div>
                <div className="text-7xl md:text-9xl font-black text-white tracking-[0.2em] bg-indigo-500/5 py-12 rounded-[3rem] border border-indigo-500/20 italic uppercase">
                  {scrambleDisplay}
                </div>
                <input 
                  autoFocus
                  type="text" 
                  value={userInput} 
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="TYPE DECODED WORD..."
                  className="w-full max-w-md bg-slate-900 border-2 border-slate-800 p-6 rounded-full text-center text-2xl font-black text-indigo-300 focus:border-indigo-500 outline-none transition-all"
                />
              </form>
            )}
            {scrambleState === 'finished' && (
              <div className="space-y-6">
                <Trophy size={80} className="mx-auto text-amber-400" />
                <h2 className="text-4xl font-black text-white">Logic Master!</h2>
                <p className="text-slate-400">You successfully decoded all patterns.</p>
                <div className="flex gap-4 justify-center">
                  <button onClick={() => setScrambleState('idle')} className="p-5 bg-slate-900 text-white rounded-full"><RotateCcw /></button>
                  <button onClick={() => alert("Saved!")} className="px-10 py-5 bg-indigo-500 text-slate-950 font-black rounded-full">SAVE DATA 🚀</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MindPuzzles;