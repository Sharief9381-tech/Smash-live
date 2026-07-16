"use client";

import React from 'react';
import { Star } from 'lucide-react';

const AchievementSection = () => {
  return (
    <div className="py-32 text-center bg-white rounded-[3.5rem] border-2 border-dashed border-slate-100">
      <Star className="h-12 w-12 text-slate-200 mx-auto mb-6" />
      <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">Hall of Fame Offline</h3>
      <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-2 italic">Verify match results in the circuit to earn global badges.</p>
    </div>
  );
};

export default AchievementSection;