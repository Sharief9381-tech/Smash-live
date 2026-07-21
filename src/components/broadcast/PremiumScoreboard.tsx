"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScoreboardProps {
  p1: { name: string; country: string; flag: string; sets: number[] };
  p2: { name: string; country: string; flag: string; sets: number[] };
  currentScore: [number, number];
  serving: 1 | 2;
}

const ShuttleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" />
    <path d="M10 14L7 6h10l-3 8" />
  </svg>
);

const PremiumScoreboard = ({ p1, p2, currentScore, serving }: ScoreboardProps) => {
  return (
    <div className="w-full glass-panel rounded-[2.5rem] p-6 border bg-card shadow-2xl shadow-black/10">
      <div className="flex items-center justify-between gap-2">
        {/* Player 1 Profile */}
        <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-muted border-2 border-background overflow-hidden shadow-lg flex items-center justify-center">
               <span className="text-sm font-black text-foreground uppercase">{p1.name[0]}</span>
            </div>
            {serving === 1 && (
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute -top-1 -right-1 h-7 w-7 bg-sky-500 rounded-full border-2 border-background shadow-lg flex items-center justify-center"
              >
                <ShuttleIcon />
              </motion.div>
            )}
          </div>
          <div className="text-center w-full">
            <h2 className="text-[11px] font-black tracking-tighter uppercase italic text-foreground leading-tight truncate">{p1.name}</h2>
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{p1.country}</p>
          </div>
        </div>

        {/* Dynamic Score Matrix */}
        <div className="flex flex-col items-center px-4">
          <div className="flex items-center gap-4">
            <motion.span 
              key={currentScore[0]}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl font-black text-sky-500 font-mono tabular-nums leading-none tracking-tighter"
            >
              {currentScore[0]}
            </motion.span>
            <div className="h-10 w-0.5 bg-border rotate-[15deg] rounded-full opacity-50" />
            <motion.span 
              key={currentScore[1]}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl font-black text-foreground font-mono tabular-nums leading-none tracking-tighter"
            >
              {currentScore[1]}
            </motion.span>
          </div>
          
          <div className="flex gap-1.5 mt-4">
            {p1.sets.map((set, i) => (
              <div key={i} className="bg-muted/50 border border-border/50 rounded-xl px-3 py-1 flex gap-3 items-center">
                <span className={cn("text-[10px] font-black", set > p2.sets[i] ? "text-sky-500" : "text-muted-foreground")}>{set}</span>
                <span className="text-[10px] font-black opacity-10">/</span>
                <span className={cn("text-[10px] font-black", p2.sets[i] > set ? "text-sky-500" : "text-muted-foreground")}>{p2.sets[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Player 2 Profile */}
        <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-muted border-2 border-background overflow-hidden shadow-lg flex items-center justify-center">
               <span className="text-sm font-black text-foreground uppercase">{p2.name[0]}</span>
            </div>
            {serving === 2 && (
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute -top-1 -right-1 h-7 w-7 bg-sky-500 rounded-full border-2 border-background shadow-lg flex items-center justify-center"
              >
                <ShuttleIcon />
              </motion.div>
            )}
          </div>
          <div className="text-center w-full">
            <h2 className="text-[11px] font-black tracking-tighter uppercase italic text-foreground leading-tight truncate">{p2.name}</h2>
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{p2.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumScoreboard;