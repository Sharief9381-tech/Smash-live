"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Play, Search, Zap, Radio } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const LiveMatch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  
  const baseMatches = [
    { id: "pro_001", p1: "Viktor Axelsen", p2: "Shi Yuqi", score: "21-19, 14-11", tournament: "BWF Finals", viewers: "1.2M", category: "Men's Singles" },
    { id: "pro_002", p1: "An Se-young", p2: "Tai Tzu-ying", score: "21-12, 18-20", tournament: "BWF Finals", viewers: "840K", category: "Women's Singles" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container px-6 py-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-sky-500 fill-current" />
              <span className="text-[9px] font-black text-sky-600 uppercase tracking-[0.4em]">Live Broadcast Network</span>
            </div>
            <h1 className="text-4xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-none">Global Scopes</h1>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Filter Streams..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-11 pl-11 bg-white border-slate-200 rounded-2xl font-bold text-xs shadow-sm"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {baseMatches.map((match) => (
            <motion.div 
              key={match.id}
              onClick={() => navigate(`/broadcast/${match.id}`)}
              className="flex flex-col p-6 rounded-[2.5rem] border border-slate-100 bg-white transition-all group cursor-pointer hover:border-sky-500/40 hover:shadow-xl"
            >
              <div className="flex justify-between items-start mb-5">
                <Badge className="bg-[#0B1F3A] text-white border-none text-[8px] font-black uppercase px-3 h-5">{match.category}</Badge>
                <span className="text-[9px] font-black text-slate-400 uppercase flex items-center gap-1"><Radio className="h-2.5 w-2.5 text-red-500" /> {match.viewers}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-sky-600 uppercase tracking-widest">{match.tournament}</p>
                  <div className="font-black text-lg text-[#0B1F3A] leading-tight uppercase italic">
                    {match.p1} <br />
                    <span className="text-sky-500 opacity-20 text-[10px]">VS</span> <br />
                    {match.p2}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                   <span className="text-3xl font-black font-mono tracking-tighter text-sky-600">
                      {match.score}
                   </span>
                   <Button className="h-10 w-10 rounded-xl bg-[#0B1F3A] text-white shadow-lg border-none group-hover:bg-sky-500 transition-colors">
                      <Play className="h-4 w-4 fill-current ml-0.5" />
                   </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LiveMatch;