"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, Calendar, MapPin, 
  Search, ListFilter, ArrowRight,
  Globe, Zap, Filter, Play
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Tournaments = () => {
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
      img: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container px-6 py-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sky-600">
              <Trophy className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Circuit Intelligence</span>
            </div>
            <h1 className="text-4xl font-black text-[#0B1F3A] tracking-tighter">Tournaments Dashboard</h1>
            <p className="text-slate-500 font-bold">Manage global brackets or initialize professional tournament environments.</p>
          </div>
          <div className="flex gap-3">
             <div className="flex items-center bg-white border border-slate-200 rounded-2xl px-4 h-12 shadow-sm focus-within:border-sky-500 transition-all">
                <Search className="h-4 w-4 text-slate-400" />
                <input placeholder="Search Event..." className="bg-transparent border-none outline-none text-sm font-bold px-3 w-40" />
             </div>
             <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-slate-200 bg-white shadow-sm">
                <Filter className="h-4 w-4 text-[#0B1F3A]" />
             </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Tournament Feed */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {tournaments.map((t) => (
                <Link key={t.id} to={`/tournament/${t.id}`}>
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="group relative glass-panel rounded-[3rem] overflow-hidden border-slate-200 shadow-xl"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={t.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" alt="" />
                      <Badge className="absolute top-6 left-6 bg-red-500 text-white animate-pulse font-black px-4 h-7 border-none">{t.status}</Badge>
                    </div>
                    <div className="p-8 space-y-6">
                       <div>
                          <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest mb-1">{t.category}</p>
                          <h3 className="text-2xl font-black text-[#0B1F3A] group-hover:text-sky-600 transition-colors">{t.name}</h3>
                       </div>
                       <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {t.location}</span>
                          <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {t.date}</span>
                       </div>
                       <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="space-y-1">
                             <p className="text-[8px] font-black text-slate-400 uppercase">Prize Pool</p>
                             <p className="text-xl font-black text-[#0B1F3A]">{t.prize}</p>
                          </div>
                          <div className="h-12 w-12 rounded-2xl bg-[#0B1F3A] text-white flex items-center justify-center group-hover:bg-sky-500 transition-colors shadow-lg">
                             <ArrowRight className="h-6 w-6" />
                          </div>
                       </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Tournament Studio Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0B1F3A] p-12 rounded-[4rem] text-white space-y-8 relative overflow-hidden group shadow-2xl">
              <div className="absolute -right-16 -top-16 opacity-10 group-hover:rotate-45 transition-transform duration-1000">
                <Trophy className="h-64 w-64" />
              </div>

              <div className="space-y-6 relative z-10">
                 <div className="h-16 w-16 bg-sky-500 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.3)]">
                    <Trophy className="h-8 w-8 text-white" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-3xl font-black tracking-tighter italic leading-none">Event <br /> Studio</h3>
                    <p className="text-white/60 text-sm font-bold leading-relaxed">Initialize full-scale tournament brackets and broadcast live rounds.</p>
                 </div>
                 <Link to="/tournaments/create">
                    <Button className="w-full h-16 bg-white text-[#0B1F3A] font-black rounded-2xl hover:bg-sky-500 hover:text-white transition-all shadow-xl border-none">
                       START TOURNAMENT <Zap className="ml-2 h-5 w-5 fill-current" />
                    </Button>
                 </Link>
              </div>

              <div className="pt-8 border-t border-white/10 relative z-10 space-y-4">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Ready Modules</span>
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    {['Brackets', 'Seeding', 'Scoring', 'Live TV'].map((m) => (
                      <div key={m} className="bg-white/5 p-3 rounded-xl border border-white/10 text-[10px] font-black text-center uppercase tracking-widest">{m}</div>
                    ))}
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