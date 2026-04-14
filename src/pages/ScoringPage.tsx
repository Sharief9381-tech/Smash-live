"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, RotateCcw, Activity, 
  Target, History, StopCircle, Clock,
  ChevronLeft, Flame, TrendingUp, AlertTriangle,
  Radio, ShieldCheck
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

  useEffect(() => {
    const saved = localStorage.getItem(matchId || "");
    if (saved) {
      const data = JSON.parse(saved);
      setMatchData(data);
      setServing(data.server === 'sideA' ? 1 : 2);
    } else {
      showError("Match session not found");
      navigate('/broadcast/center');
    }
  }, [matchId]);

  useEffect(() => {
    const timer = setInterval(() => setDuration(p => p + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${m.toString().padStart(2, '0')}:${rs.toString().padStart(2, '0')}`;
  };

  const updateScore = (side: 1 | 2) => {
    setHistory(prev => [...prev, [...score]]);
    const next = [...score] as [number, number];
    next[side - 1] += 1;
    setScore(next);
    setServing(side);
    
    // Auto-win set detection (BWF Rules: 21 points, 2 lead, cap at 30)
    if ((next[side-1] >= 21 && Math.abs(next[0] - next[1]) >= 2) || next[side-1] === 30) {
      showSuccess(`Set won by Side ${side === 1 ? 'A' : 'B'}`);
    }
  };

  const undo = () => {
    if (history.length === 0) return;
    setScore(history[history.length - 1]);
    setHistory(prev => prev.slice(0, -1));
  };

  if (!matchData) return (
    <div className="h-screen bg-slate-50 flex items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-sky-500" />
    </div>
  );

  const getTeamLabel = (side: 'A' | 'B') => {
    if (matchData.matchType === 'singles') {
      const p = side === 'A' ? matchData.players.p1 : matchData.players.p2;
      return { name: p.name, sub: p.country, img: p.img };
    }
    const p1 = side === 'A' ? matchData.players.tA1 : matchData.players.tB1;
    const p2 = side === 'A' ? matchData.players.tA2 : matchData.players.tB2;
    return { 
      name: `${p1.name.split(' ')[0]} / ${p2.name.split(' ')[0]}`,
      sub: p1.country,
      img: p1.img
    };
  };

  const teamA = getTeamLabel('A');
  const teamB = getTeamLabel('B');

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A]">
      <Navbar />
      
      {/* Dynamic technical header */}
      <div className="bg-white border-b border-slate-200 py-6">
        <div className="container px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="rounded-2xl h-14 w-14 hover:bg-slate-50 border border-slate-100 shadow-sm">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black text-[#0B1F3A] uppercase italic tracking-tighter">{matchData.name}</h1>
                <Badge className="bg-red-500 text-white animate-pulse border-none px-4 h-6 text-[9px] font-black">LIVE BROADCAST</Badge>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Trophy className="h-3 w-3 text-sky-500" /> {matchData.round}</span>
                <span className="h-1 w-1 bg-slate-200 rounded-full" />
                <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-sky-500" /> Court {matchData.court}</span>
                <span className="h-1 w-1 bg-slate-200 rounded-full" />
                <span className="flex items-center gap-1.5 text-[#0B1F3A]"><ShieldCheck className="h-3 w-3 text-sky-500" /> Session: {matchId.slice(-8)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="bg-[#0B1F3A] text-white px-8 py-3 rounded-[1.5rem] flex items-center gap-4 shadow-xl shadow-navy/20">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-sky-400 uppercase tracking-widest">Match Duration</span>
                  <span className="font-mono font-black text-lg tracking-tighter">{formatTime(duration)}</span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <Radio className="h-5 w-5 text-red-500 animate-pulse" />
             </div>
             <Button 
                onClick={() => { showSuccess("Match Terminated"); navigate('/broadcast/center'); }}
                variant="destructive" 
                className="h-14 rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest gap-2 px-8 shadow-xl shadow-red-500/10"
              >
               <StopCircle className="h-4 w-4" /> End Match
             </Button>
          </div>
        </div>
      </div>

      <main className="container px-6 py-8 space-y-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Intelligence Modules (Left) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="glass-panel p-8 rounded-[3.5rem] border-slate-200 space-y-8 shadow-xl bg-white/50">
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="h-4 w-4 text-sky-500" /> Side A Performance
                </h3>
                <TrendingUp className="h-3 w-3 text-sky-500" />
              </div>
              <div className="space-y-4">
                {[
                  { label: "Smash Success", val: 14, icon: Zap, color: "text-sky-500", bg: "bg-sky-50" },
                  { label: "Net Points", val: 9, icon: Target, color: "text-indigo-500", bg: "bg-indigo-50" },
                  { label: "Rally Duration", val: "18s", icon: Timer, color: "text-amber-500", bg: "bg-amber-50" }
                ].map((s, i) => (
                  <div key={i} className="flex justify-between items-center p-5 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm group hover:border-sky-500/30 transition-all">
                    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", s.bg, s.color)}>
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-[#0B1F3A] tracking-tighter">{s.val}</p>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-8 rounded-[3.5rem] border-slate-200 bg-[#0B1F3A] text-white space-y-6 relative overflow-hidden">
               <div className="absolute -right-6 -bottom-6 opacity-10">
                 <Zap className="h-24 w-24 text-sky-400" />
               </div>
               <div className="space-y-1 relative z-10">
                 <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest">Prediction Engine</p>
                 <h4 className="text-lg font-black italic">Win Probability</h4>
               </div>
               <div className="space-y-2 relative z-10">
                  <div className="flex justify-between text-xs font-black">
                    <span>Team A</span>
                    <span className="text-sky-400">72%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500" style={{ width: '72%' }} />
                  </div>
               </div>
            </div>
          </div>

          {/* Central Scoring Engine */}
          <div className="lg:col-span-6 space-y-8">
            <div className="glass-panel p-12 rounded-[4.5rem] border-slate-200 shadow-[0_40px_100px_rgba(11,31,58,0.12)] flex flex-col items-center gap-12 bg-white relative">
              <div className="flex justify-between w-full items-center px-6">
                
                {/* Side A Profiler */}
                <div className="flex-1 flex flex-col items-center gap-6">
                  <div className="relative group">
                    <div className={cn(
                      "h-32 w-32 rounded-full border-4 p-1.5 shadow-2xl transition-all duration-500",
                      serving === 1 ? "border-sky-500 rotate-0" : "border-slate-50 rotate-[-15deg] opacity-50 grayscale"
                    )}>
                      <div className="h-full w-full rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-3xl text-[#0B1F3A] shadow-inner">
                        {teamA.img}
                      </div>
                    </div>
                    {serving === 1 && (
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1], y: [0, -5, 0] }} 
                        transition={{ repeat: Infinity, duration: 2 }} 
                        className="absolute -top-2 -right-2 h-10 w-10 bg-sky-500 rounded-full border-4 border-white flex items-center justify-center shadow-xl z-20"
                      >
                        <Zap className="h-5 w-5 fill-white text-white" />
                      </motion.div>
                    )}
                  </div>
                  <div className="text-center space-y-1">
                    <h4 className="font-black text-2xl text-[#0B1F3A] tracking-tighter uppercase italic leading-none">{teamA.name}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{teamA.sub}</p>
                  </div>
                </div>

                {/* Technical Score Core */}
                <div className="flex flex-col items-center px-12 relative">
                  <Badge className="bg-[#0B1F3A] text-white border-none font-black text-[10px] tracking-[0.3em] px-6 py-1.5 mb-8 rounded-full shadow-lg">SET {sets.length + 1}</Badge>
                  <div className="flex items-center gap-14">
                    <motion.span 
                      key={`score1-${score[0]}`} 
                      initial={{ scale: 1.4, opacity: 0, y: 10 }} 
                      animate={{ scale: 1, opacity: 1, y: 0 }} 
                      className="text-[11rem] font-black font-mono tabular-nums leading-[0.8] text-sky-600 tracking-tighter drop-shadow-sm"
                    >
                      {score[0]}
                    </motion.span>
                    <div className="h-32 w-2 bg-slate-100 rotate-[15deg] rounded-full mx-2" />
                    <motion.span 
                      key={`score2-${score[1]}`} 
                      initial={{ scale: 1.4, opacity: 0, y: 10 }} 
                      animate={{ scale: 1, opacity: 1, y: 0 }} 
                      className="text-[11rem] font-black font-mono tabular-nums leading-[0.8] text-[#0B1F3A] tracking-tighter drop-shadow-sm"
                    >
                      {score[1]}
                    </motion.span>
                  </div>
                  <div className="flex gap-3 mt-10">
                    {sets.map((s, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <span className="text-[8px] font-black text-slate-300 uppercase mb-1">SET {i+1}</span>
                        <div className="px-5 py-2.5 bg-[#0B1F3A] text-white rounded-2xl font-black text-sm shadow-xl border border-white/10">{s[0]} - {s[1]}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Side B Profiler */}
                <div className="flex-1 flex flex-col items-center gap-6">
                  <div className="relative group">
                    <div className={cn(
                      "h-32 w-32 rounded-full border-4 p-1.5 shadow-2xl transition-all duration-500",
                      serving === 2 ? "border-red-500 rotate-0" : "border-slate-50 rotate-[15deg] opacity-50 grayscale"
                    )}>
                      <div className="h-full w-full rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-3xl text-[#0B1F3A] shadow-inner">
                        {teamB.img}
                      </div>
                    </div>
                    {serving === 2 && (
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1], y: [0, -5, 0] }} 
                        transition={{ repeat: Infinity, duration: 2 }} 
                        className="absolute -top-2 -right-2 h-10 w-10 bg-red-500 rounded-full border-4 border-white flex items-center justify-center shadow-xl z-20"
                      >
                        <Zap className="h-5 w-5 fill-white text-white" />
                      </motion.div>
                    )}
                  </div>
                  <div className="text-center space-y-1">
                    <h4 className="font-black text-2xl text-[#0B1F3A] tracking-tighter uppercase italic leading-none">{teamB.name}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{teamB.sub}</p>
                  </div>
                </div>
              </div>

              {/* Advanced Controls */}
              <div className="grid grid-cols-2 gap-8 w-full pt-12 border-t border-slate-100">
                <Button 
                  onClick={() => updateScore(1)} 
                  className="h-32 bg-sky-600 text-white font-black text-4xl rounded-[3rem] shadow-[0_25px_50px_rgba(14,165,233,0.3)] hover:scale-[1.03] transition-all hover:bg-sky-500 group"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Zap className="h-6 w-6 fill-white opacity-50 group-hover:scale-125 transition-transform" />
                    <span>POINT A</span>
                  </div>
                </Button>
                <Button 
                  onClick={() => updateScore(2)} 
                  className="h-32 bg-[#0B1F3A] text-white font-black text-4xl rounded-[3rem] shadow-[0_25px_50px_rgba(11,31,58,0.2)] hover:scale-[1.03] transition-all hover:bg-navy/90 group"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Zap className="h-6 w-6 fill-white opacity-50 group-hover:scale-125 transition-transform" />
                    <span>POINT B</span>
                  </div>
                </Button>
              </div>

              <div className="flex gap-6 w-full max-w-2xl">
                <Button 
                  onClick={undo} 
                  disabled={history.length === 0} 
                  variant="outline" 
                  className="flex-1 h-16 rounded-[1.5rem] border-slate-200 font-black text-[11px] tracking-[0.2em] gap-3 hover:bg-red-50 hover:text-red-500 transition-all shadow-sm"
                >
                  <RotateCcw className="h-4 w-4" /> UNDO POINT
                </Button>
                <Button 
                  onClick={() => { 
                    if (score[0] === 0 && score[1] === 0) return;
                    setSets(p => [...p, [...score]]); 
                    setScore([0, 0]); 
                    setHistory([]);
                    showSuccess(`Set ${sets.length + 1} finalized`); 
                  }} 
                  variant="outline" 
                  className="flex-1 h-16 rounded-[1.5rem] border-slate-200 font-black text-[11px] tracking-[0.2em] gap-3 hover:bg-[#0B1F3A] hover:text-white transition-all shadow-sm"
                >
                  <History className="h-4 w-4" /> FINALIZE SET
                </Button>
              </div>
            </div>
          </div>

          {/* AI Logs & Technical Timeline (Right) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="glass-panel p-8 rounded-[3.5rem] border-slate-200 h-[640px] flex flex-col shadow-xl bg-white/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Radio className="h-40 w-40 text-[#0B1F3A]" />
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8 relative z-10">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Zap className="h-4 w-4 text-sky-500 fill-current" /> AI STUDIO LOG
                </h3>
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar relative z-10">
                {[
                  { type: "Smash Winner", t: "14:42", text: "Team A secures point with a technical baseline kill.", side: 'A' },
                  { type: "Error", t: "14:40", text: "Unforced net error by Team B. Symmetrical shift detected.", side: 'A' },
                  { type: "Rally Intel", t: "14:38", text: "24-shot intensive rally. Both sides maintaining 92% stamina.", side: 'B' },
                  { type: "Tactical", t: "14:35", text: "Team B shifting to aggressive backhand defense pattern.", side: 'B' }
                ].map((log, i) => (
                  <div key={i} className="space-y-3 relative group">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={cn("h-1.5 w-1.5 rounded-full", log.side === 'A' ? "bg-sky-500" : "bg-red-500")} />
                        <span className="text-[11px] font-black text-[#0B1F3A] group-hover:text-sky-600 transition-colors uppercase">{log.type}</span>
                      </div>
                      <span className="text-[8px] font-bold text-slate-300 font-mono">{log.t}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-500 leading-relaxed border-l-2 border-slate-100 pl-4 group-hover:border-sky-500 transition-all">{log.text}</p>
                  </div>
                ))}
              </div>

              <div className="pt-8 relative z-10">
                <Button className="w-full h-14 bg-slate-50 border border-slate-200 text-[#0B1F3A] font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-[#0B1F3A] hover:text-white transition-all shadow-sm">
                  EXPORT TELEMETRY DATA
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const Loader2 = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default ScoringPage;