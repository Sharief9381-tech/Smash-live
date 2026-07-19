"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Trophy, MapPin, Calendar, Users, ChevronRight, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const Tournaments = () => {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTourneys = async () => {
      try {
        const { data } = await supabase.from('tournaments').select('*').order('created_at', { ascending: false });
        setTournaments(data || []);
      } catch (err) { console.warn("Registry sync limited."); }
      finally { setLoading(false); }
    };
    fetchTourneys();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navbar />
      
      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        <header className="flex items-center justify-between">
           <div className="space-y-1">
              <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white leading-none">Circuit</h1>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Active Tournament Registry</p>
           </div>
           <Button size="icon" variant="outline" className="rounded-xl border-white/5 h-10 w-10">
              <Filter className="h-4 w-4" />
           </Button>
        </header>

        <div className="space-y-6">
          {tournaments.length > 0 ? tournaments.map((t) => (
            <div key={t.id} className="sport-card overflow-hidden bg-slate-900 group">
               <div className="relative h-40">
                  <img 
                    src={t.image_url || "https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop"} 
                    className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" 
                    alt={t.name} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                     <Badge className="bg-secondary text-white font-black px-3 h-6 border-none text-[8px] uppercase">
                        {t.status}
                     </Badge>
                  </div>
               </div>
               
               <div className="p-6 space-y-4">
                  <div className="space-y-1">
                     <h3 className="text-xl font-black uppercase italic text-white leading-none">{t.name}</h3>
                     <div className="flex flex-col gap-1.5 pt-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
                           <MapPin className="h-3 w-3 text-primary" /> {t.city}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
                           <Calendar className="h-3 w-3 text-primary" /> {t.start_date}
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                     <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-[10px] font-black uppercase text-white">Entry Active</span>
                     </div>
                     <Button 
                       onClick={() => navigate(`/tournament/${t.id}`)}
                       className="bg-primary hover:bg-primary/90 text-white font-black text-[10px] uppercase h-10 px-6 rounded-xl shadow-lg shadow-primary/10"
                     >
                       Register <ChevronRight className="ml-1 h-3 w-3" />
                     </Button>
                  </div>
               </div>
            </div>
          )) : (
            <div className="py-40 text-center space-y-4 bg-slate-900/50 rounded-[2rem] border-2 border-dashed border-white/5">
               <Trophy className="h-12 w-12 text-slate-800 mx-auto" />
               <p className="text-[10px] font-black text-muted-foreground uppercase italic">Searching Global Circuits...</p>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Tournaments;