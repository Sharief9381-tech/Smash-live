"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, Target, Flame, TrendingUp, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  { label: "Matches", value: "0", icon: Activity, color: "text-sky-500" },
  { label: "Wins", value: "0", icon: Award, color: "text-sky-600" },
  { label: "Losses", value: "0", icon: Target, color: "text-red-400" },
  { label: "Win %", value: "0%", icon: Zap, color: "text-amber-500" },
];

const PerformanceStats = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm space-y-2">
          <div className="flex items-center gap-2">
            <div className={cn("p-1.5 rounded-lg bg-slate-50", stat.color)}>
              <stat.icon className="h-3.5 w-3.5" />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
          </div>
          <p className="text-[18px] font-black text-[#0B1F3A] italic">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default PerformanceStats;