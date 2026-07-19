"use client";

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { History, Search, Play, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MatchArchive = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Archives would normally come from a completed matches array in localStorage
  const archives: any[] = [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container px-6 py-16 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A]">
              <History className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-widest">Global Match Database</span>
            </div>
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter italic uppercase">Score Archive</h1>
            <p className="text-slate-500 font-medium max-w-lg">Historical log of finalized scores and match results across the circuit.</p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-4">
          <div className="flex items-center bg-white rounded-2xl px-6 h-14 border border-slate-100 shadow-sm">
            <Search className="h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter archives..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm font-black px-4 w-full"
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-transparent border-slate-100">
                <TableHead className="font-black text-[10px] uppercase tracking-widest py-8 px-10">Matchup Profile</TableHead>
                <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Final Match Score</TableHead>
                <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Tournament</TableHead>
                <TableHead className="text-right font-black text-[10px] uppercase tracking-widest pr-12">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {archives.length > 0 ? archives.map((row) => (
                <TableRow key={row.id} className="border-slate-100 h-24">
                  <TableCell className="px-10">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center text-sky-500">
                        <Zap className="h-5 w-5 fill-current" />
                      </div>
                      <div>
                        <p className="font-black text-[#0B1F3A] text-lg leading-tight">{row.matchup}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{row.date}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-mono font-black text-sky-600 text-2xl tracking-tighter">{row.score}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="font-black text-[10px] border-slate-200 uppercase px-3 py-1">
                      {row.tournament}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-12">
                    <Button variant="ghost" className="h-12 w-12 rounded-2xl hover:bg-[#0B1F3A] hover:text-white transition-all">
                      <Play className="h-5 w-5 fill-current" />
                    </Button>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-40 text-center font-bold text-slate-300 uppercase tracking-widest">
                    No matching archives in the circuit database
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MatchArchive;