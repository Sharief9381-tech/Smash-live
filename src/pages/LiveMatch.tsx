"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Play, Search, Zap, Globe, Radio } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const LiveMatch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [studioMatches, setStudioMatches] = useState<any[]>([]);
  
  const categories = ["All", "Men's Singles", "Women's Singles", "Men's Doubles", "Mixed Doubles"];
  
  const baseMatches = [
    { 
      id: "pro_001", 
      p1: "Viktor Axelsen", 
      p2: "Shi Yuqi", 
      score: "21-19, 14-11", 
      tournament: "BWF World Tour Finals", 
      viewers: "1.2M", 
      status: "Live", 
      category: "Men's Singles", 
      smashId: "MS_CORE_01" 
    },
    { 
      id: "pro_002", 
      p1: "An Se-young", 
      p2: "Tai Tzu-ying", 
      score: "21-12, 18-20, 5-2", 
      tournament: "BWF World Tour Finals", 
      viewers: "840K", 
      status: "Live", 
      category: "Women's Singles", 
      smashId: "WS_CORE_01" 
    },
    { 
      id: "pro_003", 
      p1: "Lee Zii Jia", 
      p2: "Jonatan Christie", 
      score: "0-0", 
      tournament: "BWF World Tour Finals", 
      viewers: "450K", 
      status: "Upcoming", 
      category: "Men's Singles", 
      smashId: "MS_CORE_02" 
    }
  ];

  useEffect(() => {
    const loadStudioMatches = () => {
      const active = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
      const formatted = active.map((m: any) => ({
        id: m.id,
        p1: m.players.p1?.name || "Player 1",
        p2: m.players.p2?.name || "Player 2",
        score: m.currentScore ? `${m.currentScore[0]}-${m.currentScore[1]}` : "0-0",
        tournament: m.name,
        viewers: "User Hosted",
        status: "Live",
        category: m.matchType === 'singles' ? "Men's Singles" : "Doubles",
        smashId: `STUDIO_${m.id.slice(-4)}`,
        isStudioMatch: true
      }));
      setStudioMatches(formatted);
    };

    loadStudioMatches();
    const interval = setInterval(loadStudioMatches, 1000);
    return () => clearInterval(interval);
  }, []);

  const allMatches = useMemo(() => [...studioMatches, ...baseMatches], [studioMatches]);

  const filtered = useMemo(() => {
    return allMatches.filter(m => {
      const matchesSearch = m.p1.toLowerCase().includes(query.toLowerCase()) || 
                           m.p2.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === "All" || m.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [query, activeCategory, allMatches]);

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

        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "whitespace-nowrap px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeCategory === cat ? "bg-[#0B1F3A] text-white shadow-xl" : "bg-white text-slate-400 border border-slate-100"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-12 space-y-8">
            <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 border-slate-200 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3 italic">
                  <Activity className="h-5 w-5 text-red-500 animate-pulse" /> Live Network Stream
                </h3>
                <div className="flex items-center gap-2">
                   <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Sync Active</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <AnimatePresence mode="popLayout">
                  {filtered.length > 0 ? filtered.map((match) => (
                    <motion.div 
                      layout
                      key={match.id}
                      onClick={() => navigate(`/broadcast/${match.id}`)}
                      className="flex flex-col items-stretch p-8 rounded-[3rem] border border-slate-100 bg-white transition-all group cursor-pointer hover:border-sky-500/40 hover:shadow-2xl"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <Badge className="bg-[#0B1F3A] text-white border-none text-[9px] font-black uppercase px-4 h-6">{match.category}</Badge>
                        <div className="flex items-center gap-2">
                           <Radio className="h-3 w-3 text-red-500" />
                           <span className="text-[10px] font-black text-slate-400 uppercase">{match.viewers} Viewers</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest">{match.tournament}</p>
                          <div className="font-black text-2xl text-[#0B1F3A] tracking-tighter uppercase italic leading-none">
                            {match.p1} <br />
                            <span className="text-sky-500 opacity-20 text-sm">VS</span> <br />
                            {match.p2}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-6">
                           <span className="text-5xl font-black font-mono tracking-tighter tabular-nums text-sky-600 group-hover:scale-110 transition-transform">
                              {match.score}
                           </span>
                           <Button className="h-14 w-14 rounded-2xl bg-[#0B1F3A] text-white shadow-xl border-none group-hover:bg-sky-500 transition-colors">
                              <Play className="h-6 w-6 fill-current ml-1" />
                           </Button>
                        </div>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                         <span className="text-[9px] font-black text-slate-300 uppercase">Smash ID: {match.smashId}</span>
                         <span className="text-[9px] font-black text-sky-500 uppercase flex items-center gap-1">
                           <Zap className="h-3 w-3 fill-current" /> Dynamic Intelligence Active
                         </span>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="col-span-2 py-32 text-center bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
                      <Radio className="h-12 w-12 text-slate-200 mx-auto animate-pulse" />
                      <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-6 italic">Searching Global Broadcast Matrix...</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveMatch;