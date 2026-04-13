"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import PremiumScoreboard from '@/components/broadcast/PremiumScoreboard';
import CommentaryFeed from '@/components/broadcast/CommentaryFeed';
import MatchStatGrid from '@/components/broadcast/MatchStatGrid';
import MatchTimeline from '@/components/broadcast/MatchTimeline';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, Clock, Timer, Users, 
  Share2, Bell, TrendingUp, Activity, 
  Zap, ChevronRight, Check
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
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
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A]">
      <Navbar />
      
      {/* Top Header Section */}
      <div className="bg-white border-b border-slate-200 py-6">
        <div className="container px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <div className="space-y-1">
              <h1 className="text-2xl font-black tracking-tighter uppercase italic text-[#0B1F3A] flex items-center gap-3">
                <Trophy className="h-6 w-6 text-sky-500" /> BWF WORLD TOUR FINALS 2024
              </h1>
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Grand Final</span>
                <span className="h-1 w-1 bg-slate-200 rounded-full" />
                <span>Court 01</span>
                <span className="h-1 w-1 bg-slate-200 rounded-full" />
                <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> 00:42:15</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <Button 
                onClick={() => setIsFollowing(!isFollowing)}
                variant={isFollowing ? "default" : "outline"} 
                className={cn(
                  "h-11 rounded-xl text-xs font-black uppercase tracking-widest gap-2 transition-all",
                  isFollowing ? "bg-sky-500 text-white hover:bg-sky-600 border-none shadow-lg" : "border-slate-200 bg-white hover:bg-slate-50"
                )}
             >
               {isFollowing ? <Check className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
               {isFollowing ? "Following" : "Follow Match"}
             </Button>
             <Button className="h-11 rounded-xl bg-[#0B1F3A] text-white font-black uppercase tracking-widest px-8 shadow-xl">
               Live Insights
             </Button>
          </div>
        </div>
      </div>

      <main className="container px-6 py-12 space-y-12">
        
        {/* Live Match Hero Section */}
        <section className="relative">
          <PremiumScoreboard 
            p1={{ name: "Viktor Axelsen", country: "Denmark", flag: "🇩🇰", sets: [21, 14] }}
            p2={{ name: "Lee Zii Jia", country: "Malaysia", flag: "🇲🇾", sets: [19, 11] }}
            currentScore={[18, 14]}
            serving={1}
          />
        </section>

        {/* Intelligence Modules Section */}
        <section className="grid xl:grid-cols-12 gap-10">
          <div className="xl:col-span-8 space-y-10">
            {/* Match Timeline Module */}
            <div className="glass-panel rounded-[3rem] p-10 border-slate-200 overflow-hidden">
              <MatchTimeline />
            </div>

            {/* Statistics Grid */}
            <div className="space-y-8">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-2xl font-black tracking-tight uppercase italic flex items-center gap-3">
                  <Activity className="h-6 w-6 text-sky-500" /> Technical Intelligence
                </h2>
                <Button variant="link" className="text-sky-600 font-black uppercase tracking-widest text-[10px]">Compare History</Button>
              </div>
              <MatchStatGrid />
            </div>
          </div>

          {/* Side Panel: Commentary & Intelligence */}
          <div className="xl:col-span-4 space-y-10">
            {/* Commentary Feed (Moved Up) */}
            <CommentaryFeed events={[
              { id: '1', text: "Powerful cross-court smash from Axelsen leaves Lee with no response.", type: 'highlight', time: '14:42' },
              { id: '2', text: "Fantastic defensive rally of 24 shots. Axelsen holds his ground.", type: 'analysis', time: '14:40' },
              { id: '3', text: "Point to Axelsen. He leads 18-14 in the second set.", type: 'score', time: '14:38' },
              { id: '4', text: "Unforced error from Lee Zii Jia at the net.", type: 'score', time: '14:35' },
              { id: '5', text: "Axelsen takes total control of the front court.", type: 'analysis', time: '14:32' },
            ]} />

            {/* Momentum & Win Prob (Moved Down) */}
            <div className="glass-panel rounded-[3rem] p-8 border-slate-200 space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-sky-500" /> Win Probability
                  </h3>
                  <Badge className="bg-sky-500/10 text-sky-600 border-none text-[8px] font-black">AI ANALYTICS</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-sky-600">Axelsen (84%)</span>
                    <span className="text-slate-400">Lee (16%)</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex">
                    <motion.div initial={{ width: 0 }} animate={{ width: '84%' }} transition={{ duration: 1.5 }} className="h-full bg-sky-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Zap className="h-4 w-4 text-sky-500" /> Match Momentum
                </h3>
                <div className="h-[140px] w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={momentumData}>
                      <defs>
                        <linearGradient id="colorMomentum" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="p1" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorMomentum)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LiveBroadcast;