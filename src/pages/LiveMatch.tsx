"use client";

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Play, 
  Search, 
  Zap,
  TrendingUp,
  ArrowRight,
  Globe,
  Radio
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const LiveMatch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = ["All", "Men's Singles", "Women's Singles", "Men's Doubles", "Mixed Doubles"];

  const matches = [
    { id: "bwf_01", p1: "Viktor Axelsen", p2: "Lee Zii Jia", score: "21-19, 14-11", tournament: "BWF Finals", viewers: "12.4k", status: "Live", category: "Men's Singles", smashId: "LIVE_001" },
    { id: "bwf_02", p1: "An Se-young", p2: "Tai Tzu-ying", score: "21-12, 18-15", tournament: "Jakarta Open", viewers: "8.2k", status: "Live", category: "Women's Singles", smashId: "LIVE_002" },
    { id: "bwf_03", p1: "Jonatan Christie", p2: "Anthony Ginting", score: "0-0", tournament: "Indonesia Master", viewers: "3.1k", status: "Warm-up", category: "Men's Singles", smashId: "LIVE_003" },
    { id: "bwf_04", p1: "Chen/Jia", p2: "Baek/Lee", score: "21-18", tournament: "China Masters", viewers: "5.5k", status: "Live", category: "Women's Doubles", smashId: "LIVE_004" },
  ];

  const filtered = useMemo(() => {
    return matches.filter(m => {
      const matchesSearch = m.p1.toLowerCase().includes(query.toLowerCase()) || 
                           m.p2.toLowerCase().includes(query.toLowerCase()) ||
                           m.tournament.toLowerCase().includes(query.toLowerCase()) ||
                           m.smashId.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === "All" || m.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container px-6 py-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-sky-500 fill-current" />
              <span className="text-[10px] font-black text-sky-600 uppercase tracking-[0.4em]">Operational Broadcast Network</span>
            </div>
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-none">Global Live Scopes</h1>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Search Live Intelligence..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-14 pl-12 bg-white border-slate-200 rounded-[2rem] font-bold focus:border-sky-500 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Category Nav Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "whitespace-nowrap px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeCategory === cat 
                  ? "bg-[#0B1F3A] text-white shadow-xl shadow-navy/20" 
                  : "bg-white text-slate-400 border border-slate-100 hover:border-sky-500/50 hover:text-sky-500"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 border-sky-500/10 shadow-sky-500/5">
              <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3 italic">
                  <Activity className="h-5 w-5 text-red-500 animate-pulse" /> Live Feed
                </h3>
                <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Channels: {filtered.length}</span>
                </div>
              </div>

              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {filtered.length > 0 ? filtered.map((match, i) => (
                    <motion.div 
                      layout
                      key={match.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      whileHover={{ x: 10 }}
                      onClick={() => navigate(`/broadcast/${match.id}`)}
                      className="flex flex-col md:flex-row items-center justify-between p-10 rounded-[3rem] bg-white border border-slate-100 hover:border-sky-500/40 transition-all group cursor-pointer shadow-sm hover:shadow-2xl"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-sky-500/10 text-sky-600 border-none text-[9px] font-black uppercase px-3">{match.category}</Badge>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{match.tournament} • {match.smashId}</p>
                        </div>
                        <div className="font-black text-3xl text-[#0B1F3A] tracking-tighter uppercase italic">
                          {match.p1} <span className="text-sky-500 opacity-40">VS</span> {match.p2}
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                           <span className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> High Definition Link</span>
                           <span className="flex items-center gap-1.5 text-sky-500"><TrendingUp className="h-3.5 w-3.5" /> {match.viewers} Viewers</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-10 mt-8 md:mt-0">
                         <span className="text-5xl font-black font-mono text-[#0B1F3A] tracking-tighter tabular-nums group-hover:text-sky-600 transition-colors">{match.score}</span>
                         <Button className="h-20 w-20 rounded-[2.5rem] bg-[#0B1F3A] text-white hover:bg-sky-500 transition-all shadow-2xl border-none group-hover:scale-110">
                            <Play className="h-8 w-8 fill-current ml-1" />
                         </Button>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="py-32 text-center bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
                      <Radio className="h-12 w-12 text-slate-200 mx-auto animate-pulse" />
                      <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-6 italic">No Active Broadcasts Found</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0B1F3A] p-12 rounded-[4rem] text-white space-y-8 relative overflow-hidden group shadow-2xl">
              <div className="absolute -right-20 -bottom-20 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                <Radio className="h-80 w-80 text-sky-400" />
              </div>
              
              <div className="space-y-6 relative z-10">
                <Badge className="bg-sky-500 border-none font-black text-[10px] px-4 py-1.5">INTELLIGENCE PRO</Badge>
                <div className="space-y-2">
                  <h3 className="text-4xl font-black italic tracking-tighter leading-none">Broadcast Control</h3>
                  <p className="text-sm font-medium text-white/50">Access court heatmaps and prediction AI for live matches.</p>
                </div>
                <Link to="/broadcast/center" className="block">
                  <Button className="w-full h-16 bg-white text-[#0B1F3A] font-black rounded-2xl hover:bg-sky-500 hover:text-white transition-all shadow-2xl border-none text-lg">
                    LAUNCH STUDIO <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 shadow-xl">
              <div className="space-y-1">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0B1F3A]">Network Stability</h4>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-bold text-[#0B1F3A]">99.9% Global Uptime</span>
                </div>
              </div>
              <div className="space-y-6 pt-4 border-t border-slate-100">
                 {[
                   { label: "Data Latency", val: "42ms", icon: Zap, color: "text-amber-500" },
                   { label: "Active Nodes", val: "24 Servers", icon: Globe, color: "text-sky-500" },
                 ].map((stat, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <stat.icon className={cn("h-4 w-4", stat.color)} />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                      </div>
                      <span className="text-sm font-black text-[#0B1F3A]">{stat.val}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveMatch;