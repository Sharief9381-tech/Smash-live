"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Search, Globe, Flag, MapPin, Target, Minus, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const Rankings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [scope, setScope] = useState("world");
  const [athletes, setAthletes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setAthletes(data || []);
      } catch (err) {
        console.warn("Ladder sync restricted. Ensure cloud database is linked.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAthletes();
  }, []);

  const filtered = useMemo(() => {
    return athletes.filter(p => 
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.smash_id?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, athletes]);

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
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter italic uppercase">Ladder</h1>
            <p className="text-slate-500 font-medium uppercase text-[10px] tracking-widest">Global Athlete Intelligence</p>
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

          <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm min-h-[300px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-8 w-8 text-sky-500 animate-spin" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Querying Cloud Registry...</p>
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow className="border-slate-100">
                    <TableHead className="w-24 text-center font-black text-[10px] uppercase py-6">Rank</TableHead>
                    <TableHead className="font-black text-[10px] uppercase">Athlete</TableHead>
                    <TableHead className="text-center font-black text-[10px] uppercase">Smash ID</TableHead>
                    <TableHead className="text-right font-black text-[10px] uppercase pr-12">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length > 0 ? filtered.map((row, idx) => (
                    <TableRow key={row.id} className="border-slate-100 h-20">
                      <TableCell className="text-center font-black text-slate-400">#{idx + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-[#0B1F3A] flex items-center justify-center text-[10px] font-black text-sky-500 uppercase">
                            {row.name ? row.name[0] : "?"}
                          </div>
                          <div>
                            <p className="font-black text-[#0B1F3A] uppercase italic text-sm">{row.name}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase">{row.state}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-black text-sky-500 uppercase">{row.smash_id || "OFFLINE"}</TableCell>
                      <TableCell className="text-right pr-12">
                         <Minus className="h-4 w-4 text-slate-200 ml-auto" />
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-40 text-center text-slate-300 font-black uppercase text-xs italic">
                        No athletes synchronized in this scope
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Rankings;