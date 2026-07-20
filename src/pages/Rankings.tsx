"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Search, Globe, Flag, MapPin, Loader2, Minus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase, isCloudConfigured } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const Rankings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [scope, setScope] = useState("world");
  const [athletes, setAthletes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setAthletes(data || []);
      } catch (err) {
        setAthletes(JSON.parse(localStorage.getItem('registered_users') || '[]'));
      } finally {
        setIsLoading(false);
      }
    };
    fetchAthletes();
  }, []);

  const filtered = useMemo(() => athletes.filter(p => p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || p.smash_id?.toLowerCase().includes(searchQuery.toLowerCase())), [searchQuery, athletes]);

  return (
    <div className="min-h-screen bg-white pb-32">
      <Navbar />
      <main className="container px-4 py-8 space-y-10">
        <div className="space-y-6">
          <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter italic uppercase leading-none">Ladder</h1>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['world', 'country', 'state'].map((s) => (
              <button 
                key={s} 
                onClick={() => setScope(s)} 
                className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap", scope === s ? "bg-[#0B1F3A] text-white shadow-lg" : "bg-slate-50 text-slate-400 border border-slate-100")}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input 
            placeholder="Search Athlete Dossiers..." 
            className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xs shadow-sm outline-none focus:border-sky-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4"><Loader2 className="h-8 w-8 text-sky-500 animate-spin" /><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Querying Cloud Registry...</p></div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-[600px]">
                <TableHeader className="bg-slate-50">
                  <TableRow className="border-slate-100">
                    <TableHead className="w-20 text-center font-black text-[9px] uppercase py-6 px-4">Rank</TableHead>
                    <TableHead className="font-black text-[9px] uppercase px-4 sticky left-0 bg-slate-50 z-10">Athlete</TableHead>
                    <TableHead className="text-center font-black text-[9px] uppercase px-4">Smash ID</TableHead>
                    <TableHead className="text-center font-black text-[9px] uppercase px-4">Points</TableHead>
                    <TableHead className="text-right font-black text-[9px] uppercase pr-10">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length > 0 ? filtered.map((row, idx) => (
                    <TableRow key={row.id || idx} className="border-slate-100 h-24">
                      <TableCell className="text-center font-black text-slate-400">#{idx + 1}</TableCell>
                      <TableCell className="sticky left-0 bg-white z-10 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-[#0B1F3A] flex items-center justify-center text-[10px] font-black text-sky-500 uppercase">{row.name ? row.name[0] : "?"}</div>
                          <div><p className="font-black text-[#0B1F3A] uppercase italic text-sm leading-tight">{row.name}</p><p className="text-[8px] font-bold text-slate-400 uppercase">{row.state || "Active Node"}</p></div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-black text-sky-500 text-[10px] uppercase px-4">{row.smash_id || row.smashId || "NODE_01"}</TableCell>
                      <TableCell className="text-center font-black text-[#0B1F3A] px-4">0</TableCell>
                      <TableCell className="text-right pr-10"><Minus className="h-4 w-4 text-slate-200 ml-auto" /></TableCell>
                    </TableRow>
                  )) : (
                    <TableRow><TableCell colSpan={5} className="h-40 text-center text-slate-300 font-black uppercase text-[10px] italic">No active athletes detected</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Rankings;