"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Zap, RotateCcw, Target, RefreshCw, 
  StopCircle, AlertCircle, X
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { showSuccess, showError } from '@/utils/toast';

const ScoringPage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [matchData, setMatchData] = useState<any>(null);
  
  const [score, setScore] = useState<[number, number]>([0, 0]);
  const [setsWon, setSetsWon] = useState<[number, number]>([0, 0]);
  const [serving, setServing] = useState<1 | 2>(1);
  const [activeOverlay, setActiveOverlay] = useState<1 | 2 | null>(null);
  const [pointHistory, setPointHistory] = useState<any[]>([]);

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

    // Check set win
    if (newScore[side - 1] >= 21 && Math.abs(newScore[0] - newScore[1]) >= 2) {
      const newSets = [...setsWon] as [number, number];
      newSets[side - 1]++;
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
    showSuccess("Match Reset");
  };

  if (!matchData) return null;

  return (
    <div className="h-screen w-full bg-slate-50 text-[#0B1F3A] flex flex-col overflow-hidden">
      <Navbar />

      <main className="flex-1 container max-w-4xl flex flex-col p-6 gap-6 justify-center">
        
        {/* SCOREBOARD SECTION */}
        <div className="grid grid-cols-2 gap-6 relative">
          {[1, 2].map((side) => (
            <div 
              key={side}
              className={cn(
                "rounded-[3rem] p-10 flex flex-col items-center justify-center transition-all duration-500 border",
                serving === side 
                  ? "bg-white border-sky-500 shadow-2xl ring-4 ring-sky-500/5" 
                  : "bg-white/40 border-slate-100 opacity-60"
              )}
            >
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-black uppercase italic tracking-tighter">
                  {side === 1 ? "Victor" : "Lakshya"}
                </h2>
                {serving === side && (
                  <div className="bg-sky-500 p-2 rounded-xl shadow-lg shadow-sky-500/30">
                    <Zap className="h-5 w-5 text-white fill-current" />
                  </div>
                )}
              </div>
              
              <motion.span 
                key={score[side-1]}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={cn(
                  "text-[8rem] font-black font-mono leading-none tracking-tighter",
                  side === 1 ? "text-sky-600" : "text-[#0B1F3A]"
                )}
              >
                {score[side-1]}
              </motion.span>

              <div className="mt-6 flex gap-2">
                {[...Array(2)].map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "h-3.5 w-3.5 rounded-full border-2",
                      i < setsWon[side-1] 
                        ? (side === 1 ? "bg-sky-500 border-sky-500" : "bg-[#0B1F3A] border-[#0B1F3A]") 
                        : "bg-transparent border-slate-200"
                    )} 
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[60%] bg-slate-200/50 hidden lg:block" />
        </div>

        {/* SCORING CONTROLS */}
        <div className="grid grid-cols-2 gap-6">
          {[1, 2].map((side) => (
            <div key={side} className="relative h-28">
              <Button 
                onClick={() => setActiveOverlay(side as 1 | 2)}
                className="w-full h-full rounded-[2rem] bg-[#0B1F3A] text-white font-black text-4xl shadow-xl hover:bg-sky-600 transition-all active:scale-95"
              >
                +1
              </Button>
              
              <AnimatePresence>
                {activeOverlay === side && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.95 }} 
                    className="absolute inset-0 z-50 bg-[#0B1F3A] rounded-[2rem] p-3 flex flex-col gap-2 shadow-2xl border-2 border-sky-500/50"
                  >
                    <div className="flex justify-between items-center px-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-sky-400">Shot Type</span>
                      <button onClick={() => setActiveOverlay(null)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <X className="h-4 w-4 text-white/60" />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2 flex-1">
                      <Button 
                        onClick={() => handlePoint(side as 1 | 2, 'Smash')} 
                        className="h-full bg-white/5 hover:bg-sky-500 border border-white/10 rounded-2xl flex flex-col gap-2"
                      >
                        <Zap className="h-6 w-6 text-sky-400 group-hover:text-white" />
                        <span className="text-[11px] font-black uppercase tracking-widest">Smash</span>
                      </Button>
                      <Button 
                        onClick={() => handlePoint(side as 1 | 2, 'Net')} 
                        className="h-full bg-white/5 hover:bg-sky-500 border border-white/10 rounded-2xl flex flex-col gap-2"
                      >
                        <Target className="h-6 w-6 text-sky-400" />
                        <span className="text-[11px] font-black uppercase tracking-widest">Net</span>
                      </Button>
                      <Button 
                        onClick={() => handlePoint(side as 1 | 2, 'Error')} 
                        className="h-full bg-white/5 hover:bg-red-500 border border-white/10 rounded-2xl flex flex-col gap-2"
                      >
                        <AlertCircle className="h-6 w-6 text-red-400" />
                        <span className="text-[11px] font-black uppercase tracking-widest text-center">Opp. Error</span>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* BOTTOM UTILITY */}
        <div className="grid grid-cols-3 gap-4 h-16">
          <Button onClick={undo} variant="outline" className="h-full rounded-2xl border-slate-200 bg-white font-black text-xs uppercase tracking-widest gap-2 shadow-sm hover:border-sky-500">
            <RotateCcw className="h-4 w-4 text-sky-500" /> Undo
          </Button>
          <Button onClick={reset} variant="outline" className="h-full rounded-2xl border-slate-200 bg-white font-black text-xs uppercase tracking-widest gap-2 shadow-sm hover:border-red-500 text-red-500">
            <RefreshCw className="h-4 w-4" /> Reset
          </Button>
          <Button onClick={() => navigate('/court')} variant="outline" className="h-full rounded-2xl border-slate-200 bg-white font-black text-xs uppercase tracking-widest gap-2 shadow-sm hover:border-[#0B1F3A]">
            <StopCircle className="h-4 w-4 text-[#0B1F3A]" /> End Session
          </Button>
        </div>

      </main>
    </div>
  );
};

export default ScoringPage;