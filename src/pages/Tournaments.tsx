"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, MapPin, Calendar, Search, Plus, ChevronRight, Zap } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const Tournaments = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [tournaments, setTournaments] = useState<any[]>([]);

  useEffect(() => {
    const load = () => {
      const active = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      setTournaments(active.map((t: any) => ({ ...t, category: "Pro", prize: "TBD", points: "Dynamic", img: "https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop" })));
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const filtered = useMemo(() => tournaments.filter(t => t.name.toLowerCase().includes(query.toLowerCase()) || t.city.toLowerCase().includes(query.toLowerCase())), [query, tournaments]);

  return (
    <div className="min-h-screen bg-white pb-32">
      <Navbar />
      
      <section className="bg-[#F8FAFC] px-4 py-10 space-y-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-600">
            <Trophy className="h-4 w-4" />
            <span className="text-[9px] font-black uppercase tracking-widest">Global Circuit</span>
          </div>
          <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-[0.95]">
            Intelligence <br /><span className="text-sky-500">Calendar</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">Track active tournaments and athlete registries.</p>
        </div>

        <div className="bg-[#0B1F3A] p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
          <Trophy className="absolute -right-6 -bottom-6 h-32 w-32 opacity-10" />
          <div className="relative z-10 space-y-4">
            <Badge className="bg-sky-500 text-white font-black px-3 h-6 uppercase text-[8px] border-none">STUDIO</Badge>
            <h4 className="text-xl font-black italic uppercase">Initialize Circuit</h4>
            <Link to="/tournaments/create">
              <Button className="w-full h-12 bg-white text-[#0B1F3A] font-black rounded-xl text-[9px] uppercase tracking-widest">START TOURNAMENT <Plus className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </section>

      <main className="container px-4 py-10 space-y-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input 
            placeholder="Find Event..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xs shadow-sm outline-none"
          />
        </div>

        <div className="flex flex-col gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? filtered.map((t) => (
              <motion.div layout key={t.id} className="group glass-panel rounded-[2.5rem] overflow-hidden border-slate-200 shadow-xl bg-white">
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img src={t.img} className="w-full h-full object-cover opacity-90" alt="" />
                  <Badge className="absolute top-4 left-4 bg-sky-500 text-white font-black px-3 h-6 uppercase text-[8px] border-none">{t.status}</Badge>
                </div>
                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-[#0B1F3A] uppercase italic leading-tight">{t.name}</h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-sky-500" /> {t.city}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3 text-sky-500" /> {t.startDate}</span>
                    </div>
                  </div>
                  <Button onClick={() => navigate(`/tournament/${t.id}`)} className="w-full h-12 bg-[#0B1F3A] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-sky-500 transition-all border-none">
                    VIEW Dossier <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </motion.div>
            )) : (
              <div className="py-24 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
                <Zap className="h-10 w-10 text-slate-200 mx-auto mb-4" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Circuit Empty</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tournaments;