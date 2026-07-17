"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { 
  Activity, Trophy, Zap, 
  Target, Search as SearchIcon, MapPin, TrendingUp,
  Globe, Radio, ShieldCheck, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

const Court = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [matches, setMatches] = useState<any[]>([]);
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: activeMatches } = await supabase.from('matches').select('*').eq('status', 'live');
        const { data: activeTourneys } = await supabase.from('tournaments').select('*').neq('status', 'Completed');
        
        setMatches(activeMatches || []);
        setTournaments(activeTourneys || []);
      } catch (err) {
        console.warn("Cloud sync unavailable.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredMatches = useMemo(() => {
    return matches.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, matches]);

  const filteredTournaments = useMemo(() => {
    return tournaments.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, tournaments]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container px-6 py-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-sky-500 fill-current" />
              <span className="text-[10px] font-black text-sky-600 uppercase tracking-[0.3em]">Operational Command Center</span>
            </div>
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-none">THE COURT</h1>
          </div>
          
          <div className="relative w-full md:w-96">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Filter active intel..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 bg-white border-slate-200 rounded-[2rem] font-bold focus:border-sky-500 transition-all shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-10 w-10 text-sky-500 animate-spin" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Querying Cloud Circuit...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 bg-white border-slate-200 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                  <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3 italic">
                    <Activity className="h-5 w-5 text-red-500 animate-pulse" /> Live Feed
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredMatches.length > 0 ? filteredMatches.map((match, i) => (
                    <Link to={`/broadcast/${match.id}`} key={i} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 hover:border-sky-500/30 transition-all group">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{match.name}</p>
                       <div className="flex justify-between items-center">
                          <span className="font-black text-[#0B1F3A] text-lg uppercase italic">Live Protocol</span>
                          <span className="text-2xl font-mono font-black text-sky-600">{match.current_score[0]}-{match.current_score[1]}</span>
                       </div>
                    </Link>
                  )) : (
                    <div className="col-span-2 py-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">No active match nodes detected</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 bg-white border-slate-200 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                  <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3 italic">
                    <Trophy className="h-5 w-5 text-sky-500" /> Active Circuits
                  </h3>
                </div>

                <div className="space-y-4">
                  {filteredTournaments.length > 0 ? filteredTournaments.map((tourney, i) => (
                    <Link to={`/tournament/${tourney.id}`} key={i} className="flex items-center justify-between p-8 rounded-[2.5rem] border border-slate-100 bg-white hover:border-sky-500/40 transition-all shadow-sm">
                      <div className="flex items-center gap-6">
                        <div className="h-12 w-12 rounded-2xl bg-[#0B1F3A] text-sky-400 flex items-center justify-center">
                          <Trophy className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-black text-xl text-[#0B1F3A] uppercase italic">{tourney.name}</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tourney.city} • {tourney.format}</p>
                        </div>
                      </div>
                      <Badge className="bg-sky-500 text-white font-black px-4">{tourney.status}</Badge>
                    </Link>
                  )) : (
                   <div className="py-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 w-full">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">No tournament circuits active</p>
                  </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div className="bg-[#0B1F3A] p-10 rounded-[3.5rem] text-white space-y-8 relative overflow-hidden group shadow-2xl">
                <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                  <Radio className="h-40 w-40" />
                </div>
                <div className="space-y-6 relative z-10">
                  <Badge className="bg-sky-500 text-white border-none font-black px-6 py-1 text-[10px]">STUDIO READY</Badge>
                  <h3 className="text-3xl font-black tracking-tighter italic uppercase leading-tight">Broadcast <br /> Studio</h3>
                  <Link to="/broadcast/center" className="block pt-4">
                    <Button className="w-full h-16 bg-white text-[#0B1F3A] font-black rounded-2xl hover:bg-sky-500 hover:text-white shadow-xl transition-all">
                      LAUNCH STUDIO
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Court;