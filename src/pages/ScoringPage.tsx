"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Zap, RotateCcw, RefreshCw, 
  StopCircle, X, ChevronLeft, Loader2, Target, AlertCircle
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
  const [pointHistory, setPointHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const { data } = await supabase.from('matches').select('*').eq('id', matchId).single();
        if (data) {
          setMatchData(data);
          if (data.current_score) setScore(data.current_score);
          if (data.sets_won) setSetsWon(data.sets_won);
          if (data.serving) setServing(data.serving as 1 | 2);
        }
      } catch (err) { navigate('/dashboard'); }
      finally { setLoading(false); }
    };
    if (matchId) fetchMatch();
  }, [matchId, navigate]);

  const updateMatch = async (newScore: [number, number], newSets: [number, number], newServing: number) => {
    try {
      await supabase.from('matches').update({
        current_score: newScore,
        sets_won: newSets,
        serving: newServing,
        last_update: new Date().toISOString()
      }).eq('id', matchId);
    } catch (err) { console.error("Sync error"); }
  };

  const handlePoint = async (side: 1 | 2) => {
    const newScore = [...score] as [number, number];
    newScore[side - 1] += 1;
    
    setPointHistory(prev => [...prev, { score: [...score], side }]);
    setScore(newScore);
    setServing(side);

    // Simple 21-point set logic
    if (newScore[side - 1] >= 21 && Math.abs(newScore[0] - newScore[1]) >= 2) {
      const newSets = [...setsWon] as [number, number];
      newSets[side - 1]++;
      setSetsWon(newSets);
      setScore([0, 0]);
      showSuccess(`Set Won by ${side === 1 ? 'A' : 'B'}`);
    }

    await updateMatch(newScore, setsWon, side);
  };

  const undo = () => {
    if (pointHistory.length === 0) return;
    const last = pointHistory[pointHistory.length - 1];
    setScore(last.score);
    setServing(last.side);
    setPointHistory(prev => prev.slice(0, -1));
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-background"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden">
      <nav className="h-14 border-b border-white/5 flex items-center px-4 justify-between bg-card">
         <button onClick={() => navigate(-1)} className="text-white flex items-center gap-1 font-black text-[10px] uppercase italic">
            <ChevronLeft className="h-4 w-4 text-primary" /> Exit
         </button>
         <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Referee Node: {matchData?.id?.slice(-4)}</span>
         <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
      </nav>

      <main className="flex-1 flex flex-col p-4 gap-4">
        {/* Score Display Area */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          {[1, 2].map((side) => {
            const isActive = serving === side;
            return (
              <div 
                key={side}
                onClick={() => handlePoint(side as 1 | 2)}
                className={cn(
                  "sport-card flex flex-col items-center justify-center gap-4 relative overflow-hidden active:scale-95 transition-all touch-manipulation",
                  isActive ? "bg-primary/10 border-primary/40" : "bg-slate-900/50"
                )}
              >
                <div className="absolute top-4 left-4 flex gap-1">
                   {[...Array(2)].map((_, i) => (
                     <div key={i} className={cn("h-1.5 w-6 rounded-full", i < setsWon[side-1] ? "bg-secondary shadow-[0_0_8px_#10b981]" : "bg-white/10")} />
                   ))}
                </div>
                
                {isActive && <Zap className="absolute top-4 right-4 h-5 w-5 text-primary fill-current animate-pulse" />}

                <div className="text-center">
                   <p className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter mb-1">Side {side === 1 ? 'A' : 'B'}</p>
                   <span className="text-8xl font-black font-mono text-white tracking-tighter tabular-nums leading-none">
                      {score[side-1]}
                   </span>
                </div>

                <div className="mt-4 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                   <span className="text-[10px] font-black text-white uppercase italic">+ Tap to Score</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tactical Controls */}
        <div className="grid grid-cols-3 gap-3 h-20 mb-safe-area-inset-bottom">
           <Button onClick={undo} variant="outline" className="h-full rounded-2xl border-white/5 bg-slate-900 flex flex-col gap-1">
              <RotateCcw className="h-5 w-5 text-primary" />
              <span className="text-[9px] font-black uppercase">Undo</span>
           </Button>
           <Button onClick={() => window.location.reload()} variant="outline" className="h-full rounded-2xl border-white/5 bg-slate-900 flex flex-col gap-1">
              <RefreshCw className="h-5 w-5 text-muted-foreground" />
              <span className="text-[9px] font-black uppercase">Sync</span>
           </Button>
           <Button 
            onClick={() => navigate('/smashed')}
            className="h-full rounded-2xl bg-secondary hover:bg-emerald-600 text-white flex flex-col gap-1 shadow-lg shadow-secondary/10"
           >
              <StopCircle className="h-5 w-5" />
              <span className="text-[9px] font-black uppercase">Finish</span>
           </Button>
        </div>
      </main>
    </div>
  );
};

export default ScoringPage;