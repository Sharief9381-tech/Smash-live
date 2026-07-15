"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, Trophy, Zap, 
  Search, Play,
  Calendar, MapPin, Activity, 
  ShieldCheck, Users,
  ChevronRight, X, Phone, Fingerprint,
  ArrowRight, MoreVertical, Trash2, Link as LinkIcon,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';

const GLOBAL_ARCHIVES = [
  { id: 1, date: "Dec 14, 2024", tournament: "BWF World Tour Finals", matchup: "Axelsen vs Lee Zii Jia", score: "21-19, 21-17", cat: "Men's Singles" },
  { id: 2, date: "Dec 12, 2024", tournament: "BWF World Tour Finals", matchup: "An Se-young vs Yamaguchi", score: "21-15, 21-12", cat: "Women's Singles" },
  { id: 3, date: "Nov 28, 2024", tournament: "China Masters", matchup: "Shi Yuqi vs Naraoka", score: "19-21, 21-18, 21-19", cat: "Men's Singles" },
];

const getInitials = (name: string) => {
  if (!name) return "??";
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const Smashed = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [myMatches, setMyMatches] = useState<any[]>([]);
  const [myTourneys, setMyTourneys] = useState<any[]>([]);
  const [selectedTourney, setSelectedTourney] = useState<any>(null);

  const loadMyData = () => {
    const activeMatches = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
    const activeTourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
    setMyMatches(activeMatches);
    setMyTourneys(activeTourneys);
    
    if (selectedTourney) {
      const updated = activeTourneys.find((t: any) => t.id === selectedTourney.id);
      if (updated) setSelectedTourney(updated);
    }
  };

  useEffect(() => {
    loadMyData();
    const interval = setInterval(loadMyData, 2000);
    return () => clearInterval(interval);
  }, [selectedTourney?.id]);

  const handleDeleteTourney = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const existing = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
    const filtered = existing.filter((t: any) => t.id !== id);
    localStorage.setItem('active_studio_tournaments', JSON.stringify(filtered));
    showSuccess("Tournament deleted successfully");
    loadMyData();
  };

  const handleCopyRegLink = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    const link = `${window.location.origin}/register/${slug}`;
    navigator.clipboard.writeText(link);
    showSuccess("Registration link copied!");
  };

  const filteredMyTourneys = useMemo(() => {
    return myTourneys.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (t.city || t.location || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, myTourneys]);

  const filteredMyMatches = useMemo(() => {
    return myMatches.filter(m => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.players?.p1?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.players?.p2?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, myMatches]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container px-6 py-16 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 text-sky-600">
              <Zap className="h-4 w-4 fill-current" />
              <span className="text-[10px] font-black uppercase tracking-widest">Intelligence Archive</span>
            </div>
            <h1 className="text-6xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-none">SMASHED</h1>
            <p className="text-slate-500 font-medium max-w-xl">Unified view of global badminton history and your studio metrics.</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Search Studio Assets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 bg-white border-slate-200 rounded-[2rem] font-bold focus:border-sky-500 transition-all shadow-sm"
            />
          </div>
        </div>

        <Tabs defaultValue="my-tourneys" className="space-y-10">
          <TabsList className="bg-white border border-slate-200 p-1.5 rounded-[2rem] shadow-sm w-full md:w-auto h-auto flex flex-wrap">
            <TabsTrigger value="my-tourneys" className="flex-1 md:flex-none rounded-[1.5rem] px-10 h-12 data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white font-black text-xs uppercase tracking-widest transition-all">My Tournaments</TabsTrigger>
            <TabsTrigger value="my-matches" className="flex-1 md:flex-none rounded-[1.5rem] px-10 h-12 data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white font-black text-xs uppercase tracking-widest transition-all">My Matches</TabsTrigger>
            <TabsTrigger value="history" className="flex-1 md:flex-none rounded-[1.5rem] px-10 h-12 data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white font-black text-xs uppercase tracking-widest transition-all">Global History</TabsTrigger>
          </TabsList>

          <TabsContent value="my-tourneys" className="m-0">
            {selectedTourney ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <button onClick={() => setSelectedTourney(null)} className="flex items-center gap-2 text-[#64748B] hover:text-[#0B1F3A] transition-colors group">
                    <X className="h-5 w-5 group-hover:rotate-90 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Back to Tournaments</span>
                  </button>
                  <div className="flex items-center gap-4">
                    <h4 className="text-xl font-black text-[#0B1F3A] italic uppercase">{selectedTourney.name}</h4>
                    <Badge className="bg-sky-500 text-white font-black px-6 h-10 rounded-xl text-xs">{selectedTourney.participants?.length || 0} Registered</Badge>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-[3rem] overflow-hidden shadow-2xl">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow className="hover:bg-transparent border-slate-100">
                        <TableHead className="font-black text-[10px] uppercase tracking-widest py-8 px-10">Athlete</TableHead>
                        <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Contact</TableHead>
                        <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Smash ID</TableHead>
                        <TableHead className="text-right font-black text-[10px] uppercase tracking-widest pr-12">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedTourney.participants && selectedTourney.participants.length > 0 ? (
                        selectedTourney.participants.map((p: any, idx: number) => (
                          <TableRow key={idx} className="border-slate-100 hover:bg-sky-50/30 h-24 transition-all">
                            <TableCell className="px-10">
                              <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-[#071D49] flex items-center justify-center text-[#1DA1F2] font-black border-2 border-slate-100">
                                  {getInitials(p.name)}
                                </div>
                                <div>
                                  <p className="font-black text-[#0B1F3A] text-lg leading-tight">{p.name}</p>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Entry</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="inline-flex items-center gap-2 font-bold text-[#64748B] bg-slate-50 px-4 py-2 rounded-xl">
                                <Phone className="h-3 w-3 text-[#1DA1F2]" />
                                {p.phone}
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline" className="font-black border-slate-200 text-[#0B1F3A]">
                                <Fingerprint className="h-3.5 w-3.5 mr-2 text-sky-500" /> {p.smashId}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right pr-12">
                              <Button onClick={() => navigate('/live-match/create')} className="h-12 px-8 rounded-2xl bg-[#0B1F3A] text-white font-black text-[10px] uppercase tracking-widest hover:bg-sky-500 shadow-lg transition-all group/btn">
                                Create Match <Play className="ml-2 h-4 w-4 fill-current group-hover/btn:translate-x-1 transition-transform" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="h-64 text-center">
                            <div className="space-y-6">
                               <Users className="h-14 w-14 text-slate-100 mx-auto animate-pulse" />
                               <div className="space-y-1">
                                 <h3 className="font-black text-slate-300 uppercase tracking-widest text-xl italic">Awaiting Participants</h3>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase max-w-xs mx-auto">Share the link to synchronize players with this tournament.</p>
                               </div>
                               <Button onClick={(e) => handleCopyRegLink(e, selectedTourney.slug)} variant="outline" className="rounded-2xl border-sky-200 text-sky-600 h-14 px-10 font-black text-[11px] uppercase tracking-widest hover:bg-sky-50">
                                 Copy Registration Link
                               </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMyTourneys.length > 0 ? (
                  filteredMyTourneys.map((t) => (
                    <motion.div 
                      whileHover={{ y: -5 }}
                      key={t.id} 
                      onClick={() => setSelectedTourney(t)}
                      className="glass-panel p-8 rounded-[2.5rem] border-slate-200 space-y-6 group bg-white shadow-sm cursor-pointer hover:border-sky-500/30 transition-all relative"
                    >
                      <div className="flex justify-between items-start">
                        <div className="h-14 w-14 rounded-2xl bg-[#0B1F3A] text-white flex items-center justify-center shadow-lg group-hover:bg-sky-500 transition-colors">
                          <Trophy className="h-7 w-7" />
                        </div>
                        <div className="flex items-center gap-2">
                           <Badge className="bg-green-500 text-white font-black px-4 h-6 text-[9px] uppercase animate-pulse">{t.status}</Badge>
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-slate-100" onClick={(e) => e.stopPropagation()}>
                                    <MoreVertical className="h-4 w-4 text-slate-400" />
                                 </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="rounded-xl border-slate-100">
                                 <DropdownMenuItem className="text-red-500 font-bold focus:text-red-500 focus:bg-red-50 cursor-pointer" onClick={(e) => handleDeleteTourney(e, t.id)}>
                                    <Trash2 className="h-4 w-4 mr-2" /> Delete Tournament
                                 </DropdownMenuItem>
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-black text-[#0B1F3A] leading-tight uppercase italic">{t.name}</h3>
                        <div className="flex flex-col gap-1">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Calendar className="h-3 w-3 text-sky-500" /> {t.startDate} {t.endDate && `— ${t.endDate}`}
                          </p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-sky-500" /> {t.city || t.location}
                          </p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-slate-50 flex items-center justify-between gap-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={(e) => handleCopyRegLink(e, t.slug)}
                          className="flex-1 h-10 rounded-xl border-slate-100 font-black text-[9px] uppercase tracking-widest hover:bg-sky-50 hover:text-sky-600 transition-all"
                        >
                           <LinkIcon className="h-3 w-3 mr-2" /> Reg Link
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={(e) => { e.stopPropagation(); navigate('/live-match/create'); }}
                          className="flex-1 h-10 rounded-xl bg-[#0B1F3A] text-white font-black text-[9px] uppercase tracking-widest hover:bg-sky-500 transition-all shadow-md"
                        >
                           <Zap className="h-3 w-3 mr-2 fill-current" /> Generate Matches
                        </Button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-32 text-center bg-white border-2 border-dashed border-slate-200 rounded-[3rem]">
                    <Trophy className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                    <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">No studio events</h3>
                    <Button onClick={() => navigate('/tournaments/create')} className="mt-8 bg-[#0B1F3A] text-white font-black rounded-xl h-12 px-8 shadow-xl">
                      Initialize Tourney
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-matches" className="m-0">
            {filteredMyMatches.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMyMatches.map((m) => (
                  <motion.div whileHover={{ y: -5 }} key={m.id} className="glass-panel p-8 rounded-[2.5rem] border-sky-500/20 space-y-6 group bg-white shadow-sm">
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
                      <Button onClick={() => navigate(`/scoring/${m.id}`)} className="h-11 px-6 rounded-xl bg-[#0B1F3A] text-white font-black text-[10px] uppercase tracking-widest hover:bg-sky-500 transition-colors">
                        Resume Scoring
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-32 text-center bg-white border-2 border-dashed border-slate-200 rounded-[3rem]">
                <Activity className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">No Active Matches</h3>
                <Button onClick={() => navigate('/live-match/create')} className="mt-8 bg-sky-500 text-white font-black rounded-xl h-12 px-8 shadow-xl">
                  Start Match
                </Button>
              </div>
            )}
          </TabsContent>

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
                  {GLOBAL_ARCHIVES.map((match) => (
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
        </Tabs>
      </main>
    </div>
  );
};

export default Smashed;