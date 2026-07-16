"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Search, Globe, Flag, MapPin, Building, Target, ChevronUp, Minus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from '@/lib/utils';

const Rankings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [scope, setScope] = useState("world");
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const loadUsers = () => {
      const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
      // Points and wins are initialized to 0. 
      // This board only populates when real users register.
      setUsers(registered.map((u: any, idx: number) => ({
        ...u,
        matches: 0,
        winRate: "0.0",
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
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container px-6 py-16 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter italic">LADDER</h1>
            <p className="text-slate-500 font-medium uppercase text-[10px] tracking-widest">Real-time Athlete Performance Metrics</p>
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
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              placeholder="Search Athletes..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 h-12 text-sm font-bold focus:border-sky-500 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="border-slate-100">
                  <TableHead className="w-24 text-center font-black text-[10px] uppercase py-6">Rank</TableHead>
                  <TableHead className="font-black text-[10px] uppercase">Athlete</TableHead>
                  <TableHead className="text-center font-black text-[10px] uppercase">Points</TableHead>
                  <TableHead className="text-center font-black text-[10px] uppercase">Win %</TableHead>
                  <TableHead className="text-right font-black text-[10px] uppercase pr-12">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length > 0 ? filtered.map((row, idx) => (
                  <TableRow key={idx} className="border-slate-100 h-20">
                    <TableCell className="text-center font-black text-slate-400">#{idx + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-[#0B1F3A] flex items-center justify-center text-[10px] font-black text-sky-500">{row.img}</div>
                        <div>
                          <p className="font-black text-[#0B1F3A] uppercase italic text-sm">{row.name}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase">{row.smashId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-black text-lg text-[#0B1F3A]">{row.points}</TableCell>
                    <TableCell className="text-center font-black text-green-500">{row.winRate}%</TableCell>
                    <TableCell className="text-right pr-12">
                       <Minus className="h-4 w-4 text-slate-200 ml-auto" />
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-40 text-center text-slate-300 font-black uppercase text-xs">No active athletes in this scope</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Rankings;