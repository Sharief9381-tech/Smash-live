"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import BracketNode from '@/components/tournament/BracketNode';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, Calendar, Users, MapPin, 
  Share2, ListFilter, Play, CheckCircle2,
  Clock, Timer, Activity
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TournamentDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Header */}
      <div className="relative h-[350px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-30 grayscale"
          alt="Badminton court"
        />
        
        <div className="container relative z-20 h-full flex flex-col justify-end pb-8 px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-red-500 text-white font-black animate-pulse px-4">LIVE NOW</Badge>
                <Badge variant="outline" className="border-white/20 text-white font-black px-4 uppercase">BWF Major Event</Badge>
              </div>
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic">BWF WORLD TOUR FINALS 2024</h1>
              <div className="flex flex-wrap items-center gap-8 text-sm text-white/60 font-black uppercase tracking-widest">
                <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-sky-500" /> Dec 12 - 18, 2024</span>
                <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-sky-500" /> Jakarta, Indonesia</span>
                <span className="flex items-center gap-2"><Users className="h-4 w-4 text-sky-500" /> 32 Pro Players</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Link to="/broadcast/live-active">
                <Button size="lg" className="bg-sky-500 text-white font-black px-8 h-16 rounded-[1.5rem] shadow-2xl hover:bg-sky-400">
                  WATCH FINALS <Play className="ml-2 h-5 w-5 fill-current" />
                </Button>
              </Link>
              <Button size="icon" variant="outline" className="h-16 w-16 rounded-[1.5rem] border-white/20 text-white hover:bg-white/10">
                <Share2 className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="container px-4 py-12">
        <Tabs defaultValue="bracket" className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <TabsList className="bg-white/5 p-1 rounded-2xl border border-white/10">
              <TabsTrigger value="bracket" className="rounded-xl px-8 h-10 data-[state=active]:bg-sky-500 data-[state=active]:text-white font-black text-xs uppercase tracking-widest transition-all">BRACKETS</TabsTrigger>
              <TabsTrigger value="matches" className="rounded-xl px-8 h-10 data-[state=active]:bg-sky-500 data-[state=active]:text-white font-black text-xs uppercase tracking-widest transition-all">MATCHES</TabsTrigger>
              <TabsTrigger value="players" className="rounded-xl px-8 h-10 data-[state=active]:bg-sky-500 data-[state=active]:text-white font-black text-xs uppercase tracking-widest transition-all">PLAYERS</TabsTrigger>
              <TabsTrigger value="standings" className="rounded-xl px-8 h-10 data-[state=active]:bg-sky-500 data-[state=active]:text-white font-black text-xs uppercase tracking-widest transition-all">STANDINGS</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/10 h-12 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest">
              <ListFilter className="mr-2 h-4 w-4" /> Category Filter
            </Button>
          </div>

          <TabsContent value="bracket" className="m-0 focus-visible:ring-0">
            <div className="flex overflow-x-auto pb-12 gap-16 min-h-[500px] scrollbar-hide">
              {/* Quarter Finals */}
              <div className="space-y-10 flex-shrink-0">
                <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
                  <div className="h-0.5 w-6 bg-sky-500/50" /> Quarter Finals
                </h3>
                <div className="space-y-8">
                  <BracketNode match={{ id: '1', team1: 'Viktor Axelsen', team2: 'Lee Zii Jia', score1: 2, score2: 0, winner: 1, status: 'completed' }} />
                  <BracketNode match={{ id: '2', team1: 'Shi Yuqi', team2: 'Anders Antonsen', score1: 1, score2: 2, winner: 2, status: 'completed' }} />
                  <div className="cursor-pointer" onClick={() => navigate('/broadcast/live-active')}>
                    <BracketNode match={{ id: '3', team1: 'Jonatan Christie', team2: 'Kunlavut Vitidsarn', status: 'live' }} />
                  </div>
                  <BracketNode match={{ id: '4', team1: 'Loh Kean Yew', team2: 'Anthony Ginting', time: '18:30', status: 'scheduled' }} />
                </div>
              </div>

              {/* Semi Finals */}
              <div className="space-y-10 pt-20 flex-shrink-0">
                <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
                  <div className="h-0.5 w-6 bg-sky-500/50" /> Semi Finals
                </h3>
                <div className="space-y-32">
                  <BracketNode match={{ id: '5', team1: 'Viktor Axelsen', team2: 'Anders Antonsen', time: 'TOMORROW', status: 'scheduled' }} />
                  <div className="h-20 w-[220px] border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center text-[10px] font-black text-white/30 uppercase tracking-widest italic">
                    Syncing QF 3 & 4
                  </div>
                </div>
              </div>

              {/* Grand Final */}
              <div className="space-y-10 pt-44 flex-shrink-0">
                <h3 className="text-xs font-black text-sky-500 uppercase tracking-[0.5em] mb-4 flex items-center gap-3">
                  <Trophy className="h-5 w-5 animate-pulse" /> Championship Match
                </h3>
                <div className="h-24 w-[240px] border-2 border-dashed border-sky-500/20 bg-sky-500/5 rounded-3xl flex flex-col items-center justify-center gap-1 group hover:border-sky-500/50 transition-all cursor-pointer">
                   <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest">Grand Final Feed</p>
                   <p className="text-[9px] font-bold text-white/40 uppercase">Awaiting Semifinal 1 & 2</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="matches" className="m-0 focus-visible:ring-0">
            <div className="space-y-10">
              {[
                { date: "TODAY, DEC 14", matches: [
                  { id: '1', t1: "Viktor Axelsen", t2: "Lee Zii Jia", score: "21-19, 21-17", status: "completed", cat: "Men's Singles" },
                  { id: '3', t1: "Jonatan Christie", t2: "Kunlavut Vitidsarn", score: "14-11", status: "live", cat: "Men's Singles" },
                  { id: '4', t1: "Loh Kean Yew", t2: "Anthony Ginting", score: "18:30", status: "scheduled", cat: "Men's Singles" },
                ]},
              ].map((group, idx) => (
                <div key={idx} className="space-y-6">
                  <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em] ml-2 flex items-center gap-3">
                    <div className="h-px w-8 bg-white/10" /> {group.date}
                  </h3>
                  <div className="grid gap-4">
                    {group.matches.map((m) => (
                      <div 
                        key={m.id} 
                        onClick={() => navigate(m.status === 'live' ? `/broadcast/live-active` : `/broadcast/${m.id}`)}
                        className="glass-card p-8 rounded-[2.5rem] flex items-center justify-between group hover:border-sky-500/40 transition-all cursor-pointer bg-white/5 border-white/5"
                      >
                        <div className="flex items-center gap-8">
                          <div className={cn(
                            "hidden sm:flex flex-col items-center justify-center h-16 w-16 rounded-2xl border transition-all",
                            m.status === 'live' ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-white/5 border-white/10 text-white/40"
                          )}>
                            {m.status === 'live' ? <Timer className="h-7 w-7 animate-pulse" /> : <Clock className="h-7 w-7" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-4 mb-2">
                              <span className="text-xl font-black italic tracking-tighter uppercase">{m.t1} vs {m.t2}</span>
                              <Badge variant="outline" className="text-[9px] font-black border-white/10 text-white/60 uppercase px-3">{m.cat}</Badge>
                              {m.status === 'live' && <Badge className="bg-red-500 text-white animate-pulse border-none h-5 px-2 text-[8px] font-black uppercase">Live Intelligence</Badge>}
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={cn("text-3xl font-black font-mono tracking-tighter", m.status === 'live' ? 'text-sky-500' : 'text-white')}>{m.score}</span>
                              <div className="h-1.5 w-1.5 rounded-full bg-sky-500/50" />
                              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Synchronized Stream</span>
                            </div>
                          </div>
                        </div>
                        <Button className="rounded-2xl h-14 px-8 font-black uppercase tracking-widest text-xs transition-all bg-[#0B1F3A] group-hover:bg-sky-500 shadow-xl">
                          {m.status === 'completed' ? 'Dossier Entry' : (m.status === 'live' ? 'Watch Intelligence' : 'Set Alert')}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TournamentDetail;