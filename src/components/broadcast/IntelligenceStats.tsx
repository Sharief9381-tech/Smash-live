"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PlayerStat {
  name: string;
  accuracy: number;
  netDrops: number;
  color: string;
}

interface IntelligenceStatsProps {
  p1: PlayerStat;
  p2: PlayerStat;
}

const IntelligenceStats = ({ p1, p2 }: IntelligenceStatsProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
          <Target className="h-4 w-4 text-sky-500" /> Shot Intelligence
        </h3>
        <Badge className="bg-sky-500/10 text-sky-600 border-none text-[8px] font-black">LIVE METRICS</Badge>
      </div>

      <div className="space-y-10">
        {/* Smash Accuracy */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Zap className="h-3 w-3" /> Smash Accuracy
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-[#0B1F3A]">{p1.name}</span>
                <span className="text-sky-600">{p1.accuracy}%</span>
              </div>
              <Progress value={p1.accuracy} className="h-1.5 bg-slate-100" indicatorClassName="bg-sky-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-[#0B1F3A]">{p2.name}</span>
                <span className="text-slate-400">{p2.accuracy}%</span>
              </div>
              <Progress value={p2.accuracy} className="h-1.5 bg-slate-100" indicatorClassName="bg-[#0B1F3A]" />
            </div>
          </div>
        </div>

        {/* Net Drops */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Target className="h-3 w-3" /> Net Drop Success
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
              <p className="text-2xl font-black text-sky-600">{p1.netDrops}</p>
              <p className="text-[9px] font-black text-slate-400 uppercase">{p1.name}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
              <p className="text-2xl font-black text-[#0B1F3A]">{p2.netDrops}</p>
              <p className="text-[9px] font-black text-slate-400 uppercase">{p2.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", className)}>
    {children}
  </span>
);

import { cn } from '@/lib/utils';

export default IntelligenceStats;