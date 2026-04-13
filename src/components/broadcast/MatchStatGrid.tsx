"use client";

import React from 'react';
import { Activity, Zap, Target, Timer, Flame, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const MatchStatGrid = () => {
  const stats = [
    { label: "Total Rallies", val: "84", icon: Activity, color: "text-sky-500", bg: "bg-sky-50" },
    { label: "Longest Rally", val: "42s", icon: Timer, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Smash Winners", val: "18", icon: Zap, color: "text-sky-600", bg: "bg-sky-50" },
    { label: "Net Kill Accuracy", val: "92%", icon: Target, color: "text-indigo-500", bg: "bg-indigo-50" },
    { label: "Service Faults", val: "2", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" },
    { label: "Unforced Errors", val: "14", icon: Flame, color: "text-orange-500", bg: "bg-orange-50" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <motion.div 
          key={i}
          whileHover={{ y: -8 }}
          className="bg-white border border-slate-100 p-8 rounded-[3rem] space-y-6 hover:border-sky-500/30 transition-all shadow-sm group"
        >
          <div className="flex items-center justify-between">
            <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
              <stat.icon className="h-7 w-7" />
            </div>
            <TrendingUp className="h-4 w-4 text-slate-200 group-hover:text-sky-500 transition-colors" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <h4 className="text-4xl font-black text-[#0B1F3A] tracking-tighter mt-1">{stat.val}</h4>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MatchStatGrid;