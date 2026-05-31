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
    { title: "Live Scoring", icon: Activity, features: ["Real-time sync", "Court tracking"] },
    { title: "AI Commentary", icon: Zap, features: ["Context analysis", "Highlights"] },
    { title: "Tournament Hub", icon: Trophy, features: ["Auto-brackets", "Circuit tracking"] },
    { title: "Player Registry", icon: Users, features: ["Career stats", "Official ID"] },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Refined Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden py-16 bg-slate-50/50">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-sky-500/5 blur-[100px] rounded-full" />
        
        <div className="container px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
              <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0B1F3A]">Network Live • 12M Active</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-6xl md:text-7xl font-black text-[#0B1F3A] leading-[0.9] tracking-tighter uppercase italic">
                SMASH <br />
                <span className="text-sky-500">LIVE</span>
              </h1>
              <div className="h-1.5 w-20 bg-sky-500 rounded-full" />
            </div>

            <p className="text-lg text-slate-500 font-medium max-w-md leading-relaxed">
              Unifying the badminton ecosystem through AI-driven intelligence and professional broadcasting.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/tournaments">
                <Button className="bg-[#0B1F3A] text-white rounded-xl px-6 h-12 font-black text-xs group">
                  SMASH IT <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="border-slate-200 text-[#0B1F3A] rounded-xl px-6 h-12 font-black text-xs">
                  JOIN NOW
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="relative lg:block hidden">
            <div className="glass-panel p-8 rounded-[3rem] border-slate-100 shadow-xl space-y-8 bg-white/80">
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-[#0B1F3A] text-white flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-[#0B1F3A] uppercase tracking-widest">Global Matrix</h4>
                    <p className="text-[8px] font-bold text-slate-400">SESSION: LIVE_SCOPE</p>
                  </div>
                </div>
                <Badge className="bg-red-500 text-white font-black px-3 h-6 text-[9px]">LIVE</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Network</p>
                  <p className="text-2xl font-black text-[#0B1F3A]">12.4M</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Accuracy</p>
                  <p className="text-2xl font-black text-[#0B1F3A]">99.8%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {modules.map((m, i) => (
              <div key={i} className="glass-panel p-8 rounded-[2.5rem] border-slate-100 group">
                <div className="h-12 w-12 rounded-2xl bg-slate-50 text-[#0B1F3A] flex items-center justify-center mb-6 group-hover:bg-[#0B1F3A] group-hover:text-white transition-all">
                  <m.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-black text-[#0B1F3A] mb-3">{m.title}</h3>
                <ul className="space-y-2">
                  {m.features.map((f, j) => (
                    <li key={j} className="text-[10px] font-bold text-slate-400 flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-sky-500" /> {f}
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