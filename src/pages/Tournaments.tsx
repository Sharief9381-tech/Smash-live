"use client";

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, Calendar, MapPin, 
  Search, ListFilter, ArrowRight,
  Zap, Filter, Globe, Award,
  Activity, Users, TrendingUp, ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
      participants: 32,
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
      participants: 128,
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
      participants: 64,
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
      participants: 64,
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
      
      {/* Editorial Header */}
      <section className="bg-slate-50 py-28 border-b border-slate-200">
        <div className="container px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Quote / Heading Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-sky-500/10 text-sky-600">
                <Trophy className="h-5 w-5" />
                <span className="text-[11px] font-black uppercase tracking-[0.25em]">BWF World Tour Calendar</span>
              </div>
              <h1 className="text-7xl md:text-8xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-[0.85]">
                Global Circuit <br />
                <span className="text-sky-500">Intelligence</span>
              </h1>
              <p className="text-2xl text-slate-500 font-medium max-w-2xl leading-relaxed">
                Track major tournaments, seeded entries, and prize distribution across the official season with real-time tactical data.
              </p>
            </div>

            {/* Circuit Pro Card beside the quote */}
            <div className="lg:col-span-5">
              <div className="bg-[#0B1F3A] p-12 rounded-[4rem] text-white relative overflow-hidden group shadow-2xl">
                <div className="absolute -right-12 -bottom-12 opacity-10 group-hover:rotate-12 group-hover:scale-125 transition-transform duration-1000">
                  <Award className="h-56 w-56 text-white" />
                </div>
                <div className="space-y-8 relative z-10">
                  <Badge className="bg-sky-500 border-none font-black text-[10px] px-5 h-8 rounded-full shadow-2xl">CIRCUIT PRO</Badge>
                  <div className="space-y-4">
                    <h4 className="text-4xl font-black italic tracking-tighter uppercase leading-[0.9]">Platform <br /> Dominance</h4>
                    <p className="text-xs text-white/50 leading-relaxed font-bold uppercase tracking-widest">Access proprietary data analysis for all circuit players and tournament trends.</p>
                  </div>
                  <Button className="w-full h-16 bg-white text-[#0B1F3A] rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-sky-500 hover:text-white border-none shadow-2xl transition-all">
                    Go Pro Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container px-8 py-20">
        <div className="grid lg:grid-cols-12 gap-20">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Search & Filter Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-100 pb-10">
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {tournamentCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                      activeCategory === cat 
                        ? "bg-[#0B1F3A] text-white shadow-2xl shadow-navy/20 scale-105" 
                        : "bg-white text-slate-400 border border-slate-100 hover:border-sky-500/50 hover:text-sky-500"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input 
                  placeholder="Find Event..." 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-[2rem] font-bold text-sm focus:border-sky-500 outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Tournaments Grid */}
            <div className="grid md:grid-cols-2 gap-12">
              <AnimatePresence mode="popLayout">
                {filtered.map((t) => (
                  <motion.div 
                    layout
                    key={t.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -15 }}
                    className="group flex flex-col glass-panel rounded-[4rem] overflow-hidden border-slate-200 shadow-2xl bg-white"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img 
                        src={t.img} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90" 
                        alt={t.name} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      <div className="absolute top-8 left-8 flex flex-col gap-3">
                        <Badge className={cn(
                          "font-black px-6 h-8 border-none shadow-2xl w-fit text-xs", 
                          t.status === 'Live' ? 'bg-red-500 text-white animate-pulse' : 
                          t.status === 'Upcoming' ? 'bg-sky-500 text-white' : 'bg-slate-500 text-white'
                        )}>
                          {t.status === 'Live' && <Activity className="h-4 w-4 mr-2" />} {t.status}
                        </Badge>
                        <Badge className="bg-white/95 backdrop-blur-md text-[#0B1F3A] border-none font-black px-6 h-8 w-fit text-xs">
                          {t.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-12 flex flex-col flex-1 space-y-10">
                       <div className="space-y-4">
                          <h3 className="text-3xl font-black text-[#0B1F3A] group-hover:text-sky-600 transition-colors leading-none tracking-tighter italic uppercase">
                            {t.name}
                          </h3>
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                              <MapPin className="h-4 w-4 text-sky-500 shrink-0" /> 
                              {t.location}
                            </div>
                            <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                              <Calendar className="h-4 w-4 text-sky-500 shrink-0" /> 
                              {t.date}
                            </div>
                          </div>
                       </div>

                       <div className="grid grid-cols-2 gap-8 py-8 border-y border-slate-100">
                          <div className="space-y-2">
                             <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">Prize Pool</p>
                             <p className="text-2xl font-black text-[#0B1F3A] tracking-tighter leading-none">{t.prize}</p>
                          </div>
                          <div className="space-y-2 text-right">
                             <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">Circuit Pts</p>
                             <p className="text-2xl font-black text-sky-600 tracking-tighter leading-none">+{t.points}</p>
                          </div>
                       </div>

                       <Button 
                        onClick={() => navigate(`/tournament/${t.id}`)}
                        className="w-full h-20 bg-[#0B1F3A] text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-sky-500 transition-all shadow-2xl shadow-navy/10 group-hover:shadow-sky-500/30 border-none"
                       >
                          {t.status === 'Live' ? "Enter Live Intelligence" : "Explore Event Profile"} 
                          <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                       </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            <div className="glass-panel p-12 rounded-[4rem] space-y-10 shadow-2xl bg-slate-50 border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-8">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#0B1F3A]">Top Seeded</h3>
                <Link to="/rankings" className="text-xs font-black text-sky-500 hover:underline">Full Ladder</Link>
              </div>

              <div className="space-y-5">
                {[
                  { name: "Viktor Axelsen", pts: "105.4k", rank: 1, country: "DK" },
                  { name: "Shi Yuqi", pts: "98.2k", rank: 2, country: "CN" },
                  { name: "Jonatan Christie", pts: "92.1k", rank: 3, country: "ID" },
                  { name: "Anders Antonsen", pts: "89.4k", rank: 4, country: "DK" },
                  { name: "Loh Kean Yew", pts: "84.2k", rank: 5, country: "SG" },
                ].map((player) => (
                  <div key={player.rank} className="flex items-center justify-between p-5 rounded-[2rem] bg-white border border-slate-100 hover:border-sky-500/40 transition-all group shadow-sm">
                    <div className="flex items-center gap-5">
                      <div className="h-12 w-12 rounded-2xl bg-[#0B1F3A] flex items-center justify-center text-xs font-black text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all shadow-md">
                        #{player.rank}
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#0B1F3A]">{player.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{player.country} • Elite Seed</p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-sky-600 tracking-tight">{player.pts}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Card moved to hero, so this sidebar section is now for Season Overview */}
            <div className="glass-panel p-12 rounded-[4rem] space-y-10 shadow-2xl border-slate-200">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0B1F3A] flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-sky-500" /> Season Overview
              </h4>
              <div className="space-y-10">
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 rounded-3xl bg-sky-50 flex items-center justify-center text-sky-500 shadow-inner">
                    <Users className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-[#0B1F3A] tracking-tighter leading-none">1,240</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Global Participants</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 rounded-3xl bg-sky-50 flex items-center justify-center text-sky-500 shadow-inner">
                    <Activity className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-[#0B1F3A] tracking-tighter leading-none">48</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Confirmed Tournaments</p>
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