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
    <div className="space-y-8">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-sm font-black text-[#0B1F3A] uppercase tracking-[0.2em] italic">Match Timeline</h3>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Set 2 Progression</span>
      </div>
      
      <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide px-2">
        {points.map((p, i) => (
          <div key={i} className="flex flex-col items-center gap-4 shrink-0">
            <div className={cn(
              "h-16 w-16 rounded-[1.5rem] flex flex-col items-center justify-center border transition-all",
              p.winner === 1 
                ? "bg-sky-500 text-white border-sky-600 shadow-xl shadow-sky-500/20" 
                : "bg-white text-[#0B1F3A] border-slate-100 shadow-sm"
            )}>
              <span className="text-sm font-black">{p.score}</span>
              <span className={cn("text-[8px] font-bold uppercase", p.winner === 1 ? "opacity-70" : "opacity-40")}>{p.type}</span>
            </div>
            <div className={cn("h-1.5 w-1.5 rounded-full", p.winner === 1 ? "bg-sky-500" : "bg-slate-200")} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchTimeline;