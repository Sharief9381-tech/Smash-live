"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { 
  Activity, Trophy, Zap, 
  ArrowUpRight, Target, Search as SearchIcon, MapPin, TrendingUp,
  Globe, Radio, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Court = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [matches, setMatches] = useState<any[]>([]);
  const [tournaments, setTournaments] = useState<any[]>([]);

  useEffect(() => {
    const loadData = () => {
      const activeMatches = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
      const activeTourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      
      setMatches(activeMatches.map((m: any) => ({
        id: m.id,
        p1: m.players?.p1?.name || (m.players?.tA1?.name ? `${m.players.tA1.name} / ${m.players.tA2.name}` : "Player 1"),
        p2: m.players?.p2?.name || (m.players?.tB1?.name ? `${m.players.tB1.name} / ${m.players.tB2.name}` : "Player 2"),
        score: m.currentScore ? `${m.currentScore[0]}-${m.currentScore[1]}` : "0-0",
        tournament: m.name,
        viewers: "LIVE"
      })));

      setTournaments(activeTourneys.map((t: any) => ({
        id: t.id,
        name: t.name,
        loc: t.city,
        status: t.status,
        players: t.participants?.length || 0,
        cat: t.format,
        prize: "TBD"
      })));
    };

    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const filteredMatches = useMemo(() => {
    return matches.filter(m => 
      m.p1.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.p2.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tournament.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, matches]);

  const filteredTournaments = useMemo(() => {
    return tournaments.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.loc.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
              placeholder="Search Global Intelligence..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 bg-white border-slate-200 rounded-[2rem] font-bold focus:border-sky-500 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 border-sky-500/10 shadow-sky-500/5 bg-white">
              <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3 italic">
                  <Activity className="h-5 w-5 text-red-500 animate-pulse" /> Live Feed
                </h3>
                <Badge className="bg-sky-500 text-white border-none font-black px-4 text-[9px]">REAL-TIME SYNC</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredMatches.length > 0 ? filteredMatches.map((match, i) => (
                  <Link to={`/broadcast/${match.id}`} key={i} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] hover:border-sky-500/30 transition-all cursor-pointer group shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{match.tournament}</p>
                      <div className="flex items-center gap-1.5">
                        <Radio className="h-3 w-3 text-red-500" />
                        <span className="text-[9px] font-black text-slate-300">{match.viewers}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-black text-lg text-[#0B1F3A] group-hover:text-sky-600 transition-colors">{match.p1}</p>
                        <p className="font-black text-lg text-[#0B1F3A] group-hover:text-sky-600 transition-colors">{match.p2}</p>
                      </div>
                      <span className="text-2xl font-mono font-black text-sky-600 group-hover:scale-110 transition-transform">{match.score}</span>
                    </div>
                  </Link>
                )) : (
                  <div className="col-span-2 py-12 text-center bg-slate-100/50 rounded-3xl border-2 border-dashed border-slate-200">
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest italic">No player found in this scope</p>
                  </div>
                )}
              </div>
            </div>

            <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 bg-white border-slate-200 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3 italic">
                  <Trophy className="h-5 w-5 text-sky-500" /> Active Circuit Events
                </h3>
              </div>

              <div className="space-y-4">
                {filteredTournaments.length > 0 ? filteredTournaments.map((tourney, i) => (
                  <Link to={`/tournament/${tourney.id}`} key={i} className="flex flex-col md:flex-row items-center justify-between p-8 rounded-[2.5rem] border border-slate-100 bg-white group transition-all cursor-pointer hover:border-sky-500/40 shadow-sm">
                    <div className="flex items-center gap-6">
                      <div className="h-14 w-14 rounded-2xl bg-[#0B1F3A] text-white flex items-center justify-center shadow-lg group-hover:bg-sky-500 transition-colors">
                        <Trophy className="h-7 w-7" />
                      </div>
                      <div>
                        <h4 className="font-black text-xl text-[#0B1F3A]">{tourney.name}</h4>
                        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                          <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-sky-500" /> {tourney.loc}</span>
                          <span className="flex items-center gap-1.5"><TrendingUp className="h-3 w-3 text-sky-500" /> {tourney.cat}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8 mt-6 md:mt-0">
                       <div className="text-right">
                          <p className="text-[9px] font-black text-slate-300 uppercase">Prize Pool</p>
                          <p className="text-lg font-black text-sky-600">{tourney.prize}</p>
                       </div>
                       <Button size="icon" className="h-14 w-14 rounded-2xl bg-white border border-slate-100 text-[#0B1F3A] hover:bg-sky-50 shadow-sm transition-all group-hover:translate-x-2">
                        <ArrowUpRight className="h-6 w-6" />
                      </Button>
                    </div>
                  </Link>
                )) : (
                   <div className="py-12 text-center bg-slate-100/50 rounded-3xl border-2 border-dashed border-slate-200">
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest italic">No circuits found in this scope</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0B1F3A] p-10 rounded-[3.5rem] text-white space-y-8 relative overflow-hidden group border-none shadow-2xl">
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:rotate-12 group-hover:scale-125 transition-transform duration-700">
                <Radio className="h-40 w-40" />
              </div>
              <div className="space-y-6 relative z-10">
                <Badge className="bg-sky-500 text-white border-none font-black px-6 py-1 text-[10px] h-7">STUDIO READY</Badge>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tighter italic uppercase leading-none">Broadcast <br /> Studio</h3>
                  <p className="text-[11px] font-bold text-white/50 uppercase tracking-widest">Initialize your session</p>
                </div>
                <Link to="/broadcast/center" className="block pt-4">
                  <Button className="w-full h-16 bg-white text-[#0B1F3A] font-black rounded-2xl hover:bg-sky-500 hover:text-white shadow-xl border-none text-xs uppercase tracking-widest transition-all">
                    LAUNCH STUDIO <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 bg-white border-slate-200 shadow-sm">
               <h4 className="text-[10px] font-black text-[#0B1F3A] uppercase tracking-[0.3em] flex items-center gap-3">
                 <ShieldCheck className="h-4 w-4 text-sky-500" /> Security Intelligence
               </h4>
               <div className="space-y-6">
                  <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 space-y-3">
                     <p className="text-[9px] font-black text-slate-400 uppercase">Operational Status</p>
                     <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-[#0B1F3A]">All Nodes Active</span>
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                     </div>
                  </div>
                  <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 space-y-3">
                     <p className="text-[9px] font-black text-slate-400 uppercase">Global Sync Latency</p>
                     <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-[#0B1F3A]">42ms (Ultra Low)</span>
                        <Globe className="h-4 w-4 text-sky-500" />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Court;