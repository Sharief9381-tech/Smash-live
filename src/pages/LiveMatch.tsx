"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Radio, Zap, ChevronRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const LiveMatch = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      const { data } = await supabase
        .from('matches')
        .select('*')
        .order('last_updated', { ascending: false });
      
      if (data) setMatches(data);
      setLoading(false);
    };

    fetchMatches();

    const channel = supabase
      .channel('live-matches-feed')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, fetchMatches)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A]">
      <Navbar />
      
      <main className="container px-6 py-16 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Live Intel Stream</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black italic uppercase tracking-tighter">Circuit <span className="text-sky-500">Feed</span></h1>
            <p className="text-sm font-medium text-slate-400 max-w-md">Access real-time match data, scoring analytics, and broadcast feeds from across the global circuit.</p>
          </div>
          <Button className="h-16 px-10 rounded-2xl bg-[#0B1F3A] text-white font-black text-[10px] uppercase tracking-widest shadow-xl">
             <Radio className="mr-2 h-4 w-4" /> Connect All Feeds
          </Button>
        </div>

        <div className="space-y-6">
          {matches.map((match) => (
            <Link key={match.id} to={`/broadcast/${match.id}`}>
              <div className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-lg hover:shadow-2xl hover:border-sky-500 transition-all flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
                {match.status === 'live' && (
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-red-500 animate-pulse" />
                )}
                
                <div className="flex-1 space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{match.tournament_name || 'Circuit Open'}</p>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter group-hover:text-sky-500 transition-colors">{match.name}</h3>
                </div>

                <div className="flex items-center gap-8 md:gap-16">
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate max-w-[100px]">{match.player1}</p>
                    <span className="text-4xl font-black italic text-[#0B1F3A]">{match.current_score?.[0] || 0}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="h-8 w-px bg-slate-100" />
                    <span className="text-[10px] font-black text-slate-300 italic">VS</span>
                    <div className="h-8 w-px bg-slate-100" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate max-w-[100px]">{match.player2}</p>
                    <span className="text-4xl font-black italic text-[#0B1F3A]">{match.current_score?.[1] || 0}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-[140px]">
                   <Badge className={match.status === 'live' ? 'bg-red-500' : 'bg-slate-200 text-slate-500'}>
                     {match.status.toUpperCase()}
                   </Badge>
                   <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest text-center">Updated {new Date(match.last_updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            </Link>
          ))}
          
          {matches.length === 0 && (
             <div className="h-64 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 text-slate-300">
               <Activity className="h-10 w-10 animate-pulse" />
               <p className="font-black uppercase italic tracking-widest text-sm">Awaiting Active Circuit Data...</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LiveMatch;