"use client";

import React from 'react';
import { motion } from 'framer-motion';

const TournamentBracket = () => {
  const rounds = [
    {
      name: "Quarter Finals",
      matches: [
        { t1: "Viktor Axelsen", t2: "Lee Zii Jia", s1: 2, s2: 0, status: "completed" },
        { t1: "Shi Yuqi", t2: "Anders Antonsen", s1: 1, s2: 2, status: "completed" },
        { t1: "Kodai Naraoka", t2: "Jonatan Christie", s1: 0, s2: 0, status: "live" },
        { t1: "Kunlavut Vitidsarn", t2: "Prannoy H.S.", s1: 0, s2: 0, status: "upcoming" }
      ]
    },
    {
      name: "Semi Finals",
      matches: [
        { t1: "Viktor Axelsen", t2: "Anders Antonsen", status: "upcoming" },
        { t1: "TBD", t2: "TBD", status: "upcoming" }
      ]
    },
    {
      name: "Finals",
      matches: [
        { t1: "TBD", t2: "TBD", status: "upcoming" }
      ]
    }
  ];

  return (
    <div className="flex gap-8 p-4 overflow-x-auto scrollbar-hide">
      {rounds.map((round, rIdx) => (
        <div key={rIdx} className="flex flex-col gap-12 min-w-[240px]">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest text-center">{round.name}</h4>
          <div className="flex flex-col justify-around flex-1 gap-8">
            {round.matches.map((match, mIdx) => (
              <motion.div 
                key={mIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: rIdx * 0.2 + mIdx * 0.1 }}
                className={`glass-card p-4 rounded-xl relative ${match.status === 'live' ? 'border-primary ring-1 ring-primary/20' : 'border-white/5'}`}
              >
                {match.status === 'live' && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-[8px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">LIVE</div>
                )}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className={`text-sm truncate ${match.s1 > match.s2 ? 'text-primary font-bold' : 'text-foreground'}`}>{match.t1}</span>
                    <span className="font-mono font-bold text-primary">{match.s1 || 0}</span>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div className="flex items-center justify-between gap-4">
                    <span className={`text-sm truncate ${match.s2 > match.s1 ? 'text-primary font-bold' : 'text-foreground'}`}>{match.t2}</span>
                    <span className="font-mono font-bold text-primary">{match.s2 || 0}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TournamentBracket;