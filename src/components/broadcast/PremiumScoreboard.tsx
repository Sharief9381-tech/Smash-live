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
  <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" />
    <path d="M10 14L7 6h10l-3 8" />
  </svg>
);

const PremiumScoreboard = ({ p1, p2, currentScore, serving }: ScoreboardProps) => {
  return (
    <div className="w-full h-full glass-panel rounded-[3rem] p-8 flex flex-col justify-center border-slate-200">
      <div className="flex items-center justify-between w-full">
        {/* Player 1 */}
        <div className="flex flex-col items-end gap-3 flex-1">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-slate-100 border-4 border-white overflow-hidden shadow-2xl">
              <img src={`https://i.pravatar.cc/150?u=${p1.name}`} className="w-full h-full object-cover" alt={p1.name} />
            </div>
            {serving === 1 && (
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 h-7 w-7 bg-sky-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
              >
                <ShuttleIcon />
              </motion.div>
            )}
          </div>
          <div className="text-right">
            <h2 className="text-xl font-black tracking-tighter uppercase italic text-[#0B1F3A]">{p1.name}</h2>
            <div className="flex items-center justify-end gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>{p1.country}</span>
              <span className="text-sm">{p1.flag}</span>
            </div>
          </div>
        </div>

        {/* Big Scores */}
        <div className="flex flex-col items-center px-12 gap-2">
          <div className="flex items-center gap-6">
            <span className="text-8xl font-black text-sky-600 font-mono tabular-nums leading-none tracking-tighter">
              {currentScore[0]}
            </span>
            <div className="h-16 w-1 bg-slate-100 rotate-12" />
            <span className="text-8xl font-black text-[#0B1F3A] font-mono tabular-nums leading-none tracking-tighter">
              {currentScore[1]}
            </span>
          </div>
          <div className="flex gap-2 mt-4">
            {p1.sets.map((set, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-1 flex gap-2 shadow-sm">
                <span className={cn("text-xs font-black", set > p2.sets[i] ? "text-sky-600" : "text-slate-400")}>{set}</span>
                <span className="text-xs font-black text-slate-200">|</span>
                <span className={cn("text-xs font-black", p2.sets[i] > set ? "text-sky-600" : "text-slate-400")}>{p2.sets[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Player 2 */}
        <div className="flex flex-col items-start gap-3 flex-1">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-slate-100 border-4 border-white overflow-hidden shadow-2xl">
              <img src={`https://i.pravatar.cc/150?u=${p2.name}`} className="w-full h-full object-cover" alt={p2.name} />
            </div>
            {serving === 2 && (
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 h-7 w-7 bg-sky-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
              >
                <ShuttleIcon />
              </motion.div>
            )}
          </div>
          <div className="text-left">
            <h2 className="text-xl font-black tracking-tighter uppercase italic text-[#0B1F3A]">{p2.name}</h2>
            <div className="flex items-center justify-start gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="text-sm">{p2.flag}</span>
              <span>{p2.country}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumScoreboard;