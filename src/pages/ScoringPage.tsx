"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Zap, RotateCcw, Target, RefreshCw, 
  StopCircle, AlertCircle, X, ChevronLeft, Loader2,
  Clock, Activity, Trophy
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
          showError("Session not found");
          navigate('/broadcast/center');
        }
      } finally {
        setLoading(false);
      }
    };
    if (matchId) fetchMatch();
  }, [matchId, navigate]);

  const updateMatchOnCloud = async (newScore: [number, number], newSets: [number, number], newServing: number) => {
    try {
      await supabase.from('matches').update({
        current_score: newScore,
        sets_won: newSets,
        serving: newServing,
        last_update: new Date().toISOString()
      }).eq('id', matchId);
    } catch (err) {
      const updated = { ...matchData, currentScore: newScore, setsWon: newSets, serving: newServing };
      localStorage.setItem(matchId!, JSON.stringify(updated));
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

    if (newScore[side - 1] >= 21 && Math.abs(newScore[0] - newScore[1]) >= 2) {
      finalSets[side - 1]++;
      setSetsWon(finalSets);
      showSuccess(`Set Won by Side ${side === 1 ? 'A' : 'B'}`);
      const totalSets = matchData?.total_sets || matchData?.sets || 3;
      const setsToWin = Math.ceil(totalSets / 2);
      if (finalSets[side - 1] >= setsToWin) {
         showSuccess("MATCH COMPLETED!");
         finalizeMatch();
         return;
      }
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

  const finalizeMatch = async () => {
    try {
      await supabase.from('matches').update({ status: 'completed' }).eq('id', matchId);
      const active = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
      localStorage.setItem('active_studio_matches', JSON.stringify(active.filter((m: any) => m.id !== matchId)));
      showSuccess("Match finalized.");
      navigate('/smashed');
    } catch (err) { navigate('/smashed'); }
  };

  if (loading) return <div className="h-screen flex flex-col items-center justify-center bg-background"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>;
  if (!matchData) return null;

  return (
    <div className="h-screen w-full bg-background text-foreground flex flex-col overflow-hidden select-none">
      
      {/* COMPACT REF HEADER */}
      <header className="h-16 flex items-center justify-between px-4 border-b border-white/5 bg-card/50 backdrop-blur-xl">
         <div className="flex items-center gap-3">
            <Button onClick={() => navigate('/broadcast/center')} variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white/5">
               <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
               <h1 className="text-xs font-black uppercase tracking-widest italic">{matchData.name}</h1>
               <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                  <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Master Studio Terminal</span>
               </div>
            </div>
         </div>
         <Badge className="bg-primary/20 text-primary font-black text-[8px] tracking-widest uppercase h-6 px-3 border-none">REF MODE</Badge>
      </header>

      <main className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto pt-6 pb-20">
        
        {/* SCOREBOARD TILES */}
        <div className="grid grid-cols-1 gap-4 flex-1">
          {[1, 2].map((side) => {
            const athlete = side === 1 
              ? (matchData.players?.p1 || { name: "ATHLETE A" })
              : (matchData.players?.p2 || { name: "ATHLETE B" });
            const isServing = serving === side;

            return (
              <motion.div 
                key={side}
                onClick={() => setActiveOverlay(side as 1 | 2)}
                className={cn(
                  "relative rounded-[2.5rem] p-6 flex flex-col items-center justify-center border transition-all duration-300 active:scale-[0.98]",
                  isServing ? "bg-card border-primary/50 shadow-2xl ring-2 ring-primary/10" : "bg-card/40 border-white/5 opacity-50 grayscale-[50%]"
                )}
              >
                {isServing && (
                  <div className="absolute top-4 right-6 flex items-center gap-2">
                     <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em]">Service Active</span>
                     <Zap className="h-3 w-3 text-primary fill-current" />
                  </div>
                )}
                
                <div className="flex items-center gap-4 mb-4">
                   <div className={cn(
                     "h-12 w-12 rounded-2xl flex items-center justify-center font-black italic shadow-lg border-2 border-white/5",
                     side === 1 ? "bg-primary text-white" : "bg-muted text-primary"
                   )}>
                      {athlete.name[0]}
                   </div>
                   <h2 className="text-lg font-black uppercase italic tracking-tighter line-clamp-1">{athlete.name}</h2>
                </div>

                <div className="flex items-center gap-8">
                   <motion.span 
                      key={score[side-1]}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-8xl font-black font-mono leading-none tracking-tighter text-white"
                   >
                      {score[side-1]}
                   </motion.span>
                   <div className="flex flex-col gap-2">
                      {[...Array(Math.ceil((matchData.total_sets || 3)/2))].map((_, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "h-5 w-5 rounded-lg border-2",
                            i < setsWon[side-1] ? "bg-secondary border-secondary shadow-lg green-glow" : "bg-muted/20 border-white/5"
                          )} 
                        />
                      ))}
                   </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* FLOATING ACTION OVERLAY */}
      <AnimatePresence>
        {activeOverlay && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md p-6 flex flex-col justify-end"
          >
            <div className="bg-card border border-white/10 rounded-[3rem] p-8 space-y-8 shadow-2xl">
               <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Point Attribution</p>
                    <h3 className="text-2xl font-black uppercase italic">Shot Intelligence</h3>
                  </div>
                  <button onClick={() => setActiveOverlay(null)} className="p-3 bg-muted rounded-2xl"><X className="h-6 w-6" /></button>
               </div>

               <div className="grid grid-cols-1 gap-4">
                  <Button onClick={() => handlePoint(activeOverlay as 1 | 2, 'Smash')} className="h-20 rounded-2xl bg-primary text-white text-xl font-black uppercase tracking-widest gap-4">
                     <Zap className="h-8 w-8 fill-current" /> WINNER SMASH
                  </Button>
                  <div className="grid grid-cols-2 gap-4">
                     <Button onClick={() => handlePoint(activeOverlay as 1 | 2, 'Net')} className="h-20 rounded-2xl bg-card border border-white/5 text-secondary text-lg font-black uppercase tracking-widest gap-3">
                        <Target className="h-6 w-6" /> NET KILL
                     </Button>
                     <Button onClick={() => handlePoint(activeOverlay as 1 | 2, 'Error')} className="h-20 rounded-2xl bg-card border border-white/5 text-destructive text-lg font-black uppercase tracking-widest gap-3">
                        <AlertCircle className="h-6 w-6" /> OP. ERROR
                     </Button>
                  </div>
               </div>
               <Button onClick={() => handlePoint(activeOverlay as 1 | 2, 'Other')} variant="ghost" className="w-full text-muted-foreground font-black text-[10px] tracking-widest uppercase">Ignore Shot Detail • Regular Point</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER CONTROLS */}
      <footer className="fixed bottom-0 inset-x-0 bg-card border-t border-white/5 p-4 flex gap-4 h-20 items-center justify-around z-50">
          <Button onClick={undo} variant="outline" className="flex-1 h-12 rounded-xl border-white/5 bg-muted/50 font-black text-[10px] uppercase tracking-widest gap-2">
             <RotateCcw className="h-4 w-4" /> Undo
          </Button>
          <Button onClick={() => { if(confirm("Reset match?")) { setScore([0,0]); setSetsWon([0,0]); } }} variant="outline" className="flex-1 h-12 rounded-xl border-white/5 bg-muted/50 font-black text-[10px] uppercase tracking-widest gap-2">
             <RefreshCw className="h-4 w-4" /> Reset
          </Button>
          <Button onClick={finalizeMatch} className="flex-1 h-12 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-black text-[10px] uppercase tracking-widest gap-2">
             <StopCircle className="h-4 w-4" /> Finish
          </Button>
      </footer>

    </div>
  );
};

export default ScoringPage;