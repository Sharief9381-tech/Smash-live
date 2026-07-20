"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Zap, RotateCcw, Target, RefreshCw, StopCircle, X, ChevronLeft, Loader2, AlertCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from '@/lib/supabase';

const ScoringPage = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [matchData, setMatchData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<[number, number]>([0, 0]);
  const [setsWon, setSetsWon] = useState<[number, number]>([0, 0]);
  const [serving, setServing] = useState<1 | 2>(1);
  const [activeOverlay, setActiveOverlay] = useState<1 | 2 | null>(null);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const { data, error } = await supabase.from('matches').select('*').eq('id', matchId).single();
        if (error) throw error;
        setMatchData(data);
        if (data.current_score) setScore(data.current_score);
        if (data.sets_won) setSetsWon(data.sets_won);
        if (data.serving) setServing(data.serving as 1 | 2);
      } catch (err) {
        const local = localStorage.getItem(matchId || "");
        if (local) {
          const data = JSON.parse(local);
          setMatchData(data);
          if (data.currentScore) setScore(data.currentScore);
          if (data.setsWon) setSetsWon(data.setsWon);
          if (data.serving) setServing(data.serving);
        } else {
          navigate('/broadcast/center');
        }
      } finally {
        setLoading(false);
      }
    };
    if (matchId) fetchMatch();
  }, [matchId, navigate]);

  const handlePoint = async (side: 1 | 2, type: string) => {
    const newScore = [...score] as [number, number];
    newScore[side - 1] += 1;
    setScore(newScore);
    setServing(side);
    setActiveOverlay(null);
    
    let finalSets = [...setsWon] as [number, number];
    let finalScore = newScore;

    if (newScore[side - 1] >= 21 && Math.abs(newScore[0] - newScore[1]) >= 2) {
      finalSets[side - 1]++;
      setSetsWon(finalSets);
      showSuccess("Set Complete");
      finalScore = [0, 0];
      setScore(finalScore);
    }

    try {
      await supabase.from('matches').update({ current_score: finalScore, sets_won: finalSets, serving: side, last_update: new Date().toISOString() }).eq('id', matchId);
    } catch (e) {
      localStorage.setItem(matchId!, JSON.stringify({ ...matchData, currentScore: finalScore, setsWon: finalSets, serving: side }));
    }
  };

  const getSideNames = (side: 1 | 2) => {
    if (!matchData?.players) return side === 1 ? "Side A" : "Side B";
    
    if (matchData.match_type === 'singles') {
      const p = side === 1 ? matchData.players.p1 : matchData.players.p2;
      return p?.name || (side === 1 ? "Athlete A" : "Athlete B");
    } else {
      const team = side === 1 ? matchData.players.sideA : matchData.players.sideB;
      if (!team || !Array.isArray(team)) return side === 1 ? "Team A" : "Team B";
      return team.map(p => p?.name || "Athlete").join(" / ");
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-sky-500 h-10 w-10" /></div>;

  return (
    <div className="min-h-screen w-full bg-slate-50 pb-20 flex flex-col">
      <Navbar />

      <main className="flex-1 p-4 space-y-6">
        <div className="flex items-center justify-between">
          <Button onClick={() => navigate('/broadcast/center')} variant="ghost" className="h-10 px-4 font-black text-[9px] uppercase tracking-widest border bg-white rounded-xl">
            <ChevronLeft className="mr-1 h-3 w-3" /> Exit
          </Button>
          <div className="flex items-center gap-2">
             <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
             <span className="text-[9px] font-black uppercase text-slate-400 max-w-[150px] truncate">Broadcasting: {matchData.name}</span>
          </div>
        </div>

        {/* VERTICAL SCORE STACK */}
        <div className="flex flex-col gap-4">
          {[1, 2].map((side) => {
            const sideName = getSideNames(side as 1 | 2);
            const isActive = serving === side;
            return (
              <div key={side} className={cn(
                "p-6 rounded-[2.5rem] border transition-all flex items-center justify-between shadow-xl relative overflow-hidden",
                isActive ? "bg-white border-sky-500 scale-[1.02]" : "bg-white/50 border-slate-100 opacity-60"
              )}>
                {isActive && <Zap className="absolute right-4 top-4 h-12 w-12 text-sky-500 opacity-5" />}
                <div className="space-y-2 flex-1 mr-4">
                  <div className={cn("h-10 w-10 rounded-full flex items-center justify-center font-black text-white", side === 1 ? "bg-sky-500" : "bg-[#0B1F3A]")}>
                    {side === 1 ? "A" : "B"}
                  </div>
                  <h2 className="text-[15px] font-black uppercase italic tracking-tighter leading-tight">{sideName}</h2>
                  <div className="flex gap-1.5">
                    {[...Array(Math.ceil((matchData.total_sets || 3)/2))].map((_, i) => (
                      <div key={i} className={cn("h-2 w-2 rounded-full border", i < setsWon[side-1] ? "bg-sky-500 border-sky-500" : "bg-slate-100 border-slate-200")} />
                    ))}
                  </div>
                </div>
                <motion.span key={score[side-1]} initial={{ scale: 0.5 }} animate={{ scale: 1 }} className={cn("text-7xl font-black font-mono tabular-nums leading-none", side === 1 ? "text-sky-600" : "text-[#0B1F3A]")}>
                  {score[side-1]}
                </motion.span>
              </div>
            );
          })}
        </div>

        {/* HUGE SCORING BUTTONS */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((side) => (
            <div key={side} className="relative h-28">
              <Button 
                onClick={() => setActiveOverlay(side as 1 | 2)}
                className={cn("w-full h-full rounded-[2.5rem] text-white font-black text-3xl shadow-2xl transition-transform active:scale-95", side === 1 ? "bg-sky-500" : "bg-[#0B1F3A]")}
              >
                +1
              </Button>
              <AnimatePresence>
                {activeOverlay === side && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute inset-0 z-50 bg-[#0B1F3A] rounded-[2.5rem] p-3 flex flex-col gap-2 border-2 border-sky-500/50">
                    <div className="flex justify-between items-center px-3"><span className="text-[8px] font-black text-sky-400 uppercase">IDENTIFIER</span><X onClick={() => setActiveOverlay(null)} className="h-4 w-4 text-white/40" /></div>
                    <div className="grid grid-cols-3 gap-2 flex-1">
                      <button onClick={() => handlePoint(side as 1 | 2, 'Smash')} className="bg-white/5 rounded-2xl flex flex-col items-center justify-center gap-1"><Zap className="h-5 w-5 text-sky-400" /><span className="text-[7px] font-black text-white uppercase">Smash</span></button>
                      <button onClick={() => handlePoint(side as 1 | 2, 'Net')} className="bg-white/5 rounded-2xl flex flex-col items-center justify-center gap-1"><Target className="h-5 w-5 text-sky-400" /><span className="text-[7px] font-black text-white uppercase">Net</span></button>
                      <button onClick={() => handlePoint(side as 1 | 2, 'Error')} className="bg-red-500/10 rounded-2xl flex flex-col items-center justify-center gap-1"><AlertCircle className="h-5 w-5 text-red-500" /><span className="text-[7px] font-black text-white uppercase">Error</span></button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button onClick={() => setScore([0,0])} variant="outline" className="flex-1 h-14 rounded-2xl border-slate-200 font-black text-[10px] uppercase gap-2 bg-white"><RefreshCw className="h-4 w-4" /> Reset</Button>
          <Button onClick={() => navigate('/smashed')} variant="outline" className="flex-1 h-14 rounded-2xl border-slate-200 font-black text-[10px] uppercase gap-2 bg-white"><StopCircle className="h-4 w-4" /> End Match</Button>
        </div>
      </main>
    </div>
  );
};

export default ScoringPage;