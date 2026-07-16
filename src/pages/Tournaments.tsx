"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, Calendar, MapPin, 
  Search, ListFilter, ArrowRight,
  Zap, Globe, Award,
  Activity, Users, TrendingUp, ChevronRight, Plus
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const Tournaments = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [tournaments, setTournaments] = useState<any[]>([]);
  
  const tournamentCategories = ["All", "Elimination", "Round Robin", "League"];

  useEffect(() => {
    const loadData = () => {
      const activeTourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      setTournaments(activeTourneys.map((t: any) => ({
        ...t,
        category: t.format.charAt(0).toUpperCase() + t.format.slice(1),
        prize: "TBD",
        points: "Dynamic",
        img: "https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop"
      })));
    };
    loadData();
  }, []);

  const filtered = useMemo(() => {
    return tournaments.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(query.toLowerCase()) || 
                           t.city.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === "All" || t.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [query, activeCategory, tournaments]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="container px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-600">
                <Trophy className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Operational Circuit calendar</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-[0.95]">
                Circuit <br />
                <span className="text-sky-500">Intelligence</span>
              </h1>
              <p className="text-lg text-slate-500 font-medium max-w-xl leading-relaxed">
                Track active tournaments, athlete registrations, and round progress across the circuit.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#0B1F3A] p-8 rounded-[3rem] text-white relative overflow-hidden group shadow-xl">
                <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                  <Trophy className="h-40 w-40 text-white" />
                </div>
                <div className="space-y-6 relative z-10">
                  <Badge className="bg-sky-500 border-none font-black text-[9px] px-4 h-6 rounded-full uppercase tracking-widest">Organizer Studio</Badge>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black italic tracking-tighter uppercase">Start Tournament</h4>
                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Organize your own circuit with bracket intelligence and official seeding.</p>
                  </div>
                  <Link to="/tournaments/create">
                    <Button className="w-full h-12 bg-white text-[#0B1F3A] rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all shadow-lg border-none group">
                      Initialize Event <Plus className="ml-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-10">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {tournamentCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                      activeCategory === cat 
                        ? "bg-[#0B1F3A] text-white shadow-lg" 
                        : "bg-white text-slate-400 border border-slate-100 hover:border-sky-500/50"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  placeholder="Find Event..." 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-11 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs focus:border-sky-500 outline-none shadow-sm"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filtered.length > 0 ? filtered.map((t) => (
                  <motion.div 
                    layout
                    key={t.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    whileHover={{ y: -8 }}
                    className="group flex flex-col glass-panel rounded-[2.5rem] overflow-hidden border-slate-200 shadow-lg bg-white"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img src={t.img} className="w-full h-full object-cover opacity-90" alt="" />
                      <div className="absolute top-5 left-5">
                        <Badge className="bg-sky-500 text-white font-black px-4 h-6 border-none text-[9px] uppercase tracking-widest">
                          {t.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-1 space-y-6">
                       <div className="space-y-3">
                          <h3 className="text-xl font-black text-[#0B1F3A] leading-tight tracking-tight uppercase italic">{t.name}</h3>
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                              <MapPin className="h-3 w-3 text-sky-500 shrink-0" /> {t.city}
                            </div>
                            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                              <Calendar className="h-3 w-3 text-sky-500 shrink-0" /> {t.startDate}
                            </div>
                          </div>
                       </div>
                       <Button 
                        onClick={() => navigate(`/tournament/${t.id}`)}
                        className="w-full h-12 bg-[#0B1F3A] text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-sky-500 transition-all border-none"
                       >
                          VIEW PROFILE <ChevronRight className="ml-1.5 h-3.5 w-3.5" />
                       </Button>
                    </div>
                  </motion.div>
                )) : (
                  <div className="col-span-2 py-32 text-center bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
                    <Trophy className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest italic">No Active Tournaments Found</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="glass-panel p-8 rounded-[2.5rem] space-y-6 shadow-lg border-slate-200 bg-slate-50">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0B1F3A] flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-sky-500" /> Season Overview
              </h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-[#0B1F3A] tracking-tighter leading-none">{tournaments.reduce((acc, t) => acc + (t.participants?.length || 0), 0)}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Athletes</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-[#0B1F3A] tracking-tighter leading-none">{tournaments.length}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Active Circuits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tournaments;