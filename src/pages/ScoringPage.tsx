"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, RotateCcw, Activity, 
  Target, History, StopCircle, Clock,
  ChevronLeft, Flame, TrendingUp
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';

const ScoringPage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [matchData, setMatchData] = useState<any>(null);
  const [score, setScore] = useState<[number, number]>([0, 0]);
  const [sets, setSets] = useState<[number, number][]>([]);
  const [history, setHistory] = useState<[number, number][]>([]);
  const [serving, setServing] = useState<1 | 2>(1);

  useEffect(() => {
    const saved = localStorage.getItem(matchId || "");
    if (saved) setMatchData(JSON.parse(saved));
  }, [matchId]);

  const updateScore = (side: 1 | 2) => {
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

  if (!matchData) return <div className="h-screen bg-slate-50 flex items-center justify-center font-black text-[#0B1F3A]">INITIALIZING...</div>;

  const getPlayer = (side: 'A' | 'B') => {
    if (matchData.matchType === 'singles') {
      return side === 'A' ? matchData.players.p1 : matchData.players.p2;
    }
    return { 
      name: side === 'A' ? `${matchData.players.tA1.name} / ${matchData.players.tA2.name}` : `${matchData.players.tB1.name} / ${matchData.players.tB2.name}`,
      img: side === 'A' ? matchData.players.tA1.img : matchData.players.tB1.img
    };
  };

  const teamA = getPlayer('A');
  const teamB = getPlayer('B');

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Premium Header */}
      <div className="bg-white border-b border-slate-200 py-6">
        <div className="container px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="rounded-xl h-12 w-12 hover:bg-slate-50"><ChevronLeft className="h-6 w-6" /></Button>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black text-[#0B1F3A] uppercase italic">{matchData.name}</h1>
                <Badge className="bg-red-500 text-white animate-pulse border-none text-[8px] font-black">LIVE SCORE</Badge>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>{matchData.round}</span>
                <span className="h-1 w-1 bg-slate-200 rounded-full" />
                <span>Court {matchData.court}</span>
                <span className="h-1 w-1 bg-slate-200 rounded-full" />
                <span className="text-sky-600 font-mono">BROADCAST ACTIVE</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="bg-[#0B1F3A] text-white px-5 py-2.5 rounded-2xl flex items-center gap-3 shadow-xl">
                <Clock className="h-4 w-4 text-sky-400" />
                <span className="font-black text-sm tracking-tighter">00:18:42</span>
             </div>
             <Button variant="destructive" className="h-12 rounded-2xl font-black uppercase text-xs tracking-widest gap-2 px-6">
               <StopCircle className="h-4 w-4" /> End Match
             </Button>
          </div>
        </div>
      </div>

      <main className="container px-6 py-8 space-y-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Symmetrical Stats Panel (Left) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="glass-panel p-8 rounded-[3rem] border-slate-200 space-y-8 shadow-xl">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Activity className="h-4 w-4 text-sky-500" /> SIDE A INTELLIGENCE
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Smash Winners", val: 12, icon: Zap, color: "text-sky-500" },
                  { label: "Net Play", val: 8, icon: Target, color: "text-indigo-500" },
                  { label: "Rally Win %", val: 62, icon: TrendingUp, color: "text-green-500" }
                ].map((s, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                    <s.icon className={cn("h-4 w-4", s.color)} />
                    <span className="text-lg font-black text-[#0B1F3A]">{s.val}{s.label.includes('%') ? '%' : ''}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Scoring Core (Center) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="glass-panel p-12 rounded-[4rem] border-slate-200 shadow-[0_40px_80px_rgba(11,31,58,0.1)] flex flex-col items-center gap-10">
              <div className="flex justify-between w-full items-center px-4">
                {/* Side A Identity */}
                <div className="flex-1 text-center space-y-4">
                  <div className="relative inline-block">
                    <div className={cn("h-24 w-24 rounded-full border-4 p-1 shadow-2xl transition-all", serving === 1 ? "border-sky-500" : "border-white")}>
                      <div className="h-full w-full rounded-full bg-slate-100 flex items-center justify-center font-black text-2xl text-[#0B1F3A]">{teamA.img}</div>
                    </div>
                    {serving === 1 && (
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="absolute -top-1 -right-1 h-8 w-8 bg-sky-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                        <Zap className="h-4 w-4 fill-white text-white" />
                      </motion.div>
                    )}
                  </div>
                  <h4 className="font-black text-xl text-[#0B1F3A] tracking-tighter uppercase italic leading-none">{teamA.name}</h4>
                </div>

                {/* Massive Scoreboard */}
                <div className="flex flex-col items-center px-10">
                  <Badge className="bg-[#0B1F3A] text-white border-none font-black text-[10px] tracking-widest px-4 py-1 mb-6">SET 01</Badge>
                  <div className="flex items-center gap-10">
                    <motion.span key={score[0]} initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-[10rem] font-black font-mono tabular-nums leading-none text-sky-600 tracking-tighter">{score[0]}</motion.span>
                    <span className="text-4xl font-black text-slate-100">:</span>
                    <motion.span key={score[1]} initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-[10rem] font-black font-mono tabular-nums leading-none text-[#0B1F3A] tracking-tighter">{score[1]}</motion.span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {sets.map((s, i) => <div key={i} className="px-4 py-2 bg-slate-100 rounded-xl font-black text-xs text-[#0B1F3A]">{s[0]}-{s[1]}</div>)}
                  </div>
                </div>

                {/* Side B Identity */}
                <div className="flex-1 text-center space-y-4">
                  <div className="relative inline-block">
                    <div className={cn("h-24 w-24 rounded-full border-4 p-1 shadow-2xl transition-all", serving === 2 ? "border-red-500" : "border-white")}>
                      <div className="h-full w-full rounded-full bg-slate-100 flex items-center justify-center font-black text-2xl text-[#0B1F3A] opacity-40">{teamB.img}</div>
                    </div>
                    {serving === 2 && (
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="absolute -top-1 -right-1 h-8 w-8 bg-red-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                        <Zap className="h-4 w-4 fill-white text-white" />
                      </motion.div>
                    )}
                  </div>
                  <h4 className="font-black text-xl text-slate-300 tracking-tighter uppercase italic leading-none">{teamB.name}</h4>
                </div>
              </div>

              {/* Point Controls */}
              <div className="grid grid-cols-2 gap-6 w-full pt-10 border-t border-slate-100">
                <Button onClick={() => updateScore(1)} className="h-28 bg-sky-600 text-white font-black text-3xl rounded-[2.5rem] shadow-[0_20px_40px_rgba(14,165,233,0.3)] hover:scale-[1.02] transition-all">+1 SIDE A</Button>
                <Button onClick={() => updateScore(2)} className="h-28 bg-[#0B1F3A] text-white font-black text-3xl rounded-[2.5rem] shadow-[0_20px_40px_rgba(11,31,58,0.2)] hover:scale-[1.02] transition-all">+1 SIDE B</Button>
              </div>

              <div className="flex gap-4 w-full">
                <Button onClick={undo} disabled={history.length === 0} variant="outline" className="flex-1 h-16 rounded-2xl border-slate-200 font-black text-xs tracking-widest gap-3"><RotateCcw className="h-4 w-4" /> UNDO POINT</Button>
                <Button onClick={() => { setSets(p => [...p, [...score]]); setScore([0, 0]); showSuccess("Set Completed"); }} variant="outline" className="flex-1 h-16 rounded-2xl border-slate-200 font-black text-xs tracking-widest gap-3 hover:bg-[#0B1F3A] hover:text-white transition-all"><History className="h-4 w-4" /> END SET</Button>
              </div>
            </div>
          </div>

          {/* Symmetrical Commentary Panel (Right) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="glass-panel p-8 rounded-[3rem] border-slate-200 h-[600px] flex flex-col shadow-xl">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-6 mb-6">
                <Zap className="h-4 w-4 text-sky-500 fill-current" /> AI COMMENTARY LOG
              </h3>
              <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                {[
                  { type: "Smash", t: "14:42", text: "Axelsen forces a baseline error with a 410km/h smash." },
                  { type: "Set", t: "14:40", text: "Point winner Side A. Total rally count at 42." },
                  { type: "Intel", t: "14:38", text: "Strategic shift detected: Side B playing deep backhand shots." }
                ].map((log, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-[8px] font-black text-slate-300 uppercase">
                      <span>{log.t}</span>
                      <Badge className="bg-slate-100 text-slate-400 border-none h-4 px-1">{log.type}</Badge>
                    </div>
                    <p className="text-xs font-bold text-[#0B1F3A] leading-relaxed">{log.text}</p>
                  </div>
                ))}
              </div>
              <Button className="w-full h-14 bg-slate-50 border border-slate-200 text-[#0B1F3A] font-black text-[10px] uppercase tracking-widest rounded-2xl mt-6 hover:bg-[#0B1F3A] hover:text-white transition-all">SYNC BROADCAST</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScoringPage;