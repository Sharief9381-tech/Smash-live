import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScoreOverlayProps {
  player1: string;
  player2: string;
  score1: number;
  score2: number;
  sets1: number[];
  sets2: number[];
  server: 1 | 2;
  title: string;
}

const ScoreOverlay = ({ player1, player2, score1, score2, sets1, sets2, server, title }: ScoreOverlayProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-6 left-6 z-20 flex flex-col gap-1 pointer-events-none"
    >
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden flex items-stretch">
        <div className="bg-primary/90 px-3 py-1.5 flex items-center justify-center">
          <span className="text-[10px] font-black text-black uppercase tracking-widest">LIVE</span>
        </div>
        <div className="px-3 py-1.5 flex items-center">
          <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{title}</span>
        </div>
      </div>

      <div className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-xl overflow-hidden min-w-[280px]">
        {/* Player 1 Row */}
        <div className="flex items-center justify-between p-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className={cn("h-2 w-2 rounded-full", server === 1 ? "bg-primary shadow-[0_0_8px_#b6ff2a]" : "bg-transparent")} />
            <span className="text-sm font-black text-white uppercase tracking-tight">{player1}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              {sets1.map((s, i) => (
                <span key={i} className="text-[10px] font-bold text-muted-foreground w-4 text-center">{s}</span>
              ))}
            </div>
            <span className="text-xl font-black text-primary font-mono tabular-nums min-w-[1.5rem] text-center">{score1}</span>
          </div>
        </div>

        {/* Player 2 Row */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <div className={cn("h-2 w-2 rounded-full", server === 2 ? "bg-primary shadow-[0_0_8px_#b6ff2a]" : "bg-transparent")} />
            <span className="text-sm font-black text-white uppercase tracking-tight">{player2}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              {sets2.map((s, i) => (
                <span key={i} className="text-[10px] font-bold text-muted-foreground w-4 text-center">{s}</span>
              ))}
            </div>
            <span className="text-xl font-black text-white font-mono tabular-nums min-w-[1.5rem] text-center">{score2}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreOverlay;