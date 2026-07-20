"use client";

import React from 'react';
import { Zap, Activity, Target, Flame, TrendingUp, Award, Clock, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  { label: "Matches", value: "84", icon: Activity, color: "text-sky-500" },
  { label: "Wins", value: "62", icon: Award, color: "text-sky-600" },
  { label: "Losses", value: "22", icon: Target, color: "text-red-400" },
  { label: "Win %", value: "73.8%", icon: Zap, color: "text-amber-500" },
  { label: "Streak", value: "4W", icon: Flame, color: "text-orange-500" },
  { label: "Points", value: "1,240", icon: BarChart2, color: "text-indigo-500" },
  { label: "Smashes", value: "248", icon: Zap, color: "text-sky-400" },
  { label: "Rallies", value: "15.2s", icon: Clock, color: "text-slate-400" },
];

const PerformanceStats = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm space-y-2 hover:border-sky-500/20 transition-all">
          <div className="flex items-center gap-2">
            <div className={cn("p-1.5 rounded-lg bg-slate-50", stat.color)}>
              <stat.icon className="h-3.5 w-3.5" />
            </div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
          </div>
          <p className="text-[18px] font-black text-[#0B1F3A] italic leading-none">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default PerformanceStats;