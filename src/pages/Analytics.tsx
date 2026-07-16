"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { BarChart3, Activity, Zap, ShieldCheck, Globe, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Analytics = () => {
  const [stats, setStats] = useState({
    matches: 0,
    athletes: 0,
    tourneys: 0
  });

  useEffect(() => {
    const matches = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
    const athletes = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const tourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
    setStats({
      matches: matches.length,
      athletes: athletes.length,
      tourneys: tourneys.length
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container px-6 py-16 space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-sky-500" />
              <span className="text-xs font-black text-sky-600 uppercase tracking-[0.3em]">Operational Intelligence</span>
            </div>
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter">Circuit Analytics</h1>
            <p className="text-slate-500 font-medium">Real-time data visualization of the user-managed circuit network.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Active Matches", val: stats.matches, icon: Activity },
            { label: "Total Registered Athletes", val: stats.athletes, icon: Zap },
            { label: "Active Circuits", val: stats.tourneys, icon: ShieldCheck },
          ].map((kpi, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="glass-panel p-8 rounded-[2.5rem] space-y-4 bg-white border-slate-200 shadow-sm"
            >
              <div className="h-10 w-10 rounded-xl bg-[#0B1F3A]/5 flex items-center justify-center text-[#0B1F3A]">
                <kpi.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{kpi.label}</p>
                <h3 className="text-4xl font-black text-[#0B1F3A] tracking-tighter">{kpi.val}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="py-40 text-center bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
          <Activity className="h-12 w-12 text-slate-200 mx-auto mb-6" />
          <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">Awaiting Match Intelligence</h3>
          <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-2 italic">No biomechanical data points detected in the current circuit.</p>
        </div>
      </main>
    </div>
  );
};

export default Analytics;