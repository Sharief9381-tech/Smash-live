"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  History, Zap, Volume2, Maximize2, 
  Settings, ChevronLeft, Share2, 
  TrendingUp, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LiveMatch = () => {
  const [score, setScore] = useState({ p1: 18, p2: 19 });
  const [sets, setSets] = useState({ p1: 1, p2: 0 });

  const addPoint = (player: 'p1' | 'p2') => {
    setScore(prev => ({ ...prev, [player]: prev[player] + 1 }));
  };

  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      
      <main className="container px-4 py-8">
        {/* Match Info Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-red-500 text-white animate-pulse border-none text-[10px] font-black">LIVE</Badge>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Court 01 • BWF Finals</span>
              </div>
              <h2 className="text-xl font-black tracking-tight">Men's Singles • Group A</h2>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-xl gap-2 font-bold h-11">
              <History className="h-4 w-4" /> REPLAY
            </Button>
            <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-xl gap-2 font-bold h-11">
              <Share2 className="h-4 w-4" /> SHARE
            </Button>
            <Button className="bg-primary text-black hover:bg-primary/90 rounded-xl font-bold h-11 px-6 shadow-[0_0_20px_rgba(182,255,42,0.2)]">
              WATCH BROADCAST
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Scoreboard */}
          <div className="lg:col-span-8 space-y-6">
            <div className="glass-card rounded-[3rem] p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
              
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
                {/* Player 1 */}
                <div className="flex flex-col items-center gap-6 flex-1 text-center">
                  <div className="h-32 w-32 rounded-full bg-secondary border-4 border-white/5 flex items-center justify-center text-4xl font-black group hover:border-primary/50 transition-colors">
                    VA
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Viktor Axelsen</h3>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Denmark</p>
                  </div>
                  <div className="flex gap-1">
                    <div className={cn("h-2 w-8 rounded-full", sets.p1 >= 1 ? "bg-primary shadow-[0_0_10px_rgba(182,255,42,0.5)]" : "bg-white/5")} />
                    <div className={cn("h-2 w-8 rounded-full", sets.p1 >= 2 ? "bg-primary shadow-[0_0_10px_rgba(182,255,42,0.5)]" : "bg-white/5")} />
                  </div>
                </div>

                {/* VS & Score */}
                <div className="flex flex-col items-center gap-4">
                  <div className="text-xs font-black text-muted-foreground uppercase tracking-[0.3em]">Set 02</div>
                  <div className="flex items-center gap-8">
                    <AnimatePresence mode="wait">
                      <motion.span 
                        key={score.p1}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-8xl md:text-9xl font-black font-mono text-primary tabular-nums"
                      >
                        {score.p1}
                      </motion.span>
                    </AnimatePresence>
                    <div className="h-16 w-1 bg-white/10 rounded-full" />
                    <AnimatePresence mode="wait">
                      <motion.span 
                        key={score.p2}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-8xl md:text-9xl font-black font-mono text-white tabular-nums"
                      >
                        {score.p2}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <Button variant="ghost" className="text-primary font-black text-xs uppercase tracking-widest hover:bg-primary/10">
                    MATCH STATS <TrendingUp className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* Player 2 */}
                <div className="flex flex-col items-center gap-6 flex-1 text-center">
                  <div className="h-32 w-32 rounded-full bg-secondary border-4 border-white/5 flex items-center justify-center text-4xl font-black group hover:border-primary/50 transition-colors">
                    LZ
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Lee Zii Jia</h3>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Malaysia</p>
                  </div>
                  <div className="flex gap-1">
                    <div className={cn("h-2 w-8 rounded-full", sets.p2 >= 1 ? "bg-primary shadow-[0_0_10px_rgba(182,255,42,0.5)]" : "bg-white/5")} />
                    <div className={cn("h-2 w-8 rounded-full", sets.p2 >= 2 ? "bg-primary shadow-[0_0_10px_rgba(182,255,42,0.5)]" : "bg-white/5")} />
                  </div>
                </div>
              </div>

              {/* Court Visualization */}
              <div className="mt-16 h-32 w-full border border-white/5 rounded-2xl relative bg-secondary/20 flex items-center justify-center">
                <div className="absolute inset-y-0 left-1/2 w-px bg-white/20" />
                <div className="h-2 w-full bg-white/5 absolute top-1/2 -translate-y-1/2" />
                <div className="h-12 w-12 rounded-full bg-primary/20 blur-xl animate-pulse absolute left-1/4" />
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Bird's Eye Court Tracker</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Button onClick={() => addPoint('p1')} className="h-20 rounded-3xl bg-secondary hover:bg-primary hover:text-black transition-all group font-black flex flex-col gap-1">
                <span className="text-[10px] uppercase opacity-60">Point</span>
                <span>AXELSEN</span>
              </Button>
              <Button onClick={() => addPoint('p2')} className="h-20 rounded-3xl bg-secondary hover:bg-primary hover:text-black transition-all group font-black flex flex-col gap-1">
                <span className="text-[10px] uppercase opacity-60">Point</span>
                <span>ZII JIA</span>
              </Button>
              <Button variant="outline" className="h-20 rounded-3xl border-white/5 bg-secondary/30 hover:bg-white/5 font-black flex flex-col gap-1">
                <span className="text-[10px] uppercase opacity-60">Control</span>
                <span>UNDO</span>
              </Button>
              <Button variant="outline" className="h-20 rounded-3xl border-white/5 bg-secondary/30 hover:bg-white/5 font-black flex flex-col gap-1">
                <span className="text-[10px] uppercase opacity-60">Control</span>
                <span>TIMEOFF</span>
              </Button>
            </div>
          </div>

          {/* Side Panel: Analytics */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card rounded-[2.5rem] p-8 space-y-6">
              <h3 className="font-black text-sm uppercase tracking-[0.2em] flex items-center gap-3">
                <Activity className="h-4 w-4 text-primary" /> Live Analytics
              </h3>
              
              <div className="space-y-6">
                {[
                  { label: "Smash Accuracy", p1: 88, p2: 74 },
                  { label: "Net Play Errors", p1: 2, p2: 5 },
                  { label: "Longest Rally", p1: 42, p2: 42, isNeutral: true },
                ].map((stat, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                      <span>{stat.label}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden flex justify-end">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${stat.p1}%` }} 
                        />
                      </div>
                      <div className="font-mono font-bold text-xs min-w-[3rem] text-center">
                        {stat.p1} : {stat.p2}
                      </div>
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white/40" 
                          style={{ width: `${stat.p2}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-[2.5rem] p-8 space-y-4">
              <h3 className="font-black text-sm uppercase tracking-[0.2em]">Match Momentum</h3>
              <div className="h-32 w-full flex items-end gap-1.5 pt-4">
                {[4, 6, 8, 3, 5, 9, 7, 4, 6, 2, 8, 10, 5, 7, 9, 3].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary transition-colors cursor-help"
                    style={{ height: `${h * 10}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveMatch;