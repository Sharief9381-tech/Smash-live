"use client";

import React from 'react';
import { Activity } from 'lucide-react';

const AnalyticsSection = () => {
  return (
    <div className="grid lg:grid-cols-1 gap-8">
      <div className="glass-panel py-32 rounded-[3.5rem] border-slate-200 bg-white flex flex-col items-center justify-center text-center gap-4 border-2 border-dashed">
         <Activity className="h-12 w-12 text-slate-200 animate-pulse" />
         <div className="space-y-1">
            <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">Awaiting Biomechanical Data</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Participate in studio matches to populate intelligence charts</p>
         </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;