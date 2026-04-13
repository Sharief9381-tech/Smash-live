"use client";

import React, { useState, useEffect } from 'react';
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
  TrendingUp, Timer, Flame, MapPin, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { showSuccess } from '@/utils/toast';

const LiveBroadcast = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleFollow = () => {
    const newState = !isFollowing;
    setIsFollowing(newState);
    if (newState) {
      setShowNotification(true);
      showSuccess("Intelligence alerts active for this match.");
    } else {
      setShowNotification(false);
    }
  };

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
                onClick={handleFollow}
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

      <main className="container px-6 py-6 space-y-6">
        {/* Intelligence Notification Bar */}
        <AnimatePresence>
          {showNotification && (
            <motion.div 
              initial={{ height: 0, opacity: 0, y: -20 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -20 }}
              className="overflow-hidden"
            >
              <div className="bg-[#0B1F3A] text-white p-4 rounded-2xl flex items-center justify-between shadow-xl border border-sky-500/30">
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-lg bg-sky-500 flex items-center justify-center">
                    <Zap className="h-4 w-4 fill-current text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest">Global Sync Active</p>
                    <p className="text-[10px] text-white/60 font-bold uppercase">You will receive real-time intelligence alerts for every smash and score update.</p>
                  </div>
                </div>
                <button onClick={() => setShowNotification(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Row: Massive Scoreboard and Commentary */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
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

        {/* Mid Row: Timeline and Strategic Comparison (Upgraded Position) */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-panel rounded-[3rem] p-8 border-slate-200 overflow-hidden flex flex-col justify-center">
            <MatchTimeline />
          </div>
          
          <div className="glass-panel rounded-[3rem] p-8 border-slate-200 grid grid-cols-2 gap-8 bg-white relative overflow-hidden group">
            {/* Axelsen Stats */}
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="h-8 w-8 rounded-full bg-sky-500 flex items-center justify-center text-[10px] font-black text-white">VA</div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0B1F3A]">Axelsen</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Shots Acc.", val: 94, color: "bg-sky-500" },
                  { label: "Net Drops", val: 88, color: "bg-sky-600" },
                  { label: "Rally Dom.", val: 76, color: "bg-sky-400" },
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
              <div className="flex justify-between pt-2 border-t border-slate-50">
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
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="h-8 w-8 rounded-full bg-[#0B1F3A] flex items-center justify-center text-[10px] font-black text-white">LZ</div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0B1F3A]">Zii Jia</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Shots Acc.", val: 82, color: "bg-[#0B1F3A]" },
                  { label: "Net Drops", val: 76, color: "bg-[#1a3a5f]" },
                  { label: "Rally Dom.", val: 64, color: "bg-[#254b7a]" },
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
              <div className="flex justify-between pt-2 border-t border-slate-50">
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

        {/* Bottom Section: Technical Stats */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black tracking-tight uppercase italic flex items-center gap-3">
              <Activity className="h-5 w-5 text-sky-500" /> Technical Intelligence
            </h2>
            <Badge variant="outline" className="text-[9px] font-black border-slate-200 uppercase">Match Core Feed</Badge>
          </div>
          <MatchStatGrid />
        </div>
      </main>
    </div>
  );
};

export default LiveBroadcast;