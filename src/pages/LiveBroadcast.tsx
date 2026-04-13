"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import PremiumScoreboard from '@/components/broadcast/PremiumScoreboard';
import LiveVideoPlayer from '@/components/broadcast/LiveVideoPlayer';
import CommentaryFeed from '@/components/broadcast/CommentaryFeed';
import MatchStatGrid from '@/components/broadcast/MatchStatGrid';
import MatchTimeline from '@/components/broadcast/MatchTimeline';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, Clock, Timer, Users, 
  Share2, Bell, TrendingUp, Activity, 
  Zap, ChevronRight, MessageCircle, Play
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

const momentumData = [
  { time: '0m', p1: 50, p2: 50 },
  { time: '5m', p1: 60, p2: 40 },
  { time: '10m', p1: 45, p2: 55 },
  { time: '15m', p1: 70, p2: 30 },
  { time: '20m', p1: 55, p2: 45 },
  { time: '25m', p1: 85, p2: 15 },
  { time: '30m', p1: 78, p2: 22 },
];

const LiveBroadcast = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      
      {/* Top Header Section */}
      <div className="bg-[#0a0a0a] border-b border-white/5 py-6">
        <div className="container px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <div className="space-y-1">
              <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white flex items-center gap-3">
                <Trophy className="h-6 w-6 text-[#b6ff2a]" /> BWF WORLD TOUR FINALS 2024
              </h1>
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <span>Grand Final</span>
                <span className="h-1 w-1 bg-white/20 rounded-full" />
                <span>Court 01</span>
                <span className="h-1 w-1 bg-white/20 rounded-full" />
                <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> 00:42:15</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <Button variant="outline" className="h-11 rounded-xl border-white/10 bg-white/5 text-xs font-black uppercase tracking-widest gap-2 hover:bg-white/10">
               <Bell className="h-4 w-4" /> Follow Match
             </Button>
             <Button className="h-11 rounded-xl bg-[#b6ff2a] text-black font-black uppercase tracking-widest px-8 shadow-[0_0_20px_rgba(182,255,42,0.3)]">
               Live Insights
             </Button>
          </div>
        </div>
      </div>

      <main className="container px-6 py-12 space-y-16">
        
        {/* Live Match Hero Section */}
        <section className="relative">
          <PremiumScoreboard 
            p1={{ name: "Viktor Axelsen", country: "Denmark", flag: "🇩🇰", sets: [21, 14] }}
            p2={{ name: "Lee Zii Jia", country: "Malaysia", flag: "🇲🇾", sets: [19, 11] }}
            currentScore={[18, 14]}
            serving={1}
          />
        </section>

        {/* Live Stream Section */}
        <section className="grid xl:grid-cols-12 gap-10">
          <div className="xl:col-span-8 space-y-10">
            <LiveVideoPlayer />
            
            {/* Match Timeline Module */}
            <div className="bg-white/5 rounded-[3rem] p-10 border border-white/5">
              <MatchTimeline />
            </div>

            {/* Statistics Grid */}
            <div className="space-y-8">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-2xl font-black tracking-tight uppercase italic flex items-center gap-3">
                  <Activity className="h-6 w-6 text-[#b6ff2a]" /> Technical Intelligence
                </h2>
                <Button variant="link" className="text-[#b6ff2a] font-black uppercase tracking-widest text-[10px]">Compare History</Button>
              </div>
              <MatchStatGrid />
            </div>
          </div>

          {/* Side Panel: Commentary & Intelligence */}
          <div className="xl:col-span-4 space-y-10">
            {/* Momentum & Win Prob */}
            <div className="bg-white/5 rounded-[3rem] p-8 border border-white/5 space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[#b6ff2a]" /> Win Probability
                  </h3>
                  <Badge className="bg-[#b6ff2a]/20 text-[#b6ff2a] border-none text-[8px] font-black">AI ANALYTICS</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-[#b6ff2a]">Axelsen (84%)</span>
                    <span className="text-white/40">Lee (16%)</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden flex">
                    <motion.div initial={{ width: 0 }} animate={{ width: '84%' }} transition={{ duration: 1.5 }} className="h-full bg-[#b6ff2a] shadow-[0_0_15px_rgba(182,255,42,0.5)]" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Zap className="h-4 w-4 text-[#b6ff2a]" /> Match Momentum
                </h3>
                <div className="h-[140px] w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={momentumData}>
                      <defs>
                        <linearGradient id="colorMomentum" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#b6ff2a" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#b6ff2a" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="p1" stroke="#b6ff2a" strokeWidth={3} fillOpacity={1} fill="url(#colorMomentum)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Commentary Feed */}
            <CommentaryFeed events={[
              { id: '1', text: "Powerful cross-court smash from Axelsen leaves Lee with no response.", type: 'highlight', time: '14:42' },
              { id: '2', text: "Fantastic defensive rally of 24 shots. Axelsen holds his ground.", type: 'analysis', time: '14:40' },
              { id: '3', text: "Point to Axelsen. He leads 18-14 in the second set.", type: 'score', time: '14:38' },
              { id: '4', text: "Unforced error from Lee Zii Jia at the net.", type: 'score', time: '14:35' },
              { id: '5', text: "Axelsen takes total control of the front court.", type: 'analysis', time: '14:32' },
            ]} />

            {/* Player Mini Profile */}
            <div className="bg-white/5 rounded-[3rem] p-8 border border-white/5 space-y-6">
               <h3 className="text-sm font-black uppercase tracking-[0.2em] italic">Head-to-Head Stats</h3>
               <div className="flex items-center justify-between text-center">
                  <div>
                    <p className="text-2xl font-black text-[#b6ff2a]">18</p>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Wins</p>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div>
                    <p className="text-2xl font-black text-white">24</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Faced</p>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div>
                    <p className="text-2xl font-black text-white">6</p>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Losses</p>
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase">
                    <span>Dominance</span>
                    <span className="text-[#b6ff2a]">75%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[75%] bg-[#b6ff2a]" />
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Related Content & Upcoming */}
        <section className="space-y-8 pt-12 border-t border-white/5">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Upcoming Intelligence</h2>
            <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/5">Browse All Matches</Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { p: "An Se-young vs Yamaguchi", tourney: "Jakarta Open", time: "Tomorrow, 09:00", cat: "Women's Singles" },
              { p: "Antonsen vs Ginting", tourney: "All England", time: "Tomorrow, 14:30", cat: "Men's Singles" },
              { p: "Chen/Jia vs Baek/Lee", tourney: "China Masters", time: "Tomorrow, 18:00", cat: "Women's Doubles" },
            ].map((match, i) => (
              <div key={i} className="bg-white/5 rounded-[2.5rem] p-8 border border-white/5 group hover:border-[#b6ff2a]/30 transition-all cursor-pointer">
                <div className="space-y-4">
                  <Badge variant="outline" className="border-white/10 text-slate-500 text-[8px] font-black">{match.cat}</Badge>
                  <h4 className="text-xl font-black group-hover:text-[#b6ff2a] transition-colors leading-tight">{match.p}</h4>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{match.tourney}</p>
                      <p className="text-xs font-bold text-white/60">{match.time}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-500 group-hover:text-[#b6ff2a] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LiveBroadcast;