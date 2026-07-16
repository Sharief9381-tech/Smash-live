"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Play, Search, Zap, Radio } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const LiveMatch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [studioMatches, setStudioMatches] = useState<any[]>([]);
  
  const categories = ["All", "Singles", "Doubles"];

  useEffect(() => {
    const loadStudioMatches = () => {
      const active = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
      const formatted = active.map((m: any) => ({
        id: m.id,
        p1: m.players?.p1?.name || (m.players?.tA1?.name ? `${m.players.tA1.name} / ${m.players.tA2.name}` : "Player 1"),
        p2: m.players?.p2?.name || (m.players?.tB1?.name ? `${m.players.tB1.name} / ${m.players.tB2.name}` : "Player 2"),
        score: m.currentScore ? `${m.currentScore[0]}-${m.currentScore[1]}` : "0-0",
        tournament: m.name,
        viewers: "LIVE",
        status: m.status || "Live",
        category: m.matchType === 'singles' ? "Singles" : "Doubles",
        smashId: `STUDIO_${m.id.toString().slice(-4)}`
      }));
      setStudioMatches(formatted);
    };

    loadStudioMatches();
    const interval = setInterval(loadStudioMatches, 1000);
    return () => clearInterval(interval);
  }, []);

  const filtered = useMemo(() => {
    return studioMatches.filter(m => {
      const matchesSearch = m.p1.toLowerCase().includes(query.toLowerCase()) || 
                           m.p2.toLowerCase().includes(query.toLowerCase()) ||
                           m.tournament.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === "All" || m.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [query, activeCategory, studioMatches]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container px-6 py-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-sky-500 fill-current" />
              <span className="text-[10px] font-black text-sky-600 uppercase tracking-[0.4em]">Live Intelligence Network</span>
            </div>
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-none">Match Feed</h1>
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

        <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 border-slate-200 shadow-xl bg-white/50">
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
                       <Radio className="h-3 w-3 text-red-500 animate-pulse" />
                       <span className="text-[10px] font-black text-slate-400 uppercase">Live Broadcast</span>
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
                       <span className="text-5xl font-black font-mono tracking-tighter tabular-nums text-sky-600">
                          {match.score}
                       </span>
                       <Button className="h-14 w-14 rounded-2xl bg-[#0B1F3A] text-white shadow-xl border-none group-hover:bg-sky-500 transition-colors">
                          <Play className="h-6 w-6 fill-current ml-1" />
                       </Button>
                    </div>
                  </div>
                </motion.div>
              )) : (
                <div className="col-span-2 py-32 text-center bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
                  <Activity className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest italic">No Active Studio Matches Found</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveMatch;