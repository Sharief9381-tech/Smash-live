"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import StatCard from '@/components/dashboard/StatCard';
import { Activity, Trophy, Users, Calendar, ArrowRight, Play, Star, Zap, Radio, Clock, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container px-4 py-8 space-y-16">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary fill-current" />
              <span className="text-xs font-black text-primary uppercase tracking-[0.3em]">Premium Sports Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase">Command Center</h1>
            <p className="text-muted-foreground font-medium">Monitoring global pro circuit across 12 live courts.</p>
          </div>
          <div className="flex gap-4">
            <Link to="/broadcast/studio">
              <Button className="bg-primary text-black hover:bg-primary/90 h-14 px-8 rounded-2xl font-black shadow-[0_20px_40px_rgba(182,255,42,0.15)] group italic">
                START BROADCAST <Radio className="ml-2 h-5 w-5 animate-pulse" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Live Broadcasts" value="08" icon={Radio} trend="+2 new" trendUp />
          <StatCard title="Global Viewers" value="42.5k" icon={Users} trend="+12%" trendUp />
          <StatCard title="Active Scouters" value="124" icon={Zap} />
          <StatCard title="Tournament Payouts" value="$1.8M" icon={Trophy} />
        </div>

        {/* Dedicated Broadcast Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-3xl font-black tracking-tighter flex items-center gap-4 italic uppercase">
                <span className="h-3 w-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                Live Hub
              </h2>
              <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Real-time match streaming and scorecards</p>
            </div>
            <Button variant="link" className="text-primary font-black uppercase tracking-widest text-[10px]">
              Browse All Streams <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Live & Upcoming Streams */}
            <div className="lg:col-span-8 space-y-6">
              {[
                { 
                  id: 'live-active', 
                  p1: 'Viktor Axelsen', 
                  p2: 'Lee Zii Jia', 
                  s1: 21, s2: 19, 
                  status: 'Live', 
                  viewers: '12.4k',
                  tourney: 'BWF Finals • Semi Final',
                  category: 'Major'
                },
                { 
                  id: 'upcoming-1', 
                  p1: 'An Se-young', 
                  p2: 'Tai Tzu-ying', 
                  status: 'Upcoming', 
                  time: 'Starts in 45m',
                  tourney: 'BWF Finals • Semi Final',
                  category: 'Major'
                }
              ].map((match, i) => (
                <motion.div 
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card overflow-hidden group hover:border-primary/40 transition-all rounded-[2.5rem] relative"
                >
                  <Link to={`/broadcast/${match.id}`}>
                    <div className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="flex-1 space-y-6 w-full">
                        <div className="flex items-center justify-between md:justify-start gap-4">
                          <Badge className={match.status === 'Live' ? 'bg-red-500 text-white animate-pulse' : 'bg-primary/10 text-primary border-none'}>
                            {match.status.toUpperCase()}
                          </Badge>
                          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{match.tourney}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center font-black text-lg group-hover:bg-primary group-hover:text-black transition-colors">
                                {match.p1.charAt(0)}
                              </div>
                              <span className="text-2xl font-black tracking-tighter group-hover:translate-x-1 transition-transform">{match.p1}</span>
                            </div>
                            {match.status === 'Live' && <span className="text-4xl font-black font-mono text-primary italic">{match.s1}</span>}
                          </div>
                          <div className="h-px bg-white/5" />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center font-black text-lg">
                                {match.p2.charAt(0)}
                              </div>
                              <span className="text-2xl font-black tracking-tighter">{match.p2}</span>
                            </div>
                            {match.status === 'Live' && <span className="text-4xl font-black font-mono text-muted-foreground italic">{match.s2}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-4 border-l border-white/5 pl-8 min-w-[120px]">
                        {match.status === 'Live' ? (
                          <>
                            <div className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-2">
                              <Users className="h-3 w-3" /> {match.viewers}
                            </div>
                            <Button size="icon" className="h-16 w-16 rounded-full bg-primary text-black hover:scale-110 transition-transform shadow-[0_20px_40px_rgba(182,255,42,0.2)]">
                              <Play className="h-8 w-8 fill-current" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] whitespace-nowrap">SCHEDULED</div>
                            <span className="text-xs font-bold text-center italic">{match.time}</span>
                            <Button variant="outline" className="border-white/10 rounded-xl font-black text-[10px] uppercase tracking-widest">REMIND ME</Button>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Recently Ended Replays */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-card rounded-[2.5rem] p-8 space-y-6 flex flex-col h-full">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <History className="h-4 w-4 text-primary" /> RECENT REPLAYS
                </h3>
                
                <div className="space-y-4 flex-1">
                  {[
                    { p1: "ShiYuqi", p2: "Anders Antonsen", result: "2-1", views: "4.2k", time: "2h ago" },
                    { p1: "An Se-young", p2: "Chen Yufei", result: "2-0", views: "8.1k", time: "4h ago" },
                    { p1: "Loh Kean Yew", p2: "Kodai Naraoka", result: "1-2", views: "3.5k", time: "6h ago" }
                  ].map((replay, idx) => (
                    <div key={idx} className="group cursor-pointer p-5 rounded-[1.5rem] bg-white/5 border border-transparent hover:border-primary/20 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">{replay.time}</span>
                        <div className="flex items-center gap-1 text-[8px] font-black text-primary">
                          <Play className="h-2 w-2 fill-current" /> {replay.views}
                        </div>
                      </div>
                      <h4 className="text-sm font-black tracking-tight group-hover:text-primary transition-colors">
                        {replay.p1} vs {replay.p2}
                      </h4>
                      <p className="text-[10px] font-mono text-muted-foreground mt-1">Final Result: {replay.result}</p>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full border-dashed border-white/10 rounded-2xl h-12 text-[10px] font-black uppercase tracking-widest mt-4">
                  View Replay Library
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;