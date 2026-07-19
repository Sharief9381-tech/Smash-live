"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Search, Globe, Flag, MapPin, Loader2, Minus, ListOrdered, Target, Zap, ChevronUp, ChevronDown, TrendingUp } from 'lucide-react';
import { supabase, isCloudConfigured } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Rankings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [scope, setScope] = useState("world");
  const [athletes, setAthletes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
        const local = JSON.parse(localStorage.getItem('registered_users') || '[]');
        
        const combined = [
          ...(data || []),
          ...local
        ].map((u: any) => ({
          ...u,
          points: Math.floor(Math.random() * 5000) + 1000, // Simulated for demo ranking
          winRate: (Math.random() * 30 + 60).toFixed(1),
          university: u.state || "National Node"
        })).sort((a, b) => b.points - a.points);

        setAthletes(combined);
      } catch (err) {
        console.warn("Sync skipped.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAthletes();
  }, []);

  const filtered = useMemo(() => {
    return athletes.filter(p => 
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.smash_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.smashId?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, athletes]);

  const scopes = [
    { id: 'world', label: 'World', icon: Globe },
    { id: 'state', label: 'State', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container max-w-lg mx-auto px-4 py-6 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ListOrdered className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">The Ladder</span>
          </div>
          <h1 className="text-4xl font-black text-foreground tracking-tighter uppercase italic leading-none">Global Ranks</h1>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            placeholder="Athlete Name or Smash ID..." 
            className="w-full h-14 pl-12 pr-4 bg-card border border-white/5 rounded-2xl font-bold text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {scopes.map((s) => (
            <button
              key={s.id}
              onClick={() => setScope(s.id)}
              className={cn(
                "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                scope === s.id ? "bg-primary text-white orange-glow" : "bg-card text-muted-foreground border border-white/5"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? filtered.map((row, idx) => (
                <motion.div 
                  layout
                  key={row.id || idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card p-6 rounded-[2.5rem] border border-white/5 flex items-center justify-between active:scale-[0.98] transition-all relative overflow-hidden group shadow-xl"
                >
                  <div className="flex items-center gap-5 relative z-10">
                    <div className="relative">
                       <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center text-primary font-black italic text-xl border border-white/5 uppercase">
                         {row.name ? row.name[0] : "?"}
                       </div>
                       <div className={cn(
                         "absolute -top-2 -left-2 h-7 w-7 rounded-lg flex items-center justify-center text-[10px] font-black shadow-lg border border-white/5",
                         idx === 0 ? "bg-primary text-white" : "bg-background text-muted-foreground"
                       )}>
                         #{idx + 1}
                       </div>
                    </div>
                    <div>
                      <h4 className="font-black uppercase italic text-base leading-tight line-clamp-1">{row.name}</h4>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{row.university}</p>
                      <div className="flex items-center gap-3 mt-1">
                         <div className="flex items-center gap-1 text-[9px] font-black text-primary">
                            <Zap className="h-3 w-3 fill-current" /> {row.points} PTS
                         </div>
                         <div className="flex items-center gap-1 text-[9px] font-black text-secondary">
                            <Target className="h-3 w-3" /> {row.winRate}%
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 relative z-10">
                     {idx % 3 === 0 ? (
                       <div className="flex items-center text-secondary font-black gap-1">
                         <ChevronUp className="h-4 w-4" />
                         <span className="text-[10px]">1</span>
                       </div>
                     ) : idx % 5 === 0 ? (
                       <div className="flex items-center text-destructive font-black gap-1">
                         <ChevronDown className="h-4 w-4" />
                         <span className="text-[10px]">2</span>
                       </div>
                     ) : (
                       <Minus className="h-4 w-4 text-muted-foreground/30" />
                     )}
                     <div className="h-1.5 w-12 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${(row.points / 6000) * 100}%` }} />
                     </div>
                  </div>

                  <div className="absolute right-0 bottom-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                     <TrendingUp className="h-16 w-16" />
                  </div>
                </motion.div>
              )) : (
                <div className="py-40 text-center bg-card/30 rounded-[3rem] border-2 border-dashed border-white/5">
                  <Activity className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
                  <p className="text-sm font-black text-muted-foreground uppercase tracking-widest italic">Ladder Node Empty</p>
                </div>
              )}
            </AnimatePresence>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Rankings;