"use client";

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { 
  Trophy, TrendingUp, TrendingDown, 
  Minus, Search, Globe,
  Medal, Flag, MapPin, Building,
  Target, Zap, Activity
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';

const Rankings = () => {
  const [activeCategory, setActiveCategory] = useState("ms");
  const [searchQuery, setSearchQuery] = useState("");
  const [scope, setScope] = useState("world");

  const fullDatabase = [
    { id: 1, rank: 1, name: "Viktor Axelsen", country: "Denmark", points: 105400, change: "up", matches: 842, winRate: "88", smashAcc: "94", img: "VA" },
    { id: 2, rank: 2, name: "Shi Yuqi", country: "China", points: 98200, change: "down", matches: 620, winRate: "82", smashAcc: "89", img: "SY" },
    { id: 3, rank: 3, name: "Jonatan Christie", country: "Indonesia", points: 92150, change: "none", matches: 580, winRate: "79", smashAcc: "85", img: "JC" },
    { id: 4, rank: 4, name: "Anders Antonsen", country: "Denmark", points: 89400, change: "up", matches: 512, winRate: "76", smashAcc: "82", img: "AA" },
    { id: 5, rank: 5, name: "Kunlavut Vitidsarn", country: "Thailand", points: 87600, change: "down", matches: 440, winRate: "75", smashAcc: "80", img: "KV" },
    { id: 6, rank: 6, name: "Kodai Naraoka", country: "Japan", points: 85900, change: "none", matches: 390, winRate: "74", smashAcc: "79", img: "KN" },
    { id: 7, rank: 7, name: "Lee Zii Jia", country: "Malaysia", points: 84200, change: "up", matches: 410, winRate: "73", smashAcc: "91", img: "LZ" },
    { id: 8, rank: 8, name: "Prannoy H.S.", country: "India", points: 81500, change: "up", matches: 450, winRate: "71", smashAcc: "78", img: "PH" },
    { id: 9, rank: 9, name: "Loh Kean Yew", country: "Singapore", points: 79800, change: "down", matches: 380, winRate: "70", smashAcc: "84", img: "LK" },
    { id: 10, rank: 10, name: "Anthony Ginting", country: "Indonesia", points: 78500, change: "none", matches: 520, winRate: "72", smashAcc: "81", img: "AG" },
  ];

  const filteredRankings = useMemo(() => {
    let list = [...fullDatabase];
    return list.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 text-sky-600">
              <Globe className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-widest">Global Intelligence Hub</span>
            </div>
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter">Live Rankings</h1>
            <p className="text-slate-500 font-medium max-w-lg">
              Dynamic global standings synchronized in real-time with professional performance metrics.
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
            {scopes.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setScope(s.id);
                  showSuccess(`Switched to ${s.label} view`);
                }}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all",
                  scope === s.id ? "bg-[#0B1F3A] text-white shadow-lg" : "text-slate-400 hover:text-[#0B1F3A]"
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

            <TabsContent value="ms" className="mt-8">
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
                    {filteredRankings.map((row) => (
                      <TableRow key={row.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors group h-24">
                        <TableCell className="text-center">
                          <div className={cn(
                            "inline-flex items-center justify-center w-10 h-10 rounded-lg font-black text-sm text-white",
                            row.rank === 1 ? "bg-amber-500 shadow-lg shadow-amber-500/20" :
                            row.rank === 2 ? "bg-slate-400 shadow-lg shadow-slate-400/20" :
                            row.rank === 3 ? "bg-orange-500 shadow-lg shadow-orange-500/20" :
                            row.rank <= 5 ? "bg-sky-500 shadow-lg shadow-sky-500/20" : "bg-slate-200 text-slate-500"
                          )}>
                            #{row.rank}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-[#0B1F3A] flex items-center justify-center text-xs font-black text-sky-500 border-2 border-slate-100 shadow-sm">{row.img}</div>
                            <div>
                              <h4 className="font-black text-[#0B1F3A] group-hover:text-sky-600 transition-colors text-base">{row.name}</h4>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{row.country}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="space-y-0.5">
                            <p className="font-black text-[#0B1F3A] text-lg leading-none">{row.matches}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Wins</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1.5 text-green-500 font-black text-lg">
                            <Target className="h-4 w-4" /> {row.winRate}%
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1.5 text-sky-500 font-black text-lg">
                            <Zap className="h-4 w-4" /> {row.smashAcc}%
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-xl font-black text-[#0B1F3A] tabular-nums">{row.points.toLocaleString()}</span>
                        </TableCell>
                        <TableCell className="text-right pr-12">
                          <div className="flex items-center justify-end">
                            {row.change === 'up' ? (
                              <TrendingUp className="h-6 w-6 text-green-500" />
                            ) : row.change === 'down' ? (
                              <TrendingDown className="h-6 w-6 text-red-500" />
                            ) : (
                              <Minus className="h-6 w-6 text-slate-300" />
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Rankings;