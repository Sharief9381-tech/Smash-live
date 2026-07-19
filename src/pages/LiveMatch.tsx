"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Play, Search, Zap, Radio, Loader2, Target, Globe, ChevronRight } from 'lucide-react';
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
  const [isLoading, setIsLoading] = useState(true);
  
  const categories = ["All", "Pro", "Studio"];

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const { data: matches } = await supabase.from('matches').select('*').eq('status', 'live');
        const localMatches = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
        
        const combined = [
          ...(matches || []).map(m => ({ ...m, type: 'pro' })),
          ...localMatches.map((m: any) => ({ ...m, type: 'studio' }))
        ];
        
        setLiveMatches(combined);
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
    return liveMatches.filter(item => {
      const matchesSearch = item.name?.toLowerCase().includes(query.toLowerCase()) || 
                           (item.players?.p1?.name && item.players.p1.name.toLowerCase().includes(query.toLowerCase())) ||
                           (item.players?.p2?.name && item.players.p2.name.toLowerCase().includes(query.toLowerCase()));
      
      const matchesCategory = activeCategory === "All" || 
                              (activeCategory === "Pro" && item.type === 'pro') ||
                              (activeCategory === "Studio" && item.type === 'studio');
      return matchesSearch && matchesCategory;
    });
  }, [query, activeCategory, liveMatches]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container max-w-lg mx-auto px-4 py-6 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Global Broadcast</span>
          </div>
          <h1 className="text-4xl font-black text-foreground tracking-tighter uppercase italic leading-none">Live Scopes</h1>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search Arena..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-14 pl-12 bg-card border-white/5 rounded-2xl font-bold focus:border-primary transition-all text-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "whitespace-nowrap px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeCategory === cat ? "bg-primary text-white orange-glow" : "bg-card text-muted-foreground border border-white/5"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
           <div className="py-20 flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
           </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.length > 0 ? filteredItems.map((match) => (
                <motion.div 
                  layout
                  key={match.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => navigate(`/broadcast/${match.id}`)}
                  className="bg-card p-6 rounded-[2.5rem] border border-white/5 space-y-6 relative overflow-hidden group active:scale-[0.98] transition-all shadow-xl"
                >
                  <div className="flex justify-between items-center relative z-10">
                    <Badge className={cn(
                      "text-white font-black text-[8px] tracking-widest px-3 h-5 border-none",
                      match.type === 'pro' ? "bg-secondary" : "bg-primary"
                    )}>
                      {match.type === 'pro' ? "PRO CIRCUIT" : "STUDIO NODE"}
                    </Badge>
                    <div className="flex items-center gap-2">
                       <Radio className="h-3 w-3 text-red-500 animate-pulse" />
                       <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">LIVE DATA SYNC</span>
                    </div>
                  </div>

                  <div className="space-y-6 relative z-10">
                     <div className="text-center space-y-1">
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">{match.name}</p>
                        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-primary">
                           <Globe className="h-3 w-3" />
                           <span className="uppercase tracking-widest">{match.city || "Remote Server"}</span>
                        </div>
                     </div>

                     <div className="flex items-center justify-between gap-4 py-2">
                        <div className="flex flex-col items-center gap-2 flex-1">
                           <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center text-xl font-black italic text-primary border-2 border-white/5">
                              {match.players?.p1?.name ? match.players.p1.name[0] : "A"}
                           </div>
                           <p className="text-xs font-black uppercase italic text-center leading-tight line-clamp-1">
                              {match.players?.p1?.name || "Athlete A"}
                           </p>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-1 px-4 min-w-[100px]">
                           <span className="text-4xl font-black font-mono text-white tabular-nums tracking-tighter">
                              {match.current_score ? `${match.current_score[0]}-${match.current_score[1]}` : "0-0"}
                           </span>
                           <Badge variant="outline" className="text-[8px] font-black border-white/10 text-muted-foreground h-5 uppercase">
                              SET {match.currentSet || 1}
                           </Badge>
                        </div>

                        <div className="flex flex-col items-center gap-2 flex-1">
                           <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center text-xl font-black italic text-primary border-2 border-white/5">
                              {match.players?.p2?.name ? match.players.p2.name[0] : "B"}
                           </div>
                           <p className="text-xs font-black uppercase italic text-center leading-tight line-clamp-1">
                              {match.players?.p2?.name || "Athlete B"}
                           </p>
                        </div>
                     </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/5 flex justify-center">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-12 font-black uppercase tracking-widest text-[10px] group">
                         ENTER STREAM <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                  </div>
                </motion.div>
              )) : (
                <div className="py-32 text-center bg-card/50 rounded-[3rem] border-2 border-dashed border-white/5">
                  <Activity className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
                  <p className="text-sm font-black text-muted-foreground uppercase tracking-widest italic leading-tight">No active match<br/>nodes detected</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default LiveMatch;