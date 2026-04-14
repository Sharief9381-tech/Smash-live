"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, RotateCcw, Activity, 
  Target, History, StopCircle, Clock,
  ChevronLeft, Flame, TrendingUp, AlertTriangle,
  Radio, ShieldCheck, Trophy, MapPin, Share2,
  Tornado, Users, BarChart3, Timer, RefreshCw
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
  const [sets, setSets] = useState<[number, number][]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [serving, setServing] = useState<1 | 2>(1);
  const [duration, setDuration] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showPointType, setShowPointType] = useState<1 | 2 | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(matchId || "");
    if (saved) {
      setMatchData(JSON.parse(saved));
    } else {
      showError("Session Terminated");
      navigate('/broadcast/center');
    }
  }, [matchId, navigate]);

  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => setDuration(p => p + 1), 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${m.toString().padStart(2, '0')}:${rs.toString().padStart(2, '0')}`;
  };

  const registerPoint = (side: 1 | 2, type: string) => {
    if (isFinished) return;
    setHistory(prev => [...prev, { score: [...score], type, side }]);
    const next = [...score] as [number, number];
    next[side - 1] += 1;
    setScore(next);
    setServing(side);
    setShowPointType(null);
    showSuccess(`${type} Point Registered`);
  };

  const undo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setScore(last.score);
    setHistory(prev => prev.slice(0, -1));
  };

  const finalizeSet = () => {
    if (score[0] === 0 && score[1] === 0) {
      showError("Score must be registered before ending set");
      return;
    }
    setSets(prev => [...prev, [...score]]);
    setScore([0, 0]);
    setHistory([]);
    showSuccess("Set Finalized • Score Synchronized");
  };

  if (!matchData) return null;

  const getTeamInfo = (side: 'A' | 'B') => {
    if (matchData.matchType === 'singles') {
      const p = side === 'A' ? matchData.players.p1 : matchData.players.p2;
      return { name: p.name, rank: p.rank, country: p.country, img: p.img, id: p.id };
    }
    const p1 = side === 'A' ? matchData.players.tA1 : matchData.players.tB1;
    const p2 = side === 'A' ? matchData.players.tA2 : matchData.players.tB2;
    return { 
      name: `${p1.name.split(' ')[0]} / ${p2.name.split(' ')[0]}`,
      rank: Math.min(p1.rank, p2.rank),
      country: p1.country,
      img: p1.img,
      id: side
    };
  };

  const sideA = getTeamInfo('A');
  const sideB = getTeamInfo('B');

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A] selection:bg-sky-500/30">
      <Navbar />

      <header className="bg-white border-b border-slate-200 py-4">
        <div className="container px-6 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(-1)} className="rounded-xl h-10 w-10 hover:bg-slate-50 text-slate-400">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-black uppercase italic tracking-tight">{matchData.name}</h1>
              <div className="flex items-center gap-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <span className="text-sky-500">{matchData.round}</span>
                <span className="h-0.5 w-0.5 bg-slate-300 rounded-full" />
                <span>Court {matchData.court}</span>
                <span className="h-0.5 w-0.5 bg-slate-300 rounded-full" />
                <Badge className="bg-red-500 text-white border-none h-4 px-2 text-[7px] animate-pulse">LIVE</Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-[7px] font-black text-slate-400 uppercase">Match Timer</span>
                  <span className="font-mono font-black text-sm text-[#0B1F3A]">{formatTime(duration)}</span>
                </div>
                <div className="h-6 w-px bg-slate-200" />
                <Share2 className="h-4 w-4 text-sky-500 cursor-pointer" />
             </div>
             <Button 
                onClick={() => setIsFinished(true)}
                className="h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white border border-red-100 font-black uppercase text-[8px] tracking-widest px-4 transition-all"
              >
               <StopCircle className="h-3.5 w-3.5 mr-1.5" /> End Session
             </Button>
          </div>
        </div>
      </header>

      <main className="container px-6 py-6 space-y-6">
        
        {/* COMPACT SCOREBOARD */}
        <div className="grid lg:grid-cols-12 gap-6 items-center">
          
          {/* SIDE A NAME PLATE */}
          <div className="lg:col-span-3">
            <motion.div className={cn(
              "glass-panel p-6 rounded-[2.5rem] text-center space-y-4 border-slate-100 transition-all",
              serving === 1 ? "bg-white shadow-xl shadow-sky-500/5 ring-2 ring-sky-500/20" : "bg-white/50 opacity-60"
            )}>
              <div className="relative mx-auto h-20 w-20">
                <div className={cn(
                  "h-full w-full rounded-full border-2 flex items-center justify-center font-black text-xl overflow-hidden",
                  serving === 1 ? "border-sky-500" : "border-slate-100"
                )}>
                   <div className="h-full w-full bg-slate-100 flex items-center justify-center text-slate-400">{sideA.img}</div>
                </div>
                {serving === 1 && (
                  <div className="absolute -top-1 -right-1 h-7 w-7 bg-sky-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                    <Zap className="h-3.5 w-3.5 fill-white text-white" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-black uppercase italic tracking-tighter text-[#0B1F3A]">{sideA.name}</h3>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">{sideA.country} • Rank #{sideA.rank}</p>
              </div>
            </motion.div>
          </div>

          {/* MAIN HUD */}
          <div className="lg:col-span-6">
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-10">
                 <motion.div key={`a-${score[0]}`} className="flex flex-col items-center">
                    <span className="text-8xl font-black font-mono leading-none tracking-tighter text-sky-500 drop-shadow-sm">{score[0]}</span>
                    {score[0] >= 20 && score[0] > score[1] && <Badge className="bg-sky-500 text-white font-black text-[7px] mt-2">GAME POINT</Badge>}
                 </motion.div>

                 <div className="h-20 w-1 bg-slate-200 rotate-[20deg] rounded-full" />

                 <motion.div key={`b-${score[1]}`} className="flex flex-col items-center">
                    <span className="text-8xl font-black font-mono leading-none tracking-tighter text-[#0B1F3A] drop-shadow-sm">{score[1]}</span>
                    {score[1] >= 20 && score[1] > score[0] && <Badge className="bg-[#0B1F3A] text-white font-black text-[7px] mt-2">GAME POINT</Badge>}
                 </motion.div>
              </div>

              <div className="flex gap-2">
                {sets.map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="bg-white border border-slate-100 px-4 py-2 rounded-xl font-black text-xs min-w-[60px] text-center shadow-sm">
                      <span className={cn(s[0] > s[1] ? "text-sky-500" : "text-slate-400")}>{s[0]}</span>
                      <span className="mx-1.5 opacity-20">—</span>
                      <span className={cn(s[1] > s[0] ? "text-[#0B1F3A]" : "text-slate-400")}>{s[1]}</span>
                    </div>
                  </div>
                ))}
                <div className="bg-slate-200/50 border border-dashed border-slate-300 px-4 py-2 rounded-xl text-[8px] font-black text-slate-400 flex items-center justify-center min-w-[60px]">SET {sets.length + 1}</div>
              </div>
            </div>
          </div>

          {/* SIDE B NAME PLATE */}
          <div className="lg:col-span-3">
            <motion.div className={cn(
              "glass-panel p-6 rounded-[2.5rem] text-center space-y-4 border-slate-100 transition-all",
              serving === 2 ? "bg-white shadow-xl shadow-navy/5 ring-2 ring-[#0B1F3A]/20" : "bg-white/50 opacity-60"
            )}>
              <div className="relative mx-auto h-20 w-20">
                <div className={cn(
                  "h-full w-full rounded-full border-2 flex items-center justify-center font-black text-xl overflow-hidden",
                  serving === 2 ? "border-[#0B1F3A]" : "border-slate-100"
                )}>
                   <div className="h-full w-full bg-slate-100 flex items-center justify-center text-slate-400">{sideB.img}</div>
                </div>
                {serving === 2 && (
                  <div className="absolute -top-1 -right-1 h-7 w-7 bg-[#0B1F3A] rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                    <Zap className="h-3.5 w-3.5 fill-white text-white" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-black uppercase italic tracking-tighter text-[#0B1F3A]">{sideB.name}</h3>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">{sideB.country} • Rank #{sideB.rank}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SCORING COMMANDS & POINT TYPE */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          
          <div className="lg:col-span-3 glass-panel p-8 rounded-[3rem] border-slate-100 space-y-6 bg-white shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
               <div className="h-8 w-8 rounded-lg bg-sky-50 text-sky-500 flex items-center justify-center"><Activity className="h-4 w-4" /></div>
               <h4 className="text-[9px] font-black uppercase tracking-widest">Service Intelligence</h4>
            </div>
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                 <span className="text-[8px] font-bold text-slate-400 uppercase">Court Position</span>
                 <Badge variant="outline" className="border-sky-100 text-sky-600 text-[8px] font-black">{serving === 1 ? 'LEFT' : 'RIGHT'}</Badge>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-[8px] font-bold text-slate-400 uppercase">Rally Index</span>
                 <span className="text-sm font-black text-[#0B1F3A]">{history.length + 1}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-[8px] font-bold text-slate-400 uppercase">Live Probability</span>
                 <div className="flex items-center gap-1.5 text-sky-500 font-black text-xs">
                    <span>74%</span>
                    <TrendingUp className="h-3 w-3" />
                 </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
             <div className="space-y-3">
               <Button 
                  onClick={() => setShowPointType(1)}
                  className="w-full h-32 bg-white border border-slate-200 hover:border-sky-500 hover:shadow-xl rounded-[2.5rem] font-black text-xl text-[#0B1F3A] transition-all group flex flex-col gap-2 shadow-sm"
               >
                 <Zap className="h-5 w-5 text-sky-500 opacity-40 group-hover:opacity-100 transition-all" />
                 +1 {sideA.name.split(' ')[0]}
               </Button>
               
               <AnimatePresence>
                 {showPointType === 1 && (
                   <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-2">
                     {['Smash', 'Net Drop', 'Error'].map(t => (
                       <Button key={t} onClick={() => registerPoint(1, t)} size="sm" className="flex-1 rounded-xl bg-[#0B1F3A] text-white font-black text-[8px] h-9 hover:bg-sky-500">
                         {t.toUpperCase()}
                       </Button>
                     ))}
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>

             <div className="space-y-3">
               <Button 
                  onClick={() => setShowPointType(2)}
                  className="w-full h-32 bg-white border border-slate-200 hover:border-[#0B1F3A] hover:shadow-xl rounded-[2.5rem] font-black text-xl text-[#0B1F3A] transition-all group flex flex-col gap-2 shadow-sm"
               >
                 <Zap className="h-5 w-5 text-slate-300 group-hover:text-[#0B1F3A] transition-all" />
                 +1 {sideB.name.split(' ')[0]}
               </Button>

               <AnimatePresence>
                 {showPointType === 2 && (
                   <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-2">
                     {['Smash', 'Net Drop', 'Error'].map(t => (
                       <Button key={t} onClick={() => registerPoint(2, t)} size="sm" className="flex-1 rounded-xl bg-sky-500 text-white font-black text-[8px] h-9 hover:bg-[#0B1F3A]">
                         {t.toUpperCase()}
                       </Button>
                     ))}
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
             
             <div className="col-span-2 grid grid-cols-4 gap-3">
                <Button onClick={undo} variant="outline" className="h-12 rounded-xl border-slate-200 bg-white font-black text-[8px] tracking-widest gap-2 hover:bg-red-50 hover:text-red-500">
                  <RotateCcw className="h-3.5 w-3.5" /> UNDO
                </Button>
                <Button variant="outline" className="h-12 rounded-xl border-slate-100 bg-slate-50 font-black text-[8px] tracking-widest gap-2 opacity-50 cursor-not-allowed">
                  <RefreshCw className="h-3.5 w-3.5" /> REDO
                </Button>
                <Button onClick={finalizeSet} className="h-12 rounded-xl bg-[#0B1F3A] text-white font-black text-[8px] tracking-widest gap-2 hover:bg-sky-500 shadow-lg">
                  <History className="h-3.5 w-3.5" /> END SET
                </Button>
                <Button onClick={() => { setScore([0, 0]); setHistory([]); }} className="h-12 rounded-xl bg-white border border-slate-200 text-red-400 font-black text-[8px] tracking-widest gap-2 hover:bg-red-50">
                  <RefreshCw className="h-3.5 w-3.5" /> RESET
                </Button>
             </div>
          </div>

          <div className="lg:col-span-3 glass-panel p-8 rounded-[3rem] border-slate-100 h-full flex flex-col gap-6 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-50 pb-4">
               <h4 className="text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                 <Zap className="h-3.5 w-3.5 text-sky-500 fill-current" /> AI LOG
               </h4>
               <div className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
               {history.slice(-3).reverse().map((log, i) => (
                 <div key={i} className="space-y-1 border-l-2 border-slate-100 pl-3 hover:border-sky-500 transition-all">
                    <span className="text-[7px] font-black text-slate-300 uppercase">Point {log.side === 1 ? 'A' : 'B'} • {log.type}</span>
                    <p className="text-[10px] font-bold text-slate-500 leading-tight">Tactical {log.type.toLowerCase()} execution successful.</p>
                 </div>
               ))}
               {history.length === 0 && <p className="text-[10px] font-bold text-slate-300 italic">Waiting for first serve...</p>}
            </div>
          </div>
        </div>

        {/* MEMORY DIFFERENCE / PERFORMANCE GAPS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="glass-panel p-8 rounded-[3rem] border-slate-100 bg-white shadow-sm space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><BarChart3 className="h-20 w-20" /></div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-sky-500" /> Sector Comparison
              </h4>
              <div className="space-y-5">
                 {[
                   { label: "Smash Accuracy", a: 94, b: 82 },
                   { label: "Net Dominance", a: 78, b: 88 },
                   { label: "Reaction Speed", a: 184, b: 212, inv: true }
                 ].map((sector, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[8px] font-black uppercase">
                        <span className="text-sky-600">{sector.a}{sector.inv ? 'ms' : '%'}</span>
                        <span className="text-slate-400">{sector.label}</span>
                        <span className="text-[#0B1F3A]">{sector.b}{sector.inv ? 'ms' : '%'}</span>
                      </div>
                      <div className="h-1.5 bg-slate-50 rounded-full flex overflow-hidden">
                         <div className="h-full bg-sky-500 transition-all" style={{ width: `${(sector.a / (sector.a + sector.b)) * 100}%` }} />
                         <div className="h-full bg-[#0B1F3A] transition-all" style={{ width: `${(sector.b / (sector.a + sector.b)) * 100}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-3 gap-4">
              {[
                { l: "Rallies", v: history.length, i: Tornado },
                { l: "Smash W", v: history.filter(h => h.type === 'Smash').length, i: Zap },
                { l: "Errors", v: history.filter(h => h.type === 'Error').length, i: AlertTriangle },
                { l: "Nets", v: history.filter(h => h.type === 'Net Drop').length, i: Target },
                { l: "Streak", v: "4W", i: Flame },
                { l: "Stamina", v: "92%", i: Activity },
              ].map((stat, i) => (
                <div key={i} className="glass-panel p-4 rounded-[2rem] border-slate-100 bg-white flex flex-col items-center justify-center text-center gap-2 shadow-sm hover:shadow-lg transition-all group">
                   <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-sky-500 group-hover:text-white transition-all">
                     <stat.i className="h-4 w-4" />
                   </div>
                   <div>
                      <p className="text-lg font-black text-[#0B1F3A] tracking-tighter">{stat.v}</p>
                      <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">{stat.l}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </main>

      <AnimatePresence>
        {isFinished && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-[#0B1F3A]/60 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="max-w-2xl w-full glass-panel p-12 rounded-[4rem] text-center space-y-8 bg-white border-white/20 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5"><Trophy className="h-40 w-40 text-sky-500" /></div>
              <div className="space-y-2 relative z-10">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-xl mb-4">
                  <Trophy className="h-8 w-8" />
                </div>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none text-[#0B1F3A]">Match Finalized</h2>
                <p className="text-sky-500 font-black uppercase tracking-[0.4em] text-[8px]">Intelligence Symmetrically Synced</p>
              </div>
              <div className="flex items-center justify-center gap-10 py-8 border-y border-slate-100">
                 <div className="text-right flex-1">
                    <p className="text-xl font-black text-[#0B1F3A]">{sideA.name}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">{sideA.country}</p>
                 </div>
                 <div className="flex flex-col items-center">
                    <span className="text-5xl font-black font-mono tracking-tighter text-sky-500">2 — 1</span>
                    <span className="text-[8px] font-black text-slate-300 uppercase mt-2">Sets Won</span>
                 </div>
                 <div className="text-left flex-1">
                    <p className="text-xl font-black text-[#0B1F3A]">{sideB.name}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">{sideB.country}</p>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={() => navigate('/court')} className="h-16 bg-[#0B1F3A] text-white font-black rounded-2xl shadow-xl hover:bg-sky-500 border-none transition-all">
                  BACK TO COURT
                </Button>
                <Button variant="outline" className="h-16 border-slate-200 text-[#0B1F3A] font-black rounded-2xl hover:bg-slate-50">
                  EXPORT TELEMETRY
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