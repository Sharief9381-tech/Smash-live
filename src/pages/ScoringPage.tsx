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
  const [pointHistory, setPointHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const { data, error } = await supabase
          .from('matches')
          .select('*')
          .eq('id', matchId)
          .single();

        if (error) throw error;
        
        setMatchData(data);
        if (data.current_score) setScore(data.current_score);
        if (data.sets_won) setSetsWon(data.sets_won);
        if (data.serving) setServing(data.serving as 1 | 2);
      } catch (err) {
        showError("Failed to fetch match session.");
        navigate('/broadcast/center');
      } finally {
        setLoading(false);
      }
    };
    if (matchId) fetchMatch();
  }, [matchId, navigate]);

  const updateMatchOnCloud = async (newScore: [number, number], newSets: [number, number], newServing: number) => {
    try {
      const { error } = await supabase
        .from('matches')
        .update({
          current_score: newScore,
          sets_won: newSets,
          serving: newServing,
          last_update: new Date().toISOString()
        })
        .eq('id', matchId);

      if (error) throw error;
    } catch (err) {
      console.error("Cloud sync failed:", err);
    }
  };

  const handlePoint = async (side: 1 | 2, type: string) => {
    const newScore = [...score] as [number, number];
    newScore[side - 1] += 1;
    
    setPointHistory(prev => [...prev, { score: [...score], side, type }]);
    setScore(newScore);
    setServing(side);
    setActiveOverlay(null);

    let finalSets = [...setsWon] as [number, number];
    let finalScore = newScore;

    // Check set win (standard 21 point rule)
    if (newScore[side - 1] >= 21 && Math.abs(newScore[0] - newScore[1]) >= 2) {
      finalSets[side - 1]++;
      setSetsWon(finalSets);
      showSuccess(`Set Won by Side ${side === 1 ? 'A' : 'B'}`);
      finalScore = [0, 0];
      setScore(finalScore);
    }

    await updateMatchOnCloud(finalScore, finalSets, side);
  };

  const undo = async () => {
    if (pointHistory.length === 0) return;
    const last = pointHistory[pointHistory.length - 1];
    setScore(last.score);
    setServing(last.side);
    setPointHistory(prev => prev.slice(0, -1));
    await updateMatchOnCloud(last.score, setsWon, last.side);
  };

  const reset = async () => {
    if (!confirm("Are you sure you want to reset the match?")) return;
    const s: [number, number] = [0, 0];
    const sw: [number, number] = [0, 0];
    setScore(s);
    setSetsWon(sw);
    setPointHistory([]);
    await updateMatchOnCloud(s, sw, 1);
    showSuccess("Match Reset");
  };

  const finalizeMatch = async () => {
    try {
      const { error } = await supabase
        .from('matches')
        .update({ status: 'completed' })
        .eq('id', matchId);
      
      if (error) throw error;
      showSuccess("Match intelligence finalized.");
      navigate('/court');
    } catch (err) {
      showError("Failed to finalize match.");
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-sky-500" /></div>;
  if (!matchData) return null;

  return (
    <div className="h-screen w-full bg-slate-50 text-[#0B1F3A] flex flex-col overflow-hidden">
      <Navbar />

      <main className="flex-1 container max-w-4xl flex flex-col p-6 gap-6 justify-center">
        
        <div className="flex items-center justify-between mb-4">
          <Button 
            onClick={() => navigate('/broadcast/center')}
            variant="ghost" 
            className="rounded-2xl h-12 px-6 font-black text-[10px] uppercase tracking-widest border border-slate-100 hover:bg-white"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Studio Dashboard
          </Button>
          <div className="flex items-center gap-3">
             <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Broadcasting Match: {matchData.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 relative">
          {[1, 2].map((side) => {
            const playerName = side === 1 
              ? (matchData.players?.p1?.name || matchData.players?.tA1?.name || "SIDE A")
              : (matchData.players?.p2?.name || matchData.players?.tB1?.name || "SIDE B");
              
            return (
              <div 
                key={side}
                className={cn(
                  "rounded-[3.5rem] p-12 flex flex-col items-center justify-center transition-all duration-500 border relative overflow-hidden",
                  serving === side 
                    ? "bg-white border-sky-500 shadow-2xl ring-4 ring-sky-500/5" 
                    : "bg-white/40 border-slate-100 opacity-60"
                )}
              >
                <div className="flex flex-col items-center gap-3 mb-4 relative z-10">
                  <div className={cn(
                    "h-16 w-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center font-black",
                    side === 1 ? "bg-sky-500 text-white" : "bg-[#0B1F3A] text-sky-400"
                  )}>
                    {playerName[0]}
                  </div>
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter text-center">
                    {playerName}
                  </h2>
                </div>
                
                <motion.span 
                  key={score[side-1]}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={cn(
                    "text-[8rem] font-black font-mono leading-none tracking-tighter relative z-10",
                    side === 1 ? "text-sky-600" : "text-[#0B1F3A]"
                  )}
                >
                  {score[side-1]}
                </motion.span>

                <div className="mt-8 flex gap-3 relative z-10">
                  {[...Array(2)].map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "h-4 w-4 rounded-full border-2",
                        i < setsWon[side-1] 
                          ? (side === 1 ? "bg-sky-500 border-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]" : "bg-[#0B1F3A] border-[#0B1F3A]") 
                          : "bg-transparent border-slate-200"
                      )} 
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {[1, 2].map((side) => (
            <div key={side} className="relative h-28">
              <Button 
                onClick={() => setActiveOverlay(side as 1 | 2)}
                className={cn(
                  "w-full h-full rounded-[2.5rem] text-white font-black text-4xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-4",
                  side === 1 ? "bg-sky-500 hover:bg-sky-400" : "bg-[#0B1F3A] hover:bg-[#1a3a5f]"
                )}
              >
                +1 POINT
              </Button>
              
              <AnimatePresence>
                {activeOverlay === side && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.95, y: 10 }} 
                    className="absolute inset-0 z-50 bg-[#0B1F3A] rounded-[2.5rem] p-4 flex flex-col gap-3 shadow-2xl border-2 border-sky-500/50"
                  >
                    <div className="flex justify-between items-center px-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-sky-400">Tactical Shot Identifier</span>
                      <button onClick={() => setActiveOverlay(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="h-5 w-5 text-white/60" />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3 flex-1">
                      <Button 
                        onClick={() => handlePoint(side as 1 | 2, 'Smash')} 
                        className="h-full bg-white/5 hover:bg-sky-500 border border-white/10 rounded-2xl flex flex-col gap-2"
                      >
                        <Zap className="h-6 w-6 text-sky-400 group-hover:text-white fill-current" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Smash</span>
                      </Button>
                      <Button 
                        onClick={() => handlePoint(side as 1 | 2, 'Net')} 
                        className="h-full bg-white/5 hover:bg-sky-500 border border-white/10 rounded-2xl flex flex-col gap-2"
                      >
                        <Target className="h-6 w-6 text-sky-400 group-hover:text-white" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Net Kill</span>
                      </Button>
                      <Button 
                        onClick={() => handlePoint(side as 1 | 2, 'Error')} 
                        className="h-full bg-white/5 hover:bg-red-500 border border-white/10 rounded-2xl flex flex-col gap-2"
                      >
                        <AlertCircle className="h-6 w-6 text-red-400 group-hover:text-white" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-center">Opp. Error</span>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 h-16">
          <Button onClick={undo} variant="outline" className="h-full rounded-[1.5rem] border-slate-200 bg-white font-black text-xs uppercase tracking-widest gap-3 shadow-sm hover:border-sky-500 group">
            <RotateCcw className="h-4 w-4 text-sky-500 group-hover:rotate-[-45deg] transition-transform" /> Undo Entry
          </Button>
          <Button onClick={reset} variant="outline" className="h-full rounded-[1.5rem] border-slate-200 bg-white font-black text-xs uppercase tracking-widest gap-3 shadow-sm hover:border-red-500 text-red-500">
            <RefreshCw className="h-4 w-4" /> Hard Reset
          </Button>
          <Button 
            onClick={finalizeMatch} 
            variant="outline" 
            className="h-full rounded-[1.5rem] border-slate-200 bg-white font-black text-xs uppercase tracking-widest gap-3 shadow-sm hover:border-[#0B1F3A] group"
          >
            <StopCircle className="h-4 w-4 text-[#0B1F3A] group-hover:scale-110 transition-transform" /> Finalize Match
          </Button>
        </div>

      </main>
    </div>
  );
};

export default ScoringPage;