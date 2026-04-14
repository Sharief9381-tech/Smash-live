"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const TournamentDetail = () => {
  const [tournaments, setTournaments] = useState<any[]>([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      const { data } = await supabase.from('tournaments').select('*');
      if (data) setTournaments(data);
    };
    fetchTournaments();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A]">
      <Navbar />
      <main className="container px-6 py-16 max-w-5xl">
        <div className="mb-12">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter">Circuit <span className="text-sky-500">Events</span></h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2">Active and Upcoming Professional Tournaments</p>
        </div>

        <div className="grid gap-6">
          {tournaments.length > 0 ? (
            tournaments.map((t) => (
              <Card key={t.id} className="rounded-[2rem] border-slate-100 overflow-hidden hover:shadow-xl transition-all">
                <CardContent className="p-0 flex flex-col md:flex-row">
                  <div className="w-full md:w-64 h-48 bg-slate-200">
                    <img src={t.image_url || "https://images.unsplash.com/photo-1626225443592-343048593414?q=80&w=1000&auto=format&fit=crop"} className="w-full h-full object-cover" alt={t.name} />
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-center gap-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-sky-500 text-white uppercase font-black text-[9px] px-3">{t.category || 'Professional'}</Badge>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {t.date || 'TBA'}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black uppercase italic">{t.name}</h2>
                    <div className="flex items-center gap-1 text-slate-400 text-xs font-bold uppercase tracking-widest">
                      <MapPin className="h-4 w-4 text-sky-500" /> {t.location || 'Global Circuit'}
                    </div>
                    <Button className="w-fit h-12 px-8 rounded-xl bg-[#0B1F3A] font-black uppercase text-[10px] tracking-widest">View Draw <ChevronRight className="ml-2 h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="h-64 rounded-[3rem] border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 font-black uppercase italic tracking-widest">
              Synchronizing Tournament Database...
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TournamentDetail;