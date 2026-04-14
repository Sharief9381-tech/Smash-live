"use client";

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { 
  Activity, Trophy, Zap, 
  ArrowUpRight, Target, Search as SearchIcon, MapPin, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Court = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const matches: any[] = [];
  const tournaments: any[] = [];

  const filteredMatches = useMemo(() => {
    return matches.filter(m => 
      m.p1.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.p2.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, matches]);

  const filteredTournaments = useMemo(() => {
    return tournaments.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase())
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
              <span className="text-[10px] font-black text-sky-600 uppercase tracking-[0.3em]">SMASHED</span>
            </div>
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter uppercase italic">COURT</h1>
          </div>
          
          <div className="relative w-full md:w-96">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Search Live Intelligence..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 bg-white border-slate-200 rounded-[2rem] font-bold focus:border-sky-500 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-panel p-10 rounded-[3rem] space-y-8 border-sky-500/10 shadow-sky-500/5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3 italic">
                  <Activity className="h-5 w-5 text-red-500 animate-pulse" /> Live Intelligence Feed
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {filteredMatches.length > 0 ? filteredMatches.map((match, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 p-6 rounded-3xl hover:border-sky-500/30 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{match.tournament}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-black text-[#0B1F3A] group-hover:text-sky-600 transition-colors">{match.p1}</p>
                        <p className="font-black text-[#0B1F3A] group-hover:text-sky-600 transition-colors">{match.p2}</p>
                      </div>
                      <span className="text-xl font-mono font-black text-sky-600">{match.score}</span>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-2 py-12 text-center bg-slate-100/50 rounded-3xl border-2 border-dashed border-slate-200">
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Nothing In This Court</p>
                  </div>
                )}
              </div>
            </div>

            <div className="glass-panel p-10 rounded-[3rem] space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-sky-500" /> Active Circuit Events
                </h3>
              </div>

              <div className="space-y-4">
                {filteredTournaments.length > 0 ? filteredTournaments.map((tourney, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-center justify-between p-6 rounded-[2rem] border border-slate-100 group transition-all cursor-pointer">
                    <div className="flex items-center gap-6">
                      <div className="h-14 w-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-sky-500">
                        <Trophy className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-[#0B1F3A]">{tourney.name}</h4>
                      </div>
                    </div>
                    <Button size="icon" className="h-12 w-12 rounded-2xl bg-white border border-slate-100 text-[#0B1F3A] hover:bg-sky-50 shadow-sm">
                      <ArrowUpRight className="h-5 w-5" />
                    </Button>
                  </div>
                )) : (
                   <div className="py-12 text-center bg-slate-100/50 rounded-3xl border-2 border-dashed border-slate-200">
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Nothing In This Court</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0B1F3A] p-10 rounded-[3.5rem] text-white space-y-6 relative overflow-hidden group">
              <div className="space-y-4 relative z-10">
                <Badge className="bg-sky-500 text-white border-none font-black px-4 py-1 text-[10px]">STUDIO READY</Badge>
                <h3 className="text-2xl font-black tracking-tight italic">Broadcast Studio</h3>
                <Link to="/broadcast/center" className="block pt-4">
                  <Button className="w-full h-14 bg-white text-[#0B1F3A] font-black rounded-2xl hover:bg-sky-500 hover:text-white shadow-xl border-none">
                    LAUNCH STUDIO <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Court;