"use client";

import React from 'react';
import { Activity, Zap, Target, Timer, Flame, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const MatchStatGrid = () => {
  const stats = [
    { label: "Total Rallies", val: "84", icon: Activity, color: "text-sky-500" },
    { label: "Longest Rally", val: "42s", icon: Timer, color: "text-amber-500" },
    { label: "Smash Winners", val: "18", icon: Zap, color: "text-[#b6ff2a]" },
    { label: "Net Kill Accuracy", val: "92%", icon: Target, color: "text-purple-500" },
    { label: "Service Faults", val: "2", icon: AlertTriangle, color: "text-red-500" },
    { label: "Unforced Errors", val: "14", icon: Flame, color: "text-orange-500" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <motion.div 
          key={i}
          whileHover={{ y: -5 }}
          className="bg-white/5 border border-white/5 p-6 rounded-[2.5rem] space-y-4 hover:border-[#b6ff2a]/20 transition-all"
        >
          <div className="flex items-center justify-between">
            <div className={cn("h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center", stat.color)}>
              <stat.icon className="h-5 w-5" />
            </div>
            <TrendingUp className="h-3 w-3 text-white/20" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
            <h4 className="text-3xl font-black text-white tracking-tighter mt-1">{stat.val}</h4>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MatchStatGrid;