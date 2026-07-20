"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import PremiumScoreboard from '@/components/broadcast/PremiumScoreboard';
import CommentaryFeed from '@/components/broadcast/CommentaryFeed';
import MatchStatGrid from '@/components/broadcast/MatchStatGrid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, Activity, Zap, Bell, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useParams } from 'react-router-dom';

const LiveBroadcast = () => {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [matchData, setMatchData] = useState<any>(null);

  useEffect(() => {
    const loadMatch = () => {
      const saved = localStorage.getItem(id || "");
      if (saved) setMatchData(JSON.parse(saved));
    };
    loadMatch();
    const interval = setInterval(loadMatch, 1000);
    return () => clearInterval(interval);
  }, [id]);

  const p1 = matchData?.players?.p1 || { name: "Athlete A", country: "IN" };
  const p2 = matchData?.players?.p2 || { name: "Athlete B", country: "IN" };
  const score = matchData?.currentScore || [0, 0];
  const sets = matchData?.setsWon || [0, 0];
  const serving = matchData?.serving || 1;

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A] pb-32">
      <Navbar />
      
      {/* Mobile Top Header */}
      <div className="bg-white border-b border-slate-100 p-6 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-black tracking-tighter uppercase italic flex items-center gap-3">
            <Trophy className="h-5 w-5 text-sky-500" /> {matchData?.name || "LIVE MATCH"}
          </h1>
          <div className="flex items-center gap-3 text-[8px] font-bold text-slate-400 uppercase tracking-widest">
            <span>Court {matchData?.court || "01"}</span>
            <span className="h-1 w-1 bg-slate-200 rounded-full" />
            <span className="text-red-500 animate-pulse">LIVE BROADCAST</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={() => setIsFollowing(!isFollowing)}
            variant="outline" 
            className={cn(
              "flex-1 h-12 rounded-2xl text-[9px] font-black uppercase tracking-widest gap-2",
              isFollowing ? "bg-sky-500 text-white border-none" : "border-slate-200"
            )}
          >
            {isFollowing ? <Check className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
            {isFollowing ? "Following" : "Notify"}
          </Button>
          <Button className="flex-1 h-12 rounded-2xl bg-[#0B1F3A] text-white font-black text-[9px] uppercase tracking-widest">Live Intel</Button>
        </div>
      </div>

      <main className="container px-4 py-6 space-y-10">
        {/* Massive Scoreboard - Optimized for full width mobile */}
        <section>
          <PremiumScoreboard 
            p1={{ name: p1.name, country: p1.country, flag: "🏳️", sets: [sets[0]] }}
            p2={{ name: p2.name, country: p2.country, flag: "🏳️", sets: [sets[1]] }}
            currentScore={score as [number, number]}
            serving={serving as 1 | 2}
          />
        </section>

        {/* AI Commentary */}
        <section className="space-y-4">
           <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-black uppercase italic flex items-center gap-2">
              <Zap className="h-4 w-4 text-sky-500 fill-current" /> Commentary
            </h2>
            <Badge variant="outline" className="text-[8px] font-black">AI CORE</Badge>
          </div>
          <CommentaryFeed events={[
            { id: '1', text: `${p1.name} displays power in this rally.`, type: 'highlight', time: 'LIVE' },
            { id: '2', text: "Strategic net play observed.", type: 'analysis', time: '1m ago' },
          ]} />
        </section>

        {/* Technical Stats */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-black uppercase italic flex items-center gap-2">
              <Activity className="h-4 w-4 text-sky-500" /> Intelligence
            </h2>
          </div>
          <MatchStatGrid />
        </section>
      </main>
    </div>
  );
};

export default LiveBroadcast;