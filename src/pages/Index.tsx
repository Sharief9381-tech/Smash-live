"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Activity, Trophy, Users, 
  Zap, TrendingUp, ChevronRight, Monitor,
  ShieldCheck, Database, Globe, BarChart3, 
  CheckCircle2
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
      category: "Match Intelligence",
      icon: Activity,
      color: "text-sky-500",
      bg: "bg-sky-50",
      features: ["Live Millisecond Scoring", "Dynamic Point Attribution", "Server-Side Sync"]
    },
    {
      category: "Broadcast Studio",
      icon: Monitor,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      features: ["Ultra-Low Latency Feed", "Interactive Overlays", "AI Commentary"]
    },
    {
      category: "Circuit Engine",
      icon: Trophy,
      color: "text-amber-500",
      bg: "bg-amber-50",
      features: ["Auto-Bracket Generation", "Automated Seeding", "Entry Portals"]
    },
    {
      category: "Athlete Dossier",
      icon: Users,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      features: ["Universal Smash ID", "Career Tracking", "State Rankings"]
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-sky-500/30 overflow-x-hidden pb-20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-[#F8FAFC] px-4 py-12">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-[#0B1F3A]">Operational Node Active</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl font-black text-[#0B1F3A] leading-[0.9] tracking-tighter uppercase italic">
              SMASH <br />
              <span className="text-sky-500 drop-shadow-[0_10px_20px_rgba(14,165,233,0.2)]">LIVE</span>
            </h1>
            <div className="h-1.5 w-20 bg-sky-500 rounded-full" />
          </div>

          <p className="text-xl text-slate-500 font-medium leading-relaxed tracking-tight">
            Unifying the ecosystem through <span className="text-[#0B1F3A] font-black">real-time intelligence</span> and tournament synchronization.
          </p>

          <div className="flex flex-col gap-4">
            <Link to="/login" className="w-full">
              <Button size="lg" className="w-full bg-[#0B1F3A] text-white rounded-2xl px-10 h-16 font-black text-lg hover:bg-sky-600 shadow-xl group border-none">
                ENTER COURT <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/tournaments" className="w-full">
              <Button size="lg" variant="outline" className="w-full border-slate-200 text-[#0B1F3A] bg-white rounded-2xl px-10 h-16 font-black text-lg">
                EXPLORE CIRCUITS
              </Button>
            </Link>
          </div>

          <div className="glass-panel p-8 rounded-[3rem] border-sky-500/10 shadow-2xl bg-white space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-[#0B1F3A] text-sky-400 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#0B1F3A] uppercase tracking-widest">Network Pulse</h4>
                  <p className="text-[8px] font-bold text-slate-400">SESSION: ID_ACTIVE_X</p>
                </div>
              </div>
              <Badge className="bg-red-500 text-white animate-pulse border-none h-7 px-4 text-[10px] font-black rounded-full uppercase">Live</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-6 rounded-[2.5rem] space-y-2 border border-slate-100">
                <div className="flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                  <Users className="h-3 w-3" /> Registered
                </div>
                <p className="text-3xl font-black text-[#0B1F3A]">{stats.athletes}</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-[2.5rem] space-y-2 border border-slate-100">
                <div className="flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                  <Zap className="h-3 w-3 text-sky-500 fill-current" /> Circuits
                </div>
                <p className="text-3xl font-black text-[#0B1F3A]">{stats.tourneys}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence Grid */}
      <section className="py-16 bg-white px-4">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-[#0B1F3A] tracking-tighter uppercase italic">Intelligence</h2>
            <p className="text-slate-500 font-medium leading-relaxed">Integrated modules engineered for professional speed.</p>
          </div>

          <div className="flex flex-col gap-6">
            {featureGroups.map((group, i) => (
              <div 
                key={i}
                className="glass-panel p-8 rounded-[3rem] bg-white border-slate-100 shadow-xl space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shadow-md", group.bg, group.color)}>
                    <group.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">{group.category}</h3>
                </div>
                <ul className="space-y-3">
                  {group.features.map((f, j) => (
                    <li key={j} className="text-[10px] font-bold text-slate-500 flex items-center gap-3 uppercase tracking-tight">
                      <CheckCircle2 className={cn("h-4 w-4", group.color)} /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;