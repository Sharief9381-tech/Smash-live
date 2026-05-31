"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { 
  History, Trophy, Zap, 
  Search, ListFilter, Play,
  Calendar, MapPin, Activity, 
  User, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from 'react-router-dom';

const Smashed = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [myMatches, setMyMatches] = useState<any[]>([]);

  useEffect(() => {
    const loadMyMatches = () => {
      const active = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
      setMyMatches(active);
    };
    loadMyMatches();
  }, []);

  const archives = [
    { id: 1, date: "Dec 14, 2024", tournament: "BWF World Tour Finals", matchup: "Axelsen vs Lee Zii Jia", score: "21-19, 21-17", cat: "Men's Singles" },
    { id: 2, date: "Dec 12, 2024", tournament: "BWF World Tour Finals", matchup: "An Se-young vs Yamaguchi", score: "21-15, 21-12", cat: "Women's Singles" },
    { id: 3, date: "Nov 28, 2024", tournament: "China Masters", matchup: "Shi Yuqi vs Naraoka", score: "19-21, 21-18, 21-19", cat: "Men's Singles" },
  ];

  const tournaments = [
    { id: "T1", name: "BWF World Tour Finals", loc: "Jakarta, ID", status: "Completed", winner: "Viktor Axelsen" },
    { id: "T2", name: "China Masters 2024", loc: "Shenzhen, CN", status: "Ongoing", winner: "TBD" },
    { id: "T3", name: "Denmark Open", loc: "Odense, DK", status: "Completed", winner: "Viktor Axelsen" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container px-6 py-16 space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 text-sky-600">
              <Zap className="h-4 w-4 fill-current" />
              <span className="text-[10px] font-black uppercase tracking-widest">Intelligence Archive</span>
            </div>
            <h1 className="text-6xl font-black text-[#0B1F3A] tracking-tighter uppercase italic">SMASHED</h1>
            <p className="text-slate-500 font-medium max-w-xl">A unified view of global badminton history and your personal court milestones.</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Search Archives..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 bg-white border-slate-200 rounded-[2rem] font-bold focus:border-sky-500 transition-all shadow-sm"
            />
          </div>
        </div>

        <Tabs defaultValue="history" className="space-y-10">
          <TabsList className="bg-white border border-slate-200 p-1.5 rounded-[2rem] shadow-sm w-full md:w-auto h-auto flex flex-wrap">
            <TabsTrigger value="history" className="flex-1 md:flex-none rounded-[1.5rem] px-10 h-12 data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white font-black text-xs uppercase tracking-widest transition-all">Past Matches</TabsTrigger>
            <TabsTrigger value="tournaments" className="flex-1 md:flex-none rounded-[1.5rem] px-10 h-12 data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white font-black text-xs uppercase tracking-widest transition-all">Tournaments</TabsTrigger>
            <TabsTrigger value="my-matches" className="flex-1 md:flex-none rounded-[1.5rem] px-10 h-12 data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white font-black text-xs uppercase tracking-widest transition-all">My Matches</TabsTrigger>
          </TabsList>

          {/* Past Matches Section */}
          <TabsContent value="history" className="m-0">
            <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow className="hover:bg-transparent border-slate-100">
                    <TableHead className="font-black text-[10px] uppercase tracking-widest py-8 px-10">Matchup Profile</TableHead>
                    <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Final Score</TableHead>
                    <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Category</TableHead>
                    <TableHead className="text-right font-black text-[10px] uppercase tracking-widest pr-10">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {archives.map((match) => (
                    <TableRow key={match.id} className="border-slate-100 hover:bg-sky-50/50 transition-all group h-24">
                      <TableCell className="px-10">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center text-sky-500">
                            <History className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-black text-[#0B1F3A] text-lg leading-tight">{match.matchup}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{match.date} • {match.tournament}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="font-mono font-black text-sky-600 text-2xl tracking-tighter">{match.score}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="font-black text-[10px] border-slate-200 uppercase px-3 py-1">{match.cat}</Badge>
                      </TableCell>
                      <TableCell className="text-right pr-10">
                        <Button variant="ghost" className="h-12 w-12 rounded-2xl hover:bg-[#0B1F3A] hover:text-white transition-all">
                          <Play className="h-5 w-5 fill-current" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Tournaments Section */}
          <TabsContent value="tournaments" className="m-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tournaments.map((t) => (
                <motion.div 
                  whileHover={{ y: -5 }}
                  key={t.id} 
                  className="glass-panel p-8 rounded-[2.5rem] border-slate-200 space-y-6 group"
                >
                  <div className="flex justify-between items-start">
                    <div className="h-14 w-14 rounded-2xl bg-[#0B1F3A] text-white flex items-center justify-center shadow-lg group-hover:bg-sky-500 transition-colors">
                      <Trophy className="h-7 w-7" />
                    </div>
                    <Badge className={cn("font-black px-4 h-6 text-[9px] uppercase", t.status === 'Ongoing' ? "bg-red-500 text-white animate-pulse" : "bg-slate-100 text-[#0B1F3A]")}>
                      {t.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-[#0B1F3A] leading-tight">{t.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-sky-500" /> {t.loc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div>
                      <p className="text-[8px] font-black text-slate-300 uppercase">Winner</p>
                      <p className="text-sm font-black text-[#0B1F3A]">{t.winner}</p>
                    </div>
                    <Button onClick={() => navigate(`/tournament/${t.id}`)} variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* My Matches Section */}
          <TabsContent value="my-matches" className="m-0">
            {myMatches.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {myMatches.map((m) => (
                  <motion.div 
                    whileHover={{ y: -5 }}
                    key={m.id} 
                    className="glass-panel p-8 rounded-[2.5rem] border-sky-500/20 space-y-6 group bg-white"
                  >
                    <div className="flex justify-between items-start">
                      <div className="h-14 w-14 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-lg">
                        <Activity className="h-7 w-7" />
                      </div>
                      <Badge className="bg-[#0B1F3A] text-white font-black px-4 h-6 text-[9px] uppercase">MY STUDIO</Badge>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-black text-[#0B1F3A] leading-tight">
                        {m.players?.p1?.name || "Player 1"} vs {m.players?.p2?.name || "Player 2"}
                      </h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck className="h-3 w-3 text-sky-500" /> {m.name}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                      <div>
                        <p className="text-[8px] font-black text-slate-300 uppercase">Live Score</p>
                        <p className="text-2xl font-black text-sky-600 font-mono">{m.currentScore?.[0]}-{m.currentScore?.[1]}</p>
                      </div>
                      <Button onClick={() => navigate(`/scoring/${m.id}`)} className="h-12 px-6 rounded-xl bg-[#0B1F3A] text-white font-black text-[10px] uppercase tracking-widest">
                        Resume Scoring
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-32 text-center bg-white border-2 border-dashed border-slate-200 rounded-[3rem]">
                <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Activity className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">No Matches Initialized</h3>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2 max-w-xs mx-auto">
                  You haven't created any matches in your studio yet.
                </p>
                <Button onClick={() => navigate('/broadcast/center')} className="mt-8 bg-sky-500 text-white font-black rounded-xl h-12 px-8 shadow-xl">
                  Go to Studio
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Smashed;