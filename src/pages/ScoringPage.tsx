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
  ShieldCheck, Flame, MousePointer2
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { showSuccess, showError } from '@/utils/toast';

const CourtBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02] flex items-center justify-center p-8">
    <div className="w-full h-full border-[6px] border-[#0B1F3A] relative">
      <div className="absolute inset-y-0 left-1/2 w-[6px] bg-[#0B1F3A] -translate-x-1/2" />
      <div className="absolute inset-x-0 top-[15%] h-[2px] bg-[#0B1F3A]" />
      <div className="absolute inset-x-0 bottom-[15%] h-[2px] bg-[#0B1F3A]" />
      <div className="absolute inset-y-0 left-[10%] w-[2px] bg-[#0B1F3A]" />
      <div className="absolute inset-y-0 right-[10%] w-[2px] bg-[#0B1F3A]" />
    </div>
  </div>
);

const ScoringPage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [matchData, setMatchData] = useState<any>(null);
  const [score, setScore] = useState<[number, number]>([0, 0]);
  const [sets, setSets] = useState<[number, number][]>([]);
  const [pointHistory, setPointHistory] = useState<any[]>([]);
  const [serving, setServing] = useState<1 | 2>(1);
  const [isFinished, setIsFinished] = useState(false);
  const [activeScoringSide, setActiveScoringSide] = useState<1 | 2 | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(matchId || "");
    if (saved) {
      setMatchData(JSON.parse(saved));
    } else {
      showError("Session Terminated");
      navigate('/broadcast/center');
    }
  }, [matchId, navigate]);

  const checkWinner = (s1: number, s2: number) => {
    if (s1 >= 21 && s1 - s2 >= 2) return true;
    if (s1 === 30) return true;
    return false;
  };

  const confirmPoint = (type: string) => {
    if (!activeScoringSide || isFinished) return;
    
    const side = activeScoringSide;
    setPointHistory(prev => [...prev, { score: [...score], type, side }]);
    const next = [...score] as [number, number];
    next[side - 1] += 1;
    setScore(next);
    setServing(side);
    setActiveScoringSide(null);
    
    if (checkWinner(next[side - 1], next[side === 1 ? 1 : 0])) {
      setIsFinished(true);
      showSuccess(`MATCH POINT! Victory Secured.`);
    }
  };

  const undo = () => {
    if (pointHistory.length === 0) return;
    const last = pointHistory[pointHistory.length - 1];
    setScore(last.score);
    setServing(last.side);
    setPointHistory(prev => prev.slice(0, -1));
    setIsFinished(false);
  };

  const finalizeSet = () => {
    if (score[0] === 0 && score[1] === 0) return;
    setSets(prev => [...prev, [...score]]);
    setScore([0, 0]);
    setPointHistory([]);
    setIsFinished(false);
    showSuccess("Set Data Synchronized.");
  };

  if (!matchData) return null;

  const sideA = matchData.matchType === 'singles' 
    ? { name: matchData.players.p1.name, country: matchData.players.p1.country }
    : { name: `${matchData.players.tA1.name.split(' ')[0]} / ${matchData.players.tA2.name.split(' ')[0]}`, country: matchData.players.tA1.country };

  const sideB = matchData.matchType === 'singles'
    ? { name: matchData.players.p2.name, country: matchData.players.p2.country }
    : { name: `${matchData.players.tB1.name.split(' ')[0]} / ${matchData.players.tB2.name.split(' ')[0]}`, country: matchData.players.tB1.country };

  return (
    <div className="h-screen w-full bg-white text-[#0B1F3A] flex flex-col relative overflow-hidden">
      <Navbar />
      <CourtBackground />

      <main className="flex-1 container max-w-4xl px-4 py-4 flex flex-col gap-4 relative z-10 overflow-hidden">
        {/* COMPACT HEADER */}
        <div className="flex items-center justify-between shrink-0 bg-slate-50/80 backdrop-blur-md p-3 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-3">
             <Button variant="ghost" onClick={() => navigate(-1)} className="rounded-xl h-9 w-9 hover:bg-white">
                <ChevronLeft className="h-4 w-4" />
             </Button>
             <div>
                <h1 className="text-sm font-black italic uppercase tracking-tighter">{matchData.name}</h1>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{matchData.round} • Court {matchData.court}</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-slate-200">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-[#0B1F3A]">Recording</span>
             </div>
             <Button onClick={() => setIsFinished(true)} variant="ghost" className="text-red-500 font-black text-[9px] uppercase tracking-widest hover:bg-red-50 h-8">
                <StopCircle className="h-3.5 w-3.5 mr-1.5" /> Stop
             </Button>
          </div>
        </div>

        {/* SCORING GRID */}
        <div className="flex-1 grid grid-cols-2 gap-4 items-stretch min-h-0">
          {[1, 2].map((side) => {
            const isA = side === 1;
            const info = isA ? sideA : sideB;
            const isServing = serving === side;
            
            return (
              <div key={side} className={cn(
                "relative flex flex-col p-6 rounded-[2.5rem] border transition-all duration-300",
                isServing ? "bg-white border-sky-500 shadow-xl" : "bg-slate-50/40 border-slate-100 opacity-80"
              )}>
                <div className="text-center space-y-1">
                  <h2 className="text-xl font-black italic tracking-tighter uppercase text-[#0B1F3A] leading-tight">
                    {info.name}
                  </h2>
                  <div className="flex items-center justify-center gap-1.5">
                     <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{info.country}</p>
                     {isServing && <Zap className="h-3 w-3 text-sky-500 fill-current" />}
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center">
                   <motion.span 
                    key={score[side-1]}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={cn(
                      "text-8xl font-black font-mono tracking-tighter tabular-nums leading-none",
                      isA ? "text-sky-600" : "text-[#0B1F3A]"
                    )}
                   >
                     {score[side-1]}
                   </motion.span>
                </div>

                {/* Point Button with Overlay Logic */}
                <div className="relative shrink-0">
                   <Button 
                      onClick={() => setActiveScoringSide(side as 1 | 2)}
                      className="w-full h-16 rounded-3xl bg-[#0B1F3A] text-white font-black text-xl shadow-lg hover:bg-sky-500 transition-all active:scale-95 group"
                   >
                      <PlusIcon className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform" /> REGISTER POINT
                   </Button>

                   {/* POINT TYPE OVERLAY */}
                   <AnimatePresence>
                     {activeScoringSide === side && (
                       <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute inset-0 bg-[#0B1F3A] rounded-3xl p-2 grid grid-cols-1 gap-1 z-20"
                       >
                          <div className="flex items-center justify-between px-3 py-1">
                            <span className="text-[8px] font-black text-sky-400 uppercase tracking-[0.2em]">Select Intelligence Type</span>
                            <button onClick={() => setActiveScoringSide(null)}><XIcon className="h-3 w-3 text-white/40 hover:text-white" /></button>
                          </div>
                          <div className="grid grid-cols-3 gap-1 flex-1">
                             <Button onClick={() => confirmPoint('Smash')} className="h-full rounded-2xl bg-white/10 hover:bg-sky-500 text-white font-black text-[9px] uppercase tracking-widest flex flex-col gap-1">
                               <Zap className="h-3 w-3" /> Smash
                             </Button>
                             <Button onClick={() => confirmPoint('Net')} className="h-full rounded-2xl bg-white/10 hover:bg-sky-500 text-white font-black text-[9px] uppercase tracking-widest flex flex-col gap-1">
                               <Target className="h-3 w-3" /> Net Drop
                             </Button>
                             <Button onClick={() => confirmPoint('Error')} className="h-full rounded-2xl bg-white/10 hover:bg-red-500 text-white font-black text-[9px] uppercase tracking-widest flex flex-col gap-1">
                               <AlertCircleIcon className="h-3 w-3" /> Error
                             </Button>
                          </div>
                          <Button onClick={() => confirmPoint('Regular')} className="h-8 bg-white/5 hover:bg-white/10 text-white/60 font-black text-[8px] uppercase">Regular Point</Button>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* COMPACT ANALYTICS */}
        <div className="grid grid-cols-3 gap-3 shrink-0">
           <div className="glass-panel p-3 rounded-2xl border-slate-100 flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center"><Activity className="h-4 w-4" /></div>
              <div>
                 <p className="text-[8px] font-black text-slate-400 uppercase">Timer</p>
                 <p className="text-xs font-black text-[#0B1F3A]">00:42:15</p>
              </div>
           </div>
           <div className="glass-panel p-3 rounded-2xl border-slate-100 flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center"><TrendingUp className="h-4 w-4" /></div>
              <div>
                 <p className="text-[8px] font-black text-slate-400 uppercase">Set Progress</p>
                 <p className="text-xs font-black text-[#0B1F3A]">{sets.length + 1} of {matchData.sets}</p>
              </div>
           </div>
           <div className="glass-panel p-3 rounded-2xl border-slate-100 flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center"><History className="h-4 w-4" /></div>
              <div>
                 <p className="text-[8px] font-black text-slate-400 uppercase">Last Log</p>
                 <p className="text-xs font-black text-[#0B1F3A] truncate">
                   {pointHistory.length > 0 ? pointHistory[pointHistory.length-1].type : "Ready"}
                 </p>
              </div>
           </div>
        </div>

        {/* COMPACT UTILITY BAR */}
        <div className="grid grid-cols-3 gap-3 shrink-0">
           <Button onClick={undo} variant="outline" className="h-12 rounded-xl border-slate-200 bg-white font-black text-[9px] uppercase tracking-widest gap-2 shadow-sm hover:border-sky-500 transition-all">
             <RotateCcw className="h-3.5 w-3.5 text-sky-500" /> Undo
           </Button>
           <Button onClick={finalizeSet} variant="outline" className="h-12 rounded-xl border-slate-200 bg-white font-black text-[9px] uppercase tracking-widest gap-2 shadow-sm hover:border-sky-500 transition-all">
             <History className="h-3.5 w-3.5 text-[#0B1F3A]" /> End Set
           </Button>
           <Button onClick={() => setScore([0, 0])} variant="outline" className="h-12 rounded-xl border-slate-200 bg-white font-black text-[9px] uppercase tracking-widest gap-2 shadow-sm hover:border-red-500 transition-all text-red-500">
             <RefreshCw className="h-3.5 w-3.5" /> Reset
           </Button>
        </div>
      </main>

      {/* FINALIZATION OVERLAY */}
      <AnimatePresence>
        {isFinished && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-[#0B1F3A]/70 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="max-w-sm w-full bg-white p-8 rounded-[3rem] text-center space-y-6 shadow-2xl relative overflow-hidden border-2 border-sky-500/20">
              <div className="absolute top-0 right-0 p-8 opacity-5"><Trophy className="h-32 w-32 text-sky-500" /></div>
              <div className="space-y-3 relative z-10">
                <div className="mx-auto h-12 w-12 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-lg">
                  <Trophy className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none text-[#0B1F3A]">Match Finalized</h2>
              </div>
              <div className="flex items-center justify-center gap-6 py-6 border-y border-slate-100">
                 <div className="flex-1">
                    <p className={cn("text-xs font-black uppercase italic", score[0] > score[1] ? "text-sky-500" : "text-slate-400")}>{sideA.name.split(' ')[0]}</p>
                    <span className={cn("text-5xl font-mono font-black", score[0] > score[1] ? "text-sky-600" : "text-slate-200")}>{score[0]}</span>
                 </div>
                 <div className="flex-1">
                    <p className={cn("text-xs font-black uppercase italic", score[1] > score[0] ? "text-sky-500" : "text-slate-400")}>{sideB.name.split(' ')[0]}</p>
                    <span className={cn("text-5xl font-mono font-black", score[1] > score[0] ? "text-[#0B1F3A]" : "text-slate-200")}>{score[1]}</span>
                 </div>
              </div>
              <div className="space-y-2 relative z-10">
                <Button onClick={() => navigate('/court')} className="w-full h-14 bg-[#0B1F3A] text-white font-black rounded-2xl shadow-xl hover:bg-sky-500 transition-all text-sm">
                  COMPLETE SESSION
                </Button>
                <Button onClick={undo} variant="ghost" className="w-full text-slate-400 font-black text-[9px] uppercase tracking-widest">
                  Undo Victory
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PlusIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const AlertCircleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default ScoringPage;