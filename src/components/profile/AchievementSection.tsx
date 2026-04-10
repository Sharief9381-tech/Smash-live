"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Shield, Flame, Target, Star } from 'lucide-react';

const badges = [
  { title: "Tournament Winner", icon: Trophy, count: 42, color: "text-yellow-400", glow: "rgba(250, 204, 21, 0.2)" },
  { title: "MVP Status", icon: Star, count: 12, color: "text-[#00f2ff]", glow: "rgba(0, 242, 255, 0.2)" },
  { title: "Defense Master", icon: Shield, count: 156, color: "text-[#b6ff2a]", glow: "rgba(182, 255, 42, 0.2)" },
  { title: "Smash King", icon: Zap, count: 842, color: "text-orange-400", glow: "rgba(251, 146, 60, 0.2)" },
  { title: "Winning Streak", icon: Flame, count: 14, color: "text-red-500", glow: "rgba(239, 68, 68, 0.2)" },
  { title: "Accuracy Ace", icon: Target, count: 92, color: "text-purple-400", glow: "rgba(192, 132, 252, 0.2)" },
];

const AchievementSection = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {badges.map((badge, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -10, scale: 1.05 }}
          className="glass-card p-8 rounded-[2.5rem] border-white/5 flex flex-col items-center text-center gap-4 group cursor-pointer"
          style={{ boxShadow: `0 0 20px transparent` }}
        >
          <div 
            className={`h-16 w-16 rounded-full bg-white/5 flex items-center justify-center ${badge.color} group-hover:scale-110 transition-transform`}
            style={{ boxShadow: `0 0 20px ${badge.glow}` }}
          >
            <badge.icon className="h-8 w-8 fill-current opacity-80" />
          </div>
          <div className="space-y-1">
            <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest">{badge.title}</h4>
            <p className="text-xl font-black text-white">{badge.count}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AchievementSection;