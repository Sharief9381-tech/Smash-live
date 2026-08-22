import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import SmashRating from '@/components/dashboard/SmashRating';
import { motion } from 'framer-motion';
import { 
  Trophy, Zap, Activity, Loader2, 
  ChevronRight, Calendar, Users, Flame, Heart, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const Court = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<any[]>([]);
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const saved = localStorage.getItem('userProfile');
      if (saved) setProfile(JSON.parse(saved));

      try {
        const { data: activeMatches } = await supabase.from('matches').select('*').eq('status', 'live').limit(2);
        const { data: activeTourneys } = await supabase.from('tournaments').select('*').neq('status', 'Completed').limit(2);
        
        const localMatches = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
        setMatches([...(activeMatches || []), ...localMatches]);
        setTournaments(activeTourneys || []);
      } catch (err) { console.warn("Sync limited."); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <Navbar />
      
      <main className="px-4 py-4 space-y-5">
        {/* 1. Header & Quick Stats */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h1 className="uppercase italic">Hello, {profile?.name?.split(' ')[0] || "Athlete"}! 🔥</h1>
            <Badge className="bg-sky-500 text-white border-none text-[10px] font-black h-6 uppercase">Active</Badge>
          </div>
          <SmashRating rating={profile?.stats?.rating || 0} level={profile?.stats?.level || 1} xp={0} />
        </section>

        {/* 2. Quick Actions Grid */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Schedule', icon: Calendar, path: '/my-circuits', color: 'text-sky-600', bg: 'bg-sky-50' },
            { label: 'Matches', icon: Zap, path: '/smashed', color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Tourney', icon: Trophy, path: '/tournaments', color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Social', icon: Users, path: '/social', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map((action, i) => (
            <button 
              key={i} 
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-1.5 p-3 app-card active-press"
            >
              <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center", action.bg, action.color)}>
                <action.icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-black uppercase text-[#0B1F3A]">{action.label}</span>
            </button>
          ))}
        </div>

        {/* 3. Live Feed */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="uppercase italic flex items-center gap-2">
              <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" /> Live Now
            </h2>
            <Link to="/live-match/active" className="text-[11px] font-black text-sky-600 uppercase">View All</Link>
          </div>
          
          <div className="flex flex-col gap-2">
            {matches.length > 0 ? matches.map((match, i) => (
              <Link to={`/broadcast/${match.id}`} key={i} className="app-card p-3 flex items-center justify-between">
                <div className="flex-1 min-w-0 pr-4">
                  <p className="text-[10px] font-black text-slate-300 uppercase truncate mb-1">{match.name}</p>
                  <div className="space-y-0.5">
                    <p className="font-black text-sm text-[#0B1F3A] uppercase truncate">{match.players?.p1?.name || match.players?.sideA?.[0]?.name || "Side A"}</p>
                    <p className="font-black text-sm text-[#0B1F3A] uppercase truncate">{match.players?.p2?.name || match.players?.sideB?.[0]?.name || "Side B"}</p>
                  </div>
                </div>
                <div className="bg-slate-50 px-4 py-2 rounded-xl text-center min-w-[70px]">
                  <p className="text-xl font-mono font-black text-sky-600 leading-none">
                    {match.current_score ? `${match.current_score[0]}-${match.current_score[1]}` : "0-0"}
                  </p>
                  <p className="text-[8px] font-black text-slate-300 uppercase mt-1">Live</p>
                </div>
              </Link>
            )) : (
              <div className="py-8 text-center bg-white/50 border border-dashed rounded-xl border-slate-200">
                <p className="text-[11px] font-black text-slate-400 uppercase italic">No active matches in network</p>
              </div>
            )}
          </div>
        </section>

        {/* 4. Tournament Section */}
        <section className="space-y-3">
          <h2 className="uppercase italic flex items-center gap-2 px-1">
            <Trophy className="h-4 w-4 text-amber-500" /> Featured Circuits
          </h2>
          <div className="flex flex-col gap-2">
            {tournaments.length > 0 ? tournaments.map((t, i) => (
              <Link to={`/tournament/${t.id}`} key={i} className="app-card flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center text-sky-400 shrink-0">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="uppercase italic leading-tight mb-0.5 truncate max-w-[180px]">{t.name}</h3>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t.city} • {t.status}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300" />
              </Link>
            )) : (
              <div className="py-8 text-center bg-white/50 border border-dashed rounded-xl border-slate-200">
                <p className="text-[11px] font-black text-slate-400 uppercase italic">No circuits found</p>
              </div>
            )}
          </div>
        </section>

        {/* 5. Zero-State Feed */}
        <section className="space-y-3">
          <h2 className="uppercase italic flex items-center gap-2 px-1">
            <Users className="h-4 w-4 text-emerald-500" /> Network Activity
          </h2>
          <div className="app-card p-8 text-center border-dashed border-2 bg-slate-50/30">
            <MessageSquare className="h-8 w-8 text-slate-200 mx-auto mb-3" />
            <p className="text-[10px] font-black text-slate-400 uppercase italic">Connect with athletes to see their match updates here.</p>
            <Button onClick={() => navigate('/social')} variant="ghost" className="mt-2 text-sky-600 font-black text-[9px] uppercase hover:bg-transparent">Find Athletes</Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Court;