"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import BracketNode from '@/components/tournament/BracketNode';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, Calendar, Users, MapPin, 
  Share2, ListFilter, Play, CheckCircle2,
  Clock, Timer
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TournamentDetail = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Header */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-30 grayscale"
          alt="Badminton court"
        />
        
        <div className="container relative z-20 h-full flex flex-col justify-end pb-8 px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-black font-bold">LIVE NOW</Badge>
                <Badge variant="outline" className="border-white/10 text-muted-foreground">PREMIUM EVENT</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter">BWF WORLD TOUR FINALS 2024</h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium">
                <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Dec 12 - 18, 2024</span>
                <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Jakarta, Indonesia</span>
                <span className="flex items-center gap-2"><Users className="h-4 w-4" /> 32 Top Seeded Players</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button size="lg" className="bg-primary text-black font-bold px-8 rounded-xl shadow-[0_0_20px_rgba(182,255,42,0.2)]">
                WATCH FINALS <Play className="ml-2 h-4 w-4 fill-current" />
              </Button>
              <Button size="icon" variant="outline" className="h-12 w-12 rounded-xl border-white/10 hover:bg-white/5">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="container px-4 py-12">
        <Tabs defaultValue="bracket" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <TabsList className="bg-secondary/50 p-1 rounded-xl">
              <TabsTrigger value="bracket" className="rounded-lg px-6 data-[state=active]:bg-primary data-[state=active]:text-black font-bold">BRACKETS</TabsTrigger>
              <TabsTrigger value="matches" className="rounded-lg px-6 data-[state=active]:bg-primary data-[state=active]:text-black font-bold">MATCHES</TabsTrigger>
              <TabsTrigger value="players" className="rounded-lg px-6 data-[state=active]:bg-primary data-[state=active]:text-black font-bold">PLAYERS</TabsTrigger>
              <TabsTrigger value="standings" className="rounded-lg px-6 data-[state=active]:bg-primary data-[state=active]:text-black font-bold">STANDINGS</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5 h-10 px-4">
              <ListFilter className="mr-2 h-4 w-4" /> Filter by Category
            </Button>
          </div>

          <TabsContent value="bracket" className="m-0">
            <div className="flex overflow-x-auto pb-12 gap-12 min-h-[500px] scrollbar-hide">
              {/* Quarter Finals */}
              <div className="space-y-8 flex-shrink-0">
                <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                  <div className="h-1 w-4 bg-primary/30" /> Quarter Finals
                </h3>
                <div className="space-y-6">
                  <BracketNode match={{ id: '1', team1: 'Viktor Axelsen', team2: 'Lee Zii Jia', score1: 2, score2: 0, winner: 1, status: 'completed' }} />
                  <BracketNode match={{ id: '2', team1: 'Shi Yuqi', team2: 'Anders Antonsen', score1: 1, score2: 2, winner: 2, status: 'completed' }} />
                  <BracketNode match={{ id: '3', team1: 'Jonatan Christie', team2: 'Kunlavut Vitidsarn', status: 'live' }} />
                  <BracketNode match={{ id: '4', team1: 'Loh Kean Yew', team2: 'Anthony Ginting', time: '18:30', status: 'scheduled' }} />
                </div>
              </div>

              {/* Semi Finals */}
              <div className="space-y-8 pt-16 flex-shrink-0">
                <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                  <div className="h-1 w-4 bg-primary/30" /> Semi Finals
                </h3>
                <div className="space-y-24">
                  <BracketNode match={{ id: '5', team1: 'Viktor Axelsen', team2: 'Anders Antonsen', time: 'TOMORROW', status: 'scheduled' }} />
                  <div className="h-[76px] w-[200px] border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Waiting for QF 3 & 4
                  </div>
                </div>
              </div>

              {/* Grand Final */}
              <div className="space-y-8 pt-40 flex-shrink-0">
                <h3 className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                  <Trophy className="h-4 w-4" /> Grand Final
                </h3>
                <div className="h-[76px] w-[200px] border-2 border-dashed border-primary/20 bg-primary/5 rounded-xl flex items-center justify-center text-[10px] font-black text-primary uppercase tracking-widest animate-pulse">
                  Championship Match
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="matches" className="m-0">
            <div className="space-y-6">
              {[
                { date: "TODAY, DEC 14", matches: [
                  { id: '1', t1: "Viktor Axelsen", t2: "Lee Zii Jia", score: "21-19, 21-17", status: "completed", cat: "Men's Singles" },
                  { id: '3', t1: "Jonatan Christie", t2: "Kunlavut Vitidsarn", score: "14-11", status: "live", cat: "Men's Singles" },
                  { id: '4', t1: "Loh Kean Yew", t2: "Anthony Ginting", score: "18:30", status: "scheduled", cat: "Men's Singles" },
                ]},
                { date: "YESTERDAY, DEC 13", matches: [
                  { id: '10', t1: "An Se-young", t2: "Tai Tzu-ying", score: "21-12, 21-15", status: "completed", cat: "Women's Singles" },
                  { id: '11', t1: "Chen Qingchen / Jia Yifan", t2: "Baek Ha-na / Lee So-hee", score: "21-18, 21-19", status: "completed", cat: "Women's Doubles" },
                ]}
              ].map((group, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">{group.date}</h3>
                  <div className="grid gap-4">
                    {group.matches.map((m) => (
                      <div key={m.id} className="glass-card p-6 rounded-2xl flex items-center justify-between group hover:border-primary/30 transition-all">
                        <div className="flex items-center gap-6">
                          <div className="hidden sm:flex flex-col items-center justify-center h-12 w-12 rounded-xl bg-secondary/50 border border-white/5">
                            {m.status === 'live' ? <Timer className="h-5 w-5 text-red-500 animate-pulse" /> : <Clock className="h-5 w-5 text-muted-foreground" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-xs font-black tracking-tight">{m.t1} vs {m.t2}</span>
                              <Badge variant="outline" className="text-[10px] font-bold border-white/5 uppercase">{m.cat}</Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              {m.status === 'live' && <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />}
                              <span className={`text-xl font-black font-mono ${m.status === 'live' ? 'text-primary' : 'text-foreground'}`}>{m.score}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="rounded-xl font-bold group-hover:bg-primary group-hover:text-black transition-all">
                          {m.status === 'completed' ? 'View Details' : 'Watch Live'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="players" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Viktor Axelsen", rank: 1, country: "Denmark", img: "VA" },
                { name: "An Se-young", rank: 1, country: "Korea", img: "AS" },
                { name: "Shi Yuqi", rank: 2, country: "China", img: "SY" },
                { name: "Tai Tzu-ying", rank: 3, country: "Taiwan", img: "TT" },
                { name: "Lee Zii Jia", rank: 7, country: "Malaysia", img: "LZ" },
                { name: "Anthony Ginting", rank: 9, country: "Indonesia", img: "AG" },
              ].map((p, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl flex items-center gap-4 group hover:border-primary/50 transition-all cursor-pointer">
                  <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-lg font-black border border-white/10 group-hover:border-primary">
                    {p.img}
                  </div>
                  <div>
                    <h4 className="font-bold group-hover:text-primary transition-colors">{p.name}</h4>
                    <p className="text-xs text-muted-foreground">Rank #{p.rank} • {p.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="standings" className="m-0">
            <div className="glass-card rounded-3xl overflow-hidden border-white/5">
              <Table>
                <TableHeader className="bg-secondary/30">
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="w-16 text-center font-black text-[10px] uppercase tracking-widest">Rank</TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest">Player / Team</TableHead>
                    <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">P</TableHead>
                    <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">W</TableHead>
                    <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">L</TableHead>
                    <TableHead className="text-center font-black text-[10px] uppercase tracking-widest">Points</TableHead>
                    <TableHead className="text-right font-black text-[10px] uppercase tracking-widest pr-8">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { rank: 1, name: "Viktor Axelsen", p: 3, w: 3, l: 0, pts: 6300, status: "Qualified" },
                    { rank: 2, name: "Lee Zii Jia", p: 3, w: 2, l: 1, pts: 4200, status: "Qualified" },
                    { rank: 3, name: "Shi Yuqi", p: 3, w: 1, l: 2, pts: 2100, status: "Eliminated" },
                    { rank: 4, name: "Anders Antonsen", p: 3, w: 0, l: 3, pts: 800, status: "Eliminated" },
                  ].map((row) => (
                    <TableRow key={row.rank} className="border-white/5 hover:bg-white/5">
                      <TableCell className="text-center font-mono font-bold text-muted-foreground">{row.rank}</TableCell>
                      <TableCell className="font-bold">{row.name}</TableCell>
                      <TableCell className="text-center font-mono">{row.p}</TableCell>
                      <TableCell className="text-center font-mono text-primary">{row.w}</TableCell>
                      <TableCell className="text-center font-mono text-red-400">{row.l}</TableCell>
                      <TableCell className="text-center font-mono font-black">{row.pts.toLocaleString()}</TableCell>
                      <TableCell className="text-right pr-8">
                        <Badge variant="outline" className={row.status === 'Qualified' ? 'border-primary/50 text-primary' : 'border-white/10 text-muted-foreground'}>
                          {row.status}
                        </Badge>
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

export default TournamentDetail;