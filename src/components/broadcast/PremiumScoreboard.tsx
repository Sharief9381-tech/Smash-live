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
            <h2 className="text-3xl font-black tracking-tighter uppercase italic text-[#0B1F3A]">{p1.name}</h2>
            <div className="flex items-center justify-end gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>{p1.country}</span>
              <span className="text-xl">{p1.flag}</span>
            </div>
          </div>
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-slate-100 border-4 border-white overflow-hidden shadow-2xl">
              <img src={`https://i.pravatar.cc/150?u=${p1.name}`} className="w-full h-full object-cover" />
            </div>
            {serving === 1 && (
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute -top-1 -right-1 h-6 w-6 bg-sky-500 rounded-full border-4 border-white shadow-xl"
              />
            )}
          </div>
        </div>

        {/* Live Score Display */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-8xl font-black text-sky-600 font-mono tabular-nums leading-none tracking-tighter">
                {currentScore[0]}
              </span>
            </div>
            <div className="h-12 w-px bg-slate-200 rotate-12" />
            <div className="flex flex-col items-center">
              <span className="text-8xl font-black text-[#0B1F3A] font-mono tabular-nums leading-none tracking-tighter">
                {currentScore[1]}
              </span>
            </div>
          </div>
          
          {/* Previous Sets */}
          <div className="flex gap-4">
            {p1.sets.map((set, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="bg-white border border-slate-100 rounded-xl px-4 py-1.5 flex gap-3 shadow-sm">
                  <span className={cn("text-xs font-black", set > p2.sets[i] ? "text-sky-600" : "text-slate-400")}>{set}</span>
                  <span className="text-xs font-black text-slate-100">|</span>
                  <span className={cn("text-xs font-black", p2.sets[i] > set ? "text-sky-600" : "text-slate-400")}>{p2.sets[i]}</span>
                </div>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">SET {i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Player 2 */}
        <div className="flex-1 flex items-center justify-start gap-6 text-left">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-slate-100 border-4 border-white overflow-hidden shadow-2xl">
              <img src={`https://i.pravatar.cc/150?u=${p2.name}`} className="w-full h-full object-cover" />
            </div>
            {serving === 2 && (
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute -top-1 -right-1 h-6 w-6 bg-sky-500 rounded-full border-4 border-white shadow-xl"
              />
            )}
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tighter uppercase italic text-[#0B1F3A]">{p2.name}</h2>
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