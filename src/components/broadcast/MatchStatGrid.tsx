"use client";

import React from 'react';
import { Activity, Zap, Target, Timer, Flame, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MatchStatGridProps {
  stats?: {
    rallies?: string | number;
    longestRally?: string;
    winners?: string | number;
    accuracy?: string;
    faults?: string | number;
    errors?: string | number;
  };
}

const MatchStatGrid = ({ stats }: MatchStatGridProps) => {
  const displayStats = [
    { label: "Rallies", val: stats?.rallies || "0", icon: Activity, color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-500/10" },
    { label: "Peak Rally", val: stats?.longestRally || "0s", icon: Timer, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
    { label: "Winners", val: stats?.winners || "0", icon: Zap, color: "text-sky-600", bg: "bg-sky-50 dark:bg-sky-500/10" },
    { label: "Net Accuracy", val: stats?.accuracy || "0%", icon: Target, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
    { label: "Faults", val: stats?.faults || "0", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10" },
    { label: "Errors", val: stats?.errors || "0", icon: Flame, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {displayStats.map((stat, i) => (
        <motion.div 
          key={i}
          whileHover={{ y: -2 }}
          className="bg-card border border-border p-4 rounded-2xl space-y-3 hover:border-sky-500/30 transition-all shadow-sm group"
        >
          <div className="flex items-center justify-between">
            <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform", stat.bg, stat.color)}>
              <stat.icon className="h-4 w-4" />
            </div>
            <span className="text-[7px] font-black text-muted-foreground group-hover:text-sky-500 uppercase tracking-widest">Live</span>
          </div>
          <div>
            <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
            <h4 className="text-xl font-black italic tracking-tighter mt-0.5">{stat.val}</h4>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MatchStatGrid;