"use client";

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, Calendar, MapPin, 
  Search, ListFilter, ArrowRight,
  Zap, Filter, Star, Globe, Award,
  Activity, Users, TrendingUp
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
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sky-600">
                  <Globe className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Global Intelligence Hub</span>
                </div>
                <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter italic uppercase">Circuit Dashboard</h1>
              </div>
              <div className="flex gap-3">
                 <div className="flex items-center bg-white border border-slate-200 rounded-2xl px-4 h-12 shadow-sm focus-within:border-sky-500 transition-all">
                    <Search className="h-4 w-4 text-slate-400" />
                    <input 
                      placeholder="Search Tournaments..." 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="bg-transparent border-none outline-none text-sm font-bold px-3 w-48" 
                    />
                 </div>
                 <Button variant="outline" className="h-12 rounded-2xl border-slate-200 bg-white shadow-sm font-black text-[10px] uppercase">
                    <Filter className="h-4 w-4 mr-2" /> Filter
                 </Button>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {tournamentCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    activeCategory === cat 
                      ? "bg-[#0B1F3A] text-white shadow-lg" 
                      : "bg-white text-slate-400 border border-slate-100 hover:border-sky-500/50 hover:text-sky-500"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filtered.map((t) => (
                  <motion.div 
                    layout
                    key={t.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -10 }}
                    className="group relative glass-panel rounded-[3rem] overflow-hidden border-slate-200 shadow-xl"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img src={t.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" alt="" />
                      <div className="absolute top-6 left-6 flex gap-2">
                        <Badge className={cn("font-black px-4 h-7 border-none shadow-lg", t.status === 'Live' ? 'bg-red-500 text-white animate-pulse' : 'bg-sky-500 text-white')}>
                          {t.status === 'Live' && <Activity className="h-3 w-3 mr-1.5" />} {t.status}
                        </Badge>
                        <Badge className="bg-white/90 backdrop-blur-md text-[#0B1F3A] border-none font-black px-4">{t.category}</Badge>
                      </div>
                    </div>
                    <div className="p-8 space-y-6">
                       <div className="space-y-1">
                          <h3 className="text-2xl font-black text-[#0B1F3A] group-hover:text-sky-600 transition-colors leading-tight">{t.name}</h3>
                          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-sky-500" /> {t.location}</span>
                            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-sky-500" /> {t.date}</span>
                          </div>
                       </div>

                       <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                          <div>
                             <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Prize Pool</p>
                             <p className="text-lg font-black text-[#0B1F3A]">{t.prize}</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">BWF Points</p>
                             <p className="text-lg font-black text-sky-600">+{t.points}</p>
                          </div>
                       </div>

                       <Link to={t.status === 'Live' ? `/tournament/${t.id}` : `/tournament/${t.id}`} className="block">
                          <Button className="w-full h-14 bg-[#0B1F3A] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-sky-500 transition-all shadow-lg group-hover:shadow-sky-500/20">
                             {t.status === 'Live' ? "ENTER LIVE INTELLIGENCE" : "VIEW TOURNAMENT DETAILS"} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                       </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-8 rounded-[3rem] space-y-8 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#0B1F3A]">Circuit Leaders</h3>
                <Link to="/rankings" className="text-[10px] font-black text-sky-500 hover:underline">VIEW ALL</Link>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Viktor Axelsen", pts: "105.4k", rank: 1, country: "DK" },
                  { name: "Shi Yuqi", pts: "98.2k", rank: 2, country: "CN" },
                  { name: "Jonatan Christie", pts: "92.1k", rank: 3, country: "ID" },
                ].map((player) => (
                  <Link key={player.rank} to="/rankings" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-sky-500/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-[#0B1F3A] flex items-center justify-center text-xs font-black text-white group-hover:bg-sky-500 transition-colors">
                        #{player.rank}
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#0B1F3A]">{player.name}</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{player.country} • BWF Certified</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-sky-600">{player.pts}</span>
                  </Link>
                ))}
              </div>

              <div className="bg-[#0B1F3A] p-8 rounded-[2.5rem] text-white relative overflow-hidden group cursor-pointer" onClick={() => navigate('/rankings')}>
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <Star className="h-24 w-24 text-white fill-current" />
                </div>
                <div className="space-y-3 relative z-10">
                  <Badge className="bg-sky-500 border-none font-black text-[8px] px-2 h-5">EXCLUSIVE</Badge>
                  <h4 className="text-xl font-black italic">Hall of Fame</h4>
                  <p className="text-[10px] text-white/60 leading-relaxed font-bold uppercase tracking-widest">Explore historical dominance across the 2024 circuit.</p>
                </div>
              </div>
            </motion.div>

            <div className="glass-panel p-8 rounded-[3rem] space-y-6 shadow-xl">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0B1F3A] flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-sky-500" /> Event Intelligence
              </h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-[#0B1F3A]">$12.5M+</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Annual Total Prize Pool</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xl font-black text-[#0B1F3A]">128</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Active Circuit Players</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tournaments;