"use client";

import React from 'react';
import { Target, Zap, Activity, Shield, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const AnalyticsSection = () => {
  return (
    <div className="space-y-6">
      <div className="py-20 text-center border-2 border-dashed rounded-[2.5rem] bg-white border-slate-200">
         <Target className="h-10 w-10 text-slate-200 mx-auto mb-4" />
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic px-8">Biomechanical data is generated after 3 official network matches.</p>
      </div>

      <div className="bg-[#0B1F3A] p-8 rounded-[2.5rem] text-white space-y-4">
         <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-sky-400" />
            <h3 className="text-sm font-black uppercase tracking-widest">Protocol Core</h3>
         </div>
         <p className="text-xs text-white/50 leading-relaxed font-medium italic">"System is awaiting tactical input. Record a match session to initialize the AI analysis layer."</p>
      </div>
    </div>
  );
};

export default AnalyticsSection;