"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Plus, Trash2, ChevronRight, Users, Zap, Activity, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { showSuccess, showError } from '@/utils/toast';

const Smashed = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIntelligence();
  }, []);

  const fetchIntelligence = async () => {
    setLoading(true);
    try {
      // 1. Fetch Tournaments
      const { data: tourneys, error: tError } = await supabase
        .from('tournaments')
        .select('*')
        .order('created_at', { ascending: false });

      // 2. Fetch Individual Matches
      const { data: matches, error: mError } = await supabase
        .from('matches')
        .select('*')
        .order('created_at', { ascending: false });

      // Combine and format for unified display
      const unified = [
        ...(tourneys || []).map(t => ({ ...t, type: 'tournament' })),
        ...(matches || []).map(m => ({ ...m, type: 'match' }))
      ].sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());

      setItems(unified);
    } catch (err: any) {
      console.warn("Cloud dashboard sync limited. Showing local nodes if available.");
      // Fallback: Check local storage for studio sessions
      const localMatches = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
      setItems(localMatches.map(m => ({ ...m, type: 'match' })));
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string, type: 'match' | 'tournament') => {
    if (!confirm(`Are you sure? This will delete this ${type} and all its synchronized data.`)) return;
    
    try {
      const table = type === 'tournament' ? 'tournaments' : 'matches';
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      
      showSuccess(`${type.charAt(0).toUpperCase() + type.slice(1)} de-synchronized.`);
      fetchIntelligence();
    } catch (err: any) {
      // If cloud delete fails, check local
      if (type === 'match') {
        const local = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
        localStorage.setItem('active_studio_matches', JSON.stringify(local.filter((m: any) => m.id !== id)));
        fetchIntelligence();
      } else {
        showError("Unable to delete cloud circuit.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="container px-6 py-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-sky-500 fill-current" />
              <span className="text-[10px] font-black text-sky-600 uppercase tracking-[0.4em]">Personal Studio Dossier</span>
            </div>
            <h1 className="text-6xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-none">SMASHED</h1>
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={() => navigate('/live-match/create')} 
              variant="outline"
              className="h-14 bg-white border-slate-200 rounded-2xl font-black px-8 hover:bg-slate-50 transition-all text-[#0B1F3A]"
            >
              <Activity className="mr-2 h-4 w-4" /> QUICK MATCH
            </Button>
            <Button 
              onClick={() => navigate('/tournaments/create')} 
              className="h-14 bg-[#0B1F3A] text-white rounded-2xl font-black px-8 hover:bg-sky-500 transition-all shadow-xl"
            >
              <Plus className="mr-2 h-4 w-4" /> INITIALIZE CIRCUIT
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-12 w-12 text-sky-500 animate-spin" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Syncing Intelligence...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-xl shadow-slate-200/20 space-y-6 relative overflow-hidden group"
                >
                  <div className="flex justify-between items-start relative z-10">
                    <div className={cn(
                      "h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110",
                      item.type === 'tournament' ? "bg-[#0B1F3A] text-sky-400" : "bg-sky-500 text-white"
                    )}>
                      {item.type === 'tournament' ? <Trophy className="h-6 w-6" /> : <Activity className="h-6 w-6" />}
                    </div>
                    <button 
                      onClick={() => deleteItem(item.id, item.type)} 
                      className="p-2 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-2 relative z-10">
                    <div className="flex items-center gap-2">
                      <Badge className={cn(
                        "border-none font-black text-[8px] uppercase px-3 h-5",
                        item.type === 'tournament' ? "bg-slate-100 text-slate-500" : "bg-sky-100 text-sky-600"
                      )}>
                        {item.type}
                      </Badge>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">ID: {item.id.slice(-6).toUpperCase()}</span>
                    </div>
                    <h3 className="text-2xl font-black text-[#0B1F3A] uppercase italic leading-tight group-hover:text-sky-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <MapPin className="h-3 w-3" /> {item.city || "Remote Node"} • {item.format || item.match_type || "Standard"}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex justify-between items-center relative z-10">
                     <div className="flex items-center gap-2">
                        {item.type === 'tournament' ? (
                          <>
                            <Users className="h-4 w-4 text-sky-500" />
                            <span className="font-black text-sm text-[#0B1F3A]">Circuit Entry Active</span>
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 text-sky-500 fill-current" />
                            <span className="font-black text-sm text-sky-600">
                              {item.current_score ? `${item.current_score[0]}-${item.current_score[1]}` : "Live Feed"}
                            </span>
                          </>
                        )}
                     </div>
                     <Button 
                      onClick={() => navigate(item.type === 'tournament' ? `/tournament/${item.id}` : `/scoring/${item.id}`)} 
                      variant="ghost" 
                      className="text-sky-500 hover:text-sky-600 font-black text-[10px] uppercase tracking-widest p-0 h-auto group/btn"
                    >
                      {item.type === 'tournament' ? 'MANAGE' : 'RESUME'} <ChevronRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>

                  {/* Subtle background decoration */}
                  <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                    {item.type === 'tournament' ? <Trophy className="h-32 w-32" /> : <Activity className="h-32 w-32" />}
                  </div>
                </motion.div>
              ))}
              
              {items.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="col-span-full py-40 text-center border-2 border-dashed border-slate-200 rounded-[4rem] bg-white/50"
                >
                  <Zap className="h-12 w-12 text-slate-200 mx-auto mb-6" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">Intelligence Registry Empty</h3>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Initialize a match or tournament to populate your dossier.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default Smashed;