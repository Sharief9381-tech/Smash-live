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
  Trophy, Clock, Activity, 
  Zap, Bell, Check, Target, Droplets,
  TrendingUp, Timer, Flame, MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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

      <main className="container px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-10">
            <section className="relative">
              <PremiumScoreboard 
                p1={{ name: "Viktor Axelsen", country: "Denmark", flag: "🇩🇰", sets: [21, 14] }}
                p2={{ name: "Lee Zii Jia", country: "Malaysia", flag: "🇲🇾", sets: [19, 11] }}
                currentScore={[18, 14]}
                serving={1}
              />
            </section>

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

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-10">
            {/* Commentary Feed */}
            <CommentaryFeed events={[
              { id: '1', text: "Powerful cross-court smash from Axelsen leaves Lee with no response.", type: 'highlight', time: '14:42' },
              { id: '2', text: "Fantastic defensive rally of 24 shots. Axelsen holds his ground.", type: 'analysis', time: '14:40' },
              { id: '3', text: "Point to Axelsen. He leads 18-14 in the second set.", type: 'score', time: '14:38' },
              { id: '4', text: "Unforced error from Lee Zii Jia at the net.", type: 'score', time: '14:35' },
              { id: '5', text: "Axelsen takes total control of the front court.", type: 'analysis', time: '14:32' },
            ]} />

            {/* Strategic Metrics (Expanded Grid) */}
            <div className="glass-panel rounded-[3rem] p-8 border-slate-200 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Zap className="h-4 w-4 text-sky-500" /> Strategic Metrics
                </h3>
                <Badge className="bg-sky-500/10 text-sky-600 border-none text-[8px] font-black">AI ANALYTICS</Badge>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Shots Accuracy */}
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Target className="h-3 w-3 text-sky-500" /> Shots Accuracy</span>
                    <span className="text-[#0B1F3A]">94.2%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '94.2%' }} transition={{ duration: 1.5 }} className="h-full bg-sky-500" />
                  </div>
                </div>

                {/* Net Drops */}
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Droplets className="h-3 w-3 text-sky-500" /> Net Drops</span>
                    <span className="text-[#0B1F3A]">88.5%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '88.5%' }} transition={{ duration: 1.5 }} className="h-full bg-sky-600" />
                  </div>
                </div>

                {/* Rally Dominance */}
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="flex items-center gap-2"><TrendingUp className="h-3 w-3 text-sky-500" /> Rally Dominance</span>
                    <span className="text-[#0B1F3A]">76.4%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '76.4%' }} transition={{ duration: 1.5 }} className="h-full bg-sky-400" />
                  </div>
                </div>

                {/* Court Coverage */}
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="flex items-center gap-2"><MapPin className="h-3 w-3 text-sky-500" /> Court Coverage</span>
                    <span className="text-[#0B1F3A]">91.2%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '91.2%' }} transition={{ duration: 1.5 }} className="h-full bg-sky-700" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Timer className="h-3 w-3" /> Reaction
                    </p>
                    <p className="text-xl font-black text-[#0B1F3A]">184ms</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Flame className="h-3 w-3" /> Stamina
                    </p>
                    <p className="text-xl font-black text-[#0B1F3A]">82%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveBroadcast;