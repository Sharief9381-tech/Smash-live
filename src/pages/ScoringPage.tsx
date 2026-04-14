"use client";

import React, { useState, useEffect, useMemo } from 'react';
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
  const [history, setHistory] = useState<[number, number][]>([]);
  const [serving, setServing] = useState<1 | 2>(1);
  const [duration, setDuration] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(matchId || "");
    if (saved) {
      setMatchData(JSON.parse(saved));
    } else {
      showError("Session Terminated");
      navigate('/broadcast/center');
    }
  }, [matchId]);

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

  const updateScore = (side: 1 | 2) => {
    if (isFinished) return;
    setHistory(prev => [...prev, [...score]]);
    const next = [...score] as [number, number];
    next[side - 1] += 1;
    setScore(next);
    setServing(side);
  };

  const undo = () => {
    if (history.length === 0) return;
    setScore(history[history.length - 1]);
    setHistory(prev => prev.slice(0, -1));
  };

  const finalizeSet = () => {
    setSets(prev => [...prev, [...score]]);
    setScore([0, 0]);
    setHistory([]);
    showSuccess("Set Finalized • Intelligence Synced");
  };

  if (!matchData) return null;

  const getTeamInfo = (side: 'A' | 'B') => {
    if (matchData.matchType === 'singles') {
      const p = side === 'A' ? matchData.players.p1 : matchData.players.p2;
      return { name: p.name, rank: p.rank, country: p.country, img: p.img };
    }
    const p1 = side === 'A' ? matchData.players.tA1 : matchData.players.tB1;
    const p2 = side === 'A' ? matchData.players.tA2 : matchData.players.tB2;
    return { 
      name: `${p1.name.split(' ')[0]} / ${p2.name.split(' ')[0]}`,
      rank: Math.min(p1.rank, p2.rank),
      country: p1.country,
      img: p1.img
    };
  };

  const sideA = getTeamInfo('A');
  const sideB = getTeamInfo('B');

  return (
    <div className="min-h-screen bg-[#050A10] text-white selection:bg-primary/30 font-sans overflow-x-hidden">
      <Navbar />

      {/* TOP COMMAND HEADER */}
      <header className="bg-white/5 backdrop-blur-2xl border-b border-white/5 py-6">
        <div className="container px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="rounded-2xl h-14 w-14 hover:bg-white/10 text-white/60">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">{matchData.name}</h1>
                <Badge className="bg-[#b6ff2a] text-black border-none px-4 h-6 text-[9px] font-black animate-pulse">LIVE SCORING</Badge>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black text-white/40 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Trophy className="h-3 w-3 text-primary" /> {matchData.round}</span>
                <span className="h-1 w-1 bg-white/10 rounded-full" />
                <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-primary" /> Court {matchData.court}</span>
                <span className="h-1 w-1 bg-white/10 rounded-full" />
                <span className="text-sky-500">{matchData.matchType.toUpperCase()} MODE</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="bg-white/5 border border-white/10 px-8 py-3 rounded-[1.5rem] flex items-center gap-6 shadow-2xl">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-primary uppercase tracking-widest">Match Timer</span>
                  <span className="font-mono font-black text-2xl tracking-tighter text-white">{formatTime(duration)}</span>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <Share2 className="h-5 w-5 text-sky-400 cursor-pointer hover:text-white transition-colors" />
             </div>
             <Button 
                onClick={() => { setIsFinished(true); showSuccess("Match Synchronized"); }}
                className="h-14 rounded-[1.5rem] bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 font-black uppercase text-[10px] tracking-[0.2em] px-8 transition-all"
              >
               <StopCircle className="h-4 w-4 mr-2" /> End Match
             </Button>
          </div>
        </div>
      </header>

      <main className="container px-6 py-10 space-y-10">
        
        {/* COMPETING SIDES & MAIN SCOREBOARD */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* TEAM A CARD */}
          <div className="lg:col-span-3">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={cn(
                "glass-panel p-10 rounded-[4rem] text-center space-y-6 border-white/5 transition-all duration-500",
                serving === 1 ? "bg-primary/10 border-primary/20 shadow-[0_0_50px_rgba(182,255,42,0.1)]" : "bg-white/5 opacity-60"
              )}
            >
              <div className="relative mx-auto h-32 w-32">
                <div className={cn(
                  "h-full w-full rounded-full border-4 flex items-center justify-center font-black text-3xl shadow-2xl overflow-hidden",
                  serving === 1 ? "border-primary" : "border-white/10"
                )}>
                   <div className="h-full w-full bg-slate-900 flex items-center justify-center">{sideA.img}</div>
                </div>
                {serving === 1 && (
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -top-2 -right-2 h-10 w-10 bg-primary rounded-full border-4 border-[#050A10] flex items-center justify-center shadow-xl">
                    <Zap className="h-5 w-5 fill-black text-black" />
                  </motion.div>
                )}
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none">{sideA.name}</h3>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mt-2">{sideA.country} • RANK #{sideA.rank}</p>
              </div>
            </motion.div>
          </div>

          {/* CENTRAL CORE SCOREBOARD */}
          <div className="lg:col-span-6">
            <div className="flex flex-col items-center gap-8">
              <div className="flex items-center gap-16 relative">
                 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none">
                    <Tornado className="h-60 w-60 text-white animate-spin-slow" />
                 </div>
                 
                 <motion.div key={`a-${score[0]}`} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center">
                    <span className="text-[14rem] font-black font-mono leading-none tracking-tighter text-primary drop-shadow-[0_0_40px_rgba(182,255,42,0.3)]">{score[0]}</span>
                    {score[0] >= 20 && score[0] > score[1] && <Badge className="bg-primary text-black font-black text-[9px]">MATCH POINT</Badge>}
                 </motion.div>

                 <div className="h-40 w-1.5 bg-white/5 rotate-[20deg] rounded-full" />

                 <motion.div key={`b-${score[1]}`} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center">
                    <span className="text-[14rem] font-black font-mono leading-none tracking-tighter text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">{score[1]}</span>
                    {score[1] >= 20 && score[1] > score[0] && <Badge className="bg-white text-black font-black text-[9px]">MATCH POINT</Badge>}
                 </motion.div>
              </div>

              <div className="flex gap-4">
                {sets.map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="text-[8px] font-black text-white/20 uppercase">Set {i+1}</span>
                    <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl font-black text-sm min-w-[80px] text-center">
                      <span className={cn(s[0] > s[1] ? "text-primary" : "text-white/60")}>{s[0]}</span>
                      <span className="mx-2 opacity-20">—</span>
                      <span className={cn(s[1] > s[0] ? "text-sky-500" : "text-white/60")}>{s[1]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TEAM B CARD */}
          <div className="lg:col-span-3">
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={cn(
                "glass-panel p-10 rounded-[4rem] text-center space-y-6 border-white/5 transition-all duration-500",
                serving === 2 ? "bg-sky-500/10 border-sky-500/20 shadow-[0_0_50px_rgba(14,165,233,0.1)]" : "bg-white/5 opacity-60"
              )}
            >
              <div className="relative mx-auto h-32 w-32">
                <div className={cn(
                  "h-full w-full rounded-full border-4 flex items-center justify-center font-black text-3xl shadow-2xl overflow-hidden",
                  serving === 2 ? "border-sky-500" : "border-white/10"
                )}>
                   <div className="h-full w-full bg-slate-900 flex items-center justify-center">{sideB.img}</div>
                </div>
                {serving === 2 && (
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -top-2 -right-2 h-10 w-10 bg-sky-500 rounded-full border-4 border-[#050A10] flex items-center justify-center shadow-xl">
                    <Zap className="h-5 w-5 fill-white text-white" />
                  </motion.div>
                )}
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none">{sideB.name}</h3>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mt-2">{sideB.country} • RANK #{sideB.rank}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SCORING CONTROLS & SERVE INTEL */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* SERVE & COURT INDICATOR */}
          <div className="lg:col-span-3 glass-panel p-10 rounded-[3.5rem] border-white/5 space-y-8 flex flex-col justify-center">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
               <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><Activity className="h-5 w-5" /></div>
               <h4 className="text-xs font-black uppercase tracking-[0.2em]">Service Matrix</h4>
            </div>
            <div className="space-y-6">
               <div className="flex justify-between items-center">
                 <span className="text-[10px] font-bold text-white/40 uppercase">Serving Position</span>
                 <Badge variant="outline" className="border-primary/30 text-primary font-black">{serving === 1 ? 'LEFT COURT' : 'RIGHT COURT'}</Badge>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-[10px] font-bold text-white/40 uppercase">Rally Count</span>
                 <span className="text-lg font-black">{history.length + 1}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-[10px] font-bold text-white/40 uppercase">Win Probability</span>
                 <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-primary">74%</span>
                    <TrendingUp className="h-4 w-4 text-primary" />
                 </div>
               </div>
            </div>
          </div>

          {/* MAIN CONTROLS */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-6">
             <Button 
                onClick={() => updateScore(1)}
                className="h-40 bg-primary/10 border-2 border-primary/20 hover:bg-primary hover:text-black rounded-[3rem] font-black text-4xl shadow-2xl transition-all group"
             >
               <div className="flex flex-col items-center gap-2">
                 <Zap className="h-6 w-6 opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                 POINT SIDE A
               </div>
             </Button>
             <Button 
                onClick={() => updateScore(2)}
                className="h-40 bg-white/5 border-2 border-white/10 hover:bg-white hover:text-black rounded-[3rem] font-black text-4xl shadow-2xl transition-all group"
             >
               <div className="flex flex-col items-center gap-2">
                 <Zap className="h-6 w-6 opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                 POINT SIDE B
               </div>
             </Button>
             
             <div className="col-span-2 grid grid-cols-4 gap-4">
                <Button onClick={undo} variant="outline" className="h-16 rounded-2xl border-white/10 bg-white/5 font-black text-[10px] tracking-widest gap-2 hover:bg-red-500/20 hover:text-red-400">
                  <RotateCcw className="h-4 w-4" /> UNDO
                </Button>
                <Button variant="outline" className="h-16 rounded-2xl border-white/10 bg-white/5 font-black text-[10px] tracking-widest gap-2 opacity-50">
                  <RefreshCw className="h-4 w-4" /> REDO
                </Button>
                <Button onClick={finalizeSet} className="h-16 rounded-2xl bg-white/10 border border-white/10 font-black text-[10px] tracking-widest gap-2 hover:bg-white hover:text-black">
                  <History className="h-4 w-4" /> END SET
                </Button>
                <Button onClick={() => setScore([0, 0])} className="h-16 rounded-2xl bg-white/10 border border-white/10 font-black text-[10px] tracking-widest gap-2 hover:bg-red-500/20 text-red-400">
                  <RotateCcw className="h-4 w-4" /> RESET
                </Button>
             </div>
          </div>

          {/* AI COMMENTARY FEED */}
          <div className="lg:col-span-3 glass-panel p-10 rounded-[3.5rem] border-white/5 h-full flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                 <Zap className="h-4 w-4 text-primary fill-current" /> AI ANALYTICS LOG
               </h4>
               <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
               {[
                 { t: "14:42", msg: "Strategic serve placement forcing high returns.", type: "intel" },
                 { t: "14:40", msg: "Team A maintaining high smash accuracy (92%).", type: "stat" },
                 { t: "14:38", msg: "Match point potential detected for Axelsen.", type: "alert" },
               ].map((log, i) => (
                 <div key={i} className="space-y-2 border-l-2 border-white/5 pl-4 hover:border-primary transition-all group">
                    <span className="text-[8px] font-black text-white/20 font-mono">{log.t}</span>
                    <p className="text-xs font-bold text-white/60 leading-relaxed group-hover:text-white transition-colors">{log.msg}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* LIVE STATS ANALYTICS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
           {[
             { l: "Total Rallies", v: "84", i: Tornado },
             { l: "Longest Rally", v: "42s", i: Timer },
             { l: "Smash Winners", v: "18", i: Zap },
             { l: "Unforced Errors", v: "12", i: AlertTriangle },
             { l: "Drop Shots", v: "24", i: Target },
             { l: "Service Faults", v: "2", i: AlertTriangle },
             { l: "Streak", v: "6W", i: Flame },
           ].map((stat, i) => (
             <div key={i} className="glass-panel p-6 rounded-[2.5rem] border-white/5 flex flex-col items-center text-center gap-4 hover:border-primary/30 transition-all group">
                <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-primary group-hover:text-black transition-all">
                  <stat.i className="h-5 w-5" />
                </div>
                <div>
                   <p className="text-2xl font-black tracking-tighter">{stat.v}</p>
                   <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">{stat.l}</p>
                </div>
             </div>
           ))}
        </div>

        {/* MOMENTUM & INSIGHTS */}
        <div className="glass-panel p-12 rounded-[4.5rem] border-white/5 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <BarChart3 className="h-40 w-40" />
          </div>
          <div className="grid md:grid-cols-2 gap-20 relative z-10">
             <div className="space-y-6">
               <h4 className="text-sm font-black uppercase tracking-[0.3em] flex items-center gap-3">
                 <Tornado className="h-5 w-5 text-primary" /> Tactical Momentum
               </h4>
               <div className="h-24 bg-white/5 rounded-[2rem] border border-white/10 p-6 flex items-center gap-8">
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase opacity-60">
                      <span>Side A Dominance</span>
                      <span>82%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: '82%' }} className="h-full bg-primary" />
                    </div>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase opacity-60">
                      <span>Side B Pressure</span>
                      <span>High</span>
                    </div>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map(j => <div key={j} className={cn("h-2 flex-1 rounded-full", j <= 4 ? "bg-red-500" : "bg-white/10")} />)}
                    </div>
                  </div>
               </div>
             </div>

             <div className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-[0.3em] flex items-center gap-3">
                  <Zap className="h-5 w-5 text-primary" /> Neural Insights
                </h4>
                <p className="text-sm font-medium text-white/60 leading-relaxed italic">
                  "Current data indicates a high probability of a baseline attack shift from Side A. Side B's recovery time has dropped by 12% in the last 10 points."
                </p>
                <div className="flex gap-4">
                  <Badge className="bg-primary/20 text-primary border-none text-[8px] font-black uppercase">Pressure Alert</Badge>
                  <Badge className="bg-sky-500/20 text-sky-400 border-none text-[8px] font-black uppercase">Stamina Warning</Badge>
                </div>
             </div>
          </div>
        </div>
      </main>

      {/* FINAL MATCH SUMMARY OVERLAY */}
      <AnimatePresence>
        {isFinished && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="fixed inset-0 z-[100] bg-[#050A10]/95 backdrop-blur-3xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 40 }} 
              animate={{ scale: 1, y: 0 }} 
              className="max-w-4xl w-full glass-panel p-20 rounded-[5rem] border-white/10 text-center space-y-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none"><Trophy className="h-80 w-80 text-primary" /></div>
              
              <div className="space-y-4 relative z-10">
                <div className="mx-auto h-20 w-20 rounded-3xl bg-primary text-black flex items-center justify-center shadow-[0_0_50px_rgba(182,255,42,0.3)]">
                  <Trophy className="h-10 w-10" />
                </div>
                <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">Match Complete</h2>
                <p className="text-primary font-black uppercase tracking-[0.5em] text-xs">Intelligence Symmetrically Finalized</p>
              </div>

              <div className="flex items-center justify-center gap-20 py-12 border-y border-white/5 relative z-10">
                 <div className="text-right">
                    <p className="text-4xl font-black">{sideA.name}</p>
                    <p className="text-sm font-bold text-white/40 uppercase tracking-widest">{sideA.country}</p>
                 </div>
                 <div className="flex flex-col items-center">
                    <span className="text-7xl font-black font-mono tracking-tighter text-primary">2 - 1</span>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mt-2">Sets Won</span>
                 </div>
                 <div className="text-left">
                    <p className="text-4xl font-black">{sideB.name}</p>
                    <p className="text-sm font-bold text-white/40 uppercase tracking-widest">{sideB.country}</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-6 relative z-10">
                <Button onClick={() => navigate('/court')} className="h-20 bg-primary text-black font-black text-xl rounded-3xl shadow-2xl hover:bg-[#b6ff2a]/90">
                  RETURN TO COURT
                </Button>
                <Button className="h-20 bg-white/5 text-white border border-white/10 font-black text-xl rounded-3xl hover:bg-white/10">
                  GENERATE HIGHLIGHTS
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