"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, Activity, Zap, 
  RotateCcw, Save, Trash2, 
  ChevronLeft, Users, Target,
  Flame, History, Play, StopCircle
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';

const ScoringPage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [matchData, setMatchData] = useState<any>(null);
  
  // Scoring State
  const [score, setScore] = useState<[number, number]>([0, 0]);
  const [sets, setSets] = useState<[number, number][]>([]);
  const [currentSet, setCurrentSet] = useState(1);
  const [history, setHistory] = useState<[number, number][]>([]);
  const [serving, setServing] = useState<1 | 2>(1);
  const [startTime] = useState(new Date());

  useEffect(() => {
    const saved = localStorage.getItem(matchId || "");
    if (saved) {
      setMatchData(JSON.parse(saved));
    } else {
      // navigate('/broadcast/center');
    }
  }, [matchId]);

  const addPoint = (side: 1 | 2) => {
    setHistory(prev => [...prev, [...score]]);
    const newScore = [...score] as [number, number];
    newScore[side - 1] += 1;
    setScore(newScore);
    setServing(side);
  };

  const undoPoint = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setScore(last);
    setHistory(prev => prev.slice(0, -1));
  };

  const endSet = () => {
    setSets(prev => [...prev, [...score]]);
    setScore([0, 0]);
    setCurrentSet(prev => prev + 1);
    setHistory([]);
    showSuccess(`Set ${currentSet} Completed`);
  };

  if (!matchData) return <div className="min-h-screen bg-[#0B1F3A] flex items-center justify-center text-white font-black">INITIALIZING STUDIO...</div>;

  const playerA = matchData.matchType === 'singles' ? matchData.players.p1 : { name: `${matchData.players.tA1.name} / ${matchData.players.tA2.name}` };
  const playerB = matchData.matchType === 'singles' ? matchData.players.p2 : { name: `${matchData.players.tB1.name} / ${matchData.players.tB2.name}` };

  return (
    <div className="min-h-screen bg-[#0B1F3A] text-white">
      <Navbar />
      
      {/* Dynamic Header */}
      <div className="bg-white/5 border-b border-white/10 py-6">
        <div className="container px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="rounded-full hover:bg-white/10">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-black italic uppercase">{matchData.name}</h1>
                <Badge className="bg-red-500 border-none text-[8px] font-black animate-pulse">LIVE BROADCAST</Badge>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black text-white/40 uppercase tracking-widest">
                <span>{matchData.round}</span>
                <span className="h-1 w-1 bg-white/20 rounded-full" />
                <span>Court {matchData.court}</span>
                <span className="h-1 w-1 bg-white/20 rounded-full" />
                <span className="text-sky-400">ID: {matchId?.slice(-6).toUpperCase()}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="bg-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
                <Clock className="h-4 w-4 text-sky-400" />
                <span className="font-mono font-black text-sm">00:14:42</span>
             </div>
             <Button variant="destructive" className="rounded-xl font-black uppercase text-xs tracking-widest gap-2">
               <StopCircle className="h-4 w-4" /> End Match
             </Button>
          </div>
        </div>
      </div>

      <main className="container px-6 py-8 grid lg:grid-cols-12 gap-8">
        {/* Left Stats Column */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-panel p-8 rounded-[3rem] border-white/10 bg-white/5 space-y-6">
            <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em] flex items-center gap-2">
              <Activity className="h-4 w-4 text-sky-400" /> Live Stat Intelligence
            </h3>
            <div className="space-y-4">
              {[
                { label: "Longest Rally", val: "32s" },
                { label: "Smash Winners", val: "14" },
                { label: "Net Points", val: "8" },
                { label: "Unforced Errors", val: "4" }
              ].map((s, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-2xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-black text-white/60 uppercase">{s.label}</span>
                  <span className="font-black text-sky-400">{s.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-8 rounded-[3rem] border-white/10 bg-white/5 space-y-6">
             <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em]">AI Momentum</h3>
             <div className="h-32 flex items-end gap-1 px-2">
                {[40, 60, 45, 70, 85, 40, 55, 30, 20, 45, 60, 80].map((h, i) => (
                  <div key={i} className="flex-1 bg-sky-500/20 rounded-t-sm relative group cursor-pointer">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      className={cn("absolute bottom-0 left-0 right-0 rounded-t-sm", i > 7 ? "bg-red-500" : "bg-sky-500")} 
                    />
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Center Scoring Hub */}
        <div className="lg:col-span-6 space-y-8">
          <div className="glass-panel p-12 rounded-[4rem] border-white/10 bg-gradient-to-b from-white/10 to-transparent flex flex-col items-center gap-12 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-sky-500 opacity-50 shadow-[0_0_20px_rgba(14,165,233,0.5)]" />
            
            <div className="flex justify-between w-full items-center">
              <div className="text-center space-y-4 flex-1">
                <div className="relative inline-block">
                  <div className="h-20 w-20 rounded-full border-2 border-sky-500/50 p-1">
                    <div className="h-full w-full rounded-full bg-sky-500/20 flex items-center justify-center font-black text-xl">
                      {playerA.img || 'A'}
                    </div>
                  </div>
                  {serving === 1 && (
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="absolute -top-1 -right-1 h-6 w-6 bg-sky-500 rounded-full border-2 border-[#0B1F3A] flex items-center justify-center">
                      <Zap className="h-3 w-3 fill-current text-[#0B1F3A]" />
                    </motion.div>
                  )}
                </div>
                <div>
                  <h4 className="font-black text-lg tracking-tighter uppercase italic">{playerA.name}</h4>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">RANK #1 • DEN</p>
                </div>
              </div>

              <div className="px-8 text-center">
                <Badge variant="outline" className="border-white/10 text-[10px] font-black uppercase tracking-widest mb-4">Set {currentSet}</Badge>
                <div className="flex items-center gap-8">
                  <motion.span key={score[0]} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="text-8xl font-black font-mono tabular-nums text-sky-400">{score[0]}</motion.span>
                  <span className="text-4xl font-black text-white/20">:</span>
                  <motion.span key={score[1]} initial={{ scale: 1.5 }} animate={{ scale: 1 }} className="text-8xl font-black font-mono tabular-nums">{score[1]}</motion.span>
                </div>
                <div className="mt-6 flex justify-center gap-3">
                  {sets.map((s, i) => (
                    <div key={i} className="text-xs font-black bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                      {s[0]} - {s[1]}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center space-y-4 flex-1">
                <div className="relative inline-block">
                  <div className="h-20 w-20 rounded-full border-2 border-white/10 p-1">
                    <div className="h-full w-full rounded-full bg-white/5 flex items-center justify-center font-black text-xl text-white/40">
                      {playerB.img || 'B'}
                    </div>
                  </div>
                  {serving === 2 && (
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} className="absolute -top-1 -right-1 h-6 w-6 bg-red-500 rounded-full border-2 border-[#0B1F3A] flex items-center justify-center">
                      <Zap className="h-3 w-3 fill-current text-[#0B1F3A]" />
                    </motion.div>
                  )}
                </div>
                <div>
                  <h4 className="font-black text-lg tracking-tighter uppercase italic text-white/60">{playerB.name}</h4>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">RANK #7 • MYS</p>
                </div>
              </div>
            </div>

            {/* Interactive Controls */}
            <div className="grid grid-cols-2 gap-6 w-full pt-8 border-t border-white/5">
              <Button 
                onClick={() => addPoint(1)}
                className="h-24 bg-sky-500 text-[#0B1F3A] font-black text-2xl rounded-[2rem] shadow-[0_15px_40px_rgba(14,165,233,0.2)] hover:scale-[1.02] transition-all"
              >
                +1 POINT A
              </Button>
              <Button 
                onClick={() => addPoint(2)}
                className="h-24 bg-white/10 text-white font-black text-2xl rounded-[2rem] border border-white/10 hover:bg-white/20 transition-all"
              >
                +1 POINT B
              </Button>
            </div>

            <div className="flex gap-4 w-full">
              <Button onClick={undoPoint} disabled={history.length === 0} variant="outline" className="flex-1 h-14 rounded-2xl border-white/10 bg-white/5 font-black uppercase text-[10px] tracking-widest gap-2">
                <RotateCcw className="h-4 w-4" /> Undo Last Point
              </Button>
              <Button onClick={endSet} variant="outline" className="flex-1 h-14 rounded-2xl border-white/10 bg-white/5 font-black uppercase text-[10px] tracking-widest gap-2 hover:bg-sky-500/10">
                <History className="h-4 w-4" /> End Current Set
              </Button>
            </div>
          </div>
        </div>

        {/* Right Commentary Column */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-panel p-8 rounded-[3rem] border-white/10 bg-white/5 h-[600px] flex flex-col space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <Zap className="h-4 w-4 text-sky-400 fill-current" /> AI Commentary
              </h3>
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
              {[
                { time: "14:42", type: "Smash", text: "Axelsen forces a weak return from Lee with a deceptive drop shot." },
                { time: "14:40", type: "Score", text: "Score leveled at 14-14. Intense rally of 28 shots just concluded." },
                { time: "14:38", type: "Strategy", text: "Lee Zii Jia is targeting the backhand corner consistently this set." },
              ].map((ev, i) => (
                <div key={i} className="space-y-2 group">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">{ev.time}</span>
                    <Badge variant="outline" className="text-[8px] font-black border-white/10 uppercase py-0">{ev.type}</Badge>
                  </div>
                  <p className="text-xs font-bold leading-relaxed text-white/80 group-hover:text-sky-400 transition-colors">{ev.text}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10">
              <Button className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-sky-500/20">
                Push Live Update
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScoringPage;