"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronRight } from 'lucide-react';

interface BracketNodeProps {
  match: {
    id: string;
    team1: string;
    team2: string;
    score1?: number;
    score2?: number;
    winner?: 1 | 2;
    status: 'scheduled' | 'live' | 'completed';
    time?: string;
  };
}

const BracketNode = ({ match }: BracketNodeProps) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="relative group cursor-pointer"
    >
      <div className="glass-card rounded-xl overflow-hidden border-white/5 group-hover:border-primary/30 transition-all min-w-[200px]">
        {/* Match Header */}
        <div className="bg-secondary/30 px-3 py-1.5 flex justify-between items-center">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            {match.status === 'live' ? (
              <span className="flex items-center gap-1 text-red-500">
                <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse" />
                Live
              </span>
            ) : match.time}
          </span>
          <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>

        {/* Players */}
        <div className="p-3 space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`h-1.5 w-1.5 rounded-full ${match.winner === 1 ? 'bg-primary shadow-[0_0_8px_rgba(182,255,42,0.5)]' : 'bg-white/10'}`} />
              <span className={`text-sm font-medium ${match.winner === 1 ? 'text-white' : 'text-muted-foreground'}`}>
                {match.team1}
              </span>
            </div>
            {match.score1 !== undefined && (
              <span className={`text-sm font-bold ${match.winner === 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                {match.score1}
              </span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`h-1.5 w-1.5 rounded-full ${match.winner === 2 ? 'bg-primary shadow-[0_0_8px_rgba(182,255,42,0.5)]' : 'bg-white/10'}`} />
              <span className={`text-sm font-medium ${match.winner === 2 ? 'text-white' : 'text-muted-foreground'}`}>
                {match.team2}
              </span>
            </div>
            {match.score2 !== undefined && (
              <span className={`text-sm font-bold ${match.winner === 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                {match.score2}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Connector line for brackets */}
      <div className="absolute top-1/2 -right-4 w-4 h-px bg-white/10 group-hover:bg-primary/30 transition-colors hidden md:block" />
    </motion.div>
  );
};

export default BracketNode;