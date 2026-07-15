"use client";

import React, { useState, useMemo } from 'react';
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
  
  const tournamentCategories = ["All", "Major", "Super 1000", "Super 750", "Super 500"];

  const tournaments = [
    {
      id: "bwf-finals-2024",
      name: "BWF World Tour Finals",
      date: "Dec 12 - 18, 2024",
      location: "Jakarta, Indonesia",
      status: "Live",
      category: "Major",
      prize: "$2.5M",
      points: "12,000",
      img: "https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "all-england-2025",
      name: "All England Open 2025",
      date: "Mar 11 - 16, 2025",
      location: "Birmingham, UK",
      status: "Upcoming",
      category: "Super 1000",
      prize: "$1.3M",
      points: "12,000",
      img: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "china-masters-2024",
      name: "China Masters 2024",
      date: "Nov 19 - 24, 2024",
      location: "Shenzhen, China",
      status: "Live",
      category: "Super 750",
      prize: "$1.15M",
      points: "9,200",
      img: "https://images.unsplash.com/photo-1613918108466-292b78a8ef95?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "denmark-open-2024",
      name: "Denmark Open 2024",
      date: "Oct 15 - 20, 2024",
      location: "Odense, Denmark",
      status: "Completed",
      category: "Super 750",
      prize: "$850k",
      points: "9,200",
      img: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  const filtered = useMemo(() => {
    return tournaments.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(query.toLowerCase()) || 
                           t.location.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === "All" || t.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Refined Hero Section */}
      <section className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="container px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-600">
                <Trophy className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">BWF World Tour Calendar</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-[0.95]">
                Global Circuit <br />
                <span className="text-sky-500">Intelligence</span>
              </h1>
              <p className="text-lg text-slate-500 font-medium max-w-xl leading-relaxed">
                Track major tournaments, seeded entries, and prize distribution across the official season.
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
            
            {/* Search & Filter Header */}
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

            {/* Tournaments Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filtered.map((t) => (
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
                      <img 
                        src={t.img} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" 
                        alt={t.name} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      
                      <div className="absolute top-5 left-5 flex flex-col gap-2">
                        <Badge className={cn(
                          "font-black px-4 h-6 border-none shadow-md w-fit text-[9px]", 
                          t.status === 'Live' ? 'bg-red-500 text-white animate-pulse' : 
                          t.status === 'Upcoming' ? 'bg-sky-500 text-white' : 'bg-slate-500 text-white'
                        )}>
                          {t.status === 'Live' && <Activity className="h-3 w-3 mr-1" />} {t.status}
                        </Badge>
                        <Badge className="bg-white/90 backdrop-blur-md text-[#0B1F3A] border-none font-black px-4 h-6 w-fit text-[9px]">
                          {t.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-1 space-y-6">
                       <div className="space-y-3">
                          <h3 className="text-xl font-black text-[#0B1F3A] group-hover:text-sky-600 transition-colors leading-tight tracking-tight uppercase italic">
                            {t.name}
                          </h3>
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                              <MapPin className="h-3 w-3 text-sky-500 shrink-0" /> 
                              {t.location}
                            </div>
                            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                              <Calendar className="h-3 w-3 text-sky-500 shrink-0" /> 
                              {t.date}
                            </div>
                          </div>
                       </div>

                       <div className="grid grid-cols-2 gap-6 py-5 border-y border-slate-100">
                          <div className="space-y-1">
                             <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none">Prize Pool</p>
                             <p className="text-lg font-black text-[#0B1F3A] tracking-tighter leading-none">{t.prize}</p>
                          </div>
                          <div className="space-y-1 text-right">
                             <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none">Circuit Pts</p>
                             <p className="text-lg font-black text-sky-600 tracking-tighter leading-none">+{t.points}</p>
                          </div>
                       </div>

                       <Button 
                        onClick={() => navigate(`/tournament/${t.id}`)}
                        className="w-full h-12 bg-[#0B1F3A] text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-sky-500 transition-all shadow-md shadow-navy/5 border-none"
                       >
                          {t.status === 'Live' ? "Live Intel" : "Explore Profile"} 
                          <ChevronRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                       </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-panel p-8 rounded-[2.5rem] space-y-6 shadow-lg bg-slate-50 border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0B1F3A]">Top Seeded</h3>
                <Link to="/rankings" className="text-[9px] font-black text-sky-500 hover:underline">Ladder</Link>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Viktor Axelsen", pts: "105.4k", rank: 1, country: "DK" },
                  { name: "Shi Yuqi", pts: "98.2k", rank: 2, country: "CN" },
                  { name: "Jonatan Christie", pts: "92.1k", rank: 3, country: "ID" },
                  { name: "Anders Antonsen", pts: "89.4k", rank: 4, country: "DK" },
                ].map((player) => (
                  <div key={player.rank} className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-100 group">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-[#0B1F3A] flex items-center justify-center text-[9px] font-black text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all shadow-sm">
                        #{player.rank}
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-[#0B1F3A]">{player.name}</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{player.country}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-black text-sky-600">{player.pts}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-8 rounded-[2.5rem] space-y-6 shadow-lg border-slate-200">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0B1F3A] flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-sky-500" /> Season Overview
              </h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500 shadow-inner">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-[#0B1F3A] tracking-tighter leading-none">1,240</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Participants</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500 shadow-inner">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-[#0B1F3A] tracking-tighter leading-none">48</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Tournaments</p>
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