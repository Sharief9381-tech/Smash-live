"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Trash2, ChevronRight, Zap, Activity, Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

const Smashed = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const { data: tourneys } = await supabase.from('tournaments').select('*').order('created_at', { ascending: false });
      const { data: matches } = await supabase.from('matches').select('*').order('created_at', { ascending: false });

      const unified = [
        ...(tourneys || []).map(t => ({ ...t, type: 'tournament' })),
        ...(matches || []).map(m => ({ ...m, type: 'match' }))
      ].sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());

      setItems(unified);
    } catch (err: any) {
      const localMatches = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
      setItems(localMatches.map(m => ({ ...m, type: 'match' })));
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string, type: 'match' | 'tournament') => {
    if (!confirm(`Delete this ${type}? This action cannot be undone.`)) return;
    try {
      const table = type === 'tournament' ? 'tournaments' : 'matches';
      await supabase.from(table).delete().eq('id', id);
      showSuccess("Match removed");
      fetchMatches();
    } catch (err) {
      if (type === 'match') {
        const local = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
        localStorage.setItem('active_studio_matches', JSON.stringify(local.filter((m: any) => m.id !== id)));
        fetchMatches();
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      <main className="px-4 py-8 space-y-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-sky-500 fill-current" />
            <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest">Match History</span>
          </div>
          <h1 className="text-3xl font-black text-[#0B1F3A] uppercase italic leading-none">Smashed</h1>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="h-10 w-10 text-sky-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode="popLayout">
              {items.length > 0 ? (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="app-card p-6 space-y-4 relative"
                  >
                    <div className="flex justify-between items-start">
                      <div className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center shadow-sm",
                        item.type === 'tournament' ? "bg-[#0B1F3A] text-sky-400" : "bg-sky-500 text-white"
                      )}>
                        {item.type === 'tournament' ? <Trophy className="h-5 w-5" /> : <Activity className="h-5 w-5" />}
                      </div>
                      <button onClick={() => deleteItem(item.id, item.type)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Badge className={cn("border-none font-black text-[9px] uppercase px-3 h-6", item.type === 'tournament' ? "bg-slate-100 text-slate-500" : "bg-sky-100 text-sky-600")}>
                          {item.type}
                        </Badge>
                        <span className="text-[9px] font-black text-slate-300 uppercase">ID: {String(item.id).slice(-6).toUpperCase()}</span>
                      </div>
                      <h2 className="text-lg font-black uppercase italic leading-tight text-[#0B1F3A]">{item.name}</h2>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-sky-500" /> {item.city || "Venue TBD"}
                      </p>
                    </div>

                    <div className="pt-5 border-t border-slate-50 flex justify-between items-center">
                       <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-sky-500 fill-current" />
                          <span className="font-black text-sm text-[#0B1F3A]">
                            {item.current_score ? `${item.current_score[0]}-${item.current_score[1]}` : "Ready"}
                          </span>
                       </div>
                       <Button 
                        onClick={() => navigate(item.type === 'tournament' ? `/tournament/${item.id}` : `/scoring/${item.id}`)} 
                        variant="ghost" 
                        className="text-sky-600 font-black text-[10px] uppercase p-0 h-auto gap-1.5 hover:bg-transparent"
                      >
                        {item.type === 'tournament' ? 'MANAGE' : 'RESUME'} <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-24 text-center border-2 border-dashed rounded-[2.5rem] bg-white border-slate-200">
                  <p className="text-[10px] font-black text-slate-400 uppercase italic">No matches created yet</p>
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