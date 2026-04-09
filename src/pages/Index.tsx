"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import StatCard from '@/components/dashboard/StatCard';
import { Activity, Trophy, Users, Calendar, ArrowRight, Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container px-4 py-8 space-y-8">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, Scorer</h1>
            <p className="text-muted-foreground mt-1">Ready to manage today's epic rallies?</p>
          </div>
          <div className="flex gap-3">
            <Link to="/tournaments/create">
              <Button variant="outline" className="border-white/10 hover:bg-white/5">
                <Trophy className="mr-2 h-4 w-4" /> Start Tournament
              </Button>
            </Link>
          </div>
        </section>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Live Matches" value="12" icon={Activity} trend="+2 from last hour" trendUp />
          <StatCard title="Total Players" value="1,240" icon={Users} trend="+15 today" trendUp />
          <StatCard title="Live Tournaments" value="3" icon={Trophy} />
          <StatCard title="Matches Today" value="84" icon={Calendar} trend="+12%" trendUp />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Live Matches List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                Live Matches
              </h2>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card overflow-hidden group hover:border-primary/30 transition-all"
                >
                  <div className="p-5 flex items-center justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-none">COURT {i}</Badge>
                          <span>•</span>
                          <span>BWF World Tour Finals</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-lg">Viktor Axelsen</span>
                            <span className="text-primary text-xl font-black">21</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-lg">Lee Zii Jia</span>
                            <span className="text-muted-foreground text-xl font-black">19</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-3 border-l border-white/5 pl-6">
                      <div className="text-xs font-mono text-muted-foreground">SET 2</div>
                      <Link to={`/live-match/active-${i}`}>
                        <Button size="icon" className="rounded-full bg-primary text-black hover:scale-110 transition-transform">
                          <Play className="h-4 w-4 fill-current" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Leaderboard / Rankings */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Top Players
            </h2>
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="p-4 bg-secondary/50 border-b border-white/5 font-medium text-sm flex justify-between">
                <span>Player</span>
                <span>Points</span>
              </div>
              <div className="p-2 space-y-1">
                {[
                  { name: "Viktor Axelsen", points: "12,450", rank: 1 },
                  { name: "An Se-young", points: "11,820", rank: 2 },
                  { name: "Tai Tzu-ying", points: "10,940", rank: 3 },
                  { name: "Shi Yuqi", points: "10,210", rank: 4 }
                ].map((player, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground font-mono w-4">{player.rank}</span>
                      <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold border border-white/10 group-hover:border-primary/30">
                        {player.name.charAt(0)}
                      </div>
                      <span className="font-medium">{player.name}</span>
                    </div>
                    <span className="font-mono text-primary font-bold">{player.points}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-white/5 text-center">
                <Button variant="link" className="text-primary hover:text-primary/80 h-auto p-0 text-xs font-bold uppercase tracking-widest">
                  View Full Rankings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;