"use client";

import React, { useState, useMemo } from 'react';
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

  const matches = [
    { id: "M1", p1: "V. Axelsen", p2: "Shi Yuqi", score: "21-19, 14-11", tournament: "BWF Finals", viewers: "1.2M" },
    { id: "M2", p1: "An Se-young", p2: "Tai Tzu-ying", score: "21-12, 18-20", tournament: "BWF Finals", viewers: "840K" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container px-6 py-10 space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-sky-500 fill-current" />
              <span className="text-[9px] font-black text-sky-600 uppercase tracking-[0.3em]">Operational Intel</span>
            </div>
            <h1 className="text-4xl font-black text-[#0B1F3A] tracking-tighter uppercase italic">THE COURT</h1>
          </div>
          
          <div className="relative w-full md:w-80">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search Intelligence..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 pl-11 bg-white border-slate-200 rounded-2xl font-bold text-xs focus:border-sky-500 shadow-sm"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-panel p-8 rounded-[2.5rem] border-slate-100 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-50 pb-5 mb-6">
                <h3 className="text-lg font-black text-[#0B1F3A] flex items-center gap-2 italic">
                  <Activity className="h-4 w-4 text-red-500 animate-pulse" /> Live Feed
                </h3>
                <Badge className="bg-sky-500 text-white font-black px-3 h-5 text-[8px]">SYNC ACTIVE</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {matches.map((match, i) => (
                  <Link to="/live-match/active" key={i} className="bg-white border border-slate-100 p-6 rounded-3xl hover:border-sky-500/30 transition-all group shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{match.tournament}</p>
                      <span className="text-[8px] font-black text-slate-300 flex items-center gap-1"><Radio className="h-2 w-2" /> {match.viewers}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="font-black text-base text-[#0B1F3A]">{match.p1}</p>
                        <p className="font-black text-base text-[#0B1F3A]">{match.p2}</p>
                      </div>
                      <span className="text-xl font-mono font-black text-sky-600">{match.score}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0B1F3A] p-8 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden group">
              <div className="space-y-4 relative z-10">
                <Badge className="bg-sky-500 text-white font-black px-4 h-6 text-[8px]">STUDIO</Badge>
                <h3 className="text-2xl font-black italic uppercase leading-none">Broadcast <br /> Studio</h3>
                <Link to="/broadcast/center" className="block pt-2">
                  <Button className="w-full h-12 bg-white text-[#0B1F3A] font-black rounded-xl hover:bg-sky-500 hover:text-white transition-all text-[10px] uppercase tracking-widest">
                    LAUNCH <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
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