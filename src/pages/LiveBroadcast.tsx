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

  const ComparisonBar = ({ label, v1, v2, icon: Icon }: { label: string, v1: number, v2: number, icon: any }) => (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
        <span className="flex items-center gap-2"><Icon className="h-3 w-3 text-sky-500" /> {label}</span>
        <div className="flex gap-4">
          <span className="text-sky-600">VA: {v1}%</span>
          <span className="text-slate-400">LZ: {v2}%</span>
        </div>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden flex">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${(v1 / (v1 + v2)) * 100}%` }} 
          className="h-full bg-sky-500" 
        />
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${(v2 / (v1 + v2)) * 100}%` }} 
          className="h-full bg-slate-300" 
        />
      </div>
    </div>
  );

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

      <main className="container px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            <section className="relative">
              <PremiumScoreboard 
                p1={{ name: "Viktor Axelsen", country: "Denmark", flag: "🇩🇰", sets: [21, 14] }}
                p2={{ name: "Lee Zii Jia", country: "Malaysia", flag: "🇲🇾", sets: [19, 11] }}
                currentScore={[18, 14]}
                serving={1}
              />
            </section>

            {/* Match Timeline Module */}
            <div className="glass-panel rounded-[2.5rem] p-8 border-slate-200 overflow-hidden">
              <MatchTimeline />
            </div>

            {/* Statistics Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-black tracking-tight uppercase italic flex items-center gap-3">
                  <Activity className="h-5 w-5 text-sky-500" /> Technical Intelligence
                </h2>
                <Button variant="link" className="text-sky-600 font-black uppercase tracking-widest text-[9px]">Full History</Button>
              </div>
              <MatchStatGrid />
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Commentary Feed */}
            <CommentaryFeed events={[
              { id: '1', text: "Powerful cross-court smash from Axelsen leaves Lee with no response.", type: 'highlight', time: '14:42' },
              { id: '2', text: "Fantastic defensive rally of 24 shots. Axelsen holds his ground.", type: 'analysis', time: '14:40' },
              { id: '3', text: "Point to Axelsen. He leads 18-14 in the second set.", type: 'score', time: '14:38' },
              { id: '4', text: "Unforced error from Lee Zii Jia at the net.", type: 'score', time: '14:35' },
              { id: '5', text: "Axelsen takes total control of the front court.", type: 'analysis', time: '14:32' },
            ]} />

            {/* Strategic Metrics (Dual Comparison) */}
            <div className="glass-panel rounded-[2.5rem] p-7 border-slate-200 space-y-7">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5 text-sky-500" /> Comparison Intel
                </h3>
                <Badge className="bg-sky-500/10 text-sky-600 border-none text-[8px] font-black">AI ANALYTICS</Badge>
              </div>

              <div className="space-y-5">
                <ComparisonBar label="Shots Accuracy" v1={94} v2={82} icon={Target} />
                <ComparisonBar label="Net Drops" v1={88} v2={76} icon={Droplets} />
                <ComparisonBar label="Rally Dominance" v1={76} v2={64} icon={TrendingUp} />
                <ComparisonBar label="Court Coverage" v1={91} v2={85} icon={MapPin} />

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Timer className="h-3 w-3" /> VA Reaction
                    </p>
                    <p className="text-lg font-black text-[#0B1F3A]">184ms</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 text-right justify-end">
                      LZ Reaction <Timer className="h-3 w-3" />
                    </p>
                    <p className="text-lg font-black text-[#0B1F3A] text-right">212ms</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Flame className="h-3 w-3 text-sky-500" /> VA Stamina
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-500" style={{ width: '82%' }} />
                      </div>
                      <span className="text-[10px] font-black">82%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1 text-right justify-end">
                      LZ Stamina <Flame className="h-3 w-3 text-red-400" />
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black">74%</span>
                      <div className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400" style={{ width: '74%' }} />
                      </div>
                    </div>
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