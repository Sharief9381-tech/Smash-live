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
  Tornado, Users, BarChart3, Timer, RefreshCw,
  Settings, Camera, ArrowLeft, Delete, Info
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
  const [isFinished, setIsFinished] = useState(false);
  const [lastPointType, setLastPointType] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(matchId || "");
    if (saved) {
      setMatchData(JSON.parse(saved));
    } else {
      showError("Session Terminated");
      navigate('/broadcast/center');
    }
  }, [matchId, navigate]);

  const registerPoint = (side: 1 | 2, type: string) => {
    if (isFinished) return;
    setHistory(prev => [...prev, { score: [...score], type, side }]);
    const next = [...score] as [number, number];
    next[side - 1] += 1;
    setScore(next);
    setServing(side);
    setLastPointType(type);
    showSuccess(`${type} Point: ${side === 1 ? sideA.name : sideB.name}`);
  };

  const undo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setScore(last.score);
    setHistory(prev => prev.slice(0, -1));
    setLastPointType(null);
  };

  const finalizeSet = () => {
    if (score[0] === 0 && score[1] === 0) return;
    setSets(prev => [...prev, [...score]]);
    setScore([0, 0]);
    setHistory([]);
    setLastPointType(null);
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
    <div className="min-h-screen bg-[#F5F7F9] text-[#0B1F3A] flex flex-col font-sans">
      {/* 1. HEADER (Dark theme like image) */}
      <header className="bg-[#1A202C] text-white p-4 pt-10 relative">
        <div className="flex items-center justify-between mb-8 px-2">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-medium tracking-wide">{matchData.name}</h1>
          <div className="flex items-center gap-4">
            <Camera className="h-5 w-5 opacity-70" />
            <Settings className="h-5 w-5 opacity-70" />
          </div>
        </div>

        {/* 2. MAIN SCORE DISPLAY */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-baseline gap-2">
            <span className="text-7xl font-light tracking-tighter">
              {score[0]}<span className="opacity-40 mx-2">/</span>{score[1]}
            </span>
            <span className="text-xl opacity-50 font-medium">({sets.length + 1}.{history.length})</span>
          </div>
          <div className="absolute right-6 top-[120px]">
            <Share2 className="h-6 w-6 text-sky-400 opacity-80" />
          </div>
        </div>

        {/* 3. PLAYER STATS ROW */}
        <div className="flex border-t border-white/10">
          <div className={cn("flex-1 p-4 border-r border-white/10 flex items-center gap-3 transition-colors", serving === 1 ? "bg-white/5" : "opacity-50")}>
            <div className="h-4 w-4 rounded-full bg-slate-500 flex items-center justify-center">
              <div className="h-2 w-2 bg-white rounded-full opacity-30" />
            </div>
            <div>
              <p className="text-sm font-medium">{sideA.name}</p>
              <p className="text-[10px] opacity-40">{score[0]} ({history.filter(h => h.side === 1).length})</p>
            </div>
          </div>
          <div className={cn("flex-1 p-4 flex items-center gap-3 transition-colors", serving === 2 ? "bg-white/5" : "opacity-50")}>
             <div className="h-4 w-4 rounded-full bg-orange-400 flex items-center justify-center">
                <div className="h-2 w-2 bg-white rounded-full opacity-30" />
             </div>
             <div>
              <p className="text-sm font-medium">{sideB.name}</p>
              <p className="text-[10px] opacity-40">{score[1]} ({history.filter(h => h.side === 2).length})</p>
            </div>
          </div>
        </div>
      </header>

      {/* 4. RECENT POINTS TIMELINE */}
      <div className="bg-[#2D3748] p-4 flex items-center gap-4 overflow-x-auto no-scrollbar shadow-inner">
        <div className="flex items-center gap-3 min-w-max">
          <div className="h-8 w-8 rounded-full border border-white/20 flex items-center justify-center">
             <div className="h-4 w-1 bg-white/20 rotate-45" />
          </div>
          <span className="text-sm text-white/90 font-medium">{sideA.name.split(' ')[0]}</span>
          {history.slice(-6).map((point, i) => (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              key={i}
              className={cn(
                "h-10 w-10 rounded-full flex flex-col items-center justify-center text-[10px] font-black shadow-lg",
                point.side === 1 ? "bg-white text-[#1A202C]" : "bg-orange-400 text-white",
                point.type === 'Smash' && "bg-sky-500 text-white"
              )}
            >
              {point.side === 1 ? score[0] - (history.length - i - 1) : score[1] - (history.length - i - 1)}
              {point.type === 'Smash' && <span className="text-[5px] uppercase">SMASH</span>}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 5. SCORING GRID (White section like image) */}
      <div className="flex-1 bg-white">
        <div className="grid grid-cols-4 border-b border-slate-100 h-1/4">
          <button onClick={() => registerPoint(1, 'Regular')} className="col-span-1 border-r border-slate-100 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors">
            <span className="text-2xl font-light text-slate-400">0</span>
          </button>
          <button onClick={() => registerPoint(1, 'Smash')} className="col-span-1 border-r border-slate-100 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors">
            <span className="text-2xl font-light text-slate-400">1</span>
          </button>
          <button onClick={() => registerPoint(1, 'Net Drop')} className="col-span-1 border-r border-slate-100 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors">
            <span className="text-2xl font-light text-slate-400">2</span>
          </button>
          <button onClick={undo} className="col-span-1 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors">
            <Delete className="h-6 w-6 text-slate-300" />
          </button>
        </div>

        <div className="grid grid-cols-4 border-b border-slate-100 h-1/4">
          <button onClick={() => registerPoint(2, 'Regular')} className="col-span-1 border-r border-slate-100 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors">
            <span className="text-2xl font-light text-slate-400">3</span>
          </button>
          <button onClick={() => registerPoint(2, 'Smash')} className="col-span-1 border-r border-slate-100 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors">
            <div className="text-center">
              <span className="text-2xl font-light text-slate-400">4</span>
              <p className="text-[8px] text-slate-300 uppercase font-black">BOUNDARY</p>
            </div>
          </button>
          <button onClick={() => registerPoint(2, 'Net Drop')} className="col-span-1 border-r border-slate-100 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors relative">
            <div className="text-center shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-4 bg-white rounded-lg scale-110 z-10 border border-slate-50">
              <span className="text-2xl font-medium">6</span>
              <p className="text-[8px] text-slate-300 uppercase font-black">BOUNDARY</p>
            </div>
          </button>
          <button className="col-span-1 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors">
            <span className="text-xs font-black text-slate-300">5, 7</span>
          </button>
        </div>

        <div className="grid grid-cols-4 border-b border-slate-100 h-1/4">
           {['WD', 'NB', 'BYE', 'LB'].map(t => (
             <button key={t} className="border-r last:border-r-0 border-slate-100 flex flex-col items-center justify-center hover:bg-slate-50 transition-colors">
               <span className="text-xs font-black text-slate-400">{t}</span>
             </button>
           ))}
        </div>

        {/* 6. MEMORY DIFFERENCES / PERFORMANCE GAPS */}
        <div className="p-6 bg-[#F5F7F9] space-y-4">
           <div className="flex items-center gap-2 mb-2">
             <BarChart3 className="h-4 w-4 text-sky-500" />
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0B1F3A]">Sector Analysis</h4>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-[8px] font-black text-slate-400 uppercase mb-2">Smash Accuracy</p>
                <div className="flex items-end justify-between">
                  <span className="text-lg font-black text-sky-500">94%</span>
                  <div className="flex gap-0.5 items-end">
                    {[3, 6, 4, 8, 5].map((h, i) => (
                      <div key={i} className="w-1 bg-sky-100 rounded-t-full" style={{ height: h * 2 }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-[8px] font-black text-slate-400 uppercase mb-2">Net Dominance</p>
                <div className="flex items-end justify-between">
                  <span className="text-lg font-black text-orange-400">72%</span>
                   <div className="flex gap-0.5 items-end">
                    {[5, 4, 7, 3, 6].map((h, i) => (
                      <div key={i} className="w-1 bg-orange-100 rounded-t-full" style={{ height: h * 2 }} />
                    ))}
                  </div>
                </div>
              </div>
           </div>
        </div>

        {/* 7. FOOTER INTELLIGENCE */}
        <footer className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-slate-100 transition-colors">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 leading-tight">
              In Oct 2024, <span className="font-bold text-[#0B1F3A]">{sideA.name}</span> reached 410km/h smash efficiency.
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
        </footer>
      </div>

      {/* MATCH FINALIZATION OVERLAY */}
      <AnimatePresence>
        {isFinished && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-[#1A202C]/90 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="max-w-md w-full bg-white p-10 rounded-[3rem] text-center space-y-8 shadow-2xl">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-xl">
                <Trophy className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-black italic tracking-tighter uppercase text-[#0B1F3A]">Match Over</h2>
              <div className="flex items-center justify-center gap-8 py-6 border-y border-slate-100">
                 <div className="flex-1">
                    <p className="font-black text-lg">{sideA.name.split(' ')[0]}</p>
                    <span className="text-4xl font-mono font-black text-sky-500">{score[0]}</span>
                 </div>
                 <div className="h-10 w-px bg-slate-200" />
                 <div className="flex-1">
                    <p className="font-black text-lg">{sideB.name.split(' ')[0]}</p>
                    <span className="text-4xl font-mono font-black text-[#0B1F3A]">{score[1]}</span>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={() => navigate('/court')} className="h-14 bg-[#1A202C] text-white font-black rounded-2xl">DONE</Button>
                <Button variant="outline" className="h-14 border-slate-200 text-[#0B1F3A] font-black rounded-2xl">REPORT</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScoringPage;