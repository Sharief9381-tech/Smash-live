"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Trophy, Zap, 
  Search as SearchIcon, MapPin, Radio, Loader2, User, ChevronRight, Globe,
  Calendar, Star, TrendingUp, Target, ListOrdered, Newspaper,
  Play, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { supabase, isCloudConfigured } from '@/lib/supabase';

const Court = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || "";
  const [searchQuery, setSearchQuery] = useState(queryFromUrl);
  
  const [matches, setMatches] = useState<any[]>([]);
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [athletes, setAthletes] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSearchQuery(queryFromUrl);
    const saved = localStorage.getItem('userProfile');
    if (saved) setUserProfile(JSON.parse(saved));
  }, [queryFromUrl]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: activeMatches } = await supabase.from('matches').select('*').eq('status', 'live');
        const { data: activeTourneys } = await supabase.from('tournaments').select('*').neq('status', 'Completed');
        const { data: allProfiles } = await supabase.from('profiles').select('*');
        
        const localMatches = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
        const localTourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
        const localAthletes = JSON.parse(localStorage.getItem('registered_users') || '[]');

        setMatches([...(activeMatches || []), ...localMatches]);
        setTournaments([...(activeTourneys || []), ...localTourneys]);
        setAthletes([...(allProfiles || []), ...localAthletes]);
      } catch (err) {
        console.warn("Cloud sync unavailable.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const globalResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const lowerQuery = searchQuery.toLowerCase();
    const matchedMatches = matches.filter(m => m.name?.toLowerCase().includes(lowerQuery)).map(m => ({ ...m, resultType: 'Match', path: `/broadcast/${m.id}` }));
    const matchedTourneys = tournaments.filter(t => t.name?.toLowerCase().includes(lowerQuery) || t.city?.toLowerCase().includes(lowerQuery)).map(t => ({ ...t, resultType: 'Tournament', path: `/tournament/${t.id}` }));
    const matchedAthletes = athletes.filter(a => a.name?.toLowerCase().includes(lowerQuery) || a.smash_id?.toLowerCase().includes(lowerQuery) || a.smashId?.toLowerCase().includes(lowerQuery)).map(a => ({ ...a, resultType: 'Player', path: `/player/me` }));
    return [...matchedMatches, ...matchedTourneys, ...matchedAthletes];
  }, [searchQuery, matches, tournaments, athletes]);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navbar />
      
      <main className="container max-w-lg mx-auto px-4 py-6 space-y-8">
        
        {/* 1. GREETING & SEARCH */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-sm font-black text-muted-foreground uppercase tracking-widest">Welcome back,</h2>
              <h1 className="text-3xl font-black italic uppercase leading-none">{userProfile?.name?.split(' ')[0] || "Athlete"}</h1>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <Zap className="h-6 w-6 fill-current" />
            </div>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); setSearchParams({ q: searchQuery }); }} className="relative group">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search Athletes, Matches..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 bg-card border-white/5 rounded-2xl font-bold focus:border-primary transition-all text-sm"
            />
          </form>
        </section>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Syncing Circuit...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {globalResults !== null ? (
              /* SEARCH RESULTS VIEW */
              <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Intelligence Results ({globalResults.length})</h3>
                  <button onClick={() => { setSearchQuery(""); setSearchParams({}); }} className="text-[10px] font-black text-primary uppercase">Clear</button>
                </div>
                <div className="space-y-4">
                  {globalResults.map((item, i) => (
                    <Link to={item.path} key={i}>
                      <div className="bg-card p-6 rounded-[2rem] border border-white/5 flex items-center justify-between active:scale-[0.98] transition-all">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-primary">
                            {item.resultType === 'Player' ? <User className="h-5 w-5" /> : <Trophy className="h-5 w-5" />}
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{item.resultType}</p>
                            <h4 className="font-black uppercase text-sm">{item.name || item.title}</h4>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.section>
            ) : (
              /* STACKED DASHBOARD */
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10 pb-12">
                
                {/* 2. PLAYER CARD */}
                <section className="relative overflow-hidden bg-primary p-6 rounded-[2.5rem] text-white shadow-2xl orange-glow">
                   <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Zap className="h-32 w-32 fill-current" />
                   </div>
                   <div className="relative z-10 space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <Badge className="bg-white/20 text-white border-none text-[8px] font-black tracking-widest uppercase">Verified Athlete</Badge>
                          <h3 className="text-2xl font-black uppercase italic leading-none">{userProfile?.name || "Athlete"}</h3>
                        </div>
                        <div className="text-right">
                           <p className="text-[9px] font-black opacity-60 uppercase tracking-widest leading-none">Rank</p>
                           <p className="text-2xl font-black italic">--</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                         <div>
                            <p className="text-[8px] font-black opacity-60 uppercase tracking-widest">Matches</p>
                            <p className="text-lg font-black">0</p>
                         </div>
                         <div>
                            <p className="text-[8px] font-black opacity-60 uppercase tracking-widest">Win Rate</p>
                            <p className="text-lg font-black">0%</p>
                         </div>
                         <div className="text-right">
                            <p className="text-[8px] font-black opacity-60 uppercase tracking-widest">Points</p>
                            <p className="text-lg font-black">0</p>
                         </div>
                      </div>
                   </div>
                </section>

                {/* 3. UPCOMING MATCH (Dynamic Placeholder) */}
                <section className="space-y-4">
                   <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Next Mission</h3>
                   <div className="bg-card border border-white/5 p-6 rounded-[2.5rem] text-center space-y-4">
                      <Calendar className="h-8 w-8 text-primary mx-auto opacity-40" />
                      <div className="space-y-1">
                        <p className="font-black uppercase text-sm italic">No Scheduled Matches</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Join a circuit to start your campaign</p>
                      </div>
                      <Button onClick={() => navigate('/tournaments')} variant="outline" className="w-full rounded-2xl h-12 border-white/10 font-black text-[10px] tracking-widest uppercase">Browse Circuits</Button>
                   </div>
                </section>

                {/* 4. QUICK ACTIONS */}
                <section className="grid grid-cols-2 gap-4">
                   <Link to="/live-match/create" className="bg-muted/50 border border-white/5 p-6 rounded-[2rem] flex flex-col gap-4 active:scale-95 transition-all">
                      <div className="h-10 w-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                         <Plus className="h-5 w-5" />
                      </div>
                      <p className="text-xs font-black uppercase tracking-widest italic leading-tight">Quick<br/>Match</p>
                   </Link>
                   <Link to="/tournaments/create" className="bg-muted/50 border border-white/5 p-6 rounded-[2rem] flex flex-col gap-4 active:scale-95 transition-all">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                         <Trophy className="h-5 w-5" />
                      </div>
                      <p className="text-xs font-black uppercase tracking-widest italic leading-tight">Start<br/>Circuit</p>
                   </Link>
                </section>

                {/* 5. LIVE MATCHES */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Live Intelligence</h3>
                    <Link to="/live-match/active" className="text-[9px] font-black text-primary uppercase">View All</Link>
                  </div>
                  {matches.length > 0 ? (
                    <div className="space-y-4">
                      {matches.slice(0, 2).map((match, i) => (
                        <Link to={`/broadcast/${match.id}`} key={i}>
                          <div className="bg-card p-6 rounded-[2.5rem] border border-white/5 space-y-4 relative overflow-hidden group active:scale-[0.98] transition-all">
                            <div className="flex justify-between items-center relative z-10">
                               <Badge className="bg-secondary text-white font-black text-[8px] tracking-widest px-3 h-5 border-none animate-pulse">LIVE</Badge>
                               <div className="flex items-center gap-1">
                                  <Radio className="h-3 w-3 text-red-500" />
                                  <span className="text-[8px] font-black text-muted-foreground uppercase">Court {match.court || "01"}</span>
                               </div>
                            </div>
                            <div className="flex justify-between items-center relative z-10">
                               <div className="space-y-1">
                                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{match.name}</p>
                                  <p className="font-black uppercase italic text-lg leading-tight">Live Protocol Active</p>
                               </div>
                               <span className="text-4xl font-black font-mono text-primary tabular-nums tracking-tighter">
                                  {match.current_score ? `${match.current_score[0]}-${match.current_score[1]}` : "0-0"}
                               </span>
                            </div>
                            <div className="absolute right-0 bottom-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                               <Activity className="h-20 w-20" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 bg-muted/20 border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center gap-3">
                       <Radio className="h-8 w-8 text-muted-foreground/30" />
                       <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Scanning for active nodes...</p>
                    </div>
                  )}
                </section>

                {/* 6. RANKINGS PREVIEW */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">The Ladder</h3>
                    <Link to="/rankings" className="text-[9px] font-black text-primary uppercase">Full List</Link>
                  </div>
                  <div className="bg-card rounded-[2.5rem] border border-white/5 overflow-hidden">
                    {[1, 2, 3].map((r) => (
                      <div key={r} className="p-4 flex items-center justify-between border-b border-white/5 last:border-none">
                         <div className="flex items-center gap-4">
                            <span className="text-xs font-black text-muted-foreground w-4">#{r}</span>
                            <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-primary text-[10px] font-black">?</div>
                            <div>
                               <p className="text-[10px] font-black uppercase tracking-widest italic">Awaiting Athlete</p>
                               <p className="text-[8px] font-bold text-muted-foreground uppercase">-- Points</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <TrendingUp className="h-3 w-3 text-secondary opacity-40 ml-auto" />
                         </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 7. TOURNAMENT CARDS */}
                <section className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Active Circuits</h3>
                    <Link to="/tournaments" className="text-[9px] font-black text-primary uppercase">Explore</Link>
                  </div>
                  {tournaments.length > 0 ? (
                    <div className="space-y-4">
                      {tournaments.slice(0, 3).map((t, i) => (
                        <Link to={`/tournament/${t.id}`} key={i}>
                          <div className="bg-card border border-white/5 p-5 rounded-[2.5rem] flex items-center gap-4 active:scale-[0.98] transition-all">
                             <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center shrink-0">
                                <Trophy className="h-6 w-6 text-primary" />
                             </div>
                             <div className="flex-1 space-y-1">
                                <h4 className="font-black uppercase text-sm italic leading-tight line-clamp-1">{t.name}</h4>
                                <div className="flex items-center gap-3 text-[8px] font-bold text-muted-foreground uppercase tracking-widest">
                                   <span className="flex items-center gap-1"><MapPin className="h-2 w-2 text-primary" /> {t.city}</span>
                                   <span className="flex items-center gap-1"><Target className="h-2 w-2 text-primary" /> {t.format}</span>
                                </div>
                             </div>
                             <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-10 bg-muted/10 border-2 border-dashed rounded-[2.5rem] text-center space-y-3">
                       <Trophy className="h-8 w-8 text-muted-foreground/30 mx-auto" />
                       <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic">No tournament circuits active</p>
                    </div>
                  )}
                </section>

                {/* 8. NEWS SECTION */}
                <section className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">Pulse News</h3>
                  <div className="bg-card rounded-[2.5rem] border border-white/5 overflow-hidden group cursor-pointer active:scale-[0.98] transition-all">
                     <div className="h-40 bg-muted relative overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          alt="News" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                        <Badge className="absolute top-4 left-4 bg-primary text-white border-none font-black text-[8px] tracking-widest">ANNOUNCEMENT</Badge>
                     </div>
                     <div className="p-6 space-y-2">
                        <h4 className="font-black text-lg uppercase italic leading-tight">Circuit 2025 Intelligence Update Launched</h4>
                        <p className="text-[10px] font-medium text-muted-foreground leading-relaxed">We are synchronizing 12 new nodes across Indian universities to provide better match analytics.</p>
                        <div className="flex items-center gap-2 pt-2">
                           <Zap className="h-3 w-3 text-primary fill-current" />
                           <span className="text-[9px] font-black text-primary uppercase">Read Dossier</span>
                        </div>
                     </div>
                  </div>
                </section>

              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Court;