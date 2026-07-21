"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import PremiumScoreboard from '@/components/broadcast/PremiumScoreboard';
import CommentaryFeed from '@/components/broadcast/CommentaryFeed';
import MatchStatGrid from '@/components/broadcast/MatchStatGrid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Activity, Zap, Bell, Check, Loader2, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useParams, useNavigate } from 'react-router-dom';

const LiveBroadcast = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [matchData, setMatchData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMatch = () => {
      const saved = localStorage.getItem(id || "");
      if (saved) {
        setMatchData(JSON.parse(saved));
      }
      setLoading(false);
    };
    
    loadMatch();
    const interval = setInterval(loadMatch, 1000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-sky-500 h-10 w-10" />
      </div>
    );
  }

  if (!matchData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container flex flex-col items-center justify-center py-40 gap-6 text-center px-6">
           <Trophy className="h-16 w-16 text-muted-foreground/20" />
           <div className="space-y-2">
             <h2 className="text-xl font-black uppercase italic">Broadcast Link Offline</h2>
             <p className="text-muted-foreground text-sm font-medium max-w-sm">This match session is no longer broadcasting live intelligence.</p>
           </div>
           <Button onClick={() => navigate('/live-match/active')} className="bg-primary text-primary-foreground px-10 h-12 rounded-xl font-black uppercase tracking-widest text-[10px]">Return to Live Feed</Button>
        </main>
      </div>
    );
  }

  const p1 = matchData.players?.p1 || (matchData.players?.sideA?.[0]) || { name: "Athlete A", country: "Node A" };
  const p2 = matchData.players?.p2 || (matchData.players?.sideB?.[0]) || { name: "Athlete B", country: "Node B" };
  const score = matchData.current_score || matchData.currentScore || [0, 0];
  const sets = matchData.sets_won || matchData.setsWon || [0, 0];
  const serving = matchData.serving || 1;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background pb-32">
      <Navbar />
      
      <div className="bg-card border-b p-6 space-y-6">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => navigate(-1)} className="text-[10px] font-black text-muted-foreground uppercase flex items-center gap-1"><ChevronLeft className="h-3 w-3" /> Back</button>
          <Badge variant="outline" className="text-[8px] font-black border-sky-500/20 text-sky-500 uppercase tracking-widest">ID: {id?.slice(-6).toUpperCase()}</Badge>
        </div>

        <div className="space-y-1">
          <h1 className="text-xl font-black tracking-tight uppercase italic flex items-center gap-3">
            <Trophy className="h-5 w-5 text-sky-500" /> {matchData.name}
          </h1>
          <div className="flex items-center gap-3 text-[8px] font-bold text-muted-foreground uppercase tracking-widest">
            <span>Court {matchData.court || "01"}</span>
            <span className="h-1 w-1 bg-border rounded-full" />
            <span className="text-red-500 animate-pulse">LIVE BROADCAST</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={() => setIsFollowing(!isFollowing)}
            variant="outline" 
            className={cn(
              "flex-1 h-11 rounded-xl text-[9px] font-black uppercase tracking-widest gap-2",
              isFollowing ? "bg-sky-500 text-white border-none" : "border-border"
            )}
          >
            {isFollowing ? <Check className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
            {isFollowing ? "Following" : "Notify"}
          </Button>
          <Button className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground font-black text-[9px] uppercase tracking-widest shadow-lg">Live Intel</Button>
        </div>
      </div>

      <main className="container px-4 py-6 space-y-10">
        <section>
          <PremiumScoreboard 
            p1={{ name: p1.name, country: p1.country || "IN", flag: "🏳️", sets: [sets[0]] }}
            p2={{ name: p2.name, country: p2.country || "IN", flag: "🏳️", sets: [sets[1]] }}
            currentScore={score as [number, number]}
            serving={serving as 1 | 2}
          />
        </section>

        <section className="space-y-4">
           <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-black uppercase italic flex items-center gap-2">
              <Zap className="h-4 w-4 text-sky-500 fill-current" /> AI Commentary
            </h2>
          </div>
          <CommentaryFeed events={matchData.events || []} />
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-black uppercase italic flex items-center gap-2">
              <Activity className="h-4 w-4 text-sky-500" /> Intelligence
            </h2>
          </div>
          <MatchStatGrid stats={matchData.stats} />
        </section>
      </main>
    </div>
  );
};

export default LiveBroadcast;