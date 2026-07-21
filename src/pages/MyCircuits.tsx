"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { 
  Calendar, Trophy, Activity, Zap, 
  ChevronRight, MapPin, Clock, Loader2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { supabase, isCloudConfigured } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const MyCircuits = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
  const [registeredTourneys, setRegisteredTourneys] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      setUserProfile(profile);

      if (!isCloudConfigured) {
        setLoading(false);
        return;
      }

      try {
        const smashId = profile.smashId || profile.smash_id;

        // 1. Fetch tournaments where user is a participant
        const { data: participations } = await supabase
          .from('participants')
          .select('tournament_id')
          .eq('smash_id', smashId);

        if (participations && participations.length > 0) {
          const tIds = participations.map(p => p.tournament_id);
          const { data: tourneys } = await supabase
            .from('tournaments')
            .select('*')
            .in('id', tIds)
            .neq('status', 'Completed');
          setRegisteredTourneys(tourneys || []);
        }

        // 2. Fetch scheduled matches for this user
        // Note: This logic assumes match player objects store IDs/Names
        const { data: matches } = await supabase
          .from('matches')
          .select('*')
          .eq('status', 'live'); // Or 'scheduled' if your schema supports it

        const userMatches = matches?.filter(m => {
          const p = m.players;
          if (!p) return false;
          const search = smashId.toLowerCase();
          return JSON.stringify(p).toLowerCase().includes(search);
        });

        setUpcomingMatches(userMatches || []);
      } catch (err) {
        console.warn("Personal intelligence sync limited.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <Navbar />
      
      <main className="px-4 py-8 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-sky-500" />
            <span className="text-[10px] font-black text-sky-600 uppercase tracking-[0.4em]">Athlete Itinerary</span>
          </div>
          <h1 className="text-4xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-none">Your Circuit</h1>
          <p className="text-[11px] font-medium text-slate-400 max-w-xs">Upcoming match nodes and tournament entries synced to your Smash ID.</p>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center"><Loader2 className="h-8 w-8 text-sky-500 animate-spin" /></div>
        ) : (
          <div className="space-y-10">
            {/* MATCH NODES */}
            <section className="space-y-4">
              <h2 className="uppercase italic flex items-center gap-2 px-1 text-sky-600">
                <Activity className="h-4 w-4" /> Priority Matches
              </h2>
              
              <div className="space-y-3">
                {upcomingMatches.length > 0 ? upcomingMatches.map((match, i) => (
                  <div key={i} className="app-card p-5 border-l-4 border-l-sky-500">
                    <div className="flex justify-between items-start mb-4">
                      <Badge className="bg-sky-500 text-white border-none text-[8px] font-black uppercase px-2 h-5">Live Now</Badge>
                      <span className="text-[9px] font-black text-slate-300">ID: {match.id.slice(-6).toUpperCase()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="text-lg font-black uppercase italic leading-none">{match.name}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Court {match.court || "TBD"}
                        </p>
                      </div>
                      <Button onClick={() => navigate(`/broadcast/${match.id}`)} className="h-10 px-4 bg-[#0B1F3A] text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
                        Enter
                      </Button>
                    </div>
                  </div>
                )) : (
                  <div className="py-12 text-center bg-white/50 border border-dashed rounded-[2rem] border-slate-200">
                    <p className="text-[10px] font-black text-slate-400 uppercase italic">No immediate match nodes found</p>
                  </div>
                )}
              </div>
            </section>

            {/* REGISTERED CIRCUITS */}
            <section className="space-y-4">
              <h2 className="uppercase italic flex items-center gap-2 px-1 text-amber-600">
                <Trophy className="h-4 w-4" /> Active Registrations
              </h2>
              <div className="space-y-3">
                {registeredTourneys.length > 0 ? registeredTourneys.map((t, i) => (
                  <div key={i} className="app-card p-5 group bg-white hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate(`/tournament/${t.id}`)}>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-[#0B1F3A] flex items-center justify-center text-sky-400 shadow-lg">
                        <Trophy className="h-6 w-6" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="text-[15px] font-black uppercase italic leading-none group-hover:text-sky-600 transition-colors">{t.name}</h3>
                        <div className="flex items-center gap-3 text-[9px] font-bold text-slate-400 uppercase">
                           <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-sky-500" /> {t.city}</span>
                           <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-sky-500" /> {t.start_date}</span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-200 group-hover:text-sky-500 transition-all" />
                    </div>
                  </div>
                )) : (
                  <div className="py-12 text-center bg-white/50 border border-dashed rounded-[2rem] border-slate-200">
                    <AlertCircle className="h-8 w-8 text-slate-200 mx-auto mb-3" />
                    <p className="text-[10px] font-black text-slate-400 uppercase italic">Not registered in any active circuits</p>
                    <Button onClick={() => navigate('/tournaments')} variant="ghost" className="mt-2 text-sky-500 font-black text-[9px] uppercase hover:bg-transparent">Explore Tournaments</Button>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyCircuits;