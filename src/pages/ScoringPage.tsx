"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, RotateCcw, Activity, 
  Target, Trophy, ChevronLeft, 
  BarChart3, RefreshCw, StopCircle,
  TrendingUp, Star, History, 
  ShieldCheck, Flame, AlertCircle,
  ChevronRight, Timer, MousePointer2
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { showSuccess, showError } from '@/utils/toast';

const ScoringPage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [matchData, setMatchData] = useState<any>(null);
  
  // State
  const [score, setScore] = useState<[number, number]>([0, 0]);
  const [setsWon, setSetsWon] = useState<[number, number]>([0, 0]);
  const [serving, setServing] = useState<1 | 2>(1);
  const [activeOverlay, setActiveOverlay] = useState<1 | 2 | null>(null);
  const [pointHistory, setPointHistory] = useState<any[]>([]);
  const [stats, setStats] = useState({
    smashes: [0, 0],
    errors: [0, 0],
    longestRally: 12,
    rallyStreak: 0
  });

  useEffect(() => {
    const saved = localStorage.getItem(matchId || "");
    if (saved) {
      setMatchData(JSON.parse(saved));
    } else {
      navigate('/broadcast/center');
    }
  }, [matchId, navigate]);

  const handlePoint = (side: 1 | 2, type: string) => {
    const newScore = [...score] as [number, number];
    newScore[side - 1] += 1;
    
    setPointHistory(prev => [...prev, { score: [...score], side, type }]);
    setScore(newScore);
    setServing(side);
    setActiveOverlay(null);

    // Update stats
    if (type === 'Smash') {
      const newSmashes = [...stats.smashes];
      newSmashes[side-1]++;
      setStats(prev => ({ ...prev, smashes: newSmashes }));
    } else if (type === 'Error') {
      const newErrors = [...stats.errors];
      newErrors[side-1]++;
      setStats(prev => ({ ...prev, errors: newErrors }));
    }

    // Check set win
    if (newScore[side-1] >= 21 && Math.abs(newScore[0] - newScore[1]) >= 2) {
      const newSets = [...setsWon] as [number, number];
      newSets[side-1]++;
      setSetsWon(newSets);
      showSuccess(`Set Won by ${side === 1 ? 'Victor' : 'Lakshya'}`);
      setScore([0, 0]);
    }
  };

  const undo = () => {
    if (pointHistory.length === 0) return;
    const last = pointHistory[pointHistory.length - 1];
    setScore(last.score);
    setServing(last.side);
    setPointHistory(prev => prev.slice(0, -1));
  };

  const reset = () => {
    setScore([0, 0]);
    setSetsWon([0, 0]);
    setPointHistory([]);
    setStats({ smashes: [0, 0], errors: [0, 0], longestRally: 0, rallyStreak: 0 });
    showSuccess("Match Data Reset");
  };

  if (!matchData) return null;

  return (
    <div className="h-screen w-full bg-slate-50 text-[#0B1F3A] flex flex-col overflow-hidden">
      <Navbar />

      <main className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
        
        {/* TOP SCOREBOARD: TWO EQUAL VERTICAL CARDS */}
        <div className="flex-[4] grid grid-cols-2 gap-4 relative">
          {/* PLAYER 1 CARD */}
          <div className={cn(
            "rounded-[2.5rem] p-8 flex flex-col items-center justify-center transition-all duration-500",
            serving === 1 ? "bg-white border-2 border-sky-500 shadow-2xl" : "bg-white/60 border border-slate-100 opacity-80"
          )}>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">Victor</h2>
              {serving === 1 && <div className="bg-sky-500 p-1.5 rounded-lg shadow-lg shadow-sky-500/30"><Zap className="h-4 w-4 text-white fill-current" /></div>}
            </div>
            <span className="text-[10rem] font-black font-mono leading-none tracking-tighter text-sky-600">
              {score[0]}
            </span>
            <div className="mt-4 flex gap-2">
              {[...Array(setsWon[0])].map((_, i) => (
                <div key={i} className="h-3 w-3 bg-sky-500 rounded-full shadow-sm" />
              ))}
              {[...Array(2 - setsWon[0])].map((_, i) => (
                <div key={i} className="h-3 w-3 bg-slate-100 rounded-full" />
              ))}
            </div>
          </div>

          {/* VERTICAL DIVIDER */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[70%] bg-slate-100 hidden lg:block" />

          {/* PLAYER 2 CARD */}
          <div className={cn(
            "rounded-[2.5rem] p-8 flex flex-col items-center justify-center transition-all duration-500",
            serving === 2 ? "bg-white border-2 border-[#0B1F3A] shadow-2xl" : "bg-white/60 border border-slate-100 opacity-80"
          )}>
            <div className="flex items-center gap-3 mb-2">
              {serving === 2 && <div className="bg-[#0B1F3A] p-1.5 rounded-lg shadow-lg"><Zap className="h-4 w-4 text-white fill-current" /></div>}
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">Lakshya</h2>
            </div>
            <span className="text-[10rem] font-black font-mono leading-none tracking-tighter text-[#0B1F3A]">
              {score[1]}
            </span>
            <div className="mt-4 flex gap-2">
              {[...Array(setsWon[1])].map((_, i) => (
                <div key={i} className="h-3 w-3 bg-[#0B1F3A] rounded-full shadow-sm" />
              ))}
              {[...Array(2 - setsWon[1])].map((_, i) => (
                <div key={i} className="h-3 w-3 bg-slate-100 rounded-full" />
              ))}
            </div>
          </div>
        </div>

        {/* SCORING CONTROLS: TWO LARGE BUTTONS */}
        <div className="flex-[2] grid grid-cols-2 gap-4">
          <div className="relative">
            <Button 
              onClick={() => setActiveOverlay(1)}
              className="w-full h-full rounded-[2rem] bg-[#0B1F3A] text-white font-black text-6xl shadow-xl hover:bg-sky-600 hover:shadow-sky-500/20 active:scale-95 transition-all"
            >
              +1
            </Button>
            <AnimatePresence>
              {activeOverlay === 1 && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute inset-0 z-10 bg-[#0B1F3A] rounded-[2rem] p-2 flex flex-col gap-2">
                  <div className="flex justify-between items-center px-4 pt-1"><span className="text-[10px] font-black uppercase tracking-widest text-sky-400">Select Shot Type</span><button onClick={() => setActiveOverlay(null)} className="text-white/40 hover:text-white transition-colors text-xs font-black">CLOSE</button></div>
                  <div className="grid grid-cols-3 gap-2 flex-1">
                    <Button onClick={() => handlePoint(1, 'Smash')} className="h-full bg-white/10 hover:bg-sky-500 rounded-2xl text-[10px] font-black uppercase tracking-widest flex flex-col gap-2 transition-all">
                      <Zap className="h-5 w-5" /> Smash
                    </Button>
                    <Button onClick={() => handlePoint(1, 'Net Drop')} className="h-full bg-white/10 hover:bg-sky-500 rounded-2xl text-[10px] font-black uppercase tracking-widest flex flex-col gap-2 transition-all">
                      <Target className="h-5 w-5" /> Net Drop
                    </Button>
                    <Button onClick={() => handlePoint(1, 'Error')} className="h-full bg-white/10 hover:bg-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest flex flex-col gap-2 transition-all">
                      <AlertCircle className="h-5 w-5" /> Error
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <Button 
              onClick={() => setActiveOverlay(2)}
              className="w-full h-full rounded-[2rem] bg-[#0B1F3A] text-white font-black text-6xl shadow-xl hover:bg-sky-600 hover:shadow-sky-500/20 active:scale-95 transition-all"
            >
              +1
            </Button>
            <AnimatePresence>
              {activeOverlay === 2 && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute inset-0 z-10 bg-[#0B1F3A] rounded-[2rem] p-2 flex flex-col gap-2">
                  <div className="flex justify-between items-center px-4 pt-1"><span className="text-[10px] font-black uppercase tracking-widest text-sky-400">Select Shot Type</span><button onClick={() => setActiveOverlay(null)} className="text-white/40 hover:text-white transition-colors text-xs font-black">CLOSE</button></div>
                  <div className="grid grid-cols-3 gap-2 flex-1">
                    <Button onClick={() => handlePoint(2, 'Smash')} className="h-full bg-white/10 hover:bg-sky-500 rounded-2xl text-[10px] font-black uppercase tracking-widest flex flex-col gap-2 transition-all">
                      <Zap className="h-5 w-5" /> Smash
                    </Button>
                    <Button onClick={() => handlePoint(2, 'Net Drop')} className="h-full bg-white/10 hover:bg-sky-500 rounded-2xl text-[10px] font-black uppercase tracking-widest flex flex-col gap-2 transition-all">
                      <Target className="h-5 w-5" /> Net Drop
                    </Button>
                    <Button onClick={() => handlePoint(2, 'Error')} className="h-full bg-white/10 hover:bg-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest flex flex-col gap-2 transition-all">
                      <AlertCircle className="h-5 w-5" /> Error
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* SHOT EVENT BUTTONS: UNDO, RESET, END */}
        <div className="flex-[1] grid grid-cols-3 gap-3 shrink-0">
          <Button onClick={undo} variant="outline" className="h-full rounded-2xl border-slate-200 bg-white font-black text-[10px] uppercase tracking-[0.2em] shadow-sm hover:border-sky-500 transition-all gap-2">
            <RotateCcw className="h-3.5 w-3.5" /> Undo
          </Button>
          <Button onClick={reset} variant="outline" className="h-full rounded-2xl border-slate-200 bg-white font-black text-[10px] uppercase tracking-[0.2em] shadow-sm hover:border-red-500 text-red-500 transition-all gap-2">
            <RefreshCw className="h-3.5 w-3.5" /> Reset
          </Button>
          <Button onClick={() => navigate('/court')} variant="outline" className="h-full rounded-2xl border-slate-200 bg-white font-black text-[10px] uppercase tracking-[0.2em] shadow-sm hover:border-sky-500 transition-all gap-2">
            <StopCircle className="h-3.5 w-3.5" /> End
          </Button>
        </div>

        {/* SET ANALYSIS & INSIGHTS CARDS */}
        <div className="flex-[3] grid grid-cols-2 gap-4">
          {/* SET ANALYSIS */}
          <div className="bg-white border border-slate-100 rounded-[2rem] p-6 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Set Analysis</h3>
              <Badge className="bg-sky-500/10 text-sky-600 border-none font-black text-[8px] uppercase">Set {setsWon[0] + setsWon[1] + 1}</Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">Rally Streak</p>
                <p className="text-xl font-black text-[#0B1F3A]">{pointHistory.filter(h => h.side === serving).length} <span className="text-[10px] opacity-40 italic">CONSECUTIVE</span></p>
              </div>
              <div>
                <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">Serve Changes</p>
                <p className="text-xl font-black text-[#0B1F3A]">14</p>
              </div>
            </div>

            <div className="space-y-2">
               <div className="flex justify-between items-center text-[9px] font-black text-slate-400 uppercase">
                  <span>Momentum</span>
                  <span className={cn(score[0] >= score[1] ? "text-sky-500" : "text-[#0B1F3A]")}>
                    {score[0] === score[1] ? "EVEN" : score[0] > score[1] ? "Victor leading by " + (score[0]-score[1]) : "Lakshya leading by " + (score[1]-score[0])}
                  </span>
               </div>
               <div className="h-2 bg-slate-50 rounded-full overflow-hidden flex">
                  <div className="h-full bg-sky-500 transition-all duration-500" style={{ width: `${(score[0] / (score[0] + score[1] || 1)) * 100}%` }} />
                  <div className="h-full bg-[#0B1F3A] transition-all duration-500" style={{ width: `${(score[1] / (score[0] + score[1] || 1)) * 100}%` }} />
               </div>
            </div>
          </div>

          {/* INSIGHTS SECTION */}
          <div className="bg-[#0B1F3A] rounded-[2rem] p-6 text-white space-y-4 shadow-xl relative overflow-hidden flex flex-col justify-between">
             <div className="flex items-center justify-between border-b border-white/5 pb-3 relative z-10">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40">Insights Section</h3>
              <BarChart3 className="h-3 w-3 text-sky-400" />
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div>
                 <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Longest Rally</p>
                 <p className="text-xl font-black text-sky-400 italic">42s</p>
              </div>
              <div>
                 <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Serve Analysis</p>
                 <p className="text-xl font-black text-white italic">Aggressive</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 relative z-10">
               <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-sky-400" />
                  <div>
                    <p className="text-sm font-black text-white leading-none">{stats.smashes[0] + stats.smashes[1]}</p>
                    <p className="text-[8px] font-black text-white/40 uppercase">Total Smashes</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <AlertCircle className="h-3 w-3 text-red-400" />
                  <div>
                    <p className="text-sm font-black text-white leading-none">{stats.errors[0] + stats.errors[1]}</p>
                    <p className="text-[8px] font-black text-white/40 uppercase">Total Errors</p>
                  </div>
               </div>
            </div>

            <div className="absolute -right-6 -bottom-6 opacity-5 pointer-events-none">
              <Target className="h-24 w-24 text-white" />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default ScoringPage;