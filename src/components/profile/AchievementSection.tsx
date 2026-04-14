"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Shield, Flame, Target, Star } from 'lucide-react';

const AchievementSection = () => {
  const badges: any[] = [];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {badges.length > 0 ? badges.map((badge, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -10, scale: 1.05 }}
          className="glass-panel p-8 rounded-[2.5rem] border-slate-200 flex flex-col items-center text-center gap-4 group cursor-pointer"
        >
          <div className={`h-16 w-16 rounded-full ${badge.bg} flex items-center justify-center ${badge.color}`}>
            <badge.icon className="h-8 w-8 fill-current opacity-80" />
          </div>
          <div className="space-y-1">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{badge.title}</h4>
            <p className="text-xl font-black text-[#0B1F3A]">{badge.count}</p>
          </div>
        </motion.div>
      )) : (
        <div className="col-span-full py-20 text-center">
          <p className="text-sm font-black text-slate-300 uppercase tracking-widest italic">No Achievements Logged</p>
        </div>
      )}
    </div>
  );
};

export default AchievementSection;