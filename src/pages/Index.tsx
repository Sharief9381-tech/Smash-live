"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardPreview from '@/components/landing/DashboardPreview';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Activity, Trophy, Users, 
  Target, Globe, BarChart3, Radio, 
  Zap, Bell, ShieldCheck, Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Index = () => {
  const modules = [
    { title: "Live Match Scoring", icon: Activity, features: ["Real-time synchronization", "Dynamic court tracking"] },
    { title: "AI Commentary", icon: Zap, features: ["Context-aware analysis", "Highlight detection"] },
    { title: "Tournament Management", icon: Trophy, features: ["Auto-bracket generation", "Player seeding"] },
    { title: "Player Profiles", icon: Users, features: ["Career performance", "Skill breakdown"] },
    { title: "Analytics Dashboard", icon: BarChart3, features: ["Heatmap tracking", "Win probability"] },
    { title: "Live Broadcast", icon: Radio, features: ["Ultra-low latency", "Interactive overlays"] },
    { title: "Notifications", icon: Bell, features: ["Instant score alerts", "Match reminders"] },
    { title: "Rankings", icon: Globe, features: ["Global BWF integration", "Local club ladders"] },
  ];

  const whyChoose = [
    { title: "AI Powered Commentary", icon: Flame },
    { title: "Global Broadcasting", icon: Radio },
    { title: "Real-Time Insights", icon: Activity },
    { title: "Player Intelligence", icon: Target },
    { title: "Performance Analytics", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden py-20">
        <div className="container px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 text-sky-600">
              <Zap className="h-4 w-4 fill-current" />
              <span className="text-xs font-black uppercase tracking-widest">Enterprise Sports Tech</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-[#0B1F3A] leading-[1.05] tracking-tighter">
              The Future of <br />
              <span className="text-sky-500">Badminton Live</span> <br />
              Intelligence
            </h1>
            <p className="text-xl text-slate-500 font-medium max-w-lg leading-relaxed">
              Live scores, AI commentary, player analytics, tournament management, and match insights — all in one unified platform.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/tournaments">
                <Button size="lg" className="bg-[#0B1F3A] text-white rounded-full px-8 font-black text-lg h-16 hover:bg-[#0B1F3A]/90 transition-all hover:translate-y-[-2px] shadow-xl">
                  Explore Platform <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-slate-200 text-[#0B1F3A] rounded-full px-8 font-black text-lg h-16 hover:bg-slate-50">
                Join Now
              </Button>
            </div>
          </motion.div>

          <div className="relative">
             <DashboardPreview />
          </div>
        </div>
      </section>

      {/* Platform Modules */}
      <section className="py-32 bg-slate-50/50">
        <div className="container px-6 space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-[#0B1F3A] tracking-tighter uppercase">Platform Modules</h2>
            <div className="h-1.5 w-20 bg-sky-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((m, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="glass-panel p-8 rounded-[2rem] hover:border-sky-500/40 transition-all group"
              >
                <div className="h-14 w-14 rounded-2xl bg-[#0B1F3A]/5 text-[#0B1F3A] flex items-center justify-center mb-6 group-hover:bg-[#0B1F3A] group-hover:text-white transition-colors">
                  <m.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-black text-[#0B1F3A] mb-4">{m.title}</h3>
                <ul className="space-y-2">
                  {m.features.map((f, j) => (
                    <li key={j} className="text-xs font-bold text-slate-400 flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-sky-500" /> {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-32">
        <div className="container px-6 space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-[#0B1F3A] tracking-tighter uppercase">Why Choose SmashLive</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">Unrivaled precision and performance tracking designed for the modern badminton era.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {whyChoose.map((w, i) => (
              <div key={i} className="text-center space-y-6 group">
                <div className="mx-auto h-20 w-20 rounded-full border border-slate-100 flex items-center justify-center text-[#0B1F3A] bg-white group-hover:border-sky-500/50 group-hover:shadow-lg transition-all">
                  <w.icon className="h-8 w-8" />
                </div>
                <h4 className="text-sm font-black text-[#0B1F3A] uppercase tracking-widest">{w.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Broadcast Section */}
      <section className="py-32 bg-[#0B1F3A] overflow-hidden relative">
        <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
          <Globe className="h-[400px] w-[400px] text-sky-400" />
        </div>
        
        <div className="container px-6 space-y-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <Badge className="bg-sky-500 text-white font-black px-4 py-1">LIVE BROADCAST</Badge>
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Watch Live Broadcasts</h2>
            </div>
            <Link to="/tournaments" className="text-sky-400 font-black text-sm uppercase tracking-[0.2em] flex items-center gap-2 hover:text-sky-300 transition-colors">
              Explore All Streams <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { players: "V. Axelsen vs L. Zii Jia", score: "21-19, 14-11", status: "Live", img: "https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop" },
              { players: "An Se-young vs T. Tzu-ying", score: "21-12, 18-15", status: "Live", img: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop" },
              { players: "J. Christie vs A. Ginting", score: "Upcoming", status: "Scheduled", img: "https://images.unsplash.com/photo-1613918108466-292b78a8ef95?q=80&w=2070&auto=format&fit=crop" },
            ].map((match, i) => (
              <div key={i} className="group relative rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 hover:border-sky-500/50 transition-all">
                <div className="aspect-video overflow-hidden">
                  <img src={match.img} alt="" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4">
                    <Badge className={match.status === 'Live' ? 'bg-red-500' : 'bg-sky-500'}>{match.status}</Badge>
                  </div>
                </div>
                <div className="p-8 space-y-2">
                  <h4 className="text-xl font-black text-white">{match.players}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-mono font-black text-sky-400">{match.score}</span>
                    <Button size="icon" className="h-10 w-10 rounded-full bg-white text-[#0B1F3A] hover:bg-sky-500 hover:text-white transition-all">
                      <PlayIcon className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const PlayIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export default Index;