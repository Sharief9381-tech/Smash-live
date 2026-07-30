"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Trash2, ChevronRight, Zap, Activity, Loader2, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

const Smashed = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const playerFilter = searchParams.get('player');
  
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const { data: tourneys } = await supabase.from('tournaments').select('*').order('created_at', { ascending: false });
      const { data: matches } = await supabase.from('matches').select('*').order('created_at', { ascending: false });

      const unified = [
        ...(tourneys || []).map(t => ({ ...t, type: 'tournament' })),
        ...(matches || []).map(m => ({ ...m, type: 'match' }))
      ];

      // Merge local matches if cloud sync failed or is empty
      const localMatches = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
      const all = [...unified, ...localMatches.map(m => ({ ...m, type: 'match' }))];
      
      // Filter by unique IDs
      const unique = Array.from(new Set(all.map(a => a.id))).map(id => all.find(a => a.id === id));
      
      setItems(unique.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()));
    } catch (err: any) {
      const localMatches = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
      setItems(localMatches.map(m => ({ ...m, type: 'match' })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const filteredItems = useMemo(() => {
    let result = items;
    
    if (playerFilter) {
      const filter = playerFilter.toLowerCase();
      result = result.filter(item => {
        const pStr = JSON.stringify(item.players || {}).toLowerCase();
        return pStr.includes(filter) || (item.name && item.name.toLowerCase().includes(filter));
      });
    }

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(item => (item.name && item.name.toLowerCase().includes(q)) || (item.city && item.city.toLowerCase().includes(q)));
    }

    return result;
  }, [items, playerFilter, query]);

  const deleteItem = async (id: string, type: 'match' | 'tournament') => {
    if (!confirm(`Delete this ${type}?`)) return;
    try {
      const local = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
      localStorage.setItem('active_studio_matches', JSON.stringify(local.filter((m: any) => m.id !== id)));
      
      if (type === 'tournament') {
        const localTourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
        localStorage.setItem('active_studio_tournaments', JSON.stringify(localTourneys.filter((t: any) => t.id !== id)));
      }

      await supabase.from(type === 'tournament' ? 'tournaments' : 'matches').delete().eq('id', id);
      showSuccess("Protocol Cleared");
      fetchMatches();
    } catch (err) {
      fetchMatches();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <Navbar />
      <main className="px-4 py-8 space-y-8 max-w-lg mx-auto">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-sky-500 fill-current" />
            <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest">Match Archive</span>
          </div>
          <h1 className="text-4xl font-black text-[#0B1F3A] uppercase italic leading-none">
            {playerFilter ? `${playerFilter}'s History` : "Smashed"}
          </h1>
          {playerFilter && (
            <button onClick={() => navigate('/smashed')} className="text-[9px] font-black text-slate-400 uppercase tracking-widest underline decoration-2">Clear Filter</button>
          )}
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
          <input 
            placeholder="Search archive..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 pl-11 bg-white border border-slate-100 rounded-xl font-bold text-xs shadow-sm focus:border-sky-500 outline-none"
          />
        </div>

        {loading ? (
          <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-sky-500" /></div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredItems.length > 0 ? filteredItems.map((item) => (
                <motion.div layout key={item.id} className="app-card p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", item.type === 'tournament' ? "bg-[#0B1F3A] text-sky-400" : "bg-sky-500 text-white")}>
                      {item.type === 'tournament' ? <Trophy className="h-5 w-5" /> : <Activity className="h-5 w-5" />}
                    </div>
                    <button onClick={() => deleteItem(item.id, item.type)} className="p-2 text-slate-200 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-slate-100 text-slate-500 border-none font-black text-[9px] uppercase px-3 h-6">{item.type}</Badge>
                      <span className="text-[9px] font-black text-slate-300 uppercase">ID: {String(item.id).slice(-6).toUpperCase()}</span>
                    </div>
                    <h2 className="text-xl font-black uppercase italic leading-tight text-[#0B1F3A]">{item.name}</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><MapPin className="h-3 w-3 text-sky-500" /> {item.city || "Venue TBD"}</p>
                  </div>
                  <div className="pt-5 border-t border-slate-50 flex justify-between items-center">
                     <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-sky-500 fill-current" />
                        <span className="font-black text-sm text-[#0B1F3A]">{item.current_score ? `${item.current_score[0]}-${item.current_score[1]}` : "Finalized"}</span>
                     </div>
                     <Button 
                       onClick={() => navigate(item.type === 'tournament' ? `/tournament/${item.id}` : `/scoring/${item.id}`)} 
                       variant="ghost" 
                       className="text-sky-600 font-black text-[10px] uppercase p-0 h-auto gap-1.5 hover:bg-transparent"
                     >
                       OPEN PROTOCOL <ChevronRight className="h-4 w-4" />
                     </Button>
                  </div>
                </motion.div>
              )) : (
                <div className="py-24 text-center border-2 border-dashed rounded-[2.5rem] bg-white border-slate-100 opacity-60">
                   <p className="text-[10px] font-black text-slate-400 uppercase italic">No records in this scope</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default Smashed;