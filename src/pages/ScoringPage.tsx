"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, RotateCcw, Activity, 
  Target, Trophy, ChevronLeft, 
  BarChart3, RefreshCw, StopCircle,
  TrendingUp, Star, MoreHorizontal
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
  const [history, setHistory] = useState<any[]>([]);
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

  const registerPoint = (side: 1 | 2, type: string = "Regular") => {
    if (isFinished) return;
    setHistory(prev => [...prev, { score: [...score], type, side }]);
    const next = [...score] as [number, number];
    next[side - 1] += 1;
    setScore(next);
    setServing(side);
    showSuccess(`${type} Point: ${side === 1 ? sideA.name : sideB.name}`);
  };

  const undo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setScore(last.score);
    setHistory(prev => prev.slice(0, -1));
  };

  const finalizeSet = () => {
    if (score[0] === 0 && score[1] === 0) return;
    setSets(prev => [...prev, [...score]]);
    setScore([0, 0]);
    setHistory([]);
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
    <div className="min-h-screen bg-white text-[#0B1F3A] flex flex-col relative overflow-hidden">
      <Navbar />
      <CourtBackground />

      <main className="container max-w-4xl px-6 py-8 flex-1 flex flex-col gap-8 relative z-10">
        {/* HEADER INFO */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
             <Button variant="ghost" onClick={() => navigate(-1)} className="rounded-xl h-10 w-10 hover:bg-slate-50">
                <ChevronLeft className="h-5 w-5" />
             </Button>
             <div>
                <h1 className="text-xl font-black italic uppercase tracking-tighter">{matchData.name}</h1>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{matchData.round} • Court {matchData.court}</p>
             </div>
          </div>
          <Button onClick={() => setIsFinished(true)} variant="ghost" className="text-red-500 font-black text-[10px] uppercase tracking-widest hover:bg-red-50">
            <StopCircle className="h-4 w-4 mr-2" /> End Match
          </Button>
        </div>

        {/* PLAYER SCORE CARDS (Sketch Part 1) */}
        <div className="grid grid-cols-2 gap-px bg-slate-100 rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl">
          {/* Player 1 Card */}
          <div className={cn(
            "p-10 text-center space-y-4 transition-all",
            serving === 1 ? "bg-white" : "bg-slate-50/50 opacity-60"
          )}>
            <div className="space-y-1">
              <h2 className="text-3xl font-black italic tracking-tighter uppercase flex items-center justify-center gap-2">
                {sideA.name.split(' ')[0]}
                {serving === 1 && <Star className="h-5 w-5 fill-sky-500 text-sky-500" />}
              </h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sideA.country}</p>
            </div>
            <div className="text-8xl font-black font-mono tracking-tighter text-sky-500">
              {score[0]}
            </div>
          </div>

          {/* Player 2 Card */}
          <div className={cn(
            "p-10 text-center space-y-4 transition-all",
            serving === 2 ? "bg-white" : "bg-slate-50/50 opacity-60"
          )}>
            <div className="space-y-1">
              <h2 className="text-3xl font-black italic tracking-tighter uppercase flex items-center justify-center gap-2">
                {sideB.name.split(' ')[0]}
                {serving === 2 && <Star className="h-5 w-5 fill-sky-500 text-sky-500" />}
              </h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sideB.country}</p>
            </div>
            <div className="text-8xl font-black font-mono tracking-tighter text-[#0B1F3A]">
              {score[1]}
            </div>
          </div>
        </div>

        {/* SCORING CONTROLS (Sketch Part 2) */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
             <Button 
                onClick={() => registerPoint(1)}
                className="h-28 rounded-[2.5rem] bg-[#0B1F3A] text-white font-black text-4xl shadow-xl hover:bg-sky-500 transition-all active:scale-95"
             >
                +1
             </Button>
             <Button 
                onClick={() => registerPoint(2)}
                className="h-28 rounded-[2.5rem] bg-[#0B1F3A] text-white font-black text-4xl shadow-xl hover:bg-sky-500 transition-all active:scale-95"
             >
                +1
             </Button>
          </div>

          <div className="grid grid-cols-3 gap-4">
             <Button 
                onClick={() => registerPoint(serving, 'Smash')}
                className="h-20 rounded-3xl bg-white border-2 border-slate-100 hover:border-sky-500 text-[#0B1F3A] font-black uppercase italic tracking-widest transition-all"
             >
                Smash
             </Button>
             <Button 
                onClick={() => registerPoint(serving, 'Net')}
                className="h-20 rounded-3xl bg-white border-2 border-slate-100 hover:border-sky-500 text-[#0B1F3A] font-black uppercase italic tracking-widest transition-all"
             >
                Net
             </Button>
             <Button 
                onClick={() => registerPoint(serving === 1 ? 2 : 1, 'Error')}
                className="h-20 rounded-3xl bg-white border-2 border-slate-100 hover:border-red-500 text-[#0B1F3A] font-black uppercase italic tracking-widest transition-all"
             >
                Error
             </Button>
          </div>
        </div>

        {/* SECTOR ANALYSIS (Sketch Part 3) */}
        <section className="mt-4 space-y-6">
           <div className="flex items-center justify-between border-b border-slate-100 pb-4">
             <h3 className="text-xl font-black italic tracking-tighter uppercase flex items-center gap-3">
               <BarChart3 className="h-6 w-6 text-sky-500" /> Sector Analysis
             </h3>
             <div className="flex gap-4">
               <div className="flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-sky-500" />
                 <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{sideA.name.split(' ')[0]}</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-[#0B1F3A]" />
                 <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{sideB.name.split(' ')[0]}</span>
               </div>
             </div>
           </div>

           <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Smash Efficiency</span>
                    <span className="text-sm font-black text-sky-500">92% <span className="text-slate-200">/</span> 74%</span>
                 </div>
                 <div className="h-2 bg-slate-50 rounded-full flex overflow-hidden">
                    <div className="h-full bg-sky-500" style={{ width: '55%' }} />
                    <div className="h-full bg-[#0B1F3A]" style={{ width: '45%' }} />
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Control</span>
                    <span className="text-sm font-black text-sky-500">68% <span className="text-slate-200">/</span> 81%</span>
                 </div>
                 <div className="h-2 bg-slate-50 rounded-full flex overflow-hidden">
                    <div className="h-full bg-sky-500" style={{ width: '40%' }} />
                    <div className="h-full bg-[#0B1F3A]" style={{ width: '60%' }} />
                 </div>
              </div>
           </div>
        </section>

        {/* UTILITY CONTROLS */}
        <div className="grid grid-cols-3 gap-4 mt-auto pt-8 border-t border-slate-50">
           <Button onClick={undo} variant="outline" className="h-14 rounded-2xl border-slate-100 bg-slate-50 font-black text-[10px] uppercase tracking-widest gap-2">
             <RotateCcw className="h-4 w-4" /> Undo
           </Button>
           <Button onClick={finalizeSet} variant="outline" className="h-14 rounded-2xl border-slate-100 bg-slate-50 font-black text-[10px] uppercase tracking-widest gap-2">
             <History className="h-4 w-4" /> End Set
           </Button>
           <Button onClick={() => setScore([0, 0])} variant="outline" className="h-14 rounded-2xl border-slate-100 bg-slate-50 font-black text-[10px] uppercase tracking-widest gap-2 text-red-400">
             <RefreshCw className="h-4 w-4" /> Reset
           </Button>
        </div>
      </main>

      {/* FINALIZATION OVERLAY */}
      <AnimatePresence>
        {isFinished && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-[#0B1F3A]/60 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="max-w-md w-full bg-white p-12 rounded-[4rem] text-center space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5"><Trophy className="h-40 w-40 text-sky-500" /></div>
              <div className="space-y-4 relative z-10">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-xl">
                  <Trophy className="h-8 w-8" />
                </div>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none text-[#0B1F3A]">Match Finalized</h2>
              </div>
              <div className="flex items-center justify-center gap-10 py-8 border-y border-slate-100">
                 <div className="flex-1">
                    <p className="text-xl font-black text-[#0B1F3A]">{sideA.name.split(' ')[0]}</p>
                    <span className="text-5xl font-mono font-black text-sky-500">{score[0]}</span>
                 </div>
                 <div className="flex-1">
                    <p className="text-xl font-black text-[#0B1F3A]">{sideB.name.split(' ')[0]}</p>
                    <span className="text-5xl font-mono font-black text-[#0B1F3A]">{score[1]}</span>
                 </div>
              </div>
              <Button onClick={() => navigate('/court')} className="w-full h-16 bg-[#0B1F3A] text-white font-black rounded-2xl shadow-xl hover:bg-sky-500 transition-all">
                RETURN TO COURT
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScoringPage;