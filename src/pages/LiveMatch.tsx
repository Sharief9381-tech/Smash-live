"use client";

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  History, Play, Activity, 
  Users, MapPin, Zap, Globe, Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const LiveMatch = () => {
  const [query, setQuery] = useState("");
  
  const matches = [
    { p1: "Viktor Axelsen", p2: "Lee Zii Jia", score: "21-19, 14-11", tournament: "BWF Finals", viewers: "12.4k", status: "Live" },
    { p1: "An Se-young", p2: "Tai Tzu-ying", score: "21-12, 18-15", tournament: "Jakarta Open", viewers: "8.2k", status: "Live" },
    { p1: "Jonatan Christie", p2: "Anthony Ginting", score: "0-0", tournament: "Indonesia Master", viewers: "3.1k", status: "Warm-up" },
  ];

  const filtered = useMemo(() => {
    return matches.filter(m => 
      m.p1.toLowerCase().includes(query.toLowerCase()) || 
      m.p2.toLowerCase().includes(query.toLowerCase()) ||
      m.tournament.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container px-6 py-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">Active Intelligence</span>
            </div>
            <h1 className="text-4xl font-black text-[#0B1F3A] tracking-tighter">Live Match Dashboard</h1>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Find Match..." 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-12 pl-11 bg-white border-slate-200 rounded-xl font-bold"
                />
             </div>
             <Button variant="outline" className="h-12 border-slate-200 rounded-xl font-black text-xs px-6 uppercase text-[#0B1F3A]">
               <History className="mr-2 h-4 w-4" /> REPLAY VAULT
             </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 border-sky-500/10 shadow-sky-500/5">
              <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3 italic">
                <Activity className="h-5 w-5 text-red-500" /> Active Global Courts
              </h3>

              <div className="space-y-4">
                {filtered.length > 0 ? filtered.map((match, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-center justify-between p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-sky-500/30 transition-all group cursor-pointer">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{match.tournament}</p>
                      <div className="font-black text-xl text-[#0B1F3A]">{match.p1} <span className="text-sky-500">vs</span> {match.p2}</div>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase">
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {match.viewers}</span>
                        <span className="h-1 w-1 bg-slate-200 rounded-full" />
                        <span className="flex items-center gap-1 text-red-500"><Globe className="h-3 w-3" /> {match.status}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-8 mt-6 md:mt-0">
                       <span className="text-3xl font-mono font-black text-sky-600 tabular-nums">{match.score}</span>
                       <Link to="/broadcast/live">
                        <Button className="h-14 w-14 rounded-2xl bg-[#0B1F3A] text-white hover:bg-sky-500 transition-all shadow-xl group-hover:scale-105">
                           <Play className="h-6 w-6 fill-current" />
                        </Button>
                       </Link>
                    </div>
                  </div>
                )) : (
                  <div className="py-12 text-center bg-slate-100/50 rounded-3xl border-2 border-dashed border-slate-200">
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No player in this court</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveMatch;