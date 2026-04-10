"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, Target, Flame, TrendingUp, Award } from 'lucide-react';

const stats = [
  { label: "Matches Played", value: "842", icon: Activity, color: "text-[#00f2ff]" },
  { label: "Total Wins", value: "744", icon: Award, color: "text-[#b6ff2a]" },
  { label: "Total Losses", value: "98", icon: Target, color: "text-red-400" },
  { label: "Win Rate", value: "88.4%", icon: Zap, color: "text-yellow-400" },
  { label: "Sets Won", value: "1,520", icon: TrendingUp, color: "text-[#00f2ff]" },
  { label: "Sets Lost", value: "242", icon: Target, color: "text-red-400" },
  { label: "Current Streak", value: "14W", icon: Flame, color: "text-orange-500" },
  { label: "Points Scored", value: "32,410", icon: Activity, color: "text-[#b6ff2a]" },
];

const PerformanceStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -5, scale: 1.02 }}
          className="glass-card p-6 rounded-[2rem] border-white/5 relative overflow-hidden group cursor-pointer"
        >
          <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${stat.color}`}>
            <stat.icon className="h-12 w-12" />
          </div>
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{stat.label}</span>
            </div>
            
            <h3 className={`text-3xl font-black tracking-tighter text-white group-hover:${stat.color} transition-colors`}>
              {stat.value}
            </h3>
          </div>

          <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-transparent via-${stat.color.split('[')[1]?.split(']')[0] || 'primary'} to-transparent opacity-50`} />
        </motion.div>
      ))}
    </div>
  );
};

export default PerformanceStats;