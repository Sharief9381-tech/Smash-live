"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { 
  Trophy, TrendingUp, TrendingDown, 
  Minus, Filter, Search, Globe,
  Medal, Star, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from '@/lib/utils';

const Rankings = () => {
  const [activeCategory, setActiveCategory] = useState("ms");

  const rankingsData = [
    { rank: 1, name: "Viktor Axelsen", country: "Denmark", points: 105400, change: "up", changeVal: 1, matches: 842, winRate: "88.4%", img: "VA" },
    { rank: 2, name: "Shi Yuqi", country: "China", points: 98200, change: "down", changeVal: 1, matches: 620, winRate: "82.1%", img: "SY" },
    { rank: 3, name: "Jonatan Christie", country: "Indonesia", points: 92150, change: "none", changeVal: 0, matches: 580, winRate: "79.8%", img: "JC" },
    { rank: 4, name: "Anders Antonsen", country: "Denmark", points: 89400, change: "up", changeVal: 2, matches: 512, winRate: "76.4%", img: "AA" },
    { rank: 5, name: "Kunlavut Vitidsarn", country: "Thailand", points: 87600, change: "down", changeVal: 1, matches: 440, winRate: "75.2%", img: "KV" },
    { rank: 6, name: "Kodai Naraoka", country: "Japan", points: 85900, change: "none", changeVal: 0, matches: 390, winRate: "74.8%", img: "KN" },
    { rank: 7, name: "Lee Zii Jia", country: "Malaysia", points: 84200, change: "up", changeVal: 3, matches: 410, winRate: "73.9%", img: "LZ" },
  ];

  const topThree = rankingsData.slice(0, 3);
  const others = rankingsData.slice(3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container px-6 py-16 space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 text-sky-600">
              <Globe className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-widest">Official BWF Integrated</span>
            </div>
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter">Global Rankings</h1>
            <p className="text-slate-500 font-medium max-w-lg">
              Dynamic world rankings synchronized in real-time with international tournament performance data.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-50 rounded-2xl px-4 h-12 border border-slate-200 focus-within:border-sky-500 transition-colors">
              <Search className="h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Find player..." 
                className="bg-transparent border-none outline-none text-sm font-medium px-3 w-48"
              />
            </div>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-slate-200">
              <Filter className="h-4 w-4 text-[#0B1F3A]" />
            </Button>
          </div>
        </div>

        {/* Podium Section */}
        <div className="grid md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto pt-8">
          {/* Rank 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="order-2 md:order-1 flex flex-col items-center"
          >
            <div className="relative mb-6">
              <div className="h-24 w-24 rounded-full bg-slate-100 border-4 border-slate-200 flex items-center justify-center text-2xl font-black text-slate-400">
                {topThree[1].img}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-400 text-white h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white">
                2
              </div>
            </div>
            <div className="text-center space-y-1 mb-4">
              <h3 className="text-lg font-black text-[#0B1F3A]">{topThree[1].name}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{topThree[1].country}</p>
            </div>
            <div className="w-full h-32 bg-slate-50 border-x border-t border-slate-200 rounded-t-3xl flex flex-col items-center justify-center">
              <span className="text-xl font-black text-slate-600">{topThree[1].points.toLocaleString()}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Points</span>
            </div>
          </motion.div>

          {/* Rank 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="order-1 md:order-2 flex flex-col items-center"
          >
            <div className="relative mb-8">
              <div className="h-32 w-32 rounded-full bg-sky-500/10 border-4 border-sky-500 flex items-center justify-center text-4xl font-black text-sky-600 neon-glow">
                {topThree[0].img}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-sky-500 text-white h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg border-4 border-white shadow-lg">
                1
              </div>
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
              <span className="text-[10px] font-bold text-white/70 uppercase">World Rating Points</span>
            </div>
          </motion.div>

          {/* Rank 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="order-3 flex flex-col items-center"
          >
            <div className="relative mb-6">
              <div className="h-20 w-20 rounded-full bg-orange-50 border-4 border-orange-100 flex items-center justify-center text-xl font-black text-orange-400">
                {topThree[2].img}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-orange-400 text-white h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white">
                3
              </div>
            </div>
            <div className="text-center space-y-1 mb-4">
              <h3 className="text-lg font-black text-[#0B1F3A]">{topThree[2].name}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{topThree[2].country}</p>
            </div>
            <div className="w-full h-24 bg-orange-50/50 border-x border-t border-orange-100 rounded-t-3xl flex flex-col items-center justify-center">
              <span className="text-lg font-black text-orange-600">{topThree[2].points.toLocaleString()}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Points</span>
            </div>
          </motion.div>
        </div>

        {/* Table Section */}
        <div className="space-y-8">
          <Tabs defaultValue="ms" onValueChange={setActiveCategory} className="w-full">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <TabsList className="bg-slate-100 p-1 rounded-2xl">
                <TabsTrigger value="ms" className="rounded-xl px-8 font-black text-xs uppercase data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white">Men's Singles</TabsTrigger>
                <TabsTrigger value="ws" className="rounded-xl px-8 font-black text-xs uppercase data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white">Women's Singles</TabsTrigger>
                <TabsTrigger value="md" className="rounded-xl px-8 font-black text-xs uppercase data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white">Men's Doubles</TabsTrigger>
                <TabsTrigger value="wd" className="rounded-xl px-8 font-black text-xs uppercase data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white">Women's Doubles</TabsTrigger>
                <TabsTrigger value="xd" className="rounded-xl px-8 font-black text-xs uppercase data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white">Mixed Doubles</TabsTrigger>
              </TabsList>
              <Button variant="ghost" className="text-sky-600 font-black text-xs uppercase tracking-widest">
                Export Data <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <TabsContent value="ms" className="mt-8">
              <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow className="hover:bg-transparent border-slate-100">
                      <TableHead className="w-20 text-center font-black text-[10px] uppercase tracking-widest">Rank</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest">Player Intelligence</TableHead>
                      <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Move</TableHead>
                      <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Total Matches</TableHead>
                      <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Win Rate</TableHead>
                      <TableHead className="text-right font-black text-[10px] uppercase tracking-widest pr-12">Rating Points</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rankingsData.map((row) => (
                      <TableRow key={row.rank} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
                        <TableCell className="text-center font-black text-[#0B1F3A]">
                          #{row.rank}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-[#0B1F3A]/5 flex items-center justify-center text-xs font-black text-[#0B1F3A]">
                              {row.img}
                            </div>
                            <div>
                              <h4 className="font-black text-[#0B1F3A] group-hover:text-sky-600 transition-colors">{row.name}</h4>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{row.country}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {row.change === 'up' && <span className="text-green-500 flex items-center justify-center gap-1 font-bold text-xs"><TrendingUp className="h-3 w-3" /> {row.changeVal}</span>}
                          {row.change === 'down' && <span className="text-red-500 flex items-center justify-center gap-1 font-bold text-xs"><TrendingDown className="h-3 w-3" /> {row.changeVal}</span>}
                          {row.change === 'none' && <span className="text-slate-300 flex items-center justify-center"><Minus className="h-3 w-3" /></span>}
                        </TableCell>
                        <TableCell className="text-center font-bold text-slate-500">{row.matches}</TableCell>
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

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 rounded-[2.5rem] flex items-center gap-6">
            <div className="h-16 w-16 rounded-2xl bg-sky-500 text-white flex items-center justify-center">
              <Star className="h-8 w-8 fill-current" />
            </div>
            <div>
              <h4 className="text-xl font-black text-[#0B1F3A]">Rising Stars</h4>
              <p className="text-sm text-slate-500 font-medium">Tracking the fastest climbing players in the global circuit over the last 30 days.</p>
            </div>
          </div>
          <div className="glass-panel p-8 rounded-[2.5rem] flex items-center gap-6">
            <div className="h-16 w-16 rounded-2xl bg-[#0B1F3A] text-white flex items-center justify-center">
              <Globe className="h-8 w-8" />
            </div>
            <div>
              <h4 className="text-xl font-black text-[#0B1F3A]">National Dominance</h4>
              <p className="text-sm text-slate-500 font-medium">China and Denmark continue to lead the Men's Singles category with 4 players in the Top 10.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Rankings;