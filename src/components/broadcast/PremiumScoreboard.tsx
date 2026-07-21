"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';

interface ScoreboardProps {
  p1: { name: string; country: string; flag: string; sets: number[] };
  p2: { name: string; country: string; flag: string; sets: number[] };
  currentScore: [number, number];
  serving: 1 | 2;
}

const PremiumScoreboard = ({ p1, p2, currentScore, serving }: ScoreboardProps) => {
  return (
    <div className="w-full relative group">
      {/* Decorative Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="relative app-card p-6 border-white/5 overflow-hidden">
        <div className="flex items-center justify-between gap-4">
          
          {/* Player 1 Area */}
          <div className="flex flex-col items-center gap-3 flex-1">
            <div className="relative">
              <div className={cn(
                "h-16 w-16 rounded-full border-2 transition-all duration-500 flex items-center justify-center font-black text-lg shadow-2xl",
                serving === 1 ? "border-sky-500 bg-sky-500/10 text-sky-500" : "border-border bg-muted/30 text-muted-foreground"
              )}>
                {p1.name[0]}
              </div>
              {serving === 1 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-6 w-6 bg-sky-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.5)]"
                >
                  <Zap className="h-3 w-3 text-white fill-current" />
                </motion.div>
              )}
            </div>
            <div className="text-center space-y-0.5">
              <h2 className="text-[13px] font-black uppercase italic truncate max-w-[100px]">{p1.name}</h2>
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{p1.country}</p>
            </div>
          </div>

          {/* Center Score Matrix */}
          <div className="flex flex-col items-center px-4 py-2 bg-slate-900/50 rounded-3xl border border-white/5">
            <div className="flex items-center gap-5">
              <motion.span 
                key={currentScore[0]}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-6xl font-black text-sky-500 font-mono tracking-tighter"
              >
                {currentScore[0]}
              </motion.span>
              <div className="h-10 w-0.5 bg-slate-800 rotate-[20deg]" />
              <motion.span 
                key={currentScore[1]}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-6xl font-black text-foreground font-mono tracking-tighter"
              >
                {currentScore[1]}
              </motion.span>
            </div>
            
            <div className="flex gap-1.5 mt-4">
              {p1.sets.map((set, i) => (
                <div key={i} className="flex gap-2 items-center px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                  <span className={cn("text-[11px] font-black", set > (p2.sets[i] || 0) ? "text-sky-400" : "text-muted-foreground")}>{set}</span>
                  <span className="text-[9px] font-black opacity-20">/</span>
                  <span className={cn("text-[11px] font-black", (p2.sets[i] || 0) > set ? "text-sky-400" : "text-muted-foreground")}>{p2.sets[i] || 0}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Player 2 Area */}
          <div className="flex flex-col items-center gap-3 flex-1">
            <div className="relative">
              <div className={cn(
                "h-16 w-16 rounded-full border-2 transition-all duration-500 flex items-center justify-center font-black text-lg shadow-2xl",
                serving === 2 ? "border-sky-500 bg-sky-500/10 text-sky-500" : "border-border bg-muted/30 text-muted-foreground"
              )}>
                {p2.name[0]}
              </div>
              {serving === 2 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-6 w-6 bg-sky-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.5)]"
                >
                  <Zap className="h-3 w-3 text-white fill-current" />
                </motion.div>
              )}
            </div>
            <div className="text-center space-y-0.5">
              <h2 className="text-[13px] font-black uppercase italic truncate max-w-[100px]">{p2.name}</h2>
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{p2.country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumScoreboard;