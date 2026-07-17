"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Activity, Trophy, Users, 
  Target, Globe, Radio, Zap, Bell, Flame,
  TrendingUp, ShieldCheck, Play, ChevronRight,
  Layers, BarChart3
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

  const modules = [
    { title: "Live Scoring", icon: Activity, features: ["Millisecond precision", "Dynamic court tracking"], color: "sky" },
    { title: "AI Commentary", icon: Zap, features: ["Real-time event analysis", "Highlight generation"], color: "amber" },
    { title: "Circuit Hub", icon: Trophy, features: ["Automated brackets", "Player seeding logic"], color: "sky" },
    { title: "Athlete Dossier", icon: Users, features: ["Global performance ID", "Historical tracking"], color: "sky" },
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-sky-500/30">
      <Navbar />
      
      {/* 1. IMPACT HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden py-20 bg-[#F8FAFC]">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-sky-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[#0B1F3A]/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="container px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0B1F3A]">Network Operational • 12M Active Sessions</span>
            </div>

            <div className="space-y-2">
              <motion.h1 
                className="text-7xl md:text-9xl font-black text-[#0B1F3A] leading-[0.85] tracking-tighter uppercase italic"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
              >
                SMASH <br />
                <span className="text-sky-500 drop-shadow-[0_0_30px_rgba(14,165,233,0.3)]">LIVE</span>
              </motion.h1>
              <div className="h-2 w-32 bg-sky-500 rounded-full" />
            </div>

            <p className="text-2xl text-slate-500 font-medium max-w-lg leading-relaxed tracking-tight">
              The professional ecosystem for <span className="text-[#0B1F3A] font-black underline decoration-sky-500 decoration-4">real-time match intelligence</span> and global tournament synchronization.
            </p>

            <div className="flex flex-wrap gap-4 pt-6">
              <Link to="/login">
                <Button size="lg" className="bg-sky-500 text-white rounded-[1.5rem] px-8 font-black text-lg h-16 hover:bg-sky-600 transition-all hover:translate-y-[-4px] shadow-2xl border-none group">
                  ENTER THE INDOOR <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Link to="/tournaments">
                <Button size="lg" variant="outline" className="border-slate-200 text-[#0B1F3A] rounded-[1.5rem] px-8 font-black text-lg h-16 hover:bg-white hover:border-sky-500 transition-all">
                  EXPLORE CIRCUITS
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Floating UI Elements Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="relative hidden lg:block"
          >
            <div className="glass-panel p-10 rounded-[4rem] border-sky-500/20 shadow-[0_40px_80px_rgba(0,0,0,0.08)] space-y-10 bg-white/80 backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-3xl bg-[#0B1F3A] text-white flex items-center justify-center shadow-lg">
                    <TrendingUp className="h-8 w-8 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#0B1F3A] uppercase tracking-[0.2em]">Operational Pulse</h4>
                    <p className="text-[10px] font-bold text-slate-400">SESSION: ACTIVE_LIVE_001</p>
                  </div>
                </div>
                <Badge className="bg-red-500 text-white animate-pulse border-none h-8 px-5 text-xs font-black rounded-full">LIVE FEED</Badge>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 p-8 rounded-[2.5rem] space-y-4 border border-slate-100">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Users className="h-4 w-4" /> Registered
                  </div>
                  <p className="text-4xl font-black text-[#0B1F3A]">{stats.athletes}</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-[2.5rem] space-y-4 border border-slate-100">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Zap className="h-4 w-4 text-sky-500 fill-sky-500" /> Active Circuits
                  </div>
                  <p className="text-4xl font-black text-[#0B1F3A]">{stats.tourneys}</p>
                </div>
              </div>

              <div className="bg-[#0B1F3A] p-6 rounded-[2rem] flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Database Sync Success</span>
                 </div>
                 <ChevronRight className="h-4 w-4 text-white/20" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. LIVE INTELLIGENCE VISUALIZATION */}
      <section className="py-32 bg-white">
        <div className="container px-6">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-5 space-y-8">
              <Badge className="bg-sky-500 text-white font-black px-6 py-1.5 rounded-full uppercase tracking-widest text-[10px]">Technical Edge</Badge>
              <h2 className="text-5xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-[0.95]">
                Real-Time <br />
                Court <span className="text-sky-500">Tracking</span>
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                SmashLive monitors match flow with millisecond precision, mapping every smash, net kill, and strategic error into a unified intelligence feed.
              </p>
              
              <div className="space-y-6 pt-4">
                {[
                  { label: "Biomechanical Analysis", desc: "Mapping athlete movement and stamina in real-time.", icon: Activity },
                  { label: "Heatmap Intelligence", desc: "Identifying dominant zones on the professional court.", icon: Target },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="h-12 w-12 rounded-2xl bg-[#0B1F3A] text-white flex items-center justify-center shrink-0 shadow-xl group-hover:scale-110 transition-transform">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-[#0B1F3A] uppercase text-sm tracking-tight">{item.label}</h4>
                      <p className="text-sm text-slate-400 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
               <div className="relative glass-panel p-8 rounded-[4rem] bg-slate-900 border-none shadow-2xl overflow-hidden aspect-video">
                  {/* Court Visualization Mockup */}
                  <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
                  <div className="relative h-full w-full border-2 border-white/20 rounded-xl flex items-center justify-center">
                     <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white/20" />
                     <div className="absolute inset-x-0 top-1/2 h-0.5 bg-white/10" />
                     
                     {/* Pulse Points */}
                     <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="h-20 w-20 bg-sky-500/20 blur-xl rounded-full absolute top-1/4 left-1/4" 
                     />
                     <div className="h-4 w-4 bg-sky-400 rounded-full shadow-[0_0_20px_rgba(14,165,233,1)] absolute top-1/4 left-1/4" />
                     
                     <div className="absolute bottom-8 right-8 flex items-center gap-4 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                        <BarChart3 className="h-5 w-5 text-sky-500" />
                        <div>
                          <p className="text-[10px] font-black text-white/40 uppercase">Smash Speed</p>
                          <p className="text-xl font-black text-white italic">412 <span className="text-[10px]">KM/H</span></p>
                        </div>
                     </div>

                     <div className="absolute top-8 left-8">
                        <div className="flex items-center gap-2 bg-red-500 text-white px-4 py-1.5 rounded-full font-black text-[10px] uppercase">
                          <Radio className="h-3 w-3 animate-pulse" /> Live Analysis
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PLATFORM CORE MODULES */}
      <section className="py-32 bg-[#F8FAFC]">
        <div className="container px-6 space-y-20">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-5xl font-black text-[#0B1F3A] tracking-tighter uppercase italic">The Studio Engine</h2>
            <p className="text-slate-500 font-medium text-lg">Four integrated modules working in harmony to power the global circuit.</p>
            <div className="h-1.5 w-24 bg-sky-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {modules.map((m, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -12 }}
                className="glass-panel p-10 rounded-[3rem] hover:border-sky-500/40 transition-all group relative overflow-hidden bg-white border-slate-200"
              >
                <div className="h-16 w-16 rounded-3xl bg-[#0B1F3A]/5 text-[#0B1F3A] flex items-center justify-center mb-8 group-hover:bg-[#0B1F3A] group-hover:text-white transition-all duration-500">
                  <m.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black text-[#0B1F3A] mb-6 tracking-tight uppercase italic">{m.title}</h3>
                <ul className="space-y-3">
                  {m.features.map((f, j) => (
                    <li key={j} className="text-[11px] font-bold text-slate-400 flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-sky-500" /> {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA SECTION */}
      <section className="py-20 bg-white">
        <div className="container px-6">
          <div className="bg-[#0B1F3A] rounded-[4rem] p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
            <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none">
              <Zap className="h-[400px] w-[400px] text-sky-400" />
            </div>
            <div className="space-y-8 relative z-10 max-w-xl">
              <div className="space-y-2">
                <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-tight">Elevate Your <br /> Circuit Intelligence</h2>
                <p className="text-white/50 font-medium text-lg leading-relaxed">Join thousands of athletes and organizers defining the future of professional badminton.</p>
              </div>
              <div className="flex gap-4">
                <Link to="/tournaments/create">
                  <Button className="bg-sky-500 text-white font-black px-10 h-16 rounded-[1.5rem] shadow-xl hover:bg-sky-400 transition-all">
                    START A CIRCUIT
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="border-white/20 text-white font-black px-10 h-16 rounded-[1.5rem] hover:bg-white/5 transition-all">
                    JOIN AS ATHLETE
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 relative z-10 w-full md:w-auto">
               {[
                 { label: "Global Nodes", val: "24" },
                 { label: "Est. Viewers", val: "1.2M" }
               ].map((stat, i) => (
                 <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] text-center min-w-[160px]">
                    <p className="text-4xl font-black text-white">{stat.val}</p>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-2">{stat.label}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;