"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { 
  Trophy, TrendingUp, TrendingDown, 
  Minus, Search, Globe,
  Flag, MapPin, Building,
  Target, Zap, ChevronUp, ChevronDown, ChevronsDown
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { playersDatabase, Player } from '@/data/players';

const Rankings = () => {
  const [activeCategory, setActiveCategory] = useState("ms");
  const [searchQuery, setSearchQuery] = useState("");
  const [scope, setScope] = useState("world");
  const [visibleCount, setVisibleCount] = useState(7);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) setUserProfile(JSON.parse(saved));
    
    // Check for search query in URL
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) setSearchQuery(q);
  }, []);

  const filteredRankings = useMemo(() => {
    let list = [...playersDatabase];
    
    if (userProfile) {
      const userExists = list.some(p => p.name === userProfile.name);
      if (!userExists) {
        list.push({
          id: 9999,
          rank: 1,
          name: userProfile.name,
          country: userProfile.country,
          state: userProfile.state,
          points: 115000,
          change: "up",
          diff: 1,
          matches: 842,
          winRate: "88.4",
          smashAcc: "94.2",
          img: userProfile.name.split(' ').map((n: string) => n[0]).join(''),
          isUser: true
        });
      }
    }

    if (scope === 'country' && userProfile) {
      list = list.filter(p => p.country === userProfile.country);
    } else if (scope === 'state' && userProfile) {
      list = list.filter(p => p.state === userProfile.state);
    }

    list.sort((a, b) => b.points - a.points);

    return list.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, scope, userProfile]);

  const displayedRankings = useMemo(() => {
    return filteredRankings.slice(0, visibleCount);
  }, [filteredRankings, visibleCount]);

  const handleSmashIt = () => {
    setVisibleCount(filteredRankings.length);
  };

  const scopes = [
    { id: 'world', label: 'World', icon: Globe },
    { id: 'country', label: 'Country', icon: Flag },
    { id: 'state', label: 'State', icon: MapPin },
    { id: 'regional', label: 'Regional', icon: Building },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container px-6 py-16 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter">Live Rankings</h1>
            <p className="text-slate-500 font-medium">Global intelligence database containing 100+ professional athletes.</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
            {scopes.map((s) => (
              <button
                key={s.id}
                onClick={() => setScope(s.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all",
                  scope === s.id ? "bg-[#0B1F3A] text-white shadow-lg" : "text-slate-400"
                )}
              >
                <s.icon className="h-3.5 w-3.5" /> {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <Tabs defaultValue="ms" onValueChange={setActiveCategory} className="w-full">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 gap-4">
              <TabsList className="bg-slate-100 p-1 rounded-2xl">
                <TabsTrigger value="ms" className="rounded-xl px-6 font-black text-xs uppercase data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white">Men's Singles</TabsTrigger>
                <TabsTrigger value="ws" className="rounded-xl px-6 font-black text-xs uppercase data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white">Women's Singles</TabsTrigger>
              </TabsList>
              
              <div className="flex-1 max-w-xs relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Find player..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 h-10 text-xs font-bold focus:border-sky-500 outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value="ms" className="mt-8 space-y-12">
              <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow className="hover:bg-transparent border-slate-100">
                      <TableHead className="w-24 text-center font-black text-[10px] uppercase tracking-widest py-6">Rank</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest">Player</TableHead>
                      <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Matches</TableHead>
                      <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Win %</TableHead>
                      <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Smash Acc.</TableHead>
                      <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Points</TableHead>
                      <TableHead className="text-right font-black text-[10px] uppercase tracking-widest pr-12">Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedRankings.length > 0 ? displayedRankings.map((row, idx) => (
                      <TableRow key={row.id} className={cn("border-slate-100 h-24", row.isUser && "bg-sky-50/30")}>
                        <TableCell className="text-center">
                          <div className={cn(
                            "inline-flex items-center justify-center w-10 h-10 rounded-lg font-black text-sm text-white",
                            idx === 0 ? "bg-amber-500" :
                            idx === 1 ? "bg-slate-400" :
                            idx === 2 ? "bg-orange-500" : "bg-slate-200 text-slate-500"
                          )}>
                            #{idx + 1}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-[#0B1F3A] flex items-center justify-center text-xs font-black text-sky-500">{row.img}</div>
                            <div>
                              <h4 className="font-black text-[#0B1F3A] text-base">
                                {row.name} {row.isUser && <span className="ml-1 text-[8px] bg-sky-500 text-white px-1.5 py-0.5 rounded-full">YOU</span>}
                              </h4>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{row.country} • {row.state}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-black text-lg">{row.matches}</TableCell>
                        <TableCell className="text-center font-black text-green-500 text-lg">{row.winRate}%</TableCell>
                        <TableCell className="text-center font-black text-sky-500 text-lg">{row.smashAcc}%</TableCell>
                        <TableCell className="text-center font-black text-[#0B1F3A] text-xl">{row.points.toLocaleString()}</TableCell>
                        <TableCell className="text-right pr-12">
                          <div className="flex items-center justify-end gap-1">
                            {row.change === 'up' && (
                              <div className="flex items-center text-green-500 font-black">
                                <ChevronUp className="h-4 w-4" /> <span className="text-xs">{row.diff || 1}</span>
                              </div>
                            )}
                            {row.change === 'down' && (
                              <div className="flex items-center text-red-500 font-black">
                                <ChevronDown className="h-4 w-4" /> <span className="text-xs">{row.diff || 1}</span>
                              </div>
                            )}
                            {row.change === 'none' && <Minus className="h-4 w-4 text-slate-300" />}
                          </div>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-64 text-center">
                          <div className="flex flex-col items-center justify-center space-y-4">
                            <Target className="h-12 w-12 text-slate-200" />
                            <p className="font-black text-[#0B1F3A] uppercase tracking-widest">No player in this court</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {visibleCount < filteredRankings.length && (
                <div className="flex flex-col items-center gap-4">
                   <Button 
                    onClick={handleSmashIt}
                    className="rounded-full px-12 h-16 bg-[#0B1F3A] text-white font-black text-lg hover:bg-sky-500 transition-all shadow-2xl"
                   >
                     SMASH IT
                   </Button>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Explore all {filteredRankings.length} intelligence entries</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Rankings;