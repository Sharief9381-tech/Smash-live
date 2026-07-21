"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { 
  Trophy, Zap, Activity, Loader2, 
  ChevronRight, Newspaper, ListOrdered,
  LayoutDashboard, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const Court = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<any[]>([]);
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const saved = localStorage.getItem('userProfile');
      if (saved) setProfile(JSON.parse(saved));

      try {
        const { data: activeMatches } = await supabase.from('matches').select('*').eq('status', 'live').limit(3);
        const { data: activeTourneys } = await supabase.from('tournaments').select('*').neq('status', 'Completed').limit(2);
        
        const localMatches = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
        setMatches([...(activeMatches || []), ...localMatches]);
        setTournaments(activeTourneys || []);
      } catch (err) {}
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-32">
      <Navbar />
      
      <main className="px-6 py-8 space-y-10">
        {/* Profile Welcome Header */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4 text-sky-500" />
                <p className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em]">Operational Dashboard</p>
              </div>
              <h1 className="text-4xl">WELCOME, {profile?.name?.split(' ')[0] || "ATHLETE"}</h1>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-sky-500" />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Smashed', icon: Zap, path: '/smashed', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
              { label: 'Studio', icon: Activity, path: '/broadcast/center', color: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
              { label: 'Circuit', icon: Trophy, path: '/tournaments', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
              { label: 'Ladder', icon: ListOrdered, path: '/rankings', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
            ].map((action, i) => (
              <button 
                key={i} 
                onClick={() => navigate(action.path)}
                className={cn(
                  "flex flex-col items-center gap-3 p-4 rounded-3xl border transition-all active:scale-95 group",
                  "bg-card hover:bg-slate-900 shadow-lg",
                  action.color
                )}
              >
                <action.icon className="h-6 w-6 transition-transform group-hover:scale-110" />
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/60 group-hover:text-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </section>

        {loading ? (
          <div className="py-20 flex justify-center"><Loader2 className="h-10 w-10 text-sky-500 animate-spin" /></div>
        ) : (
          <div className="space-y-12">
            {/* Live Matches Feed */}
            <section className="space-y-6">
              <div className="flex items-center justify-between px-1">
                <h2 className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  LIVE GLOBAL FEED
                </h2>
                <Link to="/live-match/active" className="text-[11px] font-black text-sky-500 uppercase tracking-widest hover:underline">Connect Node</Link>
              </div>
              
              <div className="flex flex-col gap-5">
                {matches.length > 0 ? matches.map((match, i) => (
                  <Link to={`/broadcast/${match.id}`} key={i} className="app-card group p-6 space-y-5 hover:border-sky-500/40">
                    <div className="flex justify-between items-center text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                      <span className="flex items-center gap-2"><Trophy className="h-3 w-3 text-sky-500" /> {match.name}</span>
                      <Badge variant="outline" className="border-red-500/20 text-red-500 text-[8px] font-black px-2">SYCHRONIZED</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="font-black text-lg uppercase italic group-hover:text-sky-500 transition-colors">{match.players?.p1?.name || "Athlete A"}</p>
                        <p className="font-black text-lg uppercase italic group-hover:text-sky-500 transition-colors">{match.players?.p2?.name || "Athlete B"}</p>
                      </div>
                      <div className="pl-6 border-l border-border">
                        <p className="text-4xl font-mono font-black text-sky-500 tracking-tighter">
                          {match.current_score ? `${match.current_score[0]}-${match.current_score[1]}` : "0-0"}
                        </p>
                      </div>
                    </div>
                  </Link>
                )) : (
                  <div className="py-20 text-center border-2 border-dashed border-border rounded-[3rem] bg-slate-900/20">
                    <Activity className="h-10 w-10 text-slate-800 mx-auto mb-4" />
                    <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em]">Searching Global Intel nodes...</p>
                  </div>
                )}
              </div>
            </section>

            {/* Circuit Events */}
            <section className="space-y-6">
              <h2 className="flex items-center gap-3">
                <Trophy className="h-5 w-5 text-amber-500" /> ACTIVE CIRCUIT
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tournaments.length > 0 ? tournaments.map((t, i) => (
                  <Link to={`/tournament/${t.id}`} key={i} className="app-card flex items-center justify-between p-6 hover:border-amber-500/30">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                        <Trophy className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="uppercase italic mb-0.5">{t.name}</h3>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{t.city}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-border group-hover:text-amber-500 transition-colors" />
                  </Link>
                )) : (
                  <div className="col-span-full py-10 text-center border-2 border-dashed border-border rounded-3xl bg-slate-900/10">
                    <p className="text-[10px] font-black text-muted-foreground uppercase italic tracking-widest">No active circuits synchronized.</p>
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

export default Court;