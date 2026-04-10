"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Shield, Flame, Target, Star } from 'lucide-react';

const badges = [
  { title: "Tournament Winner", icon: Trophy, count: 42, color: "text-sky-500", bg: "bg-sky-50" },
  { title: "MVP Status", icon: Star, count: 12, color: "text-sky-600", bg: "bg-sky-50" },
  { title: "Defense Master", icon: Shield, count: 156, color: "text-[#0B1F3A]", bg: "bg-slate-50" },
  { title: "Smash King", icon: Zap, count: 842, color: "text-amber-500", bg: "bg-amber-50" },
  { title: "Winning Streak", icon: Flame, count: 14, color: "text-orange-500", bg: "bg-orange-50" },
  { title: "Accuracy Ace", icon: Target, count: 92, color: "text-sky-500", bg: "bg-sky-50" },
];

const AchievementSection = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {badges.map((badge, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -10, scale: 1.05 }}
          className="glass-panel p-8 rounded-[2.5rem] border-slate-200 flex flex-col items-center text-center gap-4 group cursor-pointer"
        >
          <div 
            className={`h-16 w-16 rounded-full ${badge.bg} flex items-center justify-center ${badge.color} group-hover:scale-110 transition-transform`}
          >
            <badge.icon className="h-8 w-8 fill-current opacity-80" />
          </div>
          <div className="space-y-1">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{badge.title}</h4>
            <p className="text-xl font-black text-[#0B1F3A]">{badge.count}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AchievementSection;