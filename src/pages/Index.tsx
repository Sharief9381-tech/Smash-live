"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Activity, Trophy, Users, 
  Target, Globe, Radio, Zap, Bell, Flame,
  TrendingUp, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Index = () => {
  const modules = [
    { title: "Live Match Scoring", icon: Activity, features: ["Real-time synchronization", "Dynamic court tracking"] },
    { title: "AI Commentary", icon: Zap, features: ["Context-aware analysis", "Highlight detection"] },
    { title: "Tournament Hub", icon: Trophy, features: ["Auto-bracket generation", "Global circuit tracking"] },
    { title: "Player Registry", icon: Users, features: ["Career performance", "Official BWF integration"] },
    { title: "Live Broadcast", icon: Radio, features: ["Ultra-low latency", "Interactive overlays"] },
    { title: "Notifications", icon: Bell, features: ["Instant score alerts", "Match reminders"] },
    { title: "Global Rankings", icon: Globe, features: ["Real-time ladder updates", "National dominance"] },
    { title: "Targeted Intelligence", icon: Target, features: ["Shot accuracy tracking", "Momentum mapping"] },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* High-Impact Hero Section */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden py-20 bg-slate-50/50">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-sky-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[#0B1F3A]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="container px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0B1F3A]">Network Online • 12M Viewers</span>
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
              Unifying the badminton ecosystem through <span className="text-[#0B1F3A] font-black underline decoration-sky-500 decoration-4">AI-driven intelligence</span> and ultra-low latency broadcasting.
            </p>

            <div className="flex flex-wrap gap-4 pt-6">
              <Link to="/tournaments">
                <Button size="lg" className="bg-[#0B1F3A] text-white rounded-[1.5rem] px-8 font-black text-lg h-16 hover:bg-[#0B1F3A]/90 transition-all hover:translate-y-[-4px] shadow-2xl border-none group">
                  SMASH IT <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-slate-200 text-[#0B1F3A] rounded-[1.5rem] px-8 font-black text-lg h-16 hover:bg-white hover:border-sky-500 transition-all">
                  JOIN NOW
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="relative"
          >
            <div className="glass-panel p-10 rounded-[4rem] border-sky-500/20 shadow-[0_40px_80px_rgba(0,0,0,0.08)] space-y-10 bg-white/80 backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-3xl bg-[#0B1F3A] text-white flex items-center justify-center shadow-lg shadow-sky-500/20">
                    <TrendingUp className="h-8 w-8 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#0B1F3A] uppercase tracking-[0.2em]">Global Intel Matrix</h4>
                    <p className="text-[10px] font-bold text-slate-400">SESSION ID: LIVE_BROADCAST_X</p>
                  </div>
                </div>
                <Badge className="bg-red-500 text-white animate-pulse border-none h-8 px-5 text-xs font-black rounded-full">LIVE FEED</Badge>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 p-8 rounded-[2.5rem] space-y-4 border border-slate-100 group hover:border-sky-500/30 transition-all">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Users className="h-4 w-4" /> Network Reach
                  </div>
                  <p className="text-4xl font-black text-[#0B1F3A] group-hover:text-sky-600 transition-colors">12.4M+</p>
                  <p className="text-[10px] text-green-500 font-bold bg-green-500/10 w-fit px-2 py-1 rounded-md">+24.2% Today</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-[2.5rem] space-y-4 border border-slate-100 group hover:border-sky-500/30 transition-all">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <Zap className="h-4 w-4 text-sky-500 fill-sky-500" /> AI Accuracy
                  </div>
                  <p className="text-4xl font-black text-[#0B1F3A] group-hover:text-sky-600 transition-colors">99.8%</p>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-sky-500" />
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Official BWF Link</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#0B1F3A] p-8 rounded-[3rem] relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 group-hover:scale-125 transition-transform duration-700">
                  <Trophy className="h-40 w-40 text-white" />
                </div>
                <div className="space-y-6 relative z-10">
                  <div className="space-y-1">
                    <p className="text-[11px] font-black text-sky-400 uppercase tracking-[0.3em]">CHAMPIONSHIP CIRCUIT</p>
                    <h3 className="text-3xl font-black text-white italic tracking-tighter">BWF World Tour Finals</h3>
                  </div>
                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-10 w-10 rounded-full border-4 border-[#0B1F3A] bg-slate-200 overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?u=${i}`} className="w-full h-full object-cover" alt="" />
                        </div>
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-white/60">32 Elite Players Registered</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 bg-white relative">
        <div className="container px-6 space-y-20">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-5xl font-black text-[#0B1F3A] tracking-tighter uppercase italic">Platform Intelligence</h2>
            <p className="text-slate-500 font-medium text-lg">Every module is engineered for professional speed and tactical accuracy.</p>
            <div className="h-1.5 w-24 bg-sky-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {modules.map((m, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -12 }}
                className="glass-panel p-10 rounded-[3rem] hover:border-sky-500/40 transition-all group relative overflow-hidden"
              >
                <div className="h-16 w-16 rounded-3xl bg-[#0B1F3A]/5 text-[#0B1F3A] flex items-center justify-center mb-8 group-hover:bg-[#0B1F3A] group-hover:text-white transition-all duration-500">
                  <m.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-black text-[#0B1F3A] mb-6 tracking-tight">{m.title}</h3>
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

      <Footer />
    </div>
  );
};

export default Index;