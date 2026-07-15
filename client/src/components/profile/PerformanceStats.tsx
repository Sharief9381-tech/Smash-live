"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, Target, Flame, TrendingUp, Award } from 'lucide-react';

const stats = [
  { label: "Matches Played", value: "842", icon: Activity, color: "text-sky-500" },
  { label: "Total Wins", value: "744", icon: Award, color: "text-sky-600" },
  { label: "Total Losses", value: "98", icon: Target, color: "text-red-400" },
  { label: "Win Rate", value: "88.4%", icon: Zap, color: "text-amber-500" },
  { label: "Sets Won", value: "1,520", icon: TrendingUp, color: "text-sky-500" },
  { label: "Sets Lost", value: "242", icon: Target, color: "text-red-400" },
  { label: "Current Streak", value: "14W", icon: Flame, color: "text-orange-500" },
  { label: "Points Scored", value: "32,410", icon: Activity, color: "text-sky-600" },
];

const PerformanceStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -5, scale: 1.02 }}
          className="glass-panel p-6 rounded-[2rem] border-slate-200 relative overflow-hidden group cursor-pointer"
        >
          <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${stat.color}`}>
            <stat.icon className="h-12 w-12" />
          </div>
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl bg-slate-50 ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </div>
            
            <h3 className={`text-3xl font-black tracking-tighter text-[#0B1F3A] group-hover:${stat.color} transition-colors`}>
              {stat.value}
            </h3>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 bg-sky-500 opacity-50" />
        </motion.div>
      ))}
    </div>
  );
};

export default PerformanceStats;