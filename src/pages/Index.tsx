"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Activity, Trophy, Users, 
  Zap, TrendingUp, Monitor,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Index = () => {
  const [stats, setStats] = useState({ athletes: 124, tourneys: 8 });

  useEffect(() => {
    const athletes = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const tourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
    if (athletes.length > 0) setStats(s => ({ ...s, athletes: athletes.length }));
    if (tourneys.length > 0) setStats(s => ({ ...s, tourneys: tourneys.length }));
  }, []);

  const featureGroups = [
    {
      category: "Match Intel",
      icon: Activity,
      color: "text-sky-500",
      bg: "bg-sky-50",
      features: ["Live Scoring", "Point Sync"]
    },
    {
      category: "Broadcast",
      icon: Monitor,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      features: ["Low Latency", "AI Commentary"]
    },
    {
      category: "Circuit",
      icon: Trophy,
      color: "text-amber-500",
      bg: "bg-amber-50",
      features: ["Auto-Brackets", "Entry Portal"]
    },
    {
      category: "Dossier",
      icon: Users,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      features: ["Smash ID", "Career Logs"]
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-sky-500/30 overflow-x-hidden pb-20">
      <Navbar />
      
      <section className="relative bg-[#F8FAFC] px-6 py-12">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
            <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-widest text-[#0B1F3A]">Node Online</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl font-black text-[#0B1F3A] leading-[0.95] tracking-tighter uppercase italic">
              SMASH <br />
              <span className="text-sky-500">LIVE</span>
            </h1>
            <div className="h-1 w-16 bg-sky-500 rounded-full" />
          </div>

          <p className="text-base text-slate-500 font-medium leading-relaxed max-w-xs">
            Professional badminton intelligence through <span className="text-[#0B1F3A] font-black">real-time synchronization</span>.
          </p>

          <div className="flex flex-col gap-3">
            <Link to="/login" className="w-full">
              <Button size="lg" className="w-full h-14 bg-[#0B1F3A] text-white rounded-xl font-black text-sm hover:bg-sky-600 shadow-xl group border-none uppercase tracking-widest">
                ENTER COURT <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-50 pb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-sky-500" />
                <h4 className="text-[10px] font-black text-[#0B1F3A] uppercase tracking-widest">Network Pulse</h4>
              </div>
              <Badge className="bg-red-500 text-white animate-pulse border-none h-6 px-3 text-[8px] font-black rounded-full uppercase">Live</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Registered</p>
                <p className="text-2xl font-black text-[#0B1F3A]">{stats.athletes}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Circuits</p>
                <p className="text-2xl font-black text-[#0B1F3A]">{stats.tourneys}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="grid grid-cols-2 gap-4">
          {featureGroups.map((group, i) => (
            <div key={i} className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
              <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", group.bg, group.color)}>
                <group.icon className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-black text-[#0B1F3A] uppercase italic">{group.category}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;