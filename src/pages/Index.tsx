"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Activity, Trophy, Users, 
  Zap, TrendingUp, Monitor, Globe, 
  ShieldCheck, Radio, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stats, setStats] = useState({ athletes: 124, tourneys: 8 });

  useEffect(() => {
    const authStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(authStatus);

    const athletes = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const tourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
    if (athletes.length > 0) setStats(s => ({ ...s, athletes: athletes.length }));
    if (tourneys.length > 0) setStats(s => ({ ...s, tourneys: tourneys.length }));
  }, []);

  const featureGroups = [
    {
      title: "Live Match Intelligence",
      desc: "Synchronized point tracking with sub-50ms global latency.",
      icon: Activity,
      color: "text-sky-500",
      bg: "bg-sky-50"
    },
    {
      title: "Broadcast Studio",
      desc: "Initialize professional streams with AI-driven tactical overlays.",
      icon: Monitor,
      color: "text-indigo-500",
      bg: "bg-indigo-50"
    },
    {
      title: "Tournament Ecosystem",
      desc: "Automated bracket generation and official circuit registration.",
      icon: Trophy,
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      title: "Global Registry",
      desc: "Verified athlete dossiers with comprehensive career analytics.",
      icon: Users,
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-sky-500/30 overflow-x-hidden">
      <Navbar />
      
      {/* 1. Epic Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 py-20 bg-slate-50">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-sky-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40%] h-full bg-[#0B1F3A]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="container grid lg:grid-cols-12 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0B1F3A]">Platform Online • Global Sync Active</span>
            </div>

            <div className="space-y-4">
              <motion.h1 
                className="text-7xl md:text-[120px] font-black text-[#0B1F3A] leading-[0.85] tracking-tighter uppercase italic"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
              >
                SMASH <br />
                <span className="text-sky-500 drop-shadow-[0_0_40px_rgba(14,165,233,0.4)]">LIVE</span>
              </motion.h1>
              <div className="h-2.5 w-40 bg-sky-500 rounded-full" />
            </div>

            <p className="text-2xl text-slate-500 font-medium max-w-xl leading-relaxed tracking-tight">
              The definitive <span className="text-[#0B1F3A] font-black">athlete network</span>. Empowering players and organizers with real-time intelligence and elite broadcasting tools.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to={isLoggedIn ? "/dashboard" : "/login"}>
                <Button size="lg" className="bg-[#0B1F3A] text-white rounded-[2rem] px-10 font-black text-lg h-20 hover:bg-sky-600 transition-all hover:translate-y-[-4px] shadow-2xl border-none group active:scale-95">
                  ENTER THE COURT <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Link to="/tournaments">
                <Button size="lg" variant="outline" className="border-slate-200 bg-white text-[#0B1F3A] rounded-[2rem] px-10 font-black text-lg h-20 hover:bg-slate-50 transition-all active:scale-95">
                  VIEW CIRCUITS
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Floating Intelligence Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="lg:col-span-5 relative"
          >
            <div className="glass-panel p-10 rounded-[4rem] border-sky-500/20 shadow-[0_50px_100px_rgba(0,0,0,0.1)] space-y-8 bg-white/90">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-[#0B1F3A] text-white flex items-center justify-center shadow-xl">
                    <Zap className="h-7 w-7 text-sky-400 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#0B1F3A] uppercase tracking-widest italic">Live Intelligence</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">BWF Circuit Link</p>
                  </div>
                </div>
                <Radio className="h-5 w-5 text-red-500 animate-pulse" />
              </div>

              <div className="space-y-4">
                 <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center justify-between group hover:border-sky-500 transition-all">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-slate-400 uppercase">Registered Athletes</p>
                       <p className="text-4xl font-black text-[#0B1F3A] tabular-nums group-hover:text-sky-600 transition-colors">{stats.athletes}+</p>
                    </div>
                    <Users className="h-10 w-10 text-slate-200 group-hover:text-sky-500 transition-colors" />
                 </div>
                 <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center justify-between group hover:border-sky-500 transition-all">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-slate-400 uppercase">Global Circuits</p>
                       <p className="text-4xl font-black text-[#0B1F3A] tabular-nums group-hover:text-sky-600 transition-colors">{stats.tourneys}</p>
                    </div>
                    <Globe className="h-10 w-10 text-slate-200 group-hover:text-sky-500 transition-colors" />
                 </div>
              </div>

              <div className="bg-[#0B1F3A] p-6 rounded-3xl text-white flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-sky-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-sky-400">Node Secure: Node_01_SG</span>
                 </div>
                 <TrendingUp className="h-4 w-4 text-green-400" />
              </div>
            </div>
            
            {/* Decorative Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 h-32 w-32 bg-sky-500/10 blur-3xl rounded-full"
            />
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 h-40 w-40 bg-indigo-500/10 blur-3xl rounded-full"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. Platform Intelligence Grid */}
      <section className="py-40 bg-white">
        <div className="container px-6 space-y-20">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <Badge className="bg-sky-500/10 text-sky-600 font-black px-6 py-1 border-none rounded-full uppercase tracking-widest">The Ecosystem</Badge>
            <h2 className="text-6xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-[0.95]">Engineered for <br /> Professional Excellence</h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">A unified infrastructure for scoring, broadcasting, and analytics.</p>
            <div className="h-2 w-24 bg-sky-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureGroups.map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="p-10 rounded-[3.5rem] bg-slate-50 border border-slate-100 hover:border-sky-500/30 transition-all group relative overflow-hidden flex flex-col justify-between h-full"
              >
                <div className="space-y-8">
                  <div className={cn("h-16 w-16 rounded-[1.5rem] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500", f.bg, f.color)}>
                    <f.icon className="h-8 w-8" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-[#0B1F3A] tracking-tight uppercase italic">{f.title}</h3>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
                
                <div className="mt-12 pt-6 border-t border-slate-200/50">
                  <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                    System Active <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Global Reach CTA */}
      <section className="container px-6 py-20">
         <div className="bg-[#0B1F3A] rounded-[4rem] p-16 md:p-24 relative overflow-hidden text-center md:text-left shadow-2xl group">
            <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
               <Trophy className="h-96 w-96 text-white" />
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
               <div className="space-y-10">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                     <Sparkles className="h-8 w-8 text-sky-400 fill-current" />
                     <span className="text-xs font-black text-sky-400 uppercase tracking-[0.4em]">Operational Readiness</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">Start Your <br /> Circuit Today</h2>
                  <p className="text-xl text-white/60 font-medium max-w-lg">Bring professional-grade intelligence to your court. Setup in minutes, scale globally.</p>
                  <Link to="/login" className="inline-block">
                    <Button size="lg" className="bg-sky-500 text-white rounded-full px-12 h-20 font-black text-xl hover:bg-sky-400 shadow-[0_20px_40px_rgba(14,165,233,0.3)] transition-all active:scale-95 border-none">
                      INITIALIZE NOW
                    </Button>
                  </Link>
               </div>
               
               <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 space-y-3 hover:bg-white/10 transition-colors">
                     <p className="text-4xl font-black text-white italic tracking-tighter">100%</p>
                     <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">BWF Protocol Align</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 space-y-3 hover:bg-white/10 transition-colors">
                     <p className="text-4xl font-black text-white italic tracking-tighter">Sub-50ms</p>
                     <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Global Latency</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 space-y-3 hover:bg-white/10 transition-colors">
                     <p className="text-4xl font-black text-white italic tracking-tighter">AI-GEN</p>
                     <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Real-time Intel</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 space-y-3 hover:bg-white/10 transition-colors">
                     <p className="text-4xl font-black text-white italic tracking-tighter">4K-Ready</p>
                     <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Broadcast Core</p>
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