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
    <div className="w-full flex flex-col items-start justify-center py-10 space-y-8">
      <div className="flex items-center justify-start w-full max-w-4xl gap-8">
        {/* Player 1 */}
        <div className="flex items-center justify-end gap-4 text-right">
          <div className="space-y-0.5">
            <h2 className="text-lg font-black tracking-tight uppercase italic text-[#0B1F3A]">{p1.name}</h2>
            <div className="flex items-center justify-end gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>{p1.country}</span>
              <span className="text-sm">{p1.flag}</span>
            </div>
          </div>
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-slate-100 border-2 border-white overflow-hidden shadow-lg">
              <img src={`https://i.pravatar.cc/150?u=${p1.name}`} className="w-full h-full object-cover" alt={p1.name} />
            </div>
            {serving === 1 && (
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 h-6 w-6 bg-sky-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
              >
                <ShuttleIcon />
              </motion.div>
            )}
          </div>
        </div>

        {/* Live Score Display */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <span className="text-6xl font-black text-sky-600 font-mono tabular-nums leading-none tracking-tighter">
              {currentScore[0]}
            </span>
            <div className="h-8 w-px bg-slate-200 rotate-12" />
            <span className="text-6xl font-black text-[#0B1F3A] font-mono tabular-nums leading-none tracking-tighter">
              {currentScore[1]}
            </span>
          </div>
          
          {/* Previous Sets */}
          <div className="flex gap-2">
            {p1.sets.map((set, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="bg-white border border-slate-100 rounded-lg px-2.5 py-1 flex gap-2 shadow-sm">
                  <span className={cn("text-[10px] font-black", set > p2.sets[i] ? "text-sky-600" : "text-slate-400")}>{set}</span>
                  <span className="text-[10px] font-black text-slate-100">|</span>
                  <span className={cn("text-[10px] font-black", p2.sets[i] > set ? "text-sky-600" : "text-slate-400")}>{p2.sets[i]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Player 2 */}
        <div className="flex items-center justify-start gap-4 text-left">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-slate-100 border-2 border-white overflow-hidden shadow-lg">
              <img src={`https://i.pravatar.cc/150?u=${p2.name}`} className="w-full h-full object-cover" alt={p2.name} />
            </div>
            {serving === 2 && (
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 h-6 w-6 bg-sky-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
              >
                <ShuttleIcon />
              </motion.div>
            )}
          </div>
          <div className="space-y-0.5">
            <h2 className="text-lg font-black tracking-tight uppercase italic text-[#0B1F3A]">{p2.name}</h2>
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