"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Play, Trophy, ChevronRight, Activity, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLive = async () => {
      const { data } = await supabase
        .from('matches')
        .select('*')
        .eq('status', 'live')
        .limit(2);
      
      if (data) setLiveMatches(data);
      setLoading(false);
    };

    fetchLive();

    // Real-time subscription for live matches
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, fetchLive)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container px-6 pt-12 pb-24">
        <div className="relative rounded-[4rem] overflow-hidden bg-[#0B1F3A] p-12 lg:p-24 min-h-[600px] flex flex-col justify-center">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/40 to-transparent" />
          
          <img 
            src="https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
            alt="Hero background"
          />

          <div className="relative z-10 max-w-3xl space-y-8">
            <div className="flex items-center gap-3">
              <Badge className="bg-sky-500 text-white font-black px-6 h-8 rounded-full border-none animate-bounce">NEW INTEL ACTIVE</Badge>
              <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Globe className="h-3 w-3 text-sky-400" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Global Ranking System V2.1</span>
              </div>
            </div>

            <h1 className="text-6xl lg:text-9xl font-black tracking-tighter italic uppercase text-white leading-[0.85]">
              THE FUTURE OF <br />
              <span className="text-sky-500 drop-shadow-[0_0_40px_rgba(14,165,233,0.3)]">BADMINTON INTEL</span>
            </h1>

            <p className="text-lg text-white/60 font-medium max-w-xl leading-relaxed">
              Experience ultra-low latency scoring, real-time tournament logistics, and the world's most advanced professional circuit network.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/tournaments">
                <Button size="lg" className="h-20 px-12 rounded-[2rem] bg-white text-[#0B1F3A] font-black uppercase text-xs tracking-widest hover:bg-sky-500 hover:text-white transition-all shadow-2xl">
                  Explore Circuit <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/live-match">
                <Button size="lg" variant="outline" className="h-20 px-12 rounded-[2rem] border-white/20 text-white font-black uppercase text-xs tracking-widest hover:bg-white/10 backdrop-blur-md">
                  <Play className="mr-3 h-5 w-5 fill-current" /> Live Broadcasts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Feed Strip */}
      <section className="container px-6 pb-24">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Live Broadcasts</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Synchronized Global Intel Feed</p>
          </div>
          <Link to="/live-match">
            <Button variant="ghost" className="font-black uppercase text-[10px] tracking-widest text-sky-500">View All Matches <ChevronRight className="ml-1 h-4 w-4" /></Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {liveMatches.length > 0 ? (
            liveMatches.map((match) => (
              <Link key={match.id} to={`/broadcast/${match.id}`}>
                <div className="group relative bg-white rounded-[3rem] p-8 border border-slate-100 shadow-xl hover:shadow-2xl hover:border-sky-200 transition-all overflow-hidden">
                  <div className="absolute top-0 right-0 p-8">
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-full border border-red-500/20">
                       <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                       <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">LIVE BROADCAST</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-8">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{match.tournament_name || 'Circuit Series'}</p>
                      <h3 className="text-2xl font-black italic uppercase tracking-tighter">{match.name}</h3>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-center space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[120px]">{match.player1}</p>
                        <span className="text-5xl font-black italic text-[#0B1F3A]">{match.current_score?.[0] || 0}</span>
                      </div>
                      <div className="h-px flex-1 bg-slate-100 mx-8 relative">
                        <div className="absolute inset-0 bg-sky-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[10px] font-black text-slate-300">VS</span>
                      </div>
                      <div className="text-center space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate max-w-[120px]">{match.player2}</p>
                        <span className="text-5xl font-black italic text-[#0B1F3A]">{match.current_score?.[1] || 0}</span>
                      </div>
                    </div>

                    <Button className="w-full h-14 rounded-2xl bg-[#0B1F3A] text-white font-black uppercase text-[10px] tracking-widest group-hover:bg-sky-500 transition-colors">
                      Connect to Feed
                    </Button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full h-48 rounded-[3rem] border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 font-black uppercase italic text-sm tracking-widest">
              No live intel streams currently active
            </div>
          )}
        </div>
      </section>

      <MadeWithDyad />
    </div>
  );
};

export default Index;