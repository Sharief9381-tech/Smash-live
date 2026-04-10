"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { 
  History, Search, Filter, Calendar, 
  MapPin, Play, ChevronRight, Download,
  BarChart2, Star
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
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter">Match Archive</h1>
            <p className="text-slate-500 font-medium max-w-lg">Explore the complete history of SmashLive tracked matches with full replay and data access.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="h-12 rounded-xl border-slate-200 font-bold px-6">
              Batch Download
            </Button>
            <Button className="bg-[#0B1F3A] text-white hover:bg-[#0B1F3A]/90 h-12 rounded-xl font-bold px-8 shadow-xl">
              Advanced Filter
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full flex items-center bg-white rounded-2xl px-6 h-14 border border-slate-100 focus-within:border-sky-500 transition-all shadow-sm">
            <Search className="h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by player name, tournament, or region..." 
              className="bg-transparent border-none outline-none text-sm font-semibold px-4 w-full"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
             <div className="h-14 bg-white border border-slate-100 rounded-2xl px-6 flex items-center gap-3 shadow-sm min-w-[180px]">
               <Calendar className="h-4 w-4 text-slate-400" />
               <span className="text-sm font-bold text-[#0B1F3A]">All Seasons</span>
             </div>
             <div className="h-14 bg-white border border-slate-100 rounded-2xl px-6 flex items-center gap-3 shadow-sm min-w-[180px]">
               <Filter className="h-4 w-4 text-slate-400" />
               <span className="text-sm font-bold text-[#0B1F3A]">All Categories</span>
             </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-transparent border-slate-100">
                <TableHead className="w-12 text-center"></TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest py-6">Event Details</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest">Matchup</TableHead>
                <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Final Score</TableHead>
                <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Duration</TableHead>
                <TableHead className="text-right font-black text-[10px] uppercase tracking-widest pr-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {archives.map((row) => (
                <TableRow key={row.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="text-center">
                    <button className="text-slate-300 hover:text-yellow-500 transition-colors"><Star className="h-4 w-4" /></button>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-black text-[#0B1F3A]">{row.tournament}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{row.date}</span>
                        <Badge variant="outline" className="text-[8px] font-black border-slate-200 h-4">{row.cat}</Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-[#0B1F3A]">{row.matchup}</TableCell>
                  <TableCell className="text-center">
                    <span className="font-mono font-black text-sky-600 text-lg">{row.score}</span>
                  </TableCell>
                  <TableCell className="text-center font-bold text-slate-500">{row.dur}</TableCell>
                  <TableCell className="text-right pr-12">
                    <div className="flex items-center justify-end gap-2">
                       <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full hover:bg-sky-500 hover:text-white transition-all">
                         <Play className="h-4 w-4 fill-current" />
                       </Button>
                       <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full hover:bg-slate-100">
                         <BarChart2 className="h-4 w-4" />
                       </Button>
                       <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full hover:bg-slate-100">
                         <Download className="h-4 w-4" />
                       </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Load More */}
        <div className="flex flex-col items-center gap-4 py-8">
           <Button variant="outline" className="rounded-full px-12 h-14 font-black text-[#0B1F3A] border-slate-200 hover:bg-slate-50">
             LOAD MORE ARCHIVES
           </Button>
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing 5 of 14,242 records</p>
        </div>
      </main>
    </div>
  );
};

export default MatchArchive;