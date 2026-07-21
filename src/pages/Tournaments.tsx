"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, MapPin, Calendar, Search, Plus, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const Tournaments = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [tourneys, setTourneys] = useState<any[]>([]);

  useEffect(() => {
    const load = () => {
      // Local matches for demo/user-created ones
      const active = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      
      // Mock data for better visual representation of Past/Upcoming
      const mockData = [
        { id: 'm1', name: 'National Open 2024', city: 'Mumbai', startDate: '2024-10-15', status: 'Past' },
        { id: 'm2', name: 'Summer Smash', city: 'Bangalore', startDate: '2025-05-20', status: 'Upcoming' },
      ];

      setTourneys([
        ...active.map((t: any) => ({ ...t, status: t.status || 'Live' })),
        ...mockData
      ]);
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const filtered = useMemo(() => {
    return tourneys.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(query.toLowerCase()) || 
                           t.city.toLowerCase().includes(query.toLowerCase());
      const matchesTab = activeTab === "All" || t.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [query, tourneys, activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <Navbar />
      
      <main className="container px-4 py-6 space-y-6">
        {/* Simplified Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black text-[#0B1F3A] uppercase italic leading-none">Tourney List</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live, upcoming, and past events</p>
          </div>
          <Button 
            onClick={() => navigate('/tournaments/create')}
            className="h-10 bg-sky-500 hover:bg-sky-600 text-white rounded-xl px-4 font-black text-[10px] uppercase tracking-widest border-none shadow-lg shadow-sky-500/20"
          >
            <Plus className="mr-1.5 h-4 w-4" /> New Tourney
          </Button>
        </div>

        {/* Search & Tabs */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              placeholder="Search by name or place..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-4 bg-white border border-slate-100 rounded-2xl font-bold text-xs shadow-sm outline-none focus:border-sky-500 transition-all"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {['All', 'Live', 'Upcoming', 'Past'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm",
                  activeTab === tab 
                    ? "bg-[#0B1F3A] text-white" 
                    : "bg-white text-slate-400 border border-slate-100"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Simplified Cards */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? filtered.map((t) => (
              <motion.div 
                layout 
                key={t.id} 
                onClick={() => navigate(`/tournament/${t.id}`)}
                className="app-card p-4 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "h-12 w-12 rounded-xl flex items-center justify-center shadow-sm",
                    t.status === 'Live' ? "bg-red-50 text-red-500" : 
                    t.status === 'Upcoming' ? "bg-sky-50 text-sky-500" : "bg-slate-50 text-slate-400"
                  )}>
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-black text-[#0B1F3A] uppercase italic leading-tight group-hover:text-sky-600 transition-colors">
                        {t.name}
                      </h3>
                      {t.status === 'Live' && <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />}
                    </div>
                    <div className="flex items-center gap-3 text-[9px] font-bold text-slate-400 uppercase">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-sky-500" /> {t.city}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-sky-500" /> {t.startDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={cn(
                    "h-6 px-3 border-none text-[8px] font-black uppercase rounded-lg",
                    t.status === 'Live' ? "bg-red-500 text-white" : 
                    t.status === 'Upcoming' ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-400"
                  )}>
                    {t.status}
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-slate-200 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            )) : (
              <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[2rem] bg-white/50">
                <p className="text-[10px] font-black text-slate-400 uppercase italic">No {activeTab.toLowerCase()} events found</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Tournaments;