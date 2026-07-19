"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, Calendar, MapPin, 
  Search, Plus, Zap, Globe, Award,
  Activity, Users, TrendingUp, ChevronRight
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

const Tournaments = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const tournamentCategories = ["All", "Elimination", "Round Robin", "League"];

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: cloudTourneys } = await supabase.from('tournaments').select('*').order('created_at', { ascending: false });
        const localTourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
        
        const combined = [
          ...(cloudTourneys || []),
          ...localTourneys
        ].map((t: any) => ({
          ...t,
          category: t.format ? (t.format.charAt(0).toUpperCase() + t.format.slice(1)) : "Elimination",
          img: "https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop"
        }));
        
        setTournaments(combined);
      } catch (err) {
        console.warn("Sync error");
      } finally {
        setLoading(false);
      }
    };
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const filtered = useMemo(() => {
    return tournaments.filter(t => {
      const matchesSearch = t.name?.toLowerCase().includes(query.toLowerCase()) || 
                           t.city?.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === "All" || t.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [query, activeCategory, tournaments]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container max-w-lg mx-auto px-4 py-6 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Operational circuits</span>
            </div>
            <h1 className="text-4xl font-black text-foreground tracking-tighter uppercase italic leading-none">Tournaments</h1>
          </div>
          <Link to="/tournaments/create">
            <Button size="icon" className="h-12 w-12 rounded-2xl bg-card border border-white/5 text-primary hover:bg-primary hover:text-white transition-all shadow-xl">
               <Plus className="h-6 w-6" />
            </Button>
          </Link>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search Intelligence..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-14 pl-12 bg-card border-white/5 rounded-2xl font-bold focus:border-primary transition-all text-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {tournamentCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                activeCategory === cat 
                  ? "bg-primary text-white orange-glow" 
                  : "bg-card text-muted-foreground border border-white/5"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
             <Loader2 className="h-10 w-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? filtered.map((t) => (
                <motion.div 
                  layout
                  key={t.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="group flex flex-col bg-card rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl active:scale-[0.98] transition-all"
                >
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img src={t.img} className="w-full h-full object-cover opacity-60" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    
                    <div className="absolute top-5 left-5 flex flex-col gap-2">
                      <Badge className="bg-secondary text-white font-black px-4 h-6 border-none text-[8px] uppercase tracking-widest shadow-lg">
                        {t.status?.toUpperCase() || "ACTIVE"}
                      </Badge>
                      <Badge className="bg-white/10 backdrop-blur-md text-white border border-white/10 font-black px-4 h-6 text-[8px] uppercase tracking-widest">
                        {t.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                     <div className="space-y-3">
                        <h3 className="text-2xl font-black text-white uppercase italic leading-tight tracking-tight">{t.name}</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                            <MapPin className="h-3 w-3 text-primary" /> {t.city || "Remote"}
                          </div>
                          <div className="flex items-center gap-2 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                            <Calendar className="h-3 w-3 text-primary" /> {t.start_date || "TBD"}
                          </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-6 py-5 border-y border-white/5">
                        <div className="space-y-1">
                           <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em] leading-none">Athletes</p>
                           <p className="text-xl font-black text-white italic">--</p>
                        </div>
                        <div className="space-y-1 text-right">
                           <p className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em] leading-none">Prize Pool</p>
                           <p className="text-xl font-black text-secondary italic">TBD</p>
                        </div>
                     </div>

                     <Button 
                        onClick={() => navigate(`/tournament/${t.id}`)}
                        className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl border-none transition-all group"
                     >
                        VIEW INTEL <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                     </Button>
                  </div>
                </motion.div>
              )) : (
                <div className="py-40 text-center bg-card/30 rounded-[3rem] border-2 border-dashed border-white/5">
                  <Trophy className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
                  <p className="text-sm font-black text-muted-foreground uppercase tracking-widest italic">No active circuits</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Season Recap Component */}
        <section className="bg-card p-8 rounded-[2.5rem] border border-white/5 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <TrendingUp className="h-5 w-5 text-secondary" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Season Intelligence</h4>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="text-[8px] font-black text-muted-foreground uppercase">Global Athletes</p>
              <p className="text-3xl font-black text-white tabular-nums">1.2K</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[8px] font-black text-muted-foreground uppercase">Live Circuits</p>
              <p className="text-3xl font-black text-white tabular-nums">{tournaments.length}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Tournaments;