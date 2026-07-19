"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Play, Search, Zap, Radio, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, isCloudConfigured } from '@/lib/supabase';

const LiveMatch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [liveTournaments, setLiveTournaments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const categories = ["All", "Matches", "Tournaments"];

  useEffect(() => {
    const fetchLiveData = async () => {
      if (!isCloudConfigured) {
        setIsLoading(false);
        return;
      }

      try {
        const { data: matches } = await supabase.from('matches').select('*').eq('status', 'live');
        const { data: tourneys } = await supabase.from('tournaments').select('*').neq('status', 'Completed');

        if (matches) setLiveMatches(matches);
        if (tourneys) setLiveTournaments(tourneys);
      } catch (err) {
        console.warn("Sync error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveData();
    const interval = setInterval(fetchLiveData, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredItems = useMemo(() => {
    const matches = liveMatches.map(m => ({
      id: m.id,
      type: 'match',
      title: m.name,
      p1: m.players?.p1?.name || "Athlete A",
      p2: m.players?.p2?.name || "Athlete B",
      score: m.current_score ? `${m.current_score[0]}-${m.current_score[1]}` : "0-0",
      category: "Match",
      path: `/broadcast/${m.id}`
    }));

    const tourneys = liveTournaments.map(t => ({
      id: t.id,
      type: 'tournament',
      title: t.name,
      loc: t.city,
      athletes: t.participants?.length || 0,
      category: "Tournament",
      path: `/tournament/${t.id}`
    }));

    const all = [...matches, ...tourneys];

    return all.filter(item => {
      const matchesSearch = item.title?.toLowerCase().includes(query.toLowerCase()) || 
                           (item.p1 && item.p1.toLowerCase().includes(query.toLowerCase())) ||
                           (item.p2 && item.p2.toLowerCase().includes(query.toLowerCase()));
      
      const matchesCategory = activeCategory === "All" || item.category + "s" === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [query, activeCategory, liveMatches, liveTournaments]);

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
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-none">Global Live Feed</h1>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Search Name or Event..." 
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

        <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 border-slate-200 shadow-xl bg-white/50 min-h-[400px]">
          {isLoading ? (
             <div className="py-32 flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-10 w-10 text-sky-500 animate-spin" />
             </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredItems.length > 0 ? filteredItems.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className="flex flex-col items-stretch p-8 rounded-[3rem] border border-slate-100 bg-white transition-all group cursor-pointer hover:border-sky-500/40 hover:shadow-2xl"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <Badge className={cn(
                        "text-white border-none text-[9px] font-black uppercase px-4 h-6",
                        item.type === 'match' ? "bg-[#0B1F3A]" : "bg-sky-500"
                      )}>
                        {item.category}
                      </Badge>
                      <Radio className="h-3 w-3 text-red-500 animate-pulse" />
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest">{item.title}</p>
                        {item.type === 'match' ? (
                          <div className="font-black text-2xl text-[#0B1F3A] tracking-tighter uppercase italic leading-none">
                            {item.p1} <br />
                            <span className="text-sky-500 opacity-20 text-sm">VS</span> <br />
                            {item.p2}
                          </div>
                        ) : (
                          <div className="font-black text-3xl text-[#0B1F3A] tracking-tighter uppercase italic leading-none">
                            {item.title}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-6">
                         {item.type === 'match' && <span className="text-5xl font-black font-mono text-sky-600">{item.score}</span>}
                         <Button className="h-14 w-14 rounded-2xl bg-[#0B1F3A] text-white shadow-xl border-none">
                            <Play className="h-6 w-6 fill-current ml-1" />
                         </Button>
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <div className="col-span-2 py-32 text-center bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
                    <Activity className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest italic">No Intel Found</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LiveMatch;