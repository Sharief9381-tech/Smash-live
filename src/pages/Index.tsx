"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Activity, Trophy, Users, 
  Zap, TrendingUp, Monitor,
  ShieldCheck, Globe, CheckCircle2,
  Radio, Target, Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 overflow-x-hidden">
      <Navbar />
      
      {/* 1. HERO REBUILD */}
      <section className="relative flex flex-col items-center pt-16 pb-12 px-6 space-y-12">
        <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-primary/10 to-transparent -z-10 pointer-events-none" />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-card border border-white/5 shadow-xl">
             <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-white">Registry Active • 12M Syncs</span>
          </div>

          <div className="space-y-4">
             <h1 className="text-7xl md:text-9xl font-black italic uppercase leading-[0.85] tracking-tighter">
                Smash<br/>
                <span className="text-primary italic">Live</span>
             </h1>
             <p className="text-lg md:text-2xl text-muted-foreground font-medium max-w-sm mx-auto uppercase tracking-tight leading-snug">
                The ultimate intelligence ecosystem for <span className="text-white font-black underline decoration-primary decoration-4">Indian University</span> athletes.
             </p>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
             <Link to="/login">
                <Button className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black text-lg uppercase shadow-2xl orange-glow group">
                   Enter Arena <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Button>
             </Link>
             <Link to="/tournaments">
                <Button variant="outline" className="w-full h-16 rounded-2xl border-white/5 bg-card/50 backdrop-blur-xl font-black text-xs uppercase tracking-widest">
                   Explore Circuits
                </Button>
             </Link>
          </div>
        </motion.div>

        {/* Dynamic App Preview */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm">
           <div className="bg-card border border-white/10 rounded-[3rem] p-8 space-y-8 shadow-[0_40px_80px_rgba(0,0,0,0.4)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                 <Zap className="h-40 w-40 fill-primary text-primary" />
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-6 relative z-10">
                 <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                       <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                       <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.3em]">Network Pulse</p>
                       <p className="text-xs font-black uppercase italic">Dossier ID: ACTIVE_X</p>
                    </div>
                 </div>
                 <Badge className="bg-secondary text-white font-black text-[8px] px-3 border-none">99.9% UPTIME</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 relative z-10">
                 <div className="bg-muted/20 p-6 rounded-[2rem] border border-white/5 space-y-2">
                    <p className="text-[8px] font-black text-muted-foreground uppercase">Sync Points</p>
                    <p className="text-3xl font-black text-white italic">84.2M</p>
                 </div>
                 <div className="bg-muted/20 p-6 rounded-[2rem] border border-white/5 space-y-2">
                    <p className="text-[8px] font-black text-muted-foreground uppercase">Latency</p>
                    <p className="text-3xl font-black text-secondary italic">{"<42ms"}</p>
                 </div>
              </div>
           </div>
        </motion.div>
      </section>

      {/* 2. VALUE PROPS */}
      <section className="py-20 px-6 space-y-12">
         <div className="text-center space-y-2">
            <h2 className="text-3xl font-black italic uppercase">Core Intelligence</h2>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">Engineered for high performance</p>
         </div>

         <div className="grid grid-cols-1 gap-6">
            {[
              { title: "Live Scoring", desc: "Instant sync across all university nodes with sub-50ms delay.", icon: Radio, color: "text-primary" },
              { title: "Circuit Engine", desc: "Automated bracket generation and athlete seeding system.", icon: Trophy, color: "text-secondary" },
              { title: "Athlete Dossier", desc: "Professional career tracking with verified BWF-style ranks.", icon: Target, color: "text-primary" },
            ].map((item, i) => (
              <div key={i} className="bg-card p-8 rounded-[2.5rem] border border-white/5 flex flex-col items-center text-center gap-6 group hover:border-primary/20 transition-all">
                 <div className={cn("h-16 w-16 rounded-3xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform", item.color)}>
                    <item.icon className="h-8 w-8" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-xl font-black uppercase italic">{item.title}</h3>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest leading-relaxed">{item.desc}</p>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* 3. MOBILE FIRST PROMO */}
      <section className="py-20 px-6 bg-card border-y border-white/5 relative overflow-hidden">
         <div className="absolute -left-20 top-0 opacity-5 pointer-events-none">
            <Smartphone className="h-96 w-96 text-primary" />
         </div>
         <div className="relative z-10 space-y-8 text-center">
            <Badge className="bg-secondary text-white font-black px-6 py-2 border-none text-[8px] uppercase tracking-[0.3em] rounded-full">Device Optimized</Badge>
            <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">Designed for Your Thumb</h2>
            <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-sm mx-auto uppercase tracking-tight">
               Referees score on phone. Players track on phone. Organizers manage on phone.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6">
               <div className="space-y-1">
                  <p className="text-2xl font-black text-white italic leading-none">100%</p>
                  <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Mobile First</p>
               </div>
               <div className="space-y-1">
                  <p className="text-2xl font-black text-primary italic leading-none">0</p>
                  <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Compromise</p>
               </div>
               <div className="space-y-1">
                  <p className="text-2xl font-black text-white italic leading-none">PRO</p>
                  <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Performance</p>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;