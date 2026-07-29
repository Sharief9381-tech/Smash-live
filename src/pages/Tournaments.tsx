"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, MapPin, Calendar, Search, Plus, ChevronRight, Trash2, Edit3, Globe, Loader2 } from 'lucide-react';
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
    const local = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
    let allTourneys = [...local];

    if (isCloudConfigured) {
      try {
        const { data } = await supabase.from('tournaments').select('*').order('created_at', { ascending: false });
        if (data) {
          const cloudSlugs = new Set(data.map(t => t.slug));
          allTourneys = [...data, ...local.filter((t: any) => !cloudSlugs.has(t.slug))];
        }
      } catch (e) {
        console.warn("Sync restricted.");
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
    if (!confirm("Are you sure? This will remove the circuit protocol.")) return;

    try {
      const local = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      const filtered = local.filter((t: any) => t.id !== id && t.slug !== slug);
      localStorage.setItem('active_studio_tournaments', JSON.stringify(filtered));

      if (isCloudConfigured && !String(id).startsWith('local_')) {
        await supabase.from('tournaments').delete().eq('id', id);
      }

      showSuccess("Circuit Removed");
      loadTourneys();
    } catch (err) {
      showError("Removal failed.");
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
    <div className="min-h-screen bg-slate-50 pb-32">
      <Navbar />
      
      <main className="px-4 py-8 space-y-6">
        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-[#0B1F3A] uppercase italic leading-none">Global Circuits</h1>
            <p className="text-[9px] font-black text-sky-600 uppercase tracking-[0.4em]">Operational Hub</p>
          </div>
          <Button 
            onClick={() => navigate('/tournaments/create')}
            className="h-12 w-full bg-[#0B1F3A] text-white rounded-xl font-black text-[10px] uppercase tracking-widest gap-2 shadow-lg"
          >
            <Plus className="h-4 w-4" /> Initialize Protocol
          </Button>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
            <input 
              placeholder="Search..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-12 pl-11 bg-white border border-slate-100 rounded-xl font-bold text-xs shadow-sm focus:border-sky-500 outline-none"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {['All', 'Live', 'Upcoming', 'Accepting'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={cn("px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all shadow-sm", activeTab === tab ? "bg-[#0B1F3A] text-white" : "bg-white text-slate-300 border border-slate-100")}>{tab}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-sky-500" /></div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? filtered.map((t) => (
                <motion.div layout key={t.id || t.slug} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500 shadow-inner"><Trophy className="h-5 w-5" /></div>
                      <div>
                        <h3 className="text-[14px] font-black text-[#0B1F3A] uppercase italic leading-none">{t.name}</h3>
                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-1">{t.city} • {t.start_date || t.startDate}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(t.id, t.slug)} className="p-2 text-slate-200 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                    <Badge className={cn("h-6 px-3 border-none text-[8px] font-black uppercase rounded-full", (t.status || 'Live') === 'Live' ? "bg-red-500" : "bg-sky-500")}>{t.status || 'Live'}</Badge>
                    <Button onClick={() => navigate(`/tournament/${t.id || t.slug}`)} variant="ghost" className="h-8 text-sky-600 font-black text-[9px] uppercase gap-1 p-0 hover:bg-transparent">Manage Console <ChevronRight className="h-3 w-3" /></Button>
                  </div>
                </motion.div>
              )) : (
                <div className="py-20 text-center border-2 border-dashed rounded-[2rem] bg-white border-slate-100 space-y-2 opacity-50">
                   <Globe className="h-8 w-8 text-slate-200 mx-auto" />
                   <p className="text-[9px] font-black text-slate-400 uppercase italic">No active circuits synchronized</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default Tournaments;