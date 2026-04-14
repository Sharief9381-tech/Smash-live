"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Zap, RotateCcw, Target, RefreshCw, 
  StopCircle, AlertCircle, X, ChevronLeft
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
      const data = JSON.parse(saved);
      setMatchData(data);
      // Initialize score if it exists in data
      if (data.currentScore) setScore(data.currentScore);
      if (data.setsWon) setSetsWon(data.setsWon);
      if (data.serving) setServing(data.serving);
    } else {
      navigate('/broadcast/center');
    }
  }, [matchId, navigate]);

  // Sync state to localStorage for "Live Viewers"
  useEffect(() => {
    if (matchData && matchId) {
      const updatedMatch = {
        ...matchData,
        currentScore: score,
        setsWon: setsWon,
        serving: serving,
        lastUpdate: Date.now()
      };
      localStorage.setItem(matchId, JSON.stringify(updatedMatch));
      
      // Update global active matches list
      const activeMatches = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
      const matchIndex = activeMatches.findIndex((m: any) => m.id === matchId);
      if (matchIndex >= 0) {
        activeMatches[matchIndex] = updatedMatch;
      } else {
        activeMatches.push(updatedMatch);
      }
      localStorage.setItem('active_studio_matches', JSON.stringify(activeMatches));
    }
  }, [score, setsWon, serving, matchData, matchId]);

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
      showSuccess(`Set Won by ${side === 1 ? (matchData.players.p1?.name || 'Player 1') : (matchData.players.p2?.name || 'Player 2')}`);
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
        
        {/* Header with back navigation */}
        <div className="flex items-center justify-between mb-4">
          <Button 
            onClick={() => navigate('/broadcast/center')}
            variant="ghost" 
            className="rounded-2xl h-12 px-6 font-black text-[10px] uppercase tracking-widest border border-slate-100 hover:bg-white"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Studio Dashboard
          </Button>
          <div className="flex items-center gap-3">
             <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Broadcasting Match: {matchData.name}</span>
          </div>
        </div>

        {/* SCOREBOARD SECTION */}
        <div className="grid grid-cols-2 gap-6 relative">
          {[1, 2].map((side) => {
            const player = side === 1 ? matchData.players.p1 : matchData.players.p2;
            return (
              <div 
                key={side}
                className={cn(
                  "rounded-[3.5rem] p-12 flex flex-col items-center justify-center transition-all duration-500 border relative overflow-hidden",
                  serving === side 
                    ? "bg-white border-sky-500 shadow-2xl ring-4 ring-sky-500/5" 
                    : "bg-white/40 border-slate-100 opacity-60"
                )}
              >
                {serving === side && (
                  <div className="absolute top-0 right-0 p-6 opacity-5">
                    <Zap className="h-32 w-32" />
                  </div>
                )}
                <div className="flex flex-col items-center gap-3 mb-4 relative z-10">
                  <div className={cn(
                    "h-16 w-16 rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center font-black",
                    side === 1 ? "bg-sky-500 text-white" : "bg-[#0B1F3A] text-sky-400"
                  )}>
                    {player?.img || (side === 1 ? "P1" : "P2")}
                  </div>
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter text-center">
                    {player?.name || (side === 1 ? "Player 1" : "Player 2")}
                  </h2>
                </div>
                
                <motion.span 
                  key={score[side-1]}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={cn(
                    "text-[8rem] font-black font-mono leading-none tracking-tighter relative z-10",
                    side === 1 ? "text-sky-600" : "text-[#0B1F3A]"
                  )}
                >
                  {score[side-1]}
                </motion.span>

                <div className="mt-8 flex gap-3 relative z-10">
                  {[...Array(2)].map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "h-4 w-4 rounded-full border-2",
                        i < setsWon[side-1] 
                          ? (side === 1 ? "bg-sky-500 border-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]" : "bg-[#0B1F3A] border-[#0B1F3A]") 
                          : "bg-transparent border-slate-200"
                      )} 
                    />
                  ))}
                </div>
              </div>
            );
          })}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[60%] bg-slate-200/50 hidden lg:block" />
        </div>

        {/* SCORING CONTROLS */}
        <div className="grid grid-cols-2 gap-6">
          {[1, 2].map((side) => (
            <div key={side} className="relative h-28">
              <Button 
                onClick={() => setActiveOverlay(side as 1 | 2)}
                className={cn(
                  "w-full h-full rounded-[2.5rem] text-white font-black text-4xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-4",
                  side === 1 ? "bg-sky-500 hover:bg-sky-400" : "bg-[#0B1F3A] hover:bg-[#1a3a5f]"
                )}
              >
                +1 POINT
              </Button>
              
              <AnimatePresence>
                {activeOverlay === side && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.95, y: 10 }} 
                    className="absolute inset-0 z-50 bg-[#0B1F3A] rounded-[2.5rem] p-4 flex flex-col gap-3 shadow-2xl border-2 border-sky-500/50"
                  >
                    <div className="flex justify-between items-center px-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-sky-400">Tactical Shot Identifier</span>
                      <button onClick={() => setActiveOverlay(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="h-5 w-5 text-white/60" />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3 flex-1">
                      <Button 
                        onClick={() => handlePoint(side as 1 | 2, 'Smash')} 
                        className="h-full bg-white/5 hover:bg-sky-500 border border-white/10 rounded-2xl flex flex-col gap-2 group"
                      >
                        <Zap className="h-6 w-6 text-sky-400 group-hover:text-white fill-current" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Smash</span>
                      </Button>
                      <Button 
                        onClick={() => handlePoint(side as 1 | 2, 'Net')} 
                        className="h-full bg-white/5 hover:bg-sky-500 border border-white/10 rounded-2xl flex flex-col gap-2 group"
                      >
                        <Target className="h-6 w-6 text-sky-400 group-hover:text-white" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Net Kill</span>
                      </Button>
                      <Button 
                        onClick={() => handlePoint(side as 1 | 2, 'Error')} 
                        className="h-full bg-white/5 hover:bg-red-500 border border-white/10 rounded-2xl flex flex-col gap-2 group"
                      >
                        <AlertCircle className="h-6 w-6 text-red-400 group-hover:text-white" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-center">Opp. Error</span>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* BOTTOM UTILITY */}
        <div className="grid grid-cols-3 gap-6 h-16">
          <Button onClick={undo} variant="outline" className="h-full rounded-[1.5rem] border-slate-200 bg-white font-black text-xs uppercase tracking-widest gap-3 shadow-sm hover:border-sky-500 group">
            <RotateCcw className="h-4 w-4 text-sky-500 group-hover:rotate-[-45deg] transition-transform" /> Undo Entry
          </Button>
          <Button onClick={reset} variant="outline" className="h-full rounded-[1.5rem] border-slate-200 bg-white font-black text-xs uppercase tracking-widest gap-3 shadow-sm hover:border-red-500 text-red-500">
            <RefreshCw className="h-4 w-4" /> Hard Reset
          </Button>
          <Button 
            onClick={() => {
              // Remove from active matches list
              const activeMatches = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
              const remaining = activeMatches.filter((m: any) => m.id !== matchId);
              localStorage.setItem('active_studio_matches', JSON.stringify(remaining));
              navigate('/court');
            }} 
            variant="outline" 
            className="h-full rounded-[1.5rem] border-slate-200 bg-white font-black text-xs uppercase tracking-widest gap-3 shadow-sm hover:border-[#0B1F3A] group"
          >
            <StopCircle className="h-4 w-4 text-[#0B1F3A] group-hover:scale-110 transition-transform" /> Finalize Match
          </Button>
        </div>

      </main>
    </div>
  );
};

export default ScoringPage;