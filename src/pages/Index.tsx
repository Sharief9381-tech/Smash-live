"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import StatCard from '@/components/dashboard/StatCard';
import { Activity, Trophy, Users, Calendar, ArrowRight, Play, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container px-4 py-8 space-y-12">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary fill-current" />
              <span className="text-xs font-black text-primary uppercase tracking-[0.3em]">Premium Sports Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Command Center</h1>
            <p className="text-muted-foreground font-medium">Monitoring 12 live courts across 3 global regions.</p>
          </div>
          <div className="flex gap-4">
            <Link to="/tournaments/create">
              <Button variant="outline" className="border-white/10 hover:bg-white/5 h-12 px-6 rounded-xl font-bold">
                <Trophy className="mr-2 h-4 w-4" /> Start Event
              </Button>
            </Link>
            <Link to="/live-match/create">
              <Button className="bg-primary text-black hover:bg-primary/90 h-12 px-8 rounded-xl font-bold shadow-[0_0_20px_rgba(182,255,42,0.2)]">
                Go Live <Play className="ml-2 h-4 w-4 fill-current" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Global Live Matches" value="12" icon={Activity} trend="+2 new" trendUp />
          <StatCard title="Active Scouters" value="48" icon={Users} trend="+5 today" trendUp />
          <StatCard title="Prize Pools" value="$2.4M" icon={Trophy} />
          <StatCard title="Matches Today" value="84" icon={Calendar} trend="+12%" trendUp />
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Live Matches List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <span className="h-3 w-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                Live Broadcasts
              </h2>
              <Button variant="link" className="text-primary font-bold">
                See Tournament Schedule <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid gap-6">
              {[
                { id: '1', p1: 'Viktor Axelsen', p2: 'Lee Zii Jia', s1: 21, s2: 19, court: '01', tourney: 'BWF World Tour Finals' },
                { id: '2', p1: 'An Se-young', p2: 'Tai Tzu-ying', s1: 14, s2: 11, court: '02', tourney: 'Indonesia Open 2024' },
              ].map((match, i) => (
                <motion.div 
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card overflow-hidden group hover:border-primary/40 transition-all rounded-[2rem]"
                >
                  <Link to={`/live-match/active-${match.id}`}>
                    <div className="p-8 flex items-center justify-between gap-8">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] tracking-widest px-3 py-1">COURT {match.court}</Badge>
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{match.tourney}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">{match.p1}</span>
                            <span className="text-3xl font-black font-mono text-primary">{match.s1}</span>
                          </div>
                          <div className="h-px bg-white/5" />
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-black tracking-tight">{match.p2}</span>
                            <span className="text-3xl font-black font-mono text-muted-foreground">{match.s2}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-4 border-l border-white/5 pl-8">
                        <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] whitespace-nowrap">SET 02</div>
                        <Button size="icon" className="h-14 w-14 rounded-full bg-primary text-black hover:scale-110 transition-transform shadow-[0_0_20px_rgba(182,255,42,0.3)]">
                          <Play className="h-6 w-6 fill-current" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-black flex items-center gap-3">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                Top Players
              </h2>
              <div className="glass-card rounded-[2rem] overflow-hidden border-white/5">
                <div className="p-2 space-y-1">
                  {[
                    { id: '1', name: "Viktor Axelsen", points: "12,450", rank: 1, country: "DK" },
                    { id: '2', name: "An Se-young", points: "11,820", rank: 2, country: "KR" },
                    { id: '3', name: "Tai Tzu-ying", points: "10,940", rank: 3, country: "TW" },
                    { id: '4', name: "Shi Yuqi", points: "10,210", rank: 4, country: "CN" }
                  ].map((player, idx) => (
                    <Link key={player.id} to={`/player/${player.id}`}>
                      <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group">
                        <div className="flex items-center gap-4">
                          <span className="text-muted-foreground font-mono font-bold w-4">{player.rank}</span>
                          <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center text-xs font-bold border border-white/10 group-hover:border-primary/30 transition-colors">
                            {player.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{player.name}</h4>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase">{player.country}</p>
                          </div>
                        </div>
                        <span className="font-mono text-primary font-black text-xs">{player.points}</span>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="p-4 border-t border-white/5 text-center">
                  <Button variant="link" className="text-primary hover:text-primary/80 h-auto p-0 text-[10px] font-black uppercase tracking-[0.2em]">
                    Global Ranking Table
                  </Button>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-black flex items-center gap-3">
                <Trophy className="h-5 w-5 text-primary" />
                Featured Event
              </h2>
              <Link to="/tournament/bwf-finals-2024">
                <div className="glass-card p-6 rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent border-primary/20 hover:border-primary/40 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-primary text-black font-black text-[10px]">MAJOR</Badge>
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">LIVE</span>
                  </div>
                  <h3 className="text-xl font-black group-hover:text-primary transition-colors">BWF World Tour Finals</h3>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">The season finale where the top 8 players in the world rankings battle for the ultimate glory.</p>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold">
                          P{i}
                        </div>
                      ))}
                      <div className="h-8 w-8 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                        +28
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;