"use client";

import React from 'react';
import { Award, Star } from 'lucide-react';

const AchievementSection = () => {
  return (
    <div className="py-32 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center gap-4">
      <Award className="h-12 w-12 text-slate-200" />
      <div className="space-y-1">
        <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">Hall of Fame Empty</h3>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Complete match challenges to unlock verified badges.</p>
      </div>
    </div>
  );
};

export default AchievementSection;