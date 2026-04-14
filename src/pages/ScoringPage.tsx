"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Zap, RotateCcw, Target, RefreshCw, 
  StopCircle, AlertCircle, X, ChevronLeft, Loader2
} from 'lucide-react';
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
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .eq('id', matchId)
        .single();

      if (data) {
        setMatchData(data);
        setScore(data.current_score || [0, 0]);
        setSetsWon(data.sets_won || [0, 0]);
        setServing(data.serving || 1);
      } else {
        // Fallback to local if not found in cloud yet
        const local = localStorage.getItem(matchId || "");
        if (local) setMatchData(JSON.parse(local));
      }
      setLoading(false);
    };

    fetchMatch();

    // Realtime subscription for score updates from other devices (multi-admin support)
    const channel = supabase
      .channel(`match-${matchId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'matches', filter: `id=eq.${matchId}` }, (payload) => {
        const updated = payload.new;
        setScore(updated.current_score);
        setSetsWon(updated.sets_won);
        setServing(updated.serving);
      })
      .subscribe();

    return () => { channel.unsubscribe(); };
  }, [matchId]);

  const updateSupabase = async (newScore: number[], newSets: number[], newServing: number) => {
    await supabase
      .from('matches')
      .update({
        current_score: newScore,
        sets_won: newSets,
        serving: newServing,
        last_updated: new Date().toISOString()
      })
      .eq('id', matchId);
  };

  const handlePoint = async (side: 1 | 2, type: string) => {
    const newScore = [...score] as [number, number];
    newScore[side - 1] += 1;
    
    let newSets = [...setsWon] as [number, number];
    let finalScore = newScore;
    let finalServing = side;

    if (newScore[side - 1] >= 21 && Math.abs(newScore[0] - newScore[1]) >= 2) {
      newSets[side - 1]++;
      finalScore = [0, 0];
      showSuccess("Set complete!");
    }

    setScore(finalScore);
    setSetsWon(newSets);
    setServing(finalServing as 1 | 2);
    setActiveOverlay(null);

    await updateSupabase(finalScore, newSets, finalServing);
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-sky-500" /></div>;
  if (!matchData) return null;

  return (
    <div className="h-screen w-full bg-slate-50 text-[#0B1F3A] flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1 container max-w-4xl flex flex-col p-6 gap-6 justify-center">
        <div className="flex items-center justify-between">
          <Button onClick={() => navigate('/broadcast/center')} variant="ghost" className="rounded-2xl h-12 px-6 font-black text-[10px] uppercase tracking-widest border border-slate-100 bg-white">
            <ChevronLeft className="mr-2 h-4 w-4" /> Exit Studio
          </Button>
          <div className="flex items-center gap-3">
             <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cloud Sync: Live</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 relative">
          {[1, 2].map((side) => {
            const player = side === 1 ? matchData.players?.p1 : matchData.players?.p2;
            return (
              <div key={side} className={cn("rounded-[3.5rem] p-12 flex flex-col items-center justify-center border transition-all duration-500 bg-white shadow-xl", serving === side ? "border-sky-500 ring-4 ring-sky-500/5" : "border-slate-100 opacity-60")}>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-4">{player?.name || `Player ${side}`}</h2>
                <motion.span key={score[side-1]} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className={cn("text-[8rem] font-black font-mono leading-none tracking-tighter", side === 1 ? "text-sky-600" : "text-[#0B1F3A]")}>
                  {score[side-1]}
                </motion.span>
                <div className="mt-8 flex gap-3">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className={cn("h-4 w-4 rounded-full border-2", i < setsWon[side-1] ? "bg-sky-500 border-sky-500 shadow-lg" : "border-slate-200")} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {[1, 2].map((side) => (
            <div key={side} className="relative h-28">
              <Button onClick={() => setActiveOverlay(side as 1 | 2)} className={cn("w-full h-full rounded-[2.5rem] text-white font-black text-4xl shadow-xl", side === 1 ? "bg-sky-500" : "bg-[#0B1F3A]")}>
                +1 POINT
              </Button>
              <AnimatePresence>
                {activeOverlay === side && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute inset-0 z-50 bg-[#0B1F3A] rounded-[2.5rem] p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-center px-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-sky-400">Tactical Shot</span>
                      <button onClick={() => setActiveOverlay(null)}><X className="h-5 w-5 text-white/60" /></button>
                    </div>
                    <div className="grid grid-cols-3 gap-3 flex-1">
                      <Button onClick={() => handlePoint(side as 1 | 2, 'Smash')} className="h-full bg-white/5 hover:bg-sky-500 rounded-2xl font-black text-[10px] uppercase">Smash</Button>
                      <Button onClick={() => handlePoint(side as 1 | 2, 'Net')} className="h-full bg-white/5 hover:bg-sky-500 rounded-2xl font-black text-[10px] uppercase">Net Kill</Button>
                      <Button onClick={() => handlePoint(side as 1 | 2, 'Error')} className="h-full bg-white/5 hover:bg-red-500 rounded-2xl font-black text-[10px] uppercase text-center leading-tight">Opp. Error</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ScoringPage;