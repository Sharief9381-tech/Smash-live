"use client";

import React, { useState } from 'react';
import { Search, Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const RankingSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const rankingData = [
    { rank: 1, name: "Viktor Axelsen", country: "Denmark", points: 105400, trend: "none" },
    { rank: 2, name: "Shi Yuqi", country: "China", points: 98200, trend: "up" },
    { rank: 3, name: "Jonatan Christie", country: "Indonesia", points: 92150, trend: "down" },
    { rank: 4, name: "Anders Antonsen", country: "Denmark", points: 89400, trend: "up" },
    { rank: 5, name: "Kunlavut Vitidsarn", country: "Thailand", points: 87600, trend: "none" },
    { rank: 6, name: "Kodai Naraoka", country: "Japan", points: 85900, trend: "down" },
    { rank: 7, name: "Lee Zii Jia", country: "Malaysia", points: 84200, trend: "up" },
  ];

  const filteredRankings = rankingData.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="glass-panel p-10 rounded-[3rem] border-slate-200 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3">
            <Trophy className="h-6 w-6 text-sky-500" /> Global Ranking Context
          </h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time BWF Integrated Data</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search players..." 
            className="h-12 pl-11 bg-slate-50 border-slate-100 rounded-2xl font-bold focus:border-sky-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="border border-slate-100 rounded-3xl overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="w-20 text-center font-black text-[10px] uppercase tracking-widest">Rank</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Player</TableHead>
              <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Trend</TableHead>
              <TableHead className="text-right font-black text-[10px] uppercase tracking-widest pr-10">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRankings.map((p) => (
              <TableRow key={p.rank} className={p.name === "Viktor Axelsen" ? "bg-sky-50/50 border-slate-100" : "border-slate-100"}>
                <TableCell className="text-center font-black text-[#0B1F3A]">#{p.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-sky-500/10 flex items-center justify-center text-[10px] font-black text-sky-600">
                      {p.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-[#0B1F3A]">{p.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{p.country}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {p.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500 mx-auto" />}
                  {p.trend === "down" && <TrendingDown className="h-4 w-4 text-red-400 mx-auto" />}
                  {p.trend === "none" && <Minus className="h-4 w-4 text-slate-300 mx-auto" />}
                </TableCell>
                <TableCell className="text-right pr-10 font-black text-[#0B1F3A]">{p.points.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RankingSection;