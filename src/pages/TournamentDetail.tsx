"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, Calendar, Users, MapPin, 
  ChevronLeft, Activity, Globe, Loader2, Copy, Check
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase, isCloudConfigured } from '@/lib/supabase';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

const TournamentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<any>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      const localTourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      const localMatch = localTourneys.find((t: any) => t.id === id || t.slug === id);
      
      if (localMatch) {
        setTournament(localMatch);
        // Load participants specifically for this tournament
        const tournamentId = localMatch.id || localMatch.slug;
        const storageKey = `participants_${tournamentId}`;
        const tournamentEntries = JSON.parse(localStorage.getItem(storageKey) || '[]');
        setParticipants(tournamentEntries);
        setLoading(false);
        return;
      }

      if (isCloudConfigured) {
        try {
          const { data: tourney } = await supabase.from('tournaments').select('*').or(`id.eq.${id},slug.eq.${id}`).single();
          if (tourney) {
            setTournament(tourney);
            const { data: athletes } = await supabase.from('participants').select('*').eq('tournament_id', tourney.id);
            setParticipants(athletes || []);
          }
        } catch (err) {}
      }

      setLoading(false);
    };

    if (id) loadData();
  }, [id]);

  const copyLink = () => {
    if (!tournament) return;
    const link = `${window.location.origin}/register/${tournament.slug}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    showSuccess("Registration link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><Loader2 className="h-10 w-10 text-sky-500 animate-spin" /></div>;

  if (!tournament) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pb-20">
        <Navbar />
        <main className="container flex flex-col items-center justify-center py-40 gap-6 text-center px-6">
           <Trophy className="h-16 w-16 text-slate-200" />
           <div className="space-y-2">
             <h2 className="text-3xl font-black text-[#0B1F3A] uppercase italic">Circuit Expired</h2>
             <p className="text-slate-500 font-medium max-w-sm">The registration protocol for this circuit has been cleared.</p>
           </div>
           <Button onClick={() => navigate('/tournaments')} className="bg-[#0B1F3A] text-white px-10 h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] border-none shadow-xl">Return to Hub</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1F3A] pb-32">
      <Navbar />
      
      <div className="relative h-[320px] w-full overflow-hidden bg-[#0B1F3A]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] to-sky-500 opacity-60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover mix-blend-overlay opacity-30"
          alt=""
        />
        
        <div className="absolute top-6 left-6 z-30">
          <Button 
            onClick={() => navigate('/tournaments')}
            variant="ghost" 
            className="bg-white/10 backdrop-blur-md text-white rounded-xl px-4 h-10 hover:bg-white hover:text-[#0B1F3A] transition-all border border-white/10 font-black uppercase tracking-widest text-[9px]"
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Circuit Hub
          </Button>
        </div>

        <div className="container relative z-20 h-full flex flex-col justify-end pb-10 px-6">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-sky-400 text-white font-black px-4 h-7 rounded-full border-none shadow-lg">{tournament.status?.toUpperCase() || "ACTIVE"}</Badge>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Globe className="h-3 w-3 text-sky-300" />
                <span className="text-[9px] font-black text-white uppercase tracking-widest">Registry Sync Active</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-white leading-none">
                {tournament.name}
              </h1>
              <div className="h-1 w-20 bg-sky-400 rounded-full mt-4" />
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-[10px] text-white/70 font-black uppercase tracking-widest">
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-sky-400" /> {tournament.start_date || tournament.startDate}</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-sky-400" /> {tournament.city}</span>
              <span className="flex items-center gap-2"><Users className="h-4 w-4 text-sky-400" /> {participants.length} Entries</span>
            </div>
          </div>
        </div>
      </div>

      <main className="container px-4 -mt-10 relative z-30">
         <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
               <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 space-y-8 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                     <h3 className="text-lg font-black uppercase italic text-[#0B1F3A]">Entry Roster</h3>
                     <Activity className="h-5 w-5 text-sky-500" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {participants.length > 0 ? participants.map((p: any, idx: number) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4 hover:border-sky-500 transition-colors">
                         <div className="h-10 w-10 rounded-full bg-[#0B1F3A] flex items-center justify-center text-sky-400 font-black text-xs uppercase shadow-inner">{p.name[0]}</div>
                         <div className="overflow-hidden">
                            <p className="font-black text-[#0B1F3A] uppercase text-xs truncate">{p.name}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">{p.smash_id || p.smashId || "Dossier Active"}</p>
                         </div>
                      </div>
                    )) : (
                      <div className="col-span-full py-20 text-center space-y-3 opacity-40">
                         <Users className="h-10 w-10 mx-auto text-slate-300" />
                         <p className="font-black text-slate-400 uppercase text-[10px] tracking-widest">No entries synchronized yet.</p>
                      </div>
                    )}
                  </div>
               </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
               <div className="bg-[#0B1F3A] p-8 rounded-[2.5rem] text-white space-y-6 shadow-2xl relative overflow-hidden group">
                  <Trophy className="h-12 w-12 text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
                  <div className="space-y-2 relative z-10">
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-tight">Athlete <br /> Entry Link</h3>
                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest leading-relaxed">Share this link with players to take their entries into this tournament.</p>
                  </div>
                  <Button 
                    onClick={copyLink}
                    className={cn(
                      "w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl transition-all border-none active:scale-95",
                      copied ? "bg-green-500 hover:bg-green-600" : "bg-sky-500 hover:bg-sky-400"
                    )}
                  >
                    {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copied ? "Link Copied" : "Copy Entry Link"}
                  </Button>
               </div>

               <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 space-y-4 shadow-xl">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Circuit Profile</h3>
                  <div className="space-y-3">
                     <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                        <span className="text-[11px] font-bold text-[#0B1F3A]">TYPE</span>
                        <Badge className="bg-[#0B1F3A] text-white font-black text-[8px] uppercase px-3 h-6 border-none">ELIMINATION</Badge>
                     </div>
                     <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                        <span className="text-[11px] font-bold text-[#0B1F3A]">VERIFICATION</span>
                        <span className="text-[10px] font-black uppercase text-sky-600">ACTIVE</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </main>
    </div>
  );
};

export default TournamentDetail;