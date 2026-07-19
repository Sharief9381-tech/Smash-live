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
      features: ["Live Millisecond Scoring", "Dynamic Point Attribution", "Server-Side Sync", "Momentum Analysis"]
    },
    {
      category: "Broadcast Studio",
      icon: Monitor,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      features: ["Ultra-Low Latency Feed", "Interactive Overlays", "AI Commentary", "Viewer Analytics"]
    },
    {
      category: "Circuit Engine",
      icon: Trophy,
      color: "text-amber-500",
      bg: "bg-amber-50",
      features: ["Auto-Bracket Generation", "Automated Seeding", "Entry Portals", "Prize Distribution"]
    },
    {
      category: "Athlete Dossier",
      icon: Users,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      features: ["Universal Smash ID", "Career Tracking", "State Rankings", "Stat Mapping"]
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-sky-500/30 overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-[#F8FAFC] border-b border-slate-100 py-20 md:py-0">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-sky-500/10 blur-[120px] rounded-full -translate-y-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-indigo-500/5 blur-[100px] rounded-full translate-y-1/4 pointer-events-none" />
        
        <div className="container px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="lg:col-span-7 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0B1F3A]">Operational Node Active • 12M Sessions</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-7xl md:text-9xl font-black text-[#0B1F3A] leading-[0.85] tracking-tighter uppercase italic">
                SMASH <br />
                <span className="text-sky-500 drop-shadow-[0_10px_20px_rgba(14,165,233,0.2)]">LIVE</span>
              </h1>
              <div className="h-2 w-32 bg-sky-500 rounded-full" />
            </div>

            <p className="text-2xl text-slate-500 font-medium max-w-xl leading-relaxed tracking-tight">
              A comprehensive ecosystem for <span className="text-[#0B1F3A] font-black">real-time match intelligence</span> and global tournament synchronization.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-[#0B1F3A] text-white rounded-2xl px-10 h-16 font-black text-lg hover:bg-sky-600 transition-all shadow-xl group border-none">
                  ENTER COURT <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Link to="/tournaments">
                <Button size="lg" variant="outline" className="border-slate-200 text-[#0B1F3A] bg-white/50 backdrop-blur-sm rounded-2xl px-10 h-16 font-black text-lg hover:bg-white hover:border-sky-500 transition-all">
                  EXPLORE CIRCUITS
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="lg:col-span-5 relative"
          >
            <div className="glass-panel p-10 rounded-[4rem] border-sky-500/10 shadow-[0_40px_80px_rgba(0,0,0,0.08)] bg-white/80 backdrop-blur-2xl space-y-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-[#0B1F3A] text-sky-400 flex items-center justify-center shadow-lg">
                    <TrendingUp className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#0B1F3A] uppercase tracking-widest">Network Pulse</h4>
                    <p className="text-[10px] font-bold text-slate-400">SESSION: ID_ACTIVE_X</p>
                  </div>
                </div>
                <Badge className="bg-red-500 text-white animate-pulse border-none h-8 px-5 text-xs font-black rounded-full uppercase">Live</Badge>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50/50 p-8 rounded-[3rem] space-y-3 border border-slate-100 group hover:border-sky-500/30 transition-all">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Users className="h-4 w-4" /> Registered
                  </div>
                  <p className="text-4xl font-black text-[#0B1F3A]">{stats.athletes}</p>
                </div>
                <div className="bg-slate-50/50 p-8 rounded-[3rem] space-y-3 border border-slate-100 group hover:border-sky-500/30 transition-all">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Zap className="h-4 w-4 text-sky-500 fill-current" /> Circuits
                  </div>
                  <p className="text-4xl font-black text-[#0B1F3A]">{stats.tourneys}</p>
                </div>
              </div>

              <div className="p-6 bg-sky-500 rounded-[2rem] flex items-center justify-between text-white shadow-xl shadow-sky-500/20">
                 <div className="flex items-center gap-3">
                   <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                   <span className="text-[11px] font-black uppercase tracking-widest">Registry Sync Complete</span>
                 </div>
                 <ChevronRight className="h-5 w-5 opacity-50" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intelligence Grid */}
      <section className="py-48 bg-white">
        <div className="container px-6 space-y-24">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-5xl font-black text-[#0B1F3A] tracking-tighter uppercase italic">Platform Intelligence</h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">Integrated modules engineered for professional speed and tactical accuracy.</p>
            <div className="h-1.5 w-24 bg-sky-500 mx-auto rounded-full mt-6" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {featureGroups.map((group, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="glass-panel p-10 rounded-[3.5rem] bg-white border-slate-100 shadow-xl shadow-slate-200/20 hover:border-sky-200 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-8">
                  <div className={cn("h-16 w-16 rounded-[1.5rem] flex items-center justify-center shadow-lg transition-transform group-hover:scale-110", group.bg, group.color)}>
                    <group.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-black text-[#0B1F3A] uppercase italic leading-none">{group.category}</h3>
                  <ul className="space-y-4">
                    {group.features.map((f, j) => (
                      <li key={j} className="text-xs font-bold text-slate-500 flex items-center gap-3 uppercase tracking-tight">
                        <CheckCircle2 className={cn("h-4 w-4", group.color)} /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Connectivity Section */}
      <section className="py-48 bg-slate-50">
        <div className="container px-6">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-5 space-y-8">
              <Badge className="bg-sky-500 text-white font-black px-6 py-2 border-none text-[10px] uppercase tracking-widest rounded-full">Core Technology</Badge>
              <h2 className="text-5xl font-black text-[#0B1F3A] uppercase italic leading-[0.95] tracking-tighter">Advanced Connectivity</h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">Our backbone uses distributed edge nodes to ensure every smash is logged and synced with <span className="text-sky-600 font-bold">sub-50ms latency</span> across the global network.</p>
              <Button variant="outline" className="h-14 px-10 rounded-2xl border-[#0B1F3A] text-[#0B1F3A] font-black uppercase tracking-widest text-xs hover:bg-[#0B1F3A] hover:text-white transition-all">View Architecture</Button>
            </div>
            
            <div className="lg:col-span-7 grid md:grid-cols-2 gap-8">
              {[
                { title: "Real-time Scoring", desc: "Digital scoreboard with instant cloud synchronization.", icon: Database },
                { title: "Global Registry", desc: "Centralized database of certified athlete performance.", icon: Globe },
                { title: "AI Commentary", desc: "Automated event logs and contextual highlights.", icon: Zap },
                { title: "Data Analytics", desc: "Deep dive into win rates and accuracy metrics.", icon: BarChart3 },
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 flex flex-col gap-6 hover:shadow-2xl transition-all hover:border-sky-200 group">
                   <div className="h-14 w-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="h-7 w-7" />
                   </div>
                   <div className="space-y-2">
                      <h4 className="font-black text-[#0B1F3A] uppercase text-lg tracking-tight italic">{item.title}</h4>
                      <p className="text-sm text-slate-400 font-bold uppercase tracking-tight leading-relaxed">{item.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Heroic CTA Section - REFINED LIGHT VERSION */}
      <section className="py-48 bg-white">
        <div className="container px-6">
          <div className="relative bg-sky-50 border border-sky-100 rounded-[3.5rem] p-10 md:p-12 overflow-hidden shadow-sm max-w-5xl mx-auto">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-white/40 to-transparent pointer-events-none" />
            <div className="absolute -right-16 -bottom-16 opacity-5 pointer-events-none">
              <Trophy className="h-[300px] w-[300px] text-[#0B1F3A]" />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div className="space-y-6 max-w-lg">
                <div className="space-y-2">
                  <Badge className="bg-[#0B1F3A] text-white font-black px-4 py-1.5 border-none text-[9px] uppercase tracking-widest rounded-full">Ecosystem Access</Badge>
                  <h2 className="text-4xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-none">Elevate Your <br /> Intelligence</h2>
                </div>
                <p className="text-sm text-[#0B1F3A]/60 font-bold uppercase tracking-widest">Professional Grade Ecosystem for Elite Athletes & Global Organizers</p>
                
                <div className="flex flex-wrap gap-4">
                  <Link to="/tournaments/create">
                    <Button className="bg-[#0B1F3A] text-white font-black px-8 h-14 rounded-xl text-xs tracking-widest shadow-md hover:bg-sky-600 transition-all border-none">
                      START A CIRCUIT
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="border-slate-200 text-[#0B1F3A] font-black px-8 h-14 rounded-xl text-xs tracking-widest hover:bg-white transition-all bg-white/50 backdrop-blur-md">
                      JOIN AS ATHLETE
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 md:border-l border-[#0B1F3A]/10 md:pl-10">
                 <div className="space-y-1">
                    <p className="text-xl font-black text-[#0B1F3A]">24</p>
                    <p className="text-[8px] font-black text-[#0B1F3A]/40 uppercase tracking-widest">Nodes</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-xl font-black text-[#0B1F3A]">1.2M</p>
                    <p className="text-[8px] font-black text-[#0B1F3A]/40 uppercase tracking-widest">Scopes</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-xl font-black text-[#0B1F3A]">99.9%</p>
                    <p className="text-[8px] font-black text-[#0B1F3A]/40 uppercase tracking-widest">Uptime</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-xl font-black text-[#0B1F3A]">{"< 50ms"}</p>
                    <p className="text-[8px] font-black text-[#0B1F3A]/40 uppercase tracking-widest">Latency</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;