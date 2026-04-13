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
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="container px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="space-y-1">
              <h1 className="text-xl font-black tracking-tighter uppercase italic text-[#0B1F3A] flex items-center gap-2">
                <Trophy className="h-5 w-5 text-sky-500" /> BWF WORLD TOUR FINALS 2024
              </h1>
              <div className="flex items-center gap-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Grand Final</span>
                <span className="h-1 w-1 bg-slate-200 rounded-full" />
                <span>Court 01</span>
                <span className="h-1 w-1 bg-slate-200 rounded-full" />
                <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> 00:42:15</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <Button 
                onClick={() => setIsFollowing(!isFollowing)}
                variant={isFollowing ? "default" : "outline"} 
                className={cn(
                  "h-9 rounded-lg text-[10px] font-black uppercase tracking-widest gap-1.5 transition-all",
                  isFollowing ? "bg-sky-500 text-white hover:bg-sky-600 border-none shadow-md" : "border-slate-200 bg-white hover:bg-slate-50"
                )}
             >
               {isFollowing ? <Check className="h-3.5 w-3.5" /> : <Bell className="h-3.5 w-3.5" />}
               {isFollowing ? "Following" : "Follow"}
             </Button>
             <Button className="h-9 rounded-lg bg-[#0B1F3A] text-white font-black uppercase tracking-widest px-6 shadow-lg text-[10px]">
               Insights
             </Button>
          </div>
        </div>
      </div>

      <main className="container px-6 py-6 space-y-6">
        {/* Top Row: Scoreboard and Commentary */}
        <div className="grid lg:grid-cols-12 gap-6 h-full">
          <div className="lg:col-span-8">
            <PremiumScoreboard 
              p1={{ name: "Viktor Axelsen", country: "Denmark", flag: "🇩🇰", sets: [21, 14] }}
              p2={{ name: "Lee Zii Jia", country: "Malaysia", flag: "🇲🇾", sets: [19, 11] }}
              currentScore={[18, 14]}
              serving={1}
            />
          </div>
          <div className="lg:col-span-4">
            <CommentaryFeed events={[
              { id: '1', text: "Powerful cross-court smash from Axelsen leaves Lee with no response.", type: 'highlight', time: '14:42' },
              { id: '2', text: "Fantastic defensive rally of 24 shots. Axelsen holds his ground.", type: 'analysis', time: '14:40' },
              { id: '3', text: "Point to Axelsen. He leads 18-14 in the second set.", type: 'score', time: '14:38' },
            ]} />
          </div>
        </div>

        {/* Match Timeline Module - Made more compact */}
        <div className="glass-panel rounded-[2rem] p-4 border-slate-200 overflow-hidden">
          <MatchTimeline />
        </div>

        {/* Bottom Section: Technical Stats & Comparison Intel */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Technical Intelligence */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-black tracking-tight uppercase italic flex items-center gap-2">
                <Activity className="h-5 w-5 text-sky-500" /> Technical Intelligence
              </h2>
              <Badge variant="outline" className="text-[8px] font-black border-slate-200">MATCH CORE</Badge>
            </div>
            <MatchStatGrid />
          </div>

          {/* Comparison Intel (One side per player) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-black tracking-tight uppercase italic flex items-center gap-2">
                <Zap className="h-5 w-5 text-sky-500" /> Strategic Comparison
              </h2>
              <Badge className="bg-sky-500/10 text-sky-600 border-none text-[8px] font-black">AI ANALYTICS</Badge>
            </div>

            <div className="glass-panel rounded-[2rem] p-6 border-slate-200 grid grid-cols-2 gap-8">
              {/* Axelsen Stats */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <div className="h-7 w-7 rounded-full bg-sky-500 flex items-center justify-center text-[10px] font-black text-white">VA</div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0B1F3A]">Axelsen</span>
                </div>
                
                <div className="space-y-4">
                  {[
                    { label: "Shots Acc.", val: 94, color: "bg-sky-500" },
                    { label: "Net Drops", val: 88, color: "bg-sky-600" },
                    { label: "Dominance", val: 76, color: "bg-sky-400" },
                    { label: "Coverage", val: 91, color: "bg-sky-700" },
                  ].map((s, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-widest">
                        <span>{s.label}</span>
                        <span className="text-[#0B1F3A]">{s.val}%</span>
                      </div>
                      <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${s.val}%` }} className={cn("h-full", s.color)} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                  <div className="text-center">
                    <p className="text-[8px] font-black text-slate-400 uppercase">Reaction</p>
                    <p className="text-sm font-black text-[#0B1F3A]">184ms</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[8px] font-black text-slate-400 uppercase">Stamina</p>
                    <p className="text-sm font-black text-sky-600">82%</p>
                  </div>
                </div>
              </div>

              {/* Lee Zii Jia Stats */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <div className="h-7 w-7 rounded-full bg-[#0B1F3A] flex items-center justify-center text-[10px] font-black text-white">LZ</div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0B1F3A]">Zii Jia</span>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Shots Acc.", val: 82, color: "bg-[#0B1F3A]" },
                    { label: "Net Drops", val: 76, color: "bg-[#1a3a5f]" },
                    { label: "Dominance", val: 64, color: "bg-[#254b7a]" },
                    { label: "Coverage", val: 85, color: "bg-[#2f5c94]" },
                  ].map((s, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-widest">
                        <span>{s.label}</span>
                        <span className="text-[#0B1F3A]">{s.val}%</span>
                      </div>
                      <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${s.val}%` }} className={cn("h-full", s.color)} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                  <div className="text-center">
                    <p className="text-[8px] font-black text-slate-400 uppercase">Reaction</p>
                    <p className="text-sm font-black text-[#0B1F3A]">212ms</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[8px] font-black text-slate-400 uppercase">Stamina</p>
                    <p className="text-sm font-black text-red-500">74%</p>
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