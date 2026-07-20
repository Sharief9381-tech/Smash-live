"use client";

import React from 'react';
import { Target, Zap, Activity, Shield, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const detailedMetrics = [
  { label: "Smash Accuracy", val: "92.4%", desc: "Placement within 10cm of lines", icon: Target, color: "bg-sky-50 text-sky-600" },
  { label: "Net Kill Ratio", val: "78.1%", desc: "Success rate on front-court finishes", icon: Zap, color: "bg-amber-50 text-amber-600" },
  { label: "Service Errors", val: "1.4%", desc: "Average faults per 21 points", icon: Activity, color: "bg-red-50 text-red-600" },
  { label: "Backcourt Depth", val: "8.4m", desc: "Average smash landing depth", icon: TrendingUp, color: "bg-indigo-50 text-indigo-600" },
];

const AnalyticsSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {detailedMetrics.map((m, i) => (
          <div key={i} className="bg-white border border-slate-100 p-6 rounded-[2rem] flex items-center gap-6 shadow-sm">
             <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shrink-0", m.color)}>
                <m.icon className="h-7 w-7" />
             </div>
             <div className="space-y-1">
                <div className="flex items-center justify-between">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.label}</h4>
                   <span className="text-xl font-black text-[#0B1F3A]">{m.val}</span>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-tight">{m.desc}</p>
                <div className="w-full h-1 bg-slate-50 rounded-full mt-3 overflow-hidden">
                   <div className="h-full bg-sky-500" style={{ width: m.val }} />
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0B1F3A] p-8 rounded-[2.5rem] text-white space-y-4">
         <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-sky-400" />
            <h3 className="text-sm font-black uppercase tracking-widest">Biomechanical Core</h3>
         </div>
         <p className="text-xs text-white/50 leading-relaxed font-medium italic">"Athlete exhibits high tactical stability in sets exceeding 30 minutes. Recommended focus: cross-court smash defense."</p>
      </div>
    </div>
  );
};

export default AnalyticsSection;