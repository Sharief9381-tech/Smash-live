"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Globe, Flag, MapPin, Target, Zap, Minus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from '@/lib/utils';

const RankingSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [scope, setScope] = useState("world");
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const loadUsers = () => {
      const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
      setUsers(registered.map((u: any) => ({
        ...u,
        matches: 0,
        winRate: "0.0",
        smashAcc: "0.0",
        points: 0,
        img: u.name ? u.name.split(' ').map((n: string) => n[0]).join('') : "?"
      })).sort((a: any, b: any) => b.points - a.points));
    };

    loadUsers();
    window.addEventListener('storage', loadUsers);
    return () => window.removeEventListener('storage', loadUsers);
  }, []);

  const filtered = useMemo(() => {
    return users.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.smashId?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, users]);

  const scopes = [
    { id: 'world', label: 'World', icon: Globe },
    { id: 'country', label: 'Country', icon: Flag },
    { id: 'state', label: 'State', icon: MapPin },
  ];

  return (
    <div className="glass-panel p-10 rounded-[3rem] border-slate-200 space-y-8 bg-white shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">Global Standings</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Live Circuit Ladder</p>
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
              <s.icon className="h-3.5 w-3.5" /> {s.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search Athlete" 
            className="h-12 pl-11 bg-slate-50 border-slate-100 rounded-2xl font-bold focus:border-sky-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="border border-slate-100 rounded-3xl overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="w-20 text-center font-black text-[10px] uppercase py-6">Rank</TableHead>
              <TableHead className="font-black text-[10px] uppercase">Athlete</TableHead>
              <TableHead className="text-center font-black text-[10px] uppercase">Points</TableHead>
              <TableHead className="text-center font-black text-[10px] uppercase">Win %</TableHead>
              <TableHead className="text-right font-black text-[10px] uppercase pr-10">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length > 0 ? filtered.map((p, idx) => (
              <TableRow key={idx} className="border-slate-100 h-20">
                <TableCell className="text-center font-black text-slate-400">#{idx + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#0B1F3A] flex items-center justify-center text-[10px] font-black text-sky-500">{p.img}</div>
                    <div>
                      <p className="font-bold text-[#0B1F3A] uppercase text-sm italic">{p.name}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">{p.smashId}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center font-black text-[#0B1F3A]">{p.points}</TableCell>
                <TableCell className="text-center font-black text-green-500">{p.winRate}%</TableCell>
                <TableCell className="text-right pr-10">
                  <Minus className="h-4 w-4 text-slate-200 ml-auto" />
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center font-bold text-slate-300 uppercase text-[10px] tracking-widest">
                  No active athletes in this scope
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