"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, RotateCcw, Activity, 
  Target, Trophy, ChevronLeft, 
  BarChart3, RefreshCw, StopCircle,
  TrendingUp, Star, MoreHorizontal,
  History, AlertCircle, ShieldCheck
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { showSuccess, showError } from '@/utils/toast';

const CourtBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] flex items-center justify-center p-12">
    <div className="w-full h-full border-[8px] border-[#0B1F3A] relative">
      <div className="absolute inset-y-0 left-1/2 w-[8px] bg-[#0B1F3A] -translate-x-1/2" />
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
    // Standard Badminton Rules: 21 points, must win by 2, cap at 30
    if (s1 >= 21 && s1 - s2 >= 2) return true;
    if (s1 === 30) return true;
    return false;
  };

  const registerPoint = (side: 1 | 2, type: string = "Regular") => {
    if (isFinished) return;
    
    setPointHistory(prev => [...prev, { score: [...score], type, side }]);
    const next = [...score] as [number, number];
    next[side - 1] += 1;
    setScore(next);
    setServing(side);
    
    if (checkWinner(next[side - 1], next[side === 1 ? 1 : 0])) {
      setIsFinished(true);
      showSuccess(`MATCH POINT! ${side === 1 ? sideA.name : sideB.name} WINS!`);
    } else {
      showSuccess(`${type} Point: ${side === 1 ? sideA.name : sideB.name}`);
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
    showSuccess("Set Finalized. Starting next set.");
  };

  const handleReset = () => {
    setScore([0, 0]);
    setPointHistory([]);
    setIsFinished(false);
    showSuccess("Score reset to 0-0");
  };

  if (!matchData) return null;

  const getTeamInfo = (side: 'A' | 'B') => {
    if (matchData.matchType === 'singles') {
      const p = side === 'A' ? matchData.players.p1 : matchData.players.p2;
      return { name: p.name, img: p.img, country: p.country };
    }
    const p1 = side === 'A' ? matchData.players.tA1 : matchData.players.tB1;
    const p2 = side === 'A' ? matchData.players.tA2 : matchData.players.tB2;
    return { name: `${p1.name.split(' ')[0]} / ${p2.name.split(' ')[0]}`, img: p1.img, country: p1.country };
  };

  const sideA = getTeamInfo('A');
  const sideB = getTeamInfo('B');

  return (
    <div className="h-screen w-full bg-white text-[#0B1F3A] flex flex-col relative overflow-hidden">
      <Navbar />
      <CourtBackground />

      <main className="flex-1 container max-w-5xl px-6 py-6 flex flex-col gap-6 relative z-10 overflow-hidden">
        {/* MATCH HEADER */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
             <Button variant="ghost" onClick={() => navigate(-1)} className="rounded-xl h-10 w-10 hover:bg-slate-50">
                <ChevronLeft className="h-5 w-5" />
             </Button>
             <div>
                <h1 className="text-xl font-black italic uppercase tracking-tighter">{matchData.name}</h1>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{matchData.round} • Court {matchData.court}</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0B1F3A]">Recording</span>
             </div>
             <Button onClick={() => setIsFinished(true)} variant="ghost" className="text-red-500 font-black text-[10px] uppercase tracking-widest hover:bg-red-50 h-10">
                <StopCircle className="h-4 w-4 mr-2" /> Stop
             </Button>
          </div>
        </div>

        {/* SCORING COMMAND CARDS */}
        <div className="flex-1 grid grid-cols-2 gap-8 items-stretch min-h-0">
          {/* SIDE A CARD */}
          <div className={cn(
            "flex flex-col gap-6 p-8 rounded-[3.5rem] border transition-all duration-500 relative",
            serving === 1 ? "bg-white border-sky-500 shadow-2xl scale-[1.02]" : "bg-slate-50/50 border-slate-100 opacity-60"
          )}>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black italic tracking-tighter uppercase text-[#0B1F3A] leading-none">
                {sideA.name}
              </h2>
              <div className="flex items-center justify-center gap-2">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sideA.country}</p>
                 {serving === 1 && <Zap className="h-3 w-3 text-sky-500 fill-current" />}
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative">
               <span className="text-9xl font-black font-mono tracking-tighter text-sky-600 leading-none">
                 {score[0]}
               </span>
               {isFinished && score[0] > score[1] && (
                 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-0">
                    <Trophy className="h-12 w-12 text-amber-500 drop-shadow-lg" />
                 </motion.div>
               )}
            </div>

            <div className="space-y-3 shrink-0">
               <Button 
                  onClick={() => registerPoint(1, 'Regular')}
                  className="w-full h-20 rounded-3xl bg-[#0B1F3A] text-white font-black text-3xl shadow-xl hover:bg-sky-500 transition-all active:scale-95"
               >
                  +1
               </Button>
               <div className="grid grid-cols-3 gap-2">
                  <Button onClick={() => registerPoint(1, 'Smash')} variant="outline" className="h-12 rounded-xl border-slate-200 font-black text-[9px] uppercase tracking-widest hover:border-sky-500">Smash</Button>
                  <Button onClick={() => registerPoint(1, 'Net')} variant="outline" className="h-12 rounded-xl border-slate-200 font-black text-[9px] uppercase tracking-widest hover:border-sky-500">Net</Button>
                  <Button onClick={() => registerPoint(1, 'Error')} variant="outline" className="h-12 rounded-xl border-slate-200 font-black text-[9px] uppercase tracking-widest hover:border-red-500">Error</Button>
               </div>
            </div>
          </div>

          {/* SIDE B CARD */}
          <div className={cn(
            "flex flex-col gap-6 p-8 rounded-[3.5rem] border transition-all duration-500 relative",
            serving === 2 ? "bg-white border-[#0B1F3A] shadow-2xl scale-[1.02]" : "bg-slate-50/50 border-slate-100 opacity-60"
          )}>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black italic tracking-tighter uppercase text-[#0B1F3A] leading-none">
                {sideB.name}
              </h2>
              <div className="flex items-center justify-center gap-2">
                 {serving === 2 && <Zap className="h-3 w-3 text-sky-500 fill-current" />}
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sideB.country}</p>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative">
               <span className="text-9xl font-black font-mono tracking-tighter text-[#0B1F3A] leading-none">
                 {score[1]}
               </span>
               {isFinished && score[1] > score[0] && (
                 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-0">
                    <Trophy className="h-12 w-12 text-amber-500 drop-shadow-lg" />
                 </motion.div>
               )}
            </div>

            <div className="space-y-3 shrink-0">
               <Button 
                  onClick={() => registerPoint(2, 'Regular')}
                  className="w-full h-20 rounded-3xl bg-[#0B1F3A] text-white font-black text-3xl shadow-xl hover:bg-sky-500 transition-all active:scale-95"
               >
                  +1
               </Button>
               <div className="grid grid-cols-3 gap-2">
                  <Button onClick={() => registerPoint(2, 'Smash')} variant="outline" className="h-12 rounded-xl border-slate-200 font-black text-[9px] uppercase tracking-widest hover:border-sky-500">Smash</Button>
                  <Button onClick={() => registerPoint(2, 'Net')} variant="outline" className="h-12 rounded-xl border-slate-200 font-black text-[9px] uppercase tracking-widest hover:border-sky-500">Net</Button>
                  <Button onClick={() => registerPoint(2, 'Error')} variant="outline" className="h-12 rounded-xl border-slate-200 font-black text-[9px] uppercase tracking-widest hover:border-red-500">Error</Button>
               </div>
            </div>
          </div>
        </div>

        {/* SECTOR PREVIEW / SMALL ANALYTICS */}
        <div className="grid grid-cols-3 gap-6 shrink-0 h-24">
           <div className="glass-panel p-4 rounded-3xl border-slate-100 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center"><BarChart3 className="h-5 w-5" /></div>
              <div>
                 <p className="text-[9px] font-black text-slate-400 uppercase">Match Time</p>
                 <p className="text-sm font-black text-[#0B1F3A]">00:42:15</p>
              </div>
           </div>
           <div className="glass-panel p-4 rounded-3xl border-slate-100 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center"><TrendingUp className="h-5 w-5" /></div>
              <div>
                 <p className="text-[9px] font-black text-slate-400 uppercase">Total Sets</p>
                 <p className="text-sm font-black text-[#0B1F3A]">{sets.length + 1} / {matchData.sets}</p>
              </div>
           </div>
           <div className="glass-panel p-4 rounded-3xl border-slate-100 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center"><History className="h-5 w-5" /></div>
              <div>
                 <p className="text-[9px] font-black text-slate-400 uppercase">Recent Point</p>
                 <p className="text-sm font-black text-[#0B1F3A] truncate">{pointHistory.length > 0 ? pointHistory[pointHistory.length-1].type : "None"}</p>
              </div>
           </div>
        </div>

        {/* MASTER UTILITY BAR */}
        <div className="grid grid-cols-3 gap-4 shrink-0 pb-4">
           <Button onClick={undo} variant="outline" className="h-16 rounded-[1.5rem] border-slate-200 bg-white font-black text-[11px] uppercase tracking-widest gap-3 shadow-lg hover:border-sky-500 transition-all">
             <RotateCcw className="h-5 w-5 text-sky-500" /> Undo Move
           </Button>
           <Button onClick={finalizeSet} variant="outline" className="h-16 rounded-[1.5rem] border-slate-200 bg-white font-black text-[11px] uppercase tracking-widest gap-3 shadow-lg hover:border-sky-500 transition-all">
             <History className="h-5 w-5 text-[#0B1F3A]" /> End This Set
           </Button>
           <Button onClick={handleReset} variant="outline" className="h-16 rounded-[1.5rem] border-slate-200 bg-white font-black text-[11px] uppercase tracking-widest gap-3 shadow-lg hover:border-red-500 transition-all text-red-500">
             <RefreshCw className="h-5 w-5" /> Full Reset
           </Button>
        </div>
      </main>

      {/* FINALIZATION OVERLAY */}
      <AnimatePresence>
        {isFinished && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-[#0B1F3A]/60 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="max-w-md w-full bg-white p-12 rounded-[4rem] text-center space-y-8 shadow-2xl relative overflow-hidden border-4 border-sky-500/20">
              <div className="absolute top-0 right-0 p-12 opacity-5"><Trophy className="h-40 w-40 text-sky-500" /></div>
              <div className="space-y-4 relative z-10">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-xl">
                  <Trophy className="h-8 w-8" />
                </div>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none text-[#0B1F3A]">Victory Secured</h2>
              </div>
              <div className="flex items-center justify-center gap-10 py-8 border-y border-slate-100">
                 <div className="flex-1">
                    <p className={cn("text-xl font-black uppercase italic", score[0] > score[1] ? "text-sky-500" : "text-slate-400")}>{sideA.name.split(' ')[0]}</p>
                    <span className={cn("text-7xl font-mono font-black", score[0] > score[1] ? "text-sky-500" : "text-slate-200")}>{score[0]}</span>
                 </div>
                 <div className="flex-1">
                    <p className={cn("text-xl font-black uppercase italic", score[1] > score[0] ? "text-sky-500" : "text-slate-400")}>{sideB.name.split(' ')[0]}</p>
                    <span className={cn("text-7xl font-mono font-black", score[1] > score[0] ? "text-sky-500" : "text-slate-200")}>{score[1]}</span>
                 </div>
              </div>
              <div className="space-y-3 relative z-10">
                <Button onClick={() => navigate('/court')} className="w-full h-16 bg-[#0B1F3A] text-white font-black rounded-2xl shadow-xl hover:bg-sky-500 transition-all text-lg">
                  COMPLETE SESSION
                </Button>
                <Button onClick={undo} variant="ghost" className="w-full text-slate-400 font-black text-[10px] uppercase tracking-widest">
                  Mistake? Undo Result
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScoringPage;