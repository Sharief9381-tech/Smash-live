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
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';

const Rankings = () => {
  const [activeCategory, setActiveCategory] = useState("ms");
  const [searchQuery, setSearchQuery] = useState("");
  const [scope, setScope] = useState("world");
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) setUserProfile(JSON.parse(saved));
  }, []);

  const fullDatabase = [
    { id: 1, rank: 1, name: "Viktor Axelsen", country: "Denmark", state: "Hovedstaden", points: 105400, change: "up", diff: 1, matches: 842, winRate: "88", smashAcc: "94", img: "VA" },
    { id: 2, rank: 2, name: "Shi Yuqi", country: "China", state: "Guangdong", points: 98200, change: "down", diff: 1, matches: 620, winRate: "82", smashAcc: "89", img: "SY" },
    { id: 3, rank: 3, name: "Jonatan Christie", country: "Indonesia", state: "Jakarta", points: 92150, change: "none", diff: 0, matches: 580, winRate: "79", smashAcc: "85", img: "JC" },
    { id: 4, rank: 4, name: "Anders Antonsen", country: "Denmark", state: "Hovedstaden", points: 89400, change: "up", diff: 2, matches: 512, winRate: "76", smashAcc: "82", img: "AA" },
    { id: 5, rank: 5, name: "Kunlavut Vitidsarn", country: "Thailand", state: "Bangkok", points: 87600, change: "down", diff: 2, matches: 440, winRate: "75", smashAcc: "80", img: "KV" },
    { id: 6, rank: 6, name: "Kodai Naraoka", country: "Japan", state: "Tokyo", points: 85900, change: "none", diff: 0, matches: 390, winRate: "74", smashAcc: "79", img: "KN" },
    { id: 7, rank: 7, name: "Lee Zii Jia", country: "Malaysia", state: "Selangor", points: 84200, change: "up", diff: 1, matches: 410, winRate: "73", smashAcc: "91", img: "LZ" },
    { id: 8, rank: 8, name: "Prannoy H.S.", country: "India", state: "Maharashtra", points: 81500, change: "up", diff: 1, matches: 450, winRate: "71", smashAcc: "78", img: "PH" },
    { id: 9, rank: 9, name: "Loh Kean Yew", country: "Singapore", state: "Central", points: 79800, change: "down", matches: 380, winRate: "70", smashAcc: "84", img: "LK" },
    { id: 10, rank: 10, name: "Anthony Ginting", country: "Indonesia", state: "Jakarta", points: 78500, change: "none", matches: 520, winRate: "72", smashAcc: "81", img: "AG" },
  ];

  const filteredRankings = useMemo(() => {
    let list = [...fullDatabase];
    if (scope === 'country' && userProfile) list = list.filter(p => p.country === userProfile.country);
    else if (scope === 'state' && userProfile) list = list.filter(p => p.state === userProfile.state);
    return list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, scope, userProfile]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container px-6 py-16 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter">Live Rankings</h1>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
            {scopes.map((s) => (
              <button key={s.id} onClick={() => setScope(s.id)} className={cn("px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all", scope === s.id ? "bg-[#0B1F3A] text-white shadow-lg" : "text-slate-400")}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-24 text-center font-black text-[10px] uppercase tracking-widest">Rank</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest">Player</TableHead>
                <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Matches</TableHead>
                <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Win %</TableHead>
                <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Smash Acc.</TableHead>
                <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Points</TableHead>
                <TableHead className="text-right font-black text-[10px] uppercase tracking-widest pr-12">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRankings.map((row, idx) => (
                <TableRow key={row.id} className="h-24">
                  <TableCell className="text-center">
                    <div className={cn("inline-flex items-center justify-center w-10 h-10 rounded-lg font-black text-sm text-white", idx === 0 ? "bg-amber-500" : idx === 1 ? "bg-slate-400" : idx === 2 ? "bg-orange-500" : "bg-slate-200 text-slate-500")}>#{idx + 1}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-[#0B1F3A] flex items-center justify-center text-xs font-black text-sky-500">{row.img}</div>
                      <div>
                        <h4 className="font-black text-[#0B1F3A] text-base">{row.name}</h4>
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
                          {row.diff && row.diff >= 2 ? <ChevronsDown className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          <span className="text-xs">{row.diff || 1}</span>
                        </div>
                      )}
                      {row.change === 'none' && <Minus className="h-4 w-4 text-slate-300" />}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

const scopes = [
  { id: 'world', label: 'World', icon: Globe },
  { id: 'country', label: 'Country', icon: Flag },
  { id: 'state', label: 'State', icon: MapPin },
  { id: 'regional', label: 'Regional', icon: Building },
];

export default Rankings;