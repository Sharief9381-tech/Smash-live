"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, MapPin, Calendar, Search, Plus, ChevronRight, Trash2, Edit3, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { supabase, isCloudConfigured } from '@/lib/supabase';
import { showSuccess, showError } from '@/utils/toast';

const Tournaments = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [tourneys, setTourneys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTourneys = async () => {
    setLoading(true);
    // Fetch local user-created tournaments
    const local = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
    
    let allTourneys = [...local];

    if (isCloudConfigured) {
      try {
        const { data } = await supabase.from('tournaments').select('*').order('created_at', { ascending: false });
        if (data) {
          // Merge avoiding duplicates by slug
          const cloudSlugs = new Set(data.map(t => t.slug));
          allTourneys = [...data, ...local.filter((t: any) => !cloudSlugs.has(t.slug))];
        }
      } catch (e) {
        console.warn("Cloud fetch failed, using local vault.");
      }
    }
    
    setTourneys(allTourneys);
    setLoading(false);
  };

  useEffect(() => {
    loadTourneys();
    window.addEventListener('storage', loadTourneys);
    return () => window.removeEventListener('storage', loadTourneys);
  }, []);

  const handleDelete = async (id: string, slug: string) => {
    if (!confirm("Are you sure you want to delete this tournament protocol?")) return;

    try {
      // 1. Remove from Local
      const local = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      const filtered = local.filter((t: any) => t.id !== id && t.slug !== slug);
      localStorage.setItem('active_studio_tournaments', JSON.stringify(filtered));

      // 2. Remove from Cloud if possible
      if (isCloudConfigured && !String(id).startsWith('local_')) {
        await supabase.from('tournaments').delete().eq('id', id);
      }

      showSuccess("Tournament deleted from registry.");
      loadTourneys();
    } catch (err) {
      showError("Delete failed. Synchronization error.");
    }
  };

  const filtered = useMemo(() => {
    return tourneys.filter(t => {
      const matchesSearch = (t.name || "").toLowerCase().includes(query.toLowerCase()) || 
                           (t.city || "").toLowerCase().includes(query.toLowerCase());
      const status = t.status || 'Live';
      const matchesTab = activeTab === "All" || status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [query, tourneys, activeTab]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32">
      <Navbar />
      
      <main className="container px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-sky-500" />
              <span className="text-[10px] font-black text-sky-600 uppercase tracking-[0.4em]">Operational Circuits</span>
            </div>
            <h1 className="text-4xl font-black text-[#0B1F3A] uppercase italic leading-none">Global Hub</h1>
          </div>
          <Button 
            onClick={() => navigate('/tournaments/create')}
            className="h-14 px-8 bg-[#0B1F3A] text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest gap-3 shadow-xl active:scale-95 transition-all"
          >
            <Plus className="h-5 w-5" /> Initialize New
          </Button>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              placeholder="Search active circuits..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl font-bold text-sm shadow-sm outline-none focus:border-sky-500 transition-all"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {['All', 'Live', 'Upcoming', 'Accepting'].map((tab) => (
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

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? filtered.map((t) => (
              <motion.div 
                layout 
                key={t.id || t.slug} 
                className="bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-xl flex flex-col gap-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-sky-50 flex items-center justify-center border border-sky-100">
                      <Trophy className="h-7 w-7 text-sky-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic leading-none">{t.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-[10px] font-bold text-slate-400 uppercase">
                        <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-sky-500" /> {t.city}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3 text-sky-500" /> {t.start_date || t.startDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => navigate(`/tournament/${t.id || t.slug}`)} className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-sky-50 hover:text-sky-500 transition-colors">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(t.id, t.slug)} className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                  <Badge className={cn(
                    "h-8 px-5 border-none text-[9px] font-black uppercase rounded-full",
                    (t.status || 'Live') === 'Live' ? "bg-red-500 text-white animate-pulse" : "bg-sky-500 text-white"
                  )}>
                    {t.status || 'Live'}
                  </Badge>
                  <div className="flex-1" />
                  <Button 
                    onClick={() => navigate(`/tournament/${t.id || t.slug}`)}
                    variant="ghost" 
                    className="text-sky-600 font-black text-[10px] uppercase gap-2 hover:bg-sky-50 rounded-xl"
                  >
                    Manage Console <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )) : !loading && (
              <div className="py-24 text-center border-2 border-dashed border-slate-200 rounded-[3rem] bg-white/50 space-y-4">
                <Globe className="h-12 w-12 text-slate-200 mx-auto animate-pulse" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase italic">No active circuits synchronized</p>
                  <p className="text-[9px] font-bold text-slate-300 uppercase">Initialize your first tournament to populate the hub</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Tournaments;