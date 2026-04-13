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
  <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" />
    <path d="M10 14L7 6h10l-3 8" />
  </svg>
);

const PremiumScoreboard = ({ p1, p2, currentScore, serving }: ScoreboardProps) => {
  return (
    <div className="w-full h-full glass-panel rounded-[3rem] p-10 flex flex-col justify-center border-slate-200 bg-white">
      <div className="flex items-center justify-between w-full">
        {/* Player 1 Profile */}
        <div className="flex flex-col items-end gap-4 flex-1">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-slate-100 border-4 border-white overflow-hidden shadow-2xl">
              <img src={`https://i.pravatar.cc/150?u=${p1.name}`} className="w-full h-full object-cover" alt={p1.name} />
            </div>
            {serving === 1 && (
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-2 -right-2 h-9 w-9 bg-sky-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
              >
                <ShuttleIcon />
              </motion.div>
            )}
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-black tracking-tighter uppercase italic text-[#0B1F3A] leading-none">{p1.name}</h2>
            <div className="flex items-center justify-end gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              <span>{p1.country}</span>
              <span className="text-lg">{p1.flag}</span>
            </div>
          </div>
        </div>

        {/* Massive Score Matrix */}
        <div className="flex flex-col items-center px-14 gap-4">
          <div className="flex items-center gap-8">
            <motion.span 
              key={currentScore[0]}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-9xl font-black text-sky-600 font-mono tabular-nums leading-none tracking-tighter"
            >
              {currentScore[0]}
            </motion.span>
            <div className="h-24 w-1.5 bg-slate-100 rotate-12 rounded-full" />
            <motion.span 
              key={currentScore[1]}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-9xl font-black text-[#0B1F3A] font-mono tabular-nums leading-none tracking-tighter"
            >
              {currentScore[1]}
            </motion.span>
          </div>
          
          <div className="flex gap-3 mt-4">
            {p1.sets.map((set, i) => (
              <div key={i} className="bg-[#0B1F3A] text-white rounded-xl px-4 py-2 flex gap-3 items-center shadow-xl border border-white/10">
                <span className={cn("text-sm font-black", set > p2.sets[i] ? "text-sky-400" : "text-white/60")}>{set}</span>
                <span className="text-xs font-black opacity-20">/</span>
                <span className={cn("text-sm font-black", p2.sets[i] > set ? "text-sky-400" : "text-white/60")}>{p2.sets[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Player 2 Profile */}
        <div className="flex flex-col items-start gap-4 flex-1">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-slate-100 border-4 border-white overflow-hidden shadow-2xl">
              <img src={`https://i.pravatar.cc/150?u=${p2.name}`} className="w-full h-full object-cover" alt={p2.name} />
            </div>
            {serving === 2 && (
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-2 -right-2 h-9 w-9 bg-sky-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
              >
                <ShuttleIcon />
              </motion.div>
            )}
          </div>
          <div className="text-left">
            <h2 className="text-2xl font-black tracking-tighter uppercase italic text-[#0B1F3A] leading-none">{p2.name}</h2>
            <div className="flex items-center justify-start gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              <span className="text-lg">{p2.flag}</span>
              <span>{p2.country}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumScoreboard;