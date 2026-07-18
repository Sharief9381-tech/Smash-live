"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Activity, Trophy, Users, 
  Zap, TrendingUp, ChevronRight, Monitor,
  ShieldCheck, Database, Globe, BarChart3, 
  CheckCircle2, Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

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
      features: [
        "Live Millisecond Scoring",
        "Dynamic Point Attribution",
        "Server-Side Synchronization",
        "Match Momentum Analysis"
      ]
    },
    {
      category: "Broadcast Studio",
      icon: Monitor,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      features: [
        "Ultra-Low Latency Feed",
        "Interactive Score Overlays",
        "AI-Generated Commentary",
        "Global Viewer Analytics"
      ]
    },
    {
      category: "Circuit Engine",
      icon: Trophy,
      color: "text-amber-500",
      bg: "bg-amber-50",
      features: [
        "Auto-Bracket Generation",
        "Automated Athlete Seeding",
        "Tournament Entry Portals",
        "Prize Pool Distribution"
      ]
    },
    {
      category: "Athlete Dossier",
      icon: Users,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      features: [
        "Universal Smash ID",
        "Historical Career Tracking",
        "National & State Rankings",
        "Biomechanical Stat Mapping"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-sky-500/30">
      <Navbar />
      
      {/* Tightened Hero Section */}
      <section className="relative flex items-center overflow-hidden py-10 bg-[#F8FAFC] border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-sky-500/10 blur-[100px] rounded-full -translate-y-1/4" />
        
        <div className="container px-6 grid lg:grid-cols-2 gap-8 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
              <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-[#0B1F3A]">Operational Node active • 12M Active Sessions</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-6xl md:text-8xl font-black text-[#0B1F3A] leading-[0.9] tracking-tighter uppercase italic">
                SMASH <br />
                <span className="text-sky-500">LIVE</span>
              </h1>
              <div className="h-1.5 w-24 bg-sky-500 rounded-full" />
            </div>

            <p className="text-xl text-slate-500 font-medium max-w-lg leading-snug tracking-tight">
              A comprehensive ecosystem for <span className="text-[#0B1F3A] font-black">real-time match intelligence</span> and global tournament synchronization.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/login">
                <Button size="lg" className="bg-[#0B1F3A] text-white rounded-2xl px-8 font-black h-14 hover:bg-sky-600 transition-all shadow-xl group border-none">
                  ENTER THE COURT <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/tournaments">
                <Button size="lg" variant="outline" className="border-slate-200 text-[#0B1F3A] rounded-2xl px-8 font-black h-14 hover:bg-white hover:border-sky-500 transition-all">
                  EXPLORE CIRCUITS
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative hidden lg:block">
            <div className="glass-panel p-8 rounded-[3rem] border-sky-500/10 shadow-2xl bg-white space-y-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-lg">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-[#0B1F3A] uppercase tracking-widest">Network Pulse</h4>
                    <p className="text-[9px] font-bold text-slate-400">SESSION: ID_ACTIVE_X</p>
                  </div>
                </div>
                <Badge className="bg-red-500 text-white animate-pulse border-none h-7 px-4 text-[9px] font-black rounded-full uppercase">Live Feed</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-6 rounded-[2rem] space-y-2 border border-slate-100">
                  <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <Users className="h-3 w-3" /> Registered
                  </div>
                  <p className="text-3xl font-black text-[#0B1F3A]">{stats.athletes}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-[2rem] space-y-2 border border-slate-100">
                  <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <Zap className="h-3 w-3 text-sky-500 fill-current" /> Circuits
                  </div>
                  <p className="text-3xl font-black text-[#0B1F3A]">{stats.tourneys}</p>
                </div>
              </div>

              <div className="p-4 bg-sky-500 rounded-2xl flex items-center justify-between text-white">
                 <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Registry Sync Complete</span>
                 </div>
                 <ChevronRight className="h-4 w-4 opacity-50" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expanded Feature Intelligence - Reduced spacing */}
      <section className="py-16 bg-white">
        <div className="container px-6 space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-4xl font-black text-[#0B1F3A] tracking-tighter uppercase italic">Platform Intelligence</h2>
            <p className="text-slate-500 font-medium text-base">Integrated modules engineered for professional speed and tactical accuracy.</p>
            <div className="h-1 w-20 bg-sky-500 mx-auto rounded-full mt-4" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureGroups.map((group, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="glass-panel p-8 rounded-[2.5rem] bg-white border-slate-100 shadow-lg hover:border-sky-200 transition-all flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shadow-inner", group.bg, group.color)}>
                    <group.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic leading-none">{group.category}</h3>
                  <ul className="space-y-2.5">
                    {group.features.map((f, j) => (
                      <li key={j} className="text-[10px] font-bold text-slate-500 flex items-center gap-2 uppercase tracking-tight">
                        <CheckCircle2 className={cn("h-3 w-3", group.color)} /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section - Added to fill content */}
      <section className="py-12 bg-slate-50">
        <div className="container px-6 grid lg:grid-cols-3 gap-8">
           <div className="lg:col-span-1 space-y-4">
              <Badge className="bg-sky-500 text-white font-black px-4 py-1 border-none text-[9px] uppercase">Core Tech</Badge>
              <h2 className="text-3xl font-black text-[#0B1F3A] uppercase italic leading-tight">Advanced Connectivity</h2>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Our backbone uses distributed edge nodes to ensure every smash is logged and synced with sub-50ms latency across the global network.</p>
           </div>
           
           <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
              {[
                { title: "Real-time Scoring", desc: "Digital scoreboard with instant cloud sync.", icon: Database },
                { title: "Global Registry", desc: "Centralized database of athlete performance.", icon: Globe },
                { title: "AI Commentary", desc: "Automated event logs and highlights.", icon: Zap },
                { title: "Data Analytics", desc: "Deep dive into win rates and accuracies.", icon: BarChart3 },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                   <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5" />
                   </div>
                   <div>
                      <h4 className="font-black text-[#0B1F3A] uppercase text-xs tracking-tight">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Colorful CTA - Darkness Removed */}
      <section className="py-12 bg-white">
        <div className="container px-6">
          <div className="relative bg-gradient-to-br from-sky-400 to-indigo-600 rounded-[3.5rem] p-12 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden shadow-[0_30px_60px_-12px_rgba(14,165,233,0.3)]">
            <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
              <Trophy className="h-[300px] w-[300px] text-white" />
            </div>
            
            <div className="space-y-6 relative z-10 max-w-xl text-white">
              <div className="space-y-1">
                <h2 className="text-5xl font-black tracking-tighter uppercase italic leading-[0.9]">Elevate Your Circuit Intelligence</h2>
                <p className="text-white/80 font-bold uppercase text-xs tracking-widest mt-2">Professional Grade Ecosystem for Athletes & Organizers</p>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/tournaments/create">
                  <Button className="bg-white text-sky-600 font-black px-10 h-14 rounded-2xl shadow-xl hover:bg-sky-50 transition-all border-none">
                    START A CIRCUIT
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="border-white/40 text-white font-black px-10 h-14 rounded-2xl hover:bg-white/10 transition-all">
                    JOIN AS ATHLETE
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 relative z-10 w-full md:w-auto">
               <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-[2rem] text-center min-w-[150px]">
                  <p className="text-4xl font-black text-white">24</p>
                  <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest mt-1">Global Nodes</p>
               </div>
               <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-[2rem] text-center min-w-[150px]">
                  <p className="text-4xl font-black text-white">1.2M</p>
                  <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest mt-1">Live Scopes</p>
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