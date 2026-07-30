"use client";

import React, { useEffect, useState } from 'react';
import { Target, Trophy, Zap, User } from 'lucide-react';
import { motion } from 'framer-motion';

const PlayerBroadcastStats = () => {
  const [stats, setStats] = useState({ name: "Athlete", matches: 0, tourneys: 0 });

  useEffect(() => {
    const loadStats = () => {
      const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      const matches = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
      const tourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      
      setStats({
        name: profile.name || "Athlete",
        matches: matches.length,
        tourneys: tourneys.length
      });
    };

    loadStats();
    window.addEventListener('storage', loadStats);
    return () => window.removeEventListener('storage', loadStats);
  }, []);

  return (
    <div className="glass-panel p-10 rounded-[3.5rem] border-slate-200 bg-white space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-600">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#0B1F3A] italic uppercase">Personal Studio Pulse</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stats.name}'s Active Session</p>
          </div>
        </div>
        <Zap className="h-5 w-5 text-amber-500 fill-current" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex flex-col items-center text-center gap-4 group"
        >
          <div className="h-16 w-16 rounded-full bg-white shadow-sm flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500">
            <Target className="h-8 w-8" />
          </div>
          <div>
            <p className="text-4xl font-black text-[#0B1F3A] tracking-tighter">{stats.matches}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Matches Initialized</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex flex-col items-center text-center gap-4 group"
        >
          <div className="h-16 w-16 rounded-full bg-white shadow-sm flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
            <Trophy className="h-8 w-8" />
          </div>
          <div>
            <p className="text-4xl font-black text-[#0B1F3A] tracking-tighter">{stats.tourneys}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tournaments Hosted</p>
          </div>
        </motion.div>
      </div>

      <div className="bg-[#0B1F3A] p-6 rounded-[2rem] text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Studio Protocol: Live</span>
        </div>
        <span className="text-[10px] font-bold text-sky-400 uppercase">Operational Node active</span>
      </div>
    </div>
  );
};

export default PlayerBroadcastStats;