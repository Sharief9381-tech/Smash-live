"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { Trophy, Search, Plus, Trash2, ChevronRight, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { showSuccess, showError } from '@/utils/toast';

const Smashed = () => {
  const navigate = useNavigate();
  const [tourneys, setTourneys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTourneys();
  }, []);

  const fetchTourneys = async () => {
    try {
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTourneys(data || []);
    } catch (err: any) {
      showError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTourney = async (id: string) => {
    if (!confirm("Are you sure? This will delete the tournament and all match data.")) return;
    try {
      const { error } = await supabase.from('tournaments').delete().eq('id', id);
      if (error) throw error;
      showSuccess("Tournament deleted.");
      fetchTourneys();
    } catch (err: any) {
      showError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="container px-6 py-12 space-y-12">
        <div className="flex justify-between items-end">
          <h1 className="text-6xl font-black text-[#0B1F3A] italic">SMASHED</h1>
          <Button onClick={() => navigate('/tournaments/create')} className="h-14 bg-sky-500 rounded-2xl font-black">
            <Plus className="mr-2" /> NEW CIRCUIT
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourneys.map((t) => (
            <motion.div 
              key={t.id}
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm space-y-6 relative overflow-hidden"
            >
              <div className="flex justify-between items-start">
                <div className="bg-[#0B1F3A] h-12 w-12 rounded-2xl flex items-center justify-center text-sky-400">
                  <Trophy className="h-6" />
                </div>
                <button onClick={() => deleteTourney(t.id)} className="text-slate-200 hover:text-red-500 transition-colors">
                  <Trash2 className="h-5" />
                </button>
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#0B1F3A] uppercase">{t.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.city} • {t.format}</p>
              </div>
              <div className="pt-6 border-t flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-sky-500" />
                    <span className="font-black text-sm">{t.participants?.length || 0} Athletes</span>
                 </div>
                 <Button onClick={() => navigate(`/tournament/${t.id}`)} variant="ghost" className="text-sky-500 font-black text-xs">MANAGE <ChevronRight className="ml-1 h-3" /></Button>
              </div>
            </motion.div>
          ))}
          
          {tourneys.length === 0 && !loading && (
            <div className="col-span-full py-40 text-center border-2 border-dashed border-slate-200 rounded-[3rem]">
              <p className="text-slate-400 font-black uppercase tracking-widest">No Circuits Initialized</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Smashed;