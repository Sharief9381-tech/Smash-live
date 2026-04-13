"use client";

import React from 'react';
import { cn } from '@/lib/utils';

const MatchTimeline = () => {
  const points = [
    { score: "1-0", winner: 1, type: "Smash" },
    { score: "1-1", winner: 2, type: "Error" },
    { score: "2-1", winner: 1, type: "Net" },
    { score: "3-1", winner: 1, type: "Smash" },
    { score: "3-2", winner: 2, type: "Fault" },
    { score: "4-2", winner: 1, type: "Highlight" },
    { score: "5-2", winner: 1, type: "Smash" },
    { score: "5-3", winner: 2, type: "Error" },
    { score: "6-3", winner: 1, type: "Smash" },
    { score: "6-4", winner: 2, type: "Net" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] italic">Match Timeline</h3>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Set 2 Progression</span>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide px-2">
        {points.map((p, i) => (
          <div key={i} className="flex flex-col items-center gap-3 shrink-0">
            <div className={cn(
              "h-14 w-14 rounded-2xl flex flex-col items-center justify-center border transition-all",
              p.winner === 1 
                ? "bg-[#b6ff2a]/10 border-[#b6ff2a]/30 shadow-[0_0_20px_rgba(182,255,42,0.1)]" 
                : "bg-white/5 border-white/10"
            )}>
              <span className={cn("text-sm font-black", p.winner === 1 ? "text-[#b6ff2a]" : "text-white")}>{p.score}</span>
              <span className="text-[8px] font-bold uppercase opacity-40">{p.type}</span>
            </div>
            <div className={cn("h-1 w-1 rounded-full", p.winner === 1 ? "bg-[#b6ff2a]" : "bg-white/20")} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchTimeline;