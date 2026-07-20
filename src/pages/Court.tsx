"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { 
  Trophy, Zap, Activity, Radio, Loader2, 
  ChevronRight, Newspaper, ListOrdered, Target
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
      } catch (err) { console.warn("Cloud sync limited."); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      
      <main className="px-4 py-4 space-y-6">
        {/* Greeting & Quick Actions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Welcome back,</p>
              <h1 className="uppercase italic">{profile?.name || "Athlete"}</h1>
            </div>
            <Badge className="bg-sky-500 text-white font-black px-2 h-6 border-none text-[10px]">PRO ACTIVE</Badge>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Studio', icon: Radio, path: '/broadcast/center', color: 'bg-indigo-50 text-indigo-600' },
              { label: 'New', icon: Newspaper, path: '/news', color: 'bg-sky-50 text-sky-600' },
              { label: 'Circuit', icon: Trophy, path: '/tournaments', color: 'bg-amber-50 text-amber-600' },
              { label: 'Ladder', icon: ListOrdered, path: '/rankings', color: 'bg-emerald-50 text-emerald-600' },
            ].map((action, i) => (
              <button 
                key={i} 
                onClick={() => navigate(action.path)}
                className="flex flex-col items-center gap-2 p-3 bg-white border border-slate-100 rounded-xl shadow-sm active:scale-95 transition-all"
              >
                <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", action.color)}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-black uppercase text-[#0B1F3A]">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center"><Loader2 className="h-8 w-8 text-sky-500 animate-spin" /></div>
        ) : (
          <div className="space-y-8">
            {/* Live Matches Slider/Stack */}
            <section className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h2 className="uppercase italic flex items-center gap-2">
                  <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" /> Live Now
                </h2>
                <Link to="/live-match/active" className="text-[11px] font-black text-sky-600 uppercase">View All</Link>
              </div>
              
              <div className="flex flex-col gap-3">
                {matches.length > 0 ? matches.map((match, i) => (
                  <Link to={`/broadcast/${match.id}`} key={i} className="app-card p-4 space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                      <span>{match.name}</span>
                      <span className="text-red-500 animate-pulse">Live Broadcast</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-black text-[15px] text-[#0B1F3A] uppercase italic leading-none">{match.players?.p1?.name || match.players?.sideA?.[0]?.name || "Athlete A"}</p>
                        <p className="font-black text-[15px] text-[#0B1F3A] uppercase italic leading-none">{match.players?.p2?.name || match.players?.sideB?.[0]?.name || "Athlete B"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[24px] font-mono font-black text-sky-600 leading-none">
                          {match.current_score ? `${match.current_score[0]}-${match.current_score[1]}` : "0-0"}
                        </p>
                      </div>
                    </div>
                  </Link>
                )) : (
                  <div className="py-10 text-center bg-slate-50 border border-dashed rounded-xl">
                    <p className="text-[11px] font-black text-slate-400 uppercase italic">Awaiting match nodes...</p>
                  </div>
                )}
              </div>
            </section>

            {/* Upcoming/Tournaments */}
            <section className="space-y-3">
              <h2 className="uppercase italic flex items-center gap-2 px-1">
                <Trophy className="h-4 w-4 text-sky-500" /> Active Circuits
              </h2>
              <div className="flex flex-col gap-3">
                {tournaments.length > 0 ? tournaments.map((t, i) => (
                  <Link to={`/tournament/${t.id}`} key={i} className="app-card flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-[#0B1F3A] flex items-center justify-center text-sky-400">
                        <Trophy className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="uppercase italic leading-none mb-1">{t.name}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.city}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-300" />
                  </Link>
                )) : (
                  <div className="py-10 text-center bg-slate-50 border border-dashed rounded-xl">
                    <p className="text-[11px] font-black text-slate-400 uppercase italic">No circuits initialized.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Court;