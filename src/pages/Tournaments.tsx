"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, MapPin, Calendar, Search, Plus, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { supabase, isCloudConfigured } from '@/lib/supabase';

const Tournaments = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [tourneys, setTourneys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTourneys = async () => {
      setLoading(true);
      const local = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      
      if (isCloudConfigured) {
        try {
          const { data } = await supabase.from('tournaments').select('*').order('created_at', { ascending: false });
          setTourneys([...(data || []), ...local]);
        } catch (e) {
          setTourneys(local);
        }
      } else {
        setTourneys(local);
      }
      setLoading(false);
    };

    loadTourneys();
    window.addEventListener('storage', loadTourneys);
    return () => window.removeEventListener('storage', loadTourneys);
  }, []);

  const filtered = useMemo(() => {
    return tourneys.filter(t => {
      const matchesSearch = t.name?.toLowerCase().includes(query.toLowerCase()) || 
                           t.city?.toLowerCase().includes(query.toLowerCase());
      const status = t.status || 'Live';
      const matchesTab = activeTab === "All" || status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [query, tourneys, activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <Navbar />
      
      <main className="container px-4 py-6 space-y-6">
        {/* Simple Header */}
        <div className="space-y-1 px-1">
          <h1 className="text-3xl font-black text-[#0B1F3A] uppercase italic leading-none">Tournaments</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Circuit Directory</p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              placeholder="Search..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-white border border-slate-100 rounded-2xl font-bold text-sm shadow-sm outline-none focus:border-sky-500 transition-all"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {['All', 'Live', 'Upcoming', 'Past'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-sm",
                  activeTab === tab ? "bg-[#0B1F3A] text-white" : "bg-white text-slate-400 border border-slate-100"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* List of Tournaments */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? filtered.map((t) => (
              <motion.div 
                layout 
                key={t.id} 
                onClick={() => navigate(`/tournament/${t.id}`)}
                className="app-card p-5 flex items-center justify-between group cursor-pointer bg-white"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center shadow-sm border border-slate-100">
                    <Trophy className="h-6 w-6 text-sky-500" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[15px] font-black text-[#0B1F3A] uppercase italic leading-tight group-hover:text-sky-600 transition-colors">
                      {t.name}
                    </h3>
                    <div className="flex items-center gap-3 text-[9px] font-bold text-slate-400 uppercase">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-sky-500" /> {t.city}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-sky-500" /> {t.start_date || t.startDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={cn(
                    "h-6 px-3 border-none text-[8px] font-black uppercase rounded-lg",
                    (t.status || 'Live') === 'Live' ? "bg-red-500 text-white animate-pulse" : 
                    t.status === 'Upcoming' ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-400"
                  )}>
                    {t.status || 'Live'}
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-slate-200 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            )) : !loading && (
              <div className="py-24 text-center border-2 border-dashed border-slate-200 rounded-[3rem] bg-white/50">
                <Trophy className="h-10 w-10 text-slate-200 mx-auto mb-4" />
                <p className="text-[10px] font-black text-slate-400 uppercase italic">No active tournaments listed</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* New Tourney Button at the Bottom */}
        <div className="pt-6">
          <Button 
            onClick={() => navigate('/tournaments/create')}
            className="w-full h-16 bg-[#0B1F3A] hover:bg-sky-500 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] border-none shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <Plus className="h-5 w-5" /> Initialize New Tourney
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Tournaments;