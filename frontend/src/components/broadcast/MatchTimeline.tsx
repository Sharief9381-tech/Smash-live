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
    { score: "7-4", winner: 1, type: "Smash" },
    { score: "8-4", winner: 1, type: "Net" },
  ];

  return (
    <div className="space-y-4 w-full h-full flex flex-col justify-center">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[10px] font-black text-[#0B1F3A] uppercase tracking-[0.2em] italic">Intelligence Timeline</h3>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Progression</span>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide items-center">
        {points.map((p, i) => (
          <div key={i} className="flex flex-col items-center gap-3 shrink-0">
            <div className={cn(
              "h-14 w-16 rounded-2xl flex flex-col items-center justify-center border transition-all shadow-sm",
              p.winner === 1 
                ? "bg-sky-500 text-white border-sky-600 shadow-sky-500/20" 
                : "bg-white text-[#0B1F3A] border-slate-100"
            )}>
              <span className="text-xs font-black leading-none">{p.score}</span>
              <span className={cn("text-[7px] font-black uppercase mt-1", p.winner === 1 ? "opacity-80" : "opacity-40")}>{p.type}</span>
            </div>
            <div className={cn("h-1.5 w-1.5 rounded-full", p.winner === 1 ? "bg-sky-500" : "bg-slate-200")} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchTimeline;