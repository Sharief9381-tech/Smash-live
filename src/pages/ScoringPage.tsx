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
  ShieldCheck, Flame, AlertCircle
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { showSuccess, showError } from '@/utils/toast';

const CourtBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] flex items-center justify-center p-4">
    <div className="w-full h-full border-[10px] border-[#0B1F3A] relative">
      <div className="absolute inset-y-0 left-1/2 w-[10px] bg-[#0B1F3A] -translate-x-1/2" />
      <div className="absolute inset-x-0 top-[15%] h-[4px] bg-[#0B1F3A]" />
      <div className="absolute inset-x-0 bottom-[15%] h-[4px] bg-[#0B1F3A]" />
      <div className="absolute inset-y-0 left-[10%] w-[4px] bg-[#0B1F3A]" />
      <div className="absolute inset-y-0 right-[10%] w-[4px] bg-[#0B1F3A]" />
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

      <main className="flex-1 container max-w-6xl px-6 py-4 flex flex-col gap-4 relative z-10 overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between shrink-0 bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
             <Button variant="ghost" onClick={() => navigate(-1)} className="rounded-2xl h-11 w-11 hover:bg-slate-50">
                <ChevronLeft className="h-6 w-6" />
             </Button>
             <div>
                <h1 className="text-lg font-black italic uppercase tracking-tighter leading-none">{matchData.name}</h1>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{matchData.round} • Court {matchData.court}</p>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-200">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">Live Broadcast</span>
             </div>
             <Button onClick={() => setIsFinished(true)} variant="ghost" className="text-red-500 font-black text-[10px] uppercase h-10 hover:bg-red-50 px-4">
                <StopCircle className="h-4 w-4 mr-2" /> Stop Session
             </Button>
          </div>
        </div>

        {/* MASSIVE SCOREBOARD */}
        <div className="flex-1 grid grid-cols-2 gap-6 items-stretch min-h-0">
          {[1, 2].map((side) => {
            const isA = side === 1;
            const info = isA ? sideA : sideB;
            const isServing = serving === side;
            
            return (
              <div key={side} className={cn(
                "relative flex flex-col p-8 rounded-[4rem] border transition-all duration-500 overflow-hidden",
                isServing ? "bg-white border-sky-500 shadow-2xl ring-1 ring-sky-500/20" : "bg-slate-50/40 border-slate-100 opacity-60"
              )}>
                <div className="text-center space-y-2 shrink-0">
                  <div className="flex items-center justify-center gap-3">
                     <h2 className="text-3xl font-black italic tracking-tighter uppercase text-[#0B1F3A]">
                        {info.name}
                     </h2>
                     {isServing && <Zap className="h-5 w-5 text-sky-500 fill-current animate-pulse" />}
                  </div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{info.country}</p>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center">
                   <motion.span 
                    key={score[side-1]}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className={cn(
                      "text-[12rem] font-black font-mono tracking-tighter tabular-nums leading-none",
                      isA ? "text-sky-600" : "text-[#0B1F3A]"
                    )}
                   >
                     {score[side-1]}
                   </motion.span>
                </div>

                <div className="relative shrink-0 mt-4">
                   <Button 
                      onClick={() => setActiveScoringSide(side as 1 | 2)}
                      className="w-full h-24 rounded-[2.5rem] bg-[#0B1F3A] text-white font-black text-5xl shadow-xl hover:bg-sky-500 transition-all active:scale-95"
                   >
                      +1
                   </Button>

                   {/* POINT TYPE OVERLAY */}
                   <AnimatePresence>
                     {activeScoringSide === side && (
                       <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="absolute inset-0 bg-[#0B1F3A] rounded-[2.5rem] p-3 flex flex-col gap-2 z-20"
                       >
                          <div className="flex items-center justify-between px-4 py-1">
                            <span className="text-[10px] font-black text-sky-400 uppercase tracking-[0.2em]">Categorize Point</span>
                            <button onClick={() => setActiveScoringSide(null)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                              <XIcon className="h-4 w-4 text-white" />
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-2 flex-1">
                             <Button onClick={() => confirmPoint('Smash')} className="h-full rounded-2xl bg-white/5 hover:bg-sky-500 text-white font-black text-[11px] uppercase tracking-widest flex flex-col gap-2 border border-white/10">
                               <Zap className="h-5 w-5" /> Smash
                             </Button>
                             <Button onClick={() => confirmPoint('Net')} className="h-full rounded-2xl bg-white/5 hover:bg-sky-500 text-white font-black text-[11px] uppercase tracking-widest flex flex-col gap-2 border border-white/10">
                               <Target className="h-5 w-5" /> Net Drop
                             </Button>
                             <Button onClick={() => confirmPoint('Error')} className="h-full rounded-2xl bg-white/5 hover:bg-red-500 text-white font-black text-[11px] uppercase tracking-widest flex flex-col gap-2 border border-white/10">
                               <AlertCircleIcon className="h-5 w-5" /> Opp. Error
                             </Button>
                          </div>
                          <Button onClick={() => confirmPoint('Regular')} className="h-10 bg-white/5 hover:bg-white/10 text-white/40 font-black text-[10px] uppercase rounded-xl">Regular Point</Button>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* UTILITY FOOTER */}
        <div className="flex gap-4 shrink-0 pb-2">
           <div className="flex-1 grid grid-cols-3 gap-3">
              <div className="bg-white border border-slate-100 rounded-3xl p-4 flex items-center gap-4 shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center"><Activity className="h-5 w-5" /></div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase">Match Time</p>
                   <p className="text-base font-black text-[#0B1F3A]">00:42:15</p>
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-3xl p-4 flex items-center gap-4 shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center"><TrendingUp className="h-5 w-5" /></div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase">Set Progress</p>
                   <p className="text-base font-black text-[#0B1F3A]">{sets.length + 1} / {matchData.sets}</p>
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-3xl p-4 flex items-center gap-4 shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center"><History className="h-5 w-5" /></div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase">Last Result</p>
                   <p className="text-base font-black text-[#0B1F3A] truncate">{pointHistory.length > 0 ? pointHistory[pointHistory.length-1].type : "Ready"}</p>
                </div>
              </div>
           </div>

           <div className="grid grid-cols-3 gap-3">
              <Button onClick={undo} variant="outline" className="h-full w-32 rounded-3xl border-slate-200 bg-white font-black text-[10px] uppercase tracking-widest flex flex-col gap-1.5 shadow-sm hover:border-sky-500">
                <RotateCcw className="h-5 w-5 text-sky-500" /> Undo
              </Button>
              <Button onClick={finalizeSet} variant="outline" className="h-full w-32 rounded-3xl border-slate-200 bg-white font-black text-[10px] uppercase tracking-widest flex flex-col gap-1.5 shadow-sm hover:border-sky-500">
                <History className="h-5 w-5 text-[#0B1F3A]" /> End Set
              </Button>
              <Button onClick={() => setScore([0, 0])} variant="outline" className="h-full w-32 rounded-3xl border-slate-200 bg-white font-black text-[10px] uppercase tracking-widest flex flex-col gap-1.5 shadow-sm hover:border-red-500 text-red-500">
                <RefreshCw className="h-5 w-5" /> Reset
              </Button>
           </div>
        </div>
      </main>

      {/* FINALIZATION OVERLAY */}
      <AnimatePresence>
        {isFinished && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-[#0B1F3A]/70 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="max-w-md w-full bg-white p-12 rounded-[4rem] text-center space-y-8 shadow-2xl relative overflow-hidden border-4 border-sky-500/20">
              <div className="absolute top-0 right-0 p-12 opacity-5"><Trophy className="h-40 w-40 text-sky-500" /></div>
              <div className="space-y-4 relative z-10">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-xl">
                  <Trophy className="h-8 w-8" />
                </div>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none text-[#0B1F3A]">Match Finalized</h2>
              </div>
              <div className="flex items-center justify-center gap-10 py-8 border-y border-slate-100">
                 <div className="flex-1">
                    <p className={cn("text-xl font-black uppercase italic", score[0] > score[1] ? "text-sky-500" : "text-slate-400")}>{sideA.name.split(' ')[0]}</p>
                    <span className={cn("text-7xl font-mono font-black", score[0] > score[1] ? "text-sky-600" : "text-slate-200")}>{score[0]}</span>
                 </div>
                 <div className="flex-1">
                    <p className={cn("text-xl font-black uppercase italic", score[1] > score[0] ? "text-sky-500" : "text-slate-400")}>{sideB.name.split(' ')[0]}</p>
                    <span className={cn("text-7xl font-mono font-black", score[1] > score[0] ? "text-[#0B1F3A]" : "text-slate-200")}>{score[1]}</span>
                 </div>
              </div>
              <div className="space-y-3 relative z-10">
                <Button onClick={() => navigate('/court')} className="w-full h-16 bg-[#0B1F3A] text-white font-black rounded-2xl shadow-xl hover:bg-sky-500 transition-all text-xl">
                  COMPLETE SESSION
                </Button>
                <Button onClick={undo} variant="ghost" className="w-full text-slate-400 font-black text-[11px] uppercase tracking-widest">
                  Mistake? Undo Victory
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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