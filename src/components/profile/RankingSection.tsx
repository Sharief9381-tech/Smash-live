"use client";

import React, { useState, useEffect } from 'react';
import { Search, Trophy, Globe, Flag, MapPin, Building, Target, Zap, ChevronUp, ChevronDown, ChevronsDown, Minus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from '@/lib/utils';

const RankingSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [scope, setScope] = useState("world");
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) setUserProfile(JSON.parse(saved));
  }, []);

  const rankingData = [
    { rank: 1, name: "Viktor Axelsen", country: "Denmark", state: "Hovedstaden", points: 105400, change: "up", diff: 1, matches: 842, winRate: "88", smashAcc: "94" },
    { rank: 2, name: "Shi Yuqi", country: "China", state: "Guangdong", points: 98200, change: "down", diff: 1, matches: 620, winRate: "82", smashAcc: "89" },
    { rank: 3, name: "Jonatan Christie", country: "Indonesia", state: "Jakarta", points: 92150, change: "none", diff: 0, matches: 580, winRate: "79", smashAcc: "85" },
    { rank: 4, name: "Anders Antonsen", country: "Denmark", state: "Hovedstaden", points: 89400, change: "up", diff: 2, matches: 512, winRate: "76", smashAcc: "82" },
    { rank: 5, name: "Kunlavut Vitidsarn", country: "Thailand", state: "Bangkok", points: 87600, change: "down", diff: 2, matches: 440, winRate: "75", smashAcc: "80" },
    { rank: 6, name: "Kodai Naraoka", country: "Japan", state: "Tokyo", points: 85900, change: "none", matches: 390, winRate: "74", smashAcc: "79" },
    { rank: 7, name: "Lee Zii Jia", country: "Malaysia", state: "Selangor", points: 84200, change: "up", diff: 1, matches: 410, winRate: "73", smashAcc: "91" },
  ];

  const filteredRankings = rankingData.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesScope = true;
    if (scope === 'country' && userProfile) matchesScope = p.country === userProfile.country;
    else if (scope === 'state' && userProfile) matchesScope = p.state === userProfile.state;
    return matchesSearch && matchesScope;
  });

  const scopes = [
    { id: 'world', label: 'World', icon: Globe },
    { id: 'country', label: 'Country', icon: Flag },
    { id: 'state', label: 'State', icon: MapPin },
    { id: 'regional', label: 'Regional', icon: Building },
  ];

  return (
    <div className="glass-panel p-10 rounded-[3rem] border-slate-200 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3">
            <Trophy className="h-6 w-6 text-sky-500" /> Global Standings
          </h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time BWF Integrated Data</p>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
          {scopes.map((s) => (
            <button
              key={s.id}
              onClick={() => setScope(s.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                scope === s.id ? "bg-[#0B1F3A] text-white shadow-sm" : "text-slate-400 hover:text-[#0B1F3A]"
              )}
            >
              <s.icon className="h-3 w-3" /> {s.label}
            </button>
          ))}
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
              <TableHead className="w-20 text-center font-black text-[10px] uppercase tracking-widest py-6">Rank</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Player</TableHead>
              <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Matches</TableHead>
              <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Win %</TableHead>
              <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Smash Acc.</TableHead>
              <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Points</TableHead>
              <TableHead className="text-right font-black text-[10px] uppercase tracking-widest pr-10">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRankings.length > 0 ? filteredRankings.map((p) => (
              <TableRow key={p.rank} className={cn("border-slate-100 h-20", p.name === userProfile?.name && "bg-sky-50/30")}>
                <TableCell className="text-center">
                  <div className={cn(
                    "inline-flex items-center justify-center w-8 h-8 rounded-lg font-black text-xs text-white",
                    p.rank === 1 ? "bg-amber-500" :
                    p.rank === 2 ? "bg-slate-400" :
                    p.rank === 3 ? "bg-orange-500" : "bg-slate-200 text-slate-500"
                  )}>
                    #{p.rank}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#0B1F3A] flex items-center justify-center text-[10px] font-black text-sky-500">
                      {p.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-[#0B1F3A]">{p.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{p.country} • {p.state}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center font-bold text-[#0B1F3A]">
                  {p.matches} <span className="text-[10px] text-slate-400 uppercase ml-1">Wins</span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1 text-green-500 font-black">
                    <Target className="h-3 w-3" /> {p.winRate}%
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sky-500 font-black">
                    <Zap className="h-3 w-3" /> {p.smashAcc}%
                  </div>
                </TableCell>
                <TableCell className="text-center font-black text-[#0B1F3A]">{p.points.toLocaleString()}</TableCell>
                <TableCell className="text-right pr-10">
                  <div className="flex items-center justify-end gap-1">
                    {p.change === 'up' && (
                      <div className="flex items-center text-green-500 font-black">
                        <ChevronUp className="h-4 w-4" /> <span className="text-xs">{p.diff || 1}</span>
                      </div>
                    )}
                    {p.change === 'down' && (
                      <div className="flex items-center text-red-500 font-black">
                        {p.diff && p.diff >= 2 ? <ChevronsDown className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        <span className="text-xs">{p.diff || 1}</span>
                      </div>
                    )}
                    {p.change === 'none' && <Minus className="h-4 w-4 text-slate-300" />}
                  </div>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center font-bold text-slate-400 uppercase tracking-widest">
                  No players found in this scope.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RankingSection;