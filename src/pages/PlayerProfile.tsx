"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, Activity, Target, Zap, 
  Flame, TrendingUp, History, Star,
  Award, Globe
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const PlayerProfile = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Player Bio */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-8 rounded-[3rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6">
                <Badge className="bg-primary text-black font-black">WORLD #1</Badge>
              </div>
              <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                <div className="relative">
                  <div className="h-40 w-40 rounded-full bg-gradient-to-br from-primary to-green-900 p-1">
                    <div className="h-full w-full rounded-full bg-secondary flex items-center justify-center text-5xl font-black border-4 border-background">
                      VA
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-black h-10 w-10 rounded-full flex items-center justify-center border-4 border-background">
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-4xl font-black tracking-tighter">Viktor Axelsen</h1>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground font-medium">
                    <Globe className="h-4 w-4" /> Denmark • 30 Years Old
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full pt-4">
                  <div className="p-4 bg-white/5 rounded-2xl">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Matches</span>
                    <p className="text-xl font-black">842</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Win Rate</span>
                    <p className="text-xl font-black text-primary">88.4%</p>
                  </div>
                </div>

                <Button className="w-full bg-primary text-black font-bold h-14 rounded-2xl hover:bg-primary/90">
                  FOLLOW PLAYER
                </Button>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl space-y-6">
              <h3 className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" /> Recent Titles
              </h3>
              <div className="space-y-4">
                {[
                  "Olympic Gold Medalist 2024",
                  "BWF World Championships 2023",
                  "All England Open 2023",
                  "Indonesia Open 2023"
                ].map((title, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-primary/20 transition-all">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">{title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Stats */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: "Smash Speed", val: "410", unit: "km/h", icon: Zap, color: "text-primary" },
                { label: "Stamina Index", val: "94.2", unit: "/100", icon: Activity, color: "text-blue-400" },
                { label: "Attack Power", val: "98", unit: "%", icon: Target, color: "text-red-400" },
              ].map((stat, i) => (
                <div key={i} className="glass-card p-6 rounded-[2rem] space-y-2 border-white/5 hover:border-white/10 transition-colors">
                  <div className={`p-2 rounded-lg w-fit bg-white/5 ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</span>
                    <p className="text-3xl font-black">{stat.val}<span className="text-sm font-medium text-muted-foreground ml-1">{stat.unit}</span></p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card p-8 rounded-[2.5rem] space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-primary" /> Performance Breakdown
                </h2>
                <Badge variant="outline" className="border-white/10">LAST 12 MONTHS</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  {[
                    { label: "Smash Accuracy", val: 92 },
                    { label: "Net Play Proficiency", val: 85 },
                    { label: "Court Coverage", val: 98 },
                    { label: "Serve Consistency", val: 89 }
                  ].map((s, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                        <span>{s.label}</span>
                        <span className="text-primary">{s.val}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${s.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 flex flex-col justify-center items-center text-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
                    <Flame className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black">Winning Streak</h4>
                    <p className="text-4xl font-black text-primary mt-1">14 MATCHES</p>
                    <p className="text-xs text-muted-foreground mt-2 font-medium uppercase tracking-widest">Active Streak • Pro Circuit</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-[2.5rem] space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black flex items-center gap-3">
                  <History className="h-6 w-6 text-primary" /> Recent Matches
                </h2>
                <Button variant="link" className="text-primary font-bold">View History</Button>
              </div>
              
              <div className="space-y-4">
                {[
                  { opp: "Lee Zii Jia", event: "BWF World Tour Finals", score: "21-19, 21-17", result: "W" },
                  { opp: "Shi Yuqi", event: "Indonesia Open", score: "21-14, 21-12", result: "W" },
                  { opp: "Anthony Ginting", event: "All England", score: "19-21, 21-15, 21-18", result: "W" },
                ].map((m, i) => (
                  <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-transparent hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-black text-sm">
                        {m.result}
                      </div>
                      <div>
                        <h4 className="font-bold">vs {m.opp}</h4>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold">{m.event}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-lg">{m.score}</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Victory</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlayerProfile;