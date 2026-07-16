"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Zap, Search, Play, X, Trash2, 
  ChevronRight, Users, Plus, Award, 
  Settings2, CheckCircle2, RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';

const Smashed = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [myTourneys, setMyTourneys] = useState<any[]>([]);
  const [selectedTourney, setSelectedTourney] = useState<any>(null);

  const loadData = () => {
    const activeTourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
    setMyTourneys(activeTourneys);
    if (selectedTourney) {
      const updated = activeTourneys.find((t: any) => t.id === selectedTourney.id);
      if (updated) setSelectedTourney(updated);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 2000);
    return () => clearInterval(interval);
  }, [selectedTourney?.id]);

  const handleDeleteTourney = (id: string) => {
    const existing = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
    const filtered = existing.filter((t: any) => t.id !== id);
    localStorage.setItem('active_studio_tournaments', JSON.stringify(filtered));
    showSuccess("Tournament Deleted");
    setSelectedTourney(null);
    loadData();
  };

  const handleGenerateMatches = () => {
    if (!selectedTourney.participants || selectedTourney.participants.length < 2) {
      showError("Need at least 2 athletes to generate matches.");
      return;
    }

    // Filter participants who are eligible (not eliminated)
    const eligible = selectedTourney.participants.filter((p: any) => !p.isEliminated);
    
    if (eligible.length < 2) {
      showError("Not enough remaining athletes for a new round.");
      return;
    }

    // Shuffle and pair
    const shuffled = [...eligible].sort(() => Math.random() - 0.5);
    const newMatches = [];
    
    for (let i = 0; i < shuffled.length - 1; i += 2) {
      const matchId = `studio_${Date.now()}_${i}`;
      const match = {
        id: matchId,
        name: `${selectedTourney.name} - Round ${selectedTourney.currentRound || 1}`,
        matchType: 'singles',
        players: { p1: shuffled[i], p2: shuffled[i+1] },
        status: 'live',
        currentScore: [0, 0],
        setsWon: [0, 0],
        tournamentId: selectedTourney.id
      };
      newMatches.push(match);
      
      // Add to global live matches
      const active = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
      localStorage.setItem('active_studio_matches', JSON.stringify([...active, match]));
    }

    // Update tourney state
    const tourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
    const updated = tourneys.map((t: any) => {
      if (t.id === selectedTourney.id) {
        return { 
          ...t, 
          currentRound: (t.currentRound || 1) + 1,
          activeRoundMatches: newMatches.map(m => m.id)
        };
      }
      return t;
    });
    localStorage.setItem('active_studio_tournaments', JSON.stringify(updated));
    showSuccess(`Generated ${newMatches.length} matches for the next round!`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="container px-6 py-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-none">SMASHED</h1>
            <p className="text-slate-500 font-medium uppercase text-[10px] tracking-widest">Manual Tournament Management Console</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Filter Assets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 bg-white border-slate-200 rounded-[2rem] font-bold focus:border-sky-500 transition-all shadow-sm"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedTourney ? (
            <motion.div key="manage" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm">
                <div className="flex items-center gap-6">
                  <button onClick={() => setSelectedTourney(null)} className="h-12 w-12 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors">
                    <X className="h-5 w-5 text-slate-400" />
                  </button>
                  <div>
                    <h2 className="text-3xl font-black text-[#0B1F3A] uppercase italic leading-tight">{selectedTourney.name}</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedTourney.participants?.length || 0} Total Athletes Registered</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button onClick={handleGenerateMatches} className="h-14 rounded-2xl bg-sky-500 text-white font-black uppercase tracking-widest hover:bg-sky-600 shadow-lg px-8">
                    <Zap className="mr-2 h-4 w-4 fill-current" /> Next Round Pairings
                  </Button>
                  <Button onClick={() => handleDeleteTourney(selectedTourney.id)} variant="outline" className="h-14 rounded-2xl border-red-100 text-red-500 hover:bg-red-50 px-6">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                       <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Athlete Registry</h3>
                       <Button variant="ghost" size="sm" className="text-sky-500 font-black uppercase text-[10px]" onClick={() => {
                         const link = `${window.location.origin}/register/${selectedTourney.slug}`;
                         navigator.clipboard.writeText(link);
                         showSuccess("Reg link copied!");
                       }}>Copy Registration URL</Button>
                    </div>
                    <Table>
                      <TableBody>
                        {selectedTourney.participants?.length > 0 ? selectedTourney.participants.map((p: any, idx: number) => (
                          <TableRow key={idx} className="border-slate-50 h-20">
                            <TableCell className="pl-8">
                              <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-[#071D49] flex items-center justify-center text-sky-400 font-black text-xs uppercase">{p.name[0]}</div>
                                <span className="font-black text-[#0B1F3A] uppercase text-sm">{p.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-center font-bold text-slate-400 text-xs">{p.smashId}</TableCell>
                            <TableCell className="text-right pr-8">
                               <Badge className={cn("px-4 h-6 border-none font-black text-[8px] uppercase", p.isEliminated ? "bg-red-100 text-red-500" : "bg-green-100 text-green-600")}>
                                 {p.isEliminated ? "Eliminated" : "Active"}
                               </Badge>
                            </TableCell>
                          </TableRow>
                        )) : (
                          <TableRow>
                            <TableCell className="h-40 text-center text-slate-300 font-black uppercase text-[10px]">Awaiting registrations...</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-[#0B1F3A] p-8 rounded-[3rem] text-white space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-sky-400">Round Progress</h3>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-white/40 uppercase">Current Round</span>
                          <span className="text-2xl font-black italic">{selectedTourney.currentRound || 1}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-white/40 uppercase">Remaining Athletes</span>
                          <span className="text-2xl font-black text-sky-500">{selectedTourney.participants?.filter((p:any) => !p.isEliminated).length || 0}</span>
                       </div>
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-[3rem] border border-slate-200 space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#0B1F3A]">Quick Pair Protocol</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">Use pairing when you have an even number of active players. After results are in, mark losers as 'Eliminated' in the registry.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div 
                onClick={() => navigate('/tournaments/create')}
                className="h-[300px] border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center gap-4 hover:border-sky-500 hover:bg-sky-50/50 transition-all cursor-pointer group"
              >
                <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-sky-500 group-hover:text-white transition-all shadow-sm">
                  <Plus className="h-8 w-8" />
                </div>
                <p className="font-black text-[#0B1F3A] uppercase tracking-widest text-sm">New Tournament</p>
              </div>

              {myTourneys.map((t) => (
                <motion.div 
                  key={t.id} 
                  whileHover={{ y: -5 }} 
                  onClick={() => setSelectedTourney(t)}
                  className="bg-white p-10 rounded-[3.5rem] border border-slate-200 space-y-6 shadow-sm hover:shadow-2xl hover:border-sky-500/30 transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute -right-6 -bottom-6 opacity-5 rotate-12">
                    <Trophy className="h-32 w-32 text-[#0B1F3A]" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="bg-[#0B1F3A] h-12 w-12 rounded-2xl flex items-center justify-center text-sky-400 shadow-lg">
                      <Trophy className="h-6 w-6" />
                    </div>
                    <Badge className="bg-green-500 text-white font-black px-4 h-6 text-[9px] uppercase">{t.status}</Badge>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#0B1F3A] uppercase italic leading-tight">{t.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{t.city} • {t.format}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <Users className="h-4 w-4 text-sky-500" />
                       <span className="text-sm font-black text-[#0B1F3A]">{t.participants?.length || 0}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-200" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Smashed;