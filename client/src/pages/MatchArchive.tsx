"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { 
  History, Search, Filter, Calendar, 
  MapPin, Play, ChevronRight, Download,
  BarChart2, Star, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MatchArchive = () => {
  const archives = [
    { id: 1, date: "Dec 14, 2024", tournament: "BWF World Tour Finals", matchup: "Axelsen vs Lee Zii Jia", score: "21-19, 21-17", cat: "Men's Singles", dur: "42m" },
    { id: 2, date: "Dec 12, 2024", tournament: "BWF World Tour Finals", matchup: "An Se-young vs Yamaguchi", score: "21-15, 21-12", cat: "Women's Singles", dur: "38m" },
    { id: 3, date: "Nov 28, 2024", tournament: "China Masters", matchup: "Shi Yuqi vs Naraoka", score: "19-21, 21-18, 21-19", cat: "Men's Singles", dur: "1h 12m" },
    { id: 4, date: "Nov 25, 2024", tournament: "China Masters", matchup: "Chen/Jia vs Baek/Lee", score: "21-12, 21-15", cat: "Women's Doubles", dur: "45m" },
    { id: 5, date: "Oct 18, 2024", tournament: "Denmark Open", matchup: "Antonsen vs Christie", score: "21-17, 21-14", cat: "Men's Singles", dur: "40m" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container px-6 py-16 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A]">
              <History className="h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-widest">Global Match Database</span>
            </div>
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter italic uppercase">Score Archive</h1>
            <p className="text-slate-500 font-medium max-w-lg">Complete history of final scores and match results across the global circuit.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="h-12 rounded-xl border-slate-200 font-bold px-6">
              Export CSV
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full flex items-center bg-white rounded-2xl px-6 h-14 border border-slate-100 focus-within:border-sky-500 transition-all shadow-sm">
            <Search className="h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Smash Here" 
              className="bg-transparent border-none outline-none text-sm font-black px-4 w-full"
            />
          </div>
        </div>

        {/* Results Table */}
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
              {archives.map((row) => (
                <TableRow key={row.id} className="border-slate-100 hover:bg-sky-50/50 transition-all group h-24">
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
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Load More */}
        <div className="flex flex-col items-center gap-4 py-8">
           <Button variant="outline" className="rounded-full px-12 h-16 font-black text-[#0B1F3A] border-slate-200 hover:bg-slate-50 text-lg uppercase tracking-widest italic shadow-sm">
             LOAD MORE SCORES
           </Button>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing historical score data for 2024 circuit</p>
        </div>
      </main>
    </div>
  );
};

export default MatchArchive;