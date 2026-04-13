"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScoreboardProps {
  p1: { name: string; country: string; flag: string; sets: number[] };
  p2: { name: string; country: string; flag: string; sets: number[] };
  currentScore: [number, number];
  serving: 1 | 2;
  compact?: boolean;
}

const ShuttleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="currentColor" />
    <path d="M10 14L7 6h10l-3 8" />
  </svg>
);

const PremiumScoreboard = ({ p1, p2, currentScore, serving, compact }: ScoreboardProps) => {
  return (
    <div className="w-full flex flex-col gap-6 py-4">
      <div className="space-y-4">
        {/* Player 1 Row */}
        <div className="flex items-center justify-between max-w-md bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-14 w-14 rounded-full border-2 border-slate-100 overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${p1.name}`} className="w-full h-full object-cover" alt={p1.name} />
              </div>
              {serving === 1 && (
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-1 -right-1 h-6 w-6 bg-sky-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg"
                >
                  <ShuttleIcon />
                </motion.div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tighter uppercase italic text-[#0B1F3A]">{p1.name}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p1.country} {p1.flag}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-1.5">
              {p1.sets.map((s, i) => (
                <span key={i} className="text-[10px] font-black text-slate-300">{s}</span>
              ))}
            </div>
            <span className="text-4xl font-black text-sky-600 font-mono tabular-nums leading-none tracking-tighter">{currentScore[0]}</span>
          </div>
        </div>

        {/* Player 2 Row */}
        <div className="flex items-center justify-between max-w-md bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-14 w-14 rounded-full border-2 border-slate-100 overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${p2.name}`} className="w-full h-full object-cover" alt={p2.name} />
              </div>
              {serving === 2 && (
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-1 -right-1 h-6 w-6 bg-sky-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg"
                >
                  <ShuttleIcon />
                </motion.div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tighter uppercase italic text-[#0B1F3A]">{p2.name}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p2.country} {p2.flag}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-1.5">
              {p2.sets.map((s, i) => (
                <span key={i} className="text-[10px] font-black text-slate-300">{s}</span>
              ))}
            </div>
            <span className="text-4xl font-black text-[#0B1F3A] font-mono tabular-nums leading-none tracking-tighter">{currentScore[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumScoreboard;