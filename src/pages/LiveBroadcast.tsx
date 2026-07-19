"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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
import { useParams } from 'react-router-dom';

const LiveBroadcast = () => {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [matchData, setMatchData] = useState<any>(null);

  useEffect(() => {
    const loadMatch = () => {
      const saved = localStorage.getItem(id || "");
      if (saved) {
        setMatchData(JSON.parse(saved));
      }
    };

    loadMatch();
    const interval = setInterval(loadMatch, 1000);
    window.addEventListener('storage', loadMatch);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', loadMatch);
    };
  }, [id]);

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

  // Fallback data if no dynamic match found
  const p1 = matchData?.players?.p1 || { name: "Viktor Axelsen", country: "Denmark", flag: "🇩🇰" };
  const p2 = matchData?.players?.p2 || { name: "Lee Zii Jia", country: "Malaysia", flag: "🇲🇾" };
  const score = matchData?.currentScore || [18, 14];
  const sets = matchData?.setsWon || [0, 0];
  const serving = matchData?.serving || 1;

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A]">
      <Navbar />
      
      {/* Top Header Section */}
      <div className="bg-white border-b border-slate-200 py-6">
        <div className="container px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <div className="space-y-1">
              <h1 className="text-2xl font-black tracking-tighter uppercase italic text-[#0B1F3A] flex items-center gap-3">
                <Trophy className="h-6 w-6 text-sky-500" /> {matchData?.name || "BWF WORLD TOUR FINALS 2024"}
              </h1>
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>{matchData?.round || "Grand Final"}</span>
                <span className="h-1 w-1 bg-slate-200 rounded-full" />
                <span>Court {matchData?.court || "01"}</span>
                <span className="h-1 w-1 bg-slate-200 rounded-full" />
                <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> LIVE BROADCAST</span>
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
              p1={{ name: p1.name, country: p1.country, flag: p1.flag || "🏳️", sets: [sets[0]] }}
              p2={{ name: p2.name, country: p2.country, flag: p2.flag || "🏳️", sets: [sets[1]] }}
              currentScore={score as [number, number]}
              serving={serving as 1 | 2}
            />
          </div>
          <div className="lg:col-span-4">
            <CommentaryFeed events={[
              { id: '1', text: `${p1.name} displays incredible power in this set.`, type: 'highlight', time: '14:42' },
              { id: '2', text: "Strategic rally in progress. Both players testing net depth.", type: 'analysis', time: '14:40' },
              { id: '3', text: `Score updated: ${score[0]}-${score[1]}. Dynamic pulse active.`, type: 'score', time: '14:38' },
            ]} />
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

      <Footer />
    </div>
  );
};

export default LiveBroadcast;