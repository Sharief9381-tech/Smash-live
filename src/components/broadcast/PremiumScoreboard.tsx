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

const PremiumScoreboard = ({ p1, p2, currentScore, serving }: ScoreboardProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10 space-y-8">
      <div className="flex items-center justify-center w-full max-w-5xl gap-12">
        {/* Player 1 */}
        <div className="flex-1 flex items-center justify-end gap-6 text-right">
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tighter uppercase italic">{p1.name}</h2>
            <div className="flex items-center justify-end gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>{p1.country}</span>
              <span className="text-xl">{p1.flag}</span>
            </div>
          </div>
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-slate-800 border-2 border-white/10 overflow-hidden shadow-2xl">
              <img src={`https://i.pravatar.cc/150?u=${p1.name}`} className="w-full h-full object-cover grayscale" />
            </div>
            {serving === 1 && (
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute -top-1 -right-1 h-5 w-5 bg-[#b6ff2a] rounded-full border-4 border-black shadow-[0_0_15px_#b6ff2a]"
              />
            )}
          </div>
        </div>

        {/* Live Score Display */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center">
              <span className="text-7xl font-black text-[#b6ff2a] font-mono tabular-nums leading-none tracking-tighter drop-shadow-[0_0_20px_rgba(182,255,42,0.3)]">
                {currentScore[0]}
              </span>
            </div>
            <div className="h-10 w-px bg-white/10 rotate-12" />
            <div className="flex flex-col items-center">
              <span className="text-7xl font-black text-white font-mono tabular-nums leading-none tracking-tighter">
                {currentScore[1]}
              </span>
            </div>
          </div>
          
          {/* Previous Sets */}
          <div className="flex gap-3">
            {p1.sets.map((set, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 flex gap-2">
                  <span className={cn("text-xs font-black", set > p2.sets[i] ? "text-[#b6ff2a]" : "text-slate-500")}>{set}</span>
                  <span className="text-xs font-black text-white/20">|</span>
                  <span className={cn("text-xs font-black", p2.sets[i] > set ? "text-[#b6ff2a]" : "text-slate-500")}>{p2.sets[i]}</span>
                </div>
                <span className="text-[8px] font-black text-slate-500 uppercase">SET {i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Player 2 */}
        <div className="flex-1 flex items-center justify-start gap-6 text-left">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-slate-800 border-2 border-white/10 overflow-hidden shadow-2xl">
              <img src={`https://i.pravatar.cc/150?u=${p2.name}`} className="w-full h-full object-cover grayscale" />
            </div>
            {serving === 2 && (
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute -top-1 -right-1 h-5 w-5 bg-[#b6ff2a] rounded-full border-4 border-black shadow-[0_0_15px_#b6ff2a]"
              />
            )}
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tighter uppercase italic">{p2.name}</h2>
            <div className="flex items-center justify-start gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span className="text-xl">{p2.flag}</span>
              <span>{p2.country}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumScoreboard;