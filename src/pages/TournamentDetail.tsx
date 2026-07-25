"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, Calendar, Users, MapPin, 
  ChevronLeft, Activity, Globe, Loader2
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase, isCloudConfigured } from '@/lib/supabase';
import { showSuccess } from '@/utils/toast';

const TournamentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<any>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // 1. Try Cloud
      if (isCloudConfigured && !id?.startsWith('local_')) {
        try {
          const { data: tourney } = await supabase
            .from('tournaments')
            .select('*')
            .eq('id', id)
            .single();

          if (tourney) {
            setTournament(tourney);
            const { data: athletes } = await supabase
              .from('participants')
              .select('*')
              .eq('tournament_id', id);
            setParticipants(athletes || []);
            setLoading(false);
            return;
          }
        } catch (err) {}
      }

      // 2. Fallback to Local
      const localTourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      const localMatch = localTourneys.find((t: any) => t.id === id);
      
      if (localMatch) {
        setTournament(localMatch);
        // For local tournaments, we might check general registered users who joined
        const allLocalAthletes = JSON.parse(localStorage.getItem('registered_users') || '[]');
        setParticipants(allLocalAthletes.slice(0, 5)); // Mock some participants for local view
      }

      setLoading(false);
    };

    if (id) loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-sky-500 animate-spin" />
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pb-20">
        <Navbar />
        <main className="container flex flex-col items-center justify-center py-40 gap-6 text-center px-6">
           <Trophy className="h-16 w-16 text-slate-200" />
           <div className="space-y-2">
             <h2 className="text-3xl font-black text-[#0B1F3A] uppercase italic">Circuit Intelligence Lost</h2>
             <p className="text-slate-500 font-medium max-w-sm">This tournament is no longer active in the global registry.</p>
           </div>
           <Button onClick={() => navigate('/tournaments')} className="bg-[#0B1F3A] text-white px-10 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] border-none">Return to Circuit</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A] pb-20">
      <Navbar />
      
      <div className="relative h-[400px] w-full overflow-hidden bg-[#0B1F3A]">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/60 to-transparent z-10" />
        
        <img 
          src="https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-50 scale-105"
          alt=""
        />
        
        <div className="absolute top-8 left-8 z-30">
          <Button 
            onClick={() => navigate('/tournaments')}
            variant="ghost" 
            className="group bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl px-6 h-12 hover:bg-white hover:text-[#0B1F3A] transition-all"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            <span className="font-black uppercase tracking-widest text-[10px]">Back to Circuit</span>
          </Button>
        </div>

        <div className="container relative z-20 h-full flex flex-col justify-end pb-12 px-6">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-sky-500 text-white font-black px-6 h-8 rounded-full border-none">{tournament.status?.toUpperCase() || "LIVE"}</Badge>
              <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Globe className="h-3 w-3 text-sky-400" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Global Entry Active</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter uppercase italic text-white leading-[0.85]">
                {tournament.name}
              </h1>
              <div className="h-2 w-32 bg-sky-500 rounded-full mt-4" />
            </div>
            
            <div className="flex flex-wrap items-center gap-8 text-xs text-white/70 font-black uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2.5 bg-white/5 px-4 py-2 rounded-xl border border-white/10"><Calendar className="h-4 w-4 text-sky-500" /> {tournament.start_date || tournament.startDate}</span>
              <span className="flex items-center gap-2.5 bg-white/5 px-4 py-2 rounded-xl border border-white/10"><MapPin className="h-4 w-4 text-sky-500" /> {tournament.city}</span>
              <span className="flex items-center gap-2.5 bg-white/5 px-4 py-2 rounded-xl border border-white/10"><Users className="h-4 w-4 text-sky-500" /> {participants.length} Participants</span>
            </div>
          </div>
        </div>
      </div>

      <main className="container px-6 py-16">
         <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-10">
               <div className="bg-white rounded-[3rem] border border-slate-200 p-10 space-y-8 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                     <h3 className="text-xl font-black uppercase italic">Registered Athletes</h3>
                     <Activity className="h-5 w-5 text-sky-500" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {participants.length > 0 ? participants.map((p: any, idx: number) => (
                      <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                         <div className="h-10 w-10 rounded-full bg-[#0B1F3A] flex items-center justify-center text-sky-400 font-black text-xs uppercase">{p.name[0]}</div>
                         <div>
                            <p className="font-black text-[#0B1F3A] uppercase text-sm">{p.name}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{p.smash_id || p.smashId}</p>
                         </div>
                      </div>
                    )) : (
                      <div className="col-span-full py-20 text-center">
                         <p className="font-black text-slate-300 uppercase text-xs">Waiting for participants to join...</p>
                      </div>
                    )}
                  </div>
               </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
               <div className="bg-white p-8 rounded-[3rem] border border-slate-200 space-y-6 shadow-sm">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rules Protocol</h3>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-[#0B1F3A]">Format</span>
                        <Badge className="bg-[#0B1F3A] text-white font-black text-[8px] uppercase px-3">{tournament.format || "Elimination"}</Badge>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-[#0B1F3A]">System</span>
                        <span className="text-[10px] font-black uppercase text-slate-400">Dossier Integrated</span>
                     </div>
                  </div>
               </div>
               
               <div className="bg-[#0B1F3A] p-10 rounded-[3rem] text-white space-y-6">
                  <Trophy className="h-10 w-10 text-sky-400" />
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase">Athlete Entry</h3>
                    <p className="text-xs text-white/50 font-medium leading-relaxed">Athletes must register through the studio portal link to be eligible for matches.</p>
                  </div>
                  <Button 
                    onClick={() => {
                      const link = `${window.location.origin}/register/${tournament.slug}`;
                      navigator.clipboard.writeText(link);
                      showSuccess("Entry Link Copied!");
                    }}
                    className="w-full h-14 bg-sky-500 hover:bg-sky-400 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all border-none"
                  >
                    Copy Entry Link
                  </Button>
               </div>
            </div>
         </div>
      </main>
    </div>
  );
};

export default TournamentDetail;