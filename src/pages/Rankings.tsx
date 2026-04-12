"use client";

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { 
  Trophy, TrendingUp, TrendingDown, 
  Minus, Search, Globe,
  Medal, Flag, MapPin, Building
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
    { id: 1, rank: 1, name: "Viktor Axelsen", country: "Denmark", state: "Odense", points: 105400, change: "up", matches: 842, winRate: "88.4%", img: "VA" },
    { id: 2, rank: 2, name: "Shi Yuqi", country: "China", state: "Jiangsu", points: 98200, change: "down", matches: 620, winRate: "82.1%", img: "SY" },
    { id: 3, rank: 3, name: "Jonatan Christie", country: "Indonesia", state: "Jakarta", points: 92150, change: "none", matches: 580, winRate: "79.8%", img: "JC" },
    { id: 4, rank: 4, name: "Anders Antonsen", country: "Denmark", state: "Aarhus", points: 89400, change: "up", matches: 512, winRate: "76.4%", img: "AA" },
    { id: 5, rank: 5, name: "Kunlavut Vitidsarn", country: "Thailand", state: "Bangkok", points: 87600, change: "down", matches: 440, winRate: "75.2%", img: "KV" },
    { id: 6, rank: 6, name: "Kodai Naraoka", country: "Japan", state: "Aomori", points: 85900, change: "none", matches: 390, winRate: "74.8%", img: "KN" },
    { id: 7, rank: 7, name: "Lee Zii Jia", country: "Malaysia", state: "Kedah", points: 84200, change: "up", matches: 410, winRate: "73.9%", img: "LZ" },
    { id: 8, rank: 8, name: "Prannoy H.S.", country: "India", state: "Kerala", points: 81500, change: "up", matches: 450, winRate: "71.2%", img: "PH" },
    { id: 9, rank: 9, name: "Loh Kean Yew", country: "Singapore", state: "Singapore", points: 79800, change: "down", matches: 380, winRate: "70.5%", img: "LK" },
    { id: 10, rank: 10, name: "Anthony Ginting", country: "Indonesia", state: "West Java", points: 78500, change: "none", matches: 520, winRate: "72.4%", img: "AG" },
  ];

  const filteredRankings = useMemo(() => {
    let list = [...fullDatabase];
    if (scope === 'country') list = list.filter(p => p.country === "Denmark");
    if (scope === 'state') list = list.filter(p => p.state === "Odense");
    if (scope === 'regional') list = list.filter(p => ["Denmark", "Japan", "Thailand", "China"].includes(p.country));

    return list.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [scope, searchQuery]);

  const topThree = useMemo(() => filteredRankings.slice(0, 3), [filteredRankings]);

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
              Dynamic {scope} standings synchronized in real-time with performance metrics.
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

        {topThree.length >= 3 && (
          <div className="grid md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto pt-8">
            <div className="order-2 md:order-1 flex flex-col items-center">
              <div className="relative mb-6">
                <div className="h-24 w-24 rounded-full bg-slate-100 border-4 border-slate-200 flex items-center justify-center text-2xl font-black text-slate-400">{topThree[1].img}</div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-400 text-white h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white">2</div>
              </div>
              <div className="text-center space-y-1 mb-4">
                <h3 className="text-lg font-black text-[#0B1F3A]">{topThree[1].name}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{topThree[1].country}</p>
              </div>
              <div className="w-full h-32 bg-slate-50 border-x border-t border-slate-200 rounded-t-3xl flex flex-col items-center justify-center">
                <span className="text-xl font-black text-slate-600">{topThree[1].points.toLocaleString()}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Points</span>
              </div>
            </div>

            <div className="order-1 md:order-2 flex flex-col items-center">
              <div className="relative mb-8">
                <div className="h-32 w-32 rounded-full bg-sky-500/10 border-4 border-sky-500 flex items-center justify-center text-4xl font-black text-sky-600 shadow-[0_0_30px_rgba(14,165,233,0.2)]">{topThree[0].img}</div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-sky-500 text-white h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg border-4 border-white shadow-lg">1</div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <Medal className="h-8 w-8 text-yellow-500 fill-current animate-bounce" />
                </div>
              </div>
              <div className="text-center space-y-1 mb-4">
                <h3 className="text-2xl font-black text-[#0B1F3A]">{topThree[0].name}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{topThree[0].country}</p>
              </div>
              <div className="w-full h-48 bg-sky-500 border-x border-t border-sky-600 rounded-t-3xl flex flex-col items-center justify-center shadow-2xl">
                <span className="text-3xl font-black text-white">{topThree[0].points.toLocaleString()}</span>
                <span className="text-[10px] font-bold text-white/70 uppercase">Rating Points</span>
              </div>
            </div>

            <div className="order-3 flex flex-col items-center">
              <div className="relative mb-6">
                <div className="h-20 w-20 rounded-full bg-orange-50 border-4 border-orange-100 flex items-center justify-center text-xl font-black text-orange-400">{topThree[2].img}</div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-orange-400 text-white h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white">3</div>
              </div>
              <div className="text-center space-y-1 mb-4">
                <h3 className="text-lg font-black text-[#0B1F3A]">{topThree[2].name}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{topThree[2].country}</p>
              </div>
              <div className="w-full h-24 bg-orange-50/50 border-x border-t border-orange-100 rounded-t-3xl flex flex-col items-center justify-center">
                <span className="text-lg font-black text-orange-600">{topThree[2].points.toLocaleString()}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Points</span>
              </div>
            </div>
          </div>
        )}

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
                      <TableHead className="w-20 text-center font-black text-[10px] uppercase tracking-widest">Rank</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest">Player Intelligence</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest">Country</TableHead>
                      <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Move</TableHead>
                      <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Win Rate</TableHead>
                      <TableHead className="text-right font-black text-[10px] uppercase tracking-widest pr-12">Rating Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRankings.map((row) => (
                      <TableRow key={row.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
                        <TableCell className="text-center font-black text-[#0B1F3A]">#{row.rank}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-[#0B1F3A]/5 flex items-center justify-center text-xs font-black text-[#0B1F3A] uppercase">{row.img}</div>
                            <div>
                              <h4 className="font-black text-[#0B1F3A] group-hover:text-sky-600 transition-colors">{row.name}</h4>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{row.state}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-[#0B1F3A] text-sm uppercase tracking-tight">{row.country}</TableCell>
                        <TableCell className="text-center">
                          {row.change === 'up' ? <TrendingUp className="h-4 w-4 text-green-500 mx-auto" /> : row.change === 'down' ? <TrendingDown className="h-4 w-4 text-red-500 mx-auto" /> : <Minus className="h-4 w-4 text-slate-300 mx-auto" />}
                        </TableCell>
                        <TableCell className="text-center font-black text-sky-600">{row.winRate}</TableCell>
                        <TableCell className="text-right pr-12">
                          <span className="text-lg font-black text-[#0B1F3A]">{row.points.toLocaleString()}</span>
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