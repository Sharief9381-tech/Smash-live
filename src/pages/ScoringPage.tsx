"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { 
  Zap, RotateCcw, Target, RefreshCw, 
  StopCircle, AlertCircle, X, ChevronLeft
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
  
  const [score, setScore] = useState<[number, number]>([0, 0]);
  const [setsWon, setSetsWon] = useState<[number, number]>([0, 0]);
  const [serving, setServing] = useState<1 | 2>(1);
  const [activeOverlay, setActiveOverlay] = useState<1 | 2 | null>(null);
  const [pointHistory, setPointHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchMatch = async () => {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .eq('id', matchId)
        .single();
      
      if (data) {
        setMatchData(data);
        if (data.current_score) setScore(data.current_score);
        if (data.sets_won) setSetsWon(data.sets_won);
        if (data.serving) setServing(data.serving);
      }
    };

    fetchMatch();
  }, [matchId]);

  // Real-time Cloud Sync
  useEffect(() => {
    if (matchId) {
      const updateCloud = async () => {
        await supabase
          .from('matches')
          .update({
            current_score: score,
            sets_won: setsWon,
            serving: serving,
            last_updated: new Date().toISOString()
          })
          .eq('id', matchId);
      };
      updateCloud();
    }
  }, [score, setsWon, serving, matchId]);

  const handlePoint = (side: 1 | 2, type: string) => {
    const newScore = [...score] as [number, number];
    newScore[side - 1] += 1;
    setScore(newScore);
    setServing(side);
    setActiveOverlay(null);
  };

  if (!matchData) return <div className="h-screen flex items-center justify-center font-black uppercase italic text-slate-300">Synchronizing Match Intel...</div>;

  return (
    <div className="h-screen w-full bg-slate-50 text-[#0B1F3A] flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1 container max-w-4xl flex flex-col p-6 gap-6 justify-center">
        <div className="flex items-center justify-between mb-4">
          <Button onClick={() => navigate('/broadcast/center')} variant="ghost" className="rounded-2xl h-12 px-6 font-black text-[10px] uppercase tracking-widest border border-slate-100 hover:bg-white">
            <ChevronLeft className="mr-2 h-4 w-4" /> Studio Dashboard
          </Button>
          <div className="flex items-center gap-3">
             <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Broadcasting Match: {matchData.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {[1, 2].map((side) => (
            <div key={side} className={cn("rounded-[3.5rem] p-12 flex flex-col items-center justify-center border relative bg-white transition-all", serving === side && "ring-4 ring-sky-500/10 border-sky-500 shadow-2xl")}>
              <h2 className="text-xl font-black uppercase italic text-center mb-4">{side === 1 ? matchData.player1 : matchData.player2}</h2>
              <span className="text-[8rem] font-black font-mono leading-none text-sky-600">{score[side-1]}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          {[1, 2].map((side) => (
            <Button key={side} onClick={() => handlePoint(side as 1 | 2, 'Point')} className="h-28 rounded-[2.5rem] bg-sky-500 text-white font-black text-4xl shadow-xl">
              +1 POINT
            </Button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ScoringPage;