"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { 
  Trophy, Search, Globe, Flag, MapPin, Building,
  Target, Zap, ChevronUp, ChevronDown, Minus
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { playersDatabase } from '@/data/players';

const Rankings = () => {
  const [activeCategory, setActiveCategory] = useState("ms");
  const [searchQuery, setSearchQuery] = useState("");
  const [scope, setScope] = useState("world");
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) setUserProfile(JSON.parse(saved));
  }, []);

  const displayedRankings = useMemo(() => {
    return playersDatabase.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 10);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container px-6 py-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-[#0B1F3A] tracking-tighter uppercase italic">Live Rankings</h1>
            <p className="text-xs text-slate-500 font-medium">BWF Integrated Global Intelligence Database.</p>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl">
            {['world', 'country', 'state'].map((s) => (
              <button
                key={s}
                onClick={() => setScope(s)}
                className={cn(
                  "px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                  scope === s ? "bg-[#0B1F3A] text-white shadow-md" : "text-slate-400"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 gap-4">
            <div className="flex gap-2">
              <button className="px-5 py-2 bg-[#0B1F3A] text-white rounded-lg text-[10px] font-black uppercase">Singles</button>
              <button className="px-5 py-2 bg-slate-50 text-slate-400 rounded-lg text-[10px] font-black uppercase">Doubles</button>
            </div>
            
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input 
                placeholder="Search Athlete..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 h-9 text-[11px] font-bold outline-none focus:border-sky-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="w-16 text-center font-black text-[9px] uppercase tracking-widest py-5">Rank</TableHead>
                  <TableHead className="font-black text-[9px] uppercase tracking-widest">Player</TableHead>
                  <TableHead className="text-center font-black text-[9px] uppercase tracking-widest">Win %</TableHead>
                  <TableHead className="text-center font-black text-[9px] uppercase tracking-widest">Points</TableHead>
                  <TableHead className="text-right font-black text-[9px] uppercase tracking-widest pr-10">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedRankings.map((row, idx) => (
                  <TableRow key={row.id} className="border-slate-50 h-16">
                    <TableCell className="text-center">
                      <span className={cn(
                        "inline-flex items-center justify-center w-7 h-7 rounded-md font-black text-[10px] text-white",
                        idx === 0 ? "bg-amber-500" : idx === 1 ? "bg-slate-400" : idx === 2 ? "bg-orange-500" : "bg-slate-100 text-slate-400"
                      )}>
                        #{idx + 1}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#0B1F3A] flex items-center justify-center text-[9px] font-black text-sky-500">{row.img}</div>
                        <div>
                          <h4 className="font-black text-[#0B1F3A] text-sm leading-tight">{row.name}</h4>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{row.country}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-black text-green-500 text-sm">{row.winRate}%</TableCell>
                    <TableCell className="text-center font-black text-[#0B1F3A] text-sm">{row.points.toLocaleString()}</TableCell>
                    <TableCell className="text-right pr-10">
                      <div className="flex items-center justify-end">
                        {row.change === 'up' ? <ChevronUp className="h-3.5 w-3.5 text-green-500" /> : <ChevronDown className="h-3.5 w-3.5 text-red-500" />}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Rankings;