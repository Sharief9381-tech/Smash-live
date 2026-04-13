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
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const LiveMatch = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const categories = ["All", "Men's Singles", "Women's Singles", "Men's Doubles", "Women's Doubles", "Mixed Doubles"];

  const matches = [
    { p1: "Viktor Axelsen", p2: "Lee Zii Jia", score: "21-19, 14-11", tournament: "BWF Finals", viewers: "12.4k", status: "Live", category: "Men's Singles", smashId: "LIVE_001" },
    { p1: "An Se-young", p2: "Tai Tzu-ying", score: "21-12, 18-15", tournament: "Jakarta Open", viewers: "8.2k", status: "Live", category: "Women's Singles", smashId: "LIVE_002" },
    { p1: "Jonatan Christie", p2: "Anthony Ginting", score: "0-0", tournament: "Indonesia Master", viewers: "3.1k", status: "Warm-up", category: "Men's Singles", smashId: "LIVE_003" },
    { p1: "Chen/Jia", p2: "Baek/Lee", score: "21-18", tournament: "China Masters", viewers: "5.5k", status: "Live", category: "Women's Doubles", smashId: "LIVE_004" },
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
              <span className="text-[10px] font-black text-sky-600 uppercase tracking-[0.3em]">SMASHED</span>
            </div>
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter uppercase italic">LIVE SCORING</h1>
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
                "whitespace-nowrap px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeCategory === cat 
                  ? "bg-[#0B1F3A] text-white shadow-lg shadow-navy/20" 
                  : "bg-white text-slate-400 border border-slate-100 hover:border-sky-500/50 hover:text-sky-500"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-panel p-10 rounded-[3rem] space-y-8 border-sky-500/10 shadow-sky-500/5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3 italic">
                  <Activity className="h-5 w-5 text-red-500 animate-pulse" /> Live Intelligence Feed
                </h3>
              </div>

              <div className="space-y-4">
                {filtered.length > 0 ? filtered.map((match, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-center justify-between p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-sky-500/30 transition-all group cursor-pointer">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{match.tournament}</p>
                        <Badge variant="outline" className="text-[8px] font-bold border-slate-200">{match.smashId}</Badge>
                        <Badge className="bg-sky-500/10 text-sky-600 border-none text-[8px] font-black">{match.category}</Badge>
                      </div>
                      <div className="font-black text-2xl text-[#0B1F3A] tracking-tight">{match.p1} <span className="text-sky-500">vs</span> {match.p2}</div>
                    </div>
                    <div className="flex items-center gap-8 mt-6 md:mt-0">
                       <span className="text-4xl font-mono font-black text-sky-600 tabular-nums tracking-tighter">{match.score}</span>
                       <Link to={`/broadcast/${match.smashId.toLowerCase()}`}>
                        <Button className="h-16 w-16 rounded-[1.5rem] bg-[#0B1F3A] text-white hover:bg-sky-500 transition-all shadow-xl group-hover:scale-105 border-none">
                           <Play className="h-7 w-7 fill-current" />
                        </Button>
                       </Link>
                    </div>
                  </div>
                )) : (
                  <div className="py-20 text-center bg-slate-100/50 rounded-[3rem] border-2 border-dashed border-slate-200">
                    <Zap className="h-10 w-10 text-slate-200 mx-auto" />
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-4">Nothing In This Court</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Pro Insights */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-10 rounded-[3rem] space-y-8 bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5f] text-white border-none shadow-2xl"
            >
              <div className="space-y-2">
                <Badge className="bg-sky-500 border-none font-black text-[10px]">AI PREDICTION</Badge>
                <h3 className="text-3xl font-black italic tracking-tight">Pro Intelligence</h3>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                    <span>Momentum Shift</span>
                    <TrendingUp className="h-3 w-3 text-sky-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span>V. Axelsen</span>
                      <span className="text-sky-400">84%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500" style={{ width: '84%' }} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60">Hot Stats Today</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                      <p className="text-3xl font-black">410</p>
                      <p className="text-[8px] font-bold uppercase tracking-widest opacity-40">Peak Smash (km/h)</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                      <p className="text-3xl font-black">1.2B</p>
                      <p className="text-[8px] font-bold uppercase tracking-widest opacity-40">Data Points</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full h-16 bg-sky-500 text-white font-black rounded-2xl hover:bg-sky-400 border-none group text-lg shadow-xl shadow-sky-500/20">
                UPGRADE TO PRO <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveMatch;