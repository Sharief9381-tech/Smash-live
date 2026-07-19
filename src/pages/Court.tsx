"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { 
  Zap, Trophy, Radio, Activity, 
  ArrowRight, Search, Target, User,
  Calendar, MapPin, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const Court = () => {
  const [profile, setProfile] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) setProfile(JSON.parse(saved));

    const fetchData = async () => {
      try {
        const { data } = await supabase.from('matches').select('*').eq('status', 'live').limit(2);
        setMatches(data || []);
      } catch (err) { console.warn("Live fetch limited."); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navbar />
      
      <main className="container max-w-lg mx-auto px-4 py-6 space-y-8">
        {/* 1. Greeting */}
        <section className="space-y-1">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Welcome Back</p>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">
            Hi, {profile?.name?.split(' ')[0] || "Athlete"}!
          </h1>
        </section>

        {/* 2. Player Card */}
        <Link to="/player/me" className="block">
          <div className="sport-card p-6 bg-gradient-to-br from-primary to-orange-600 relative overflow-hidden group">
            <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:rotate-12 transition-transform">
               <Target className="h-40 w-40" />
            </div>
            <div className="relative z-10 flex items-center gap-4">
              <div className="h-16 w-16 rounded-full border-4 border-white/20 overflow-hidden bg-white/10 flex items-center justify-center">
                 <User className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-1">
                 <h2 className="text-xl font-black text-white uppercase italic">{profile?.name || "Anonymous Athlete"}</h2>
                 <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Smash ID: {profile?.smashId || "PENDING"}</p>
              </div>
            </div>
            <div className="mt-6 flex gap-8 relative z-10">
               <div>
                  <p className="text-[10px] font-black text-white/60 uppercase">Rank</p>
                  <p className="text-2xl font-black text-white">#--</p>
               </div>
               <div>
                  <p className="text-[10px] font-black text-white/60 uppercase">Points</p>
                  <p className="text-2xl font-black text-white">0</p>
               </div>
            </div>
          </div>
        </Link>

        {/* 3. Quick Actions */}
        <section className="grid grid-cols-2 gap-4">
          <Link to="/live-match/create" className="sport-card p-5 flex flex-col gap-3 justify-center items-center text-center hover:border-primary/50">
             <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Activity className="h-5 w-5" />
             </div>
             <span className="text-[11px] font-black uppercase tracking-tight">Quick Match</span>
          </Link>
          <Link to="/tournaments" className="sport-card p-5 flex flex-col gap-3 justify-center items-center text-center hover:border-secondary/50">
             <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Trophy className="h-5 w-5" />
             </div>
             <span className="text-[11px] font-black uppercase tracking-tight">Join Circuit</span>
          </Link>
        </section>

        {/* 4. Live Matches */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
             <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" /> Live Now
             </h3>
             <Link to="/live-match/active" className="text-[10px] font-black text-primary uppercase">View All</Link>
          </div>
          
          <div className="space-y-3">
             {matches.length > 0 ? matches.map((m, i) => (
               <Link to={`/broadcast/${m.id}`} key={i} className="sport-card p-5 flex items-center justify-between bg-slate-900">
                  <div className="space-y-2">
                     <p className="text-[9px] font-bold text-muted-foreground uppercase">{m.name}</p>
                     <div className="font-black text-sm uppercase italic leading-none space-y-1">
                        <p>{m.players?.p1?.name || "Player 1"}</p>
                        <p className="text-primary">vs</p>
                        <p>{m.players?.p2?.name || "Player 2"}</p>
                     </div>
                  </div>
                  <div className="text-3xl font-black font-mono text-secondary tabular-nums">
                     {m.current_score ? `${m.current_score[0]}-${m.current_score[1]}` : "0-0"}
                  </div>
               </Link>
             )) : (
               <div className="sport-card p-8 text-center bg-slate-900/50 border-dashed border-white/5">
                  <p className="text-[10px] font-black text-muted-foreground uppercase italic">No active match node</p>
               </div>
             )}
          </div>
        </section>

        {/* 5. Trending News / Announcements */}
        <section className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1">Latest Pulse</h3>
          <div className="sport-card overflow-hidden">
             <img src="https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop" className="h-32 w-full object-cover" alt="News" />
             <div className="p-4 space-y-2">
                <Badge className="bg-primary/20 text-primary border-none text-[8px] font-black px-2 uppercase">Championship</Badge>
                <h4 className="text-sm font-black uppercase italic leading-tight">Inter-University Masters starting next week!</h4>
                <p className="text-[10px] text-muted-foreground font-bold">Register now to lock your seed in the regional registry.</p>
             </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Court;