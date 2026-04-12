"use client";

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  History, Play, Activity, 
  Users, MapPin, Zap, Globe, Search,
  TrendingUp, Target, ArrowRight
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
    { p1: "Viktor Axelsen", p2: "Lee Zii Jia", score: "21-19, 14-11", tournament: "BWF Finals", viewers: "12.4k", status: "Live", category: "Men's Singles" },
    { p1: "An Se-young", p2: "Tai Tzu-ying", score: "21-12, 18-15", tournament: "Jakarta Open", viewers: "8.2k", status: "Live", category: "Women's Singles" },
    { p1: "Jonatan Christie", p2: "Anthony Ginting", score: "0-0", tournament: "Indonesia Master", viewers: "3.1k", status: "Warm-up", category: "Men's Singles" },
    { p1: "Chen/Jia", p2: "Baek/Lee", score: "21-18", tournament: "China Masters", viewers: "5.5k", status: "Live", category: "Women's Doubles" },
  ];

  const filtered = useMemo(() => {
    return matches.filter(m => {
      const matchesSearch = m.p1.toLowerCase().includes(query.toLowerCase()) || 
                           m.p2.toLowerCase().includes(query.toLowerCase()) ||
                           m.tournament.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === "All" || m.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">Active Intelligence</span>
                </div>
                <h1 className="text-4xl font-black text-[#0B1F3A] tracking-tighter">Live Match Dashboard</h1>
              </div>
              
              <div className="flex gap-4 w-full md:w-auto">
                 <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      placeholder="Smash Here" 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="h-12 pl-11 bg-white border-slate-200 rounded-xl font-bold"
                    />
                 </div>
              </div>
            </div>

            {/* Category Nav Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "whitespace-nowrap px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all",
                    activeCategory === cat 
                      ? "bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-lg" 
                      : "bg-white text-slate-400 border-slate-200 hover:border-sky-500 hover:text-sky-500"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 border-sky-500/10 shadow-sky-500/5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3 italic">
                  <Activity className="h-5 w-5 text-red-500" /> Active Global Courts
                </h3>
              </div>

              <div className="space-y-4">
                {filtered.length > 0 ? filtered.map((match, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-center justify-between p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-sky-500/30 transition-all group cursor-pointer">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{match.tournament}</p>
                        <Badge className="bg-sky-500/10 text-sky-600 border-none text-[8px] font-black">{match.category}</Badge>
                      </div>
                      <div className="font-black text-xl text-[#0B1F3A]">{match.p1} <span className="text-sky-500">vs</span> {match.p2}</div>
                    </div>
                    <div className="flex items-center gap-8 mt-6 md:mt-0">
                       <span className="text-3xl font-mono font-black text-sky-600 tabular-nums">{match.score}</span>
                       <Link to="/broadcast/live">
                        <Button className="h-14 w-14 rounded-2xl bg-[#0B1F3A] text-white hover:bg-sky-500 transition-all shadow-xl group-hover:scale-105">
                           <Play className="h-6 w-6 fill-current" />
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
              className="glass-panel p-8 rounded-[3rem] space-y-8 bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5f] text-white border-none shadow-2xl"
            >
              <div className="space-y-2">
                <Badge className="bg-sky-500 border-none font-black text-[10px]">AI PREDICTION</Badge>
                <h3 className="text-2xl font-black italic tracking-tight">Pro Intelligence</h3>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                    <span>Momentum Shift</span>
                    <TrendingUp className="h-3 w-3 text-sky-400" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
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
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                      <p className="text-2xl font-black">410</p>
                      <p className="text-[8px] font-bold uppercase tracking-widest opacity-40">Peak Smash (km/h)</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                      <p className="text-2xl font-black">1.2B</p>
                      <p className="text-[8px] font-bold uppercase tracking-widest opacity-40">Data Points</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full h-14 bg-sky-500 text-white font-black rounded-2xl hover:bg-sky-400 border-none group">
                UPGRADE TO PRO <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <div className="glass-panel p-8 rounded-[3rem] space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0B1F3A]">Court Distribution</h4>
              <div className="space-y-4">
                {[
                  { label: "Asia-Pacific", val: "62%", color: "bg-sky-500" },
                  { label: "Europe", val: "24%", color: "bg-[#0B1F3A]" },
                  { label: "Americas", val: "14%", color: "bg-slate-200" },
                ].map((item, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                      <span>{item.label}</span>
                      <span className="text-[#0B1F3A]">{item.val}</span>
                    </div>
                    <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className={cn("h-full", item.color)} style={{ width: item.val }} />
                    </div>
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