"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Activity, Trophy, Users, 
  Target, Globe, Radio, Zap, Bell, Flame,
  TrendingUp, ShieldCheck, Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Index = () => {
  const modules = [
    { title: "Real-time Intelligence", icon: Activity, desc: "Symphonic data synchronization across global nodes." },
    { title: "Strategic Analysis", icon: Zap, desc: "Neural networks decoding every court movement." },
    { title: "Global Circuit", icon: Trophy, desc: "Comprehensive tracking of professional tournament history." },
    { title: "Player Registry", icon: Users, desc: "An exhaustive archive of professional performance metrics." }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Editorial Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="container px-6">
          <div className="max-w-4xl space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="space-y-6"
            >
              <Badge variant="outline" className="rounded-full px-4 py-1 border-black/10 text-black/50 font-medium tracking-widest uppercase text-[10px]">
                Global Intelligence Report 2024
              </Badge>
              <h1 className="text-7xl md:text-8xl font-serif text-foreground leading-[1.05] tracking-tight">
                The future of <br />
                <span className="italic text-primary">Badminton.</span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-2xl text-foreground/70 font-light max-w-2xl leading-relaxed"
            >
              SmashLive is a sophisticated ecosystem designed to unify global analytics, 
              live broadcasting, and tournament management into a single, seamless experience.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-6 items-center"
            >
              <Link to="/tournaments">
                <Button size="lg" className="bg-foreground text-background rounded-none px-10 h-16 font-medium text-lg hover:bg-primary transition-all shadow-lg border-none">
                  Enter Circuit
                </Button>
              </Link>
              <Link to="/login" className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 group">
                Request Access <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Structured Modules Section */}
      <section className="py-24 border-t border-black/5">
        <div className="container px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-1">
          {modules.map((m, i) => (
            <motion.div 
              key={i}
              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
              className="p-12 space-y-8 border-r border-black/5 last:border-none"
            >
              <m.icon className="h-6 w-6 text-primary/40" />
              <div className="space-y-4">
                <h3 className="text-xl font-serif">{m.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Large Scale Feature Section */}
      <section className="py-24 bg-foreground text-background">
        <div className="container px-6 grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-serif italic">Unprecedented <br /> Visibility.</h2>
            <p className="text-lg text-background/60 font-light leading-relaxed">
              Our ultra-low latency broadcasting technology ensures that every point is 
              delivered with mathematical precision to millions of screens worldwide.
            </p>
            <div className="pt-8 grid grid-cols-2 gap-12 border-t border-white/10">
              <div>
                <p className="text-4xl font-serif">12.4M</p>
                <p className="text-[10px] uppercase tracking-widest text-background/40 mt-2">Active Nodes</p>
              </div>
              <div>
                <p className="text-4xl font-serif">99.8%</p>
                <p className="text-[10px] uppercase tracking-widest text-background/40 mt-2">Uptime Reliability</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-square editorial-card overflow-hidden bg-white/5">
            <img 
              src="https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-full object-cover opacity-40 grayscale" 
              alt="Performance focus"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-20 w-20 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
                <Play className="h-6 w-6 fill-white" />
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