"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Trophy, Zap, 
  Search as SearchIcon, MapPin, Radio, Loader2, User, ChevronRight, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link, useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { supabase, isCloudConfigured } from '@/lib/supabase';

const Court = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || "";
  const [searchQuery, setSearchQuery] = useState(queryFromUrl);
  
  const [matches, setMatches] = useState<any[]>([]);
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [athletes, setAthletes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSearchQuery(queryFromUrl);
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
    <div className="min-h-screen bg-slate-50 pb-32">
      <Navbar />
      
      <main className="container px-4 py-8 space-y-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-sky-500 fill-current" />
              <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest">Command Center</span>
            </div>
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-none">THE COURT</h1>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); setSearchParams({ q: searchQuery }); }} className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Search Intelligence..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-16 pl-12 bg-white border-slate-200 rounded-3xl font-bold focus:border-sky-500 shadow-xl"
            />
          </form>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-10 w-10 text-sky-500 animate-spin" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Syncing Nodes...</p>
          </div>
        ) : (
          <div className="space-y-10">
            <AnimatePresence mode="wait">
              {globalResults !== null ? (
                <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <h2 className="text-xl font-black text-[#0B1F3A] uppercase italic">Results</h2>
                    <Badge className="bg-[#0B1F3A] text-white px-3 h-6 border-none">{globalResults.length}</Badge>
                  </div>

                  <div className="flex flex-col gap-4">
                    {globalResults.map((item, i) => (
                      <Link to={item.path} key={i}>
                        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-lg relative overflow-hidden">
                          <span className="text-[8px] font-black text-sky-500 uppercase tracking-widest block mb-2">{item.resultType}</span>
                          <h3 className="text-lg font-black text-[#0B1F3A] uppercase italic leading-tight">{item.name}</h3>
                          <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                            {item.city || item.state || "Remote Node"}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.section>
              ) : (
                <div className="flex flex-col gap-8">
                  {/* STUDIO CALLOUT */}
                  <div className="bg-[#0B1F3A] p-10 rounded-[3rem] text-white space-y-6 relative overflow-hidden shadow-2xl">
                    <Radio className="absolute -right-10 -bottom-10 h-40 w-40 opacity-10 rotate-12" />
                    <div className="relative z-10 space-y-6">
                      <Badge className="bg-sky-500 text-white font-black px-4 text-[9px]">STUDIO READY</Badge>
                      <h3 className="text-4xl font-black italic uppercase leading-none">Broadcast <br /> Studio</h3>
                      <Link to="/broadcast/center" className="block">
                        <Button className="w-full h-16 bg-white text-[#0B1F3A] font-black rounded-2xl hover:bg-sky-500 transition-all">LAUNCH STUDIO</Button>
                      </Link>
                    </div>
                  </div>

                  {/* LIVE FEED */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3 italic px-2">
                      <Activity className="h-5 w-5 text-red-500 animate-pulse" /> Live Feed
                    </h3>
                    <div className="flex flex-col gap-4">
                      {matches.length > 0 ? matches.slice(0, 3).map((match, i) => (
                        <Link to={`/broadcast/${match.id}`} key={i}>
                          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{match.name}</p>
                            <div className="flex justify-between items-center">
                                <span className="font-black text-[#0B1F3A] text-xl italic uppercase leading-none">Live Protocol</span>
                                <span className="text-3xl font-mono font-black text-sky-600">{match.current_score ? `${match.current_score[0]}-${match.current_score[1]}` : "0-0"}</span>
                            </div>
                          </div>
                        </Link>
                      )) : (
                        <div className="py-12 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem]">
                          <p className="text-[10px] font-black text-slate-400 uppercase">No Match Nodes Active</p>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* TOURNAMENTS */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3 italic px-2">
                      <Trophy className="h-5 w-5 text-sky-500" /> Active Circuits
                    </h3>
                    <div className="flex flex-col gap-4">
                      {tournaments.length > 0 ? tournaments.slice(0, 3).map((tourney, i) => (
                        <Link to={`/tournament/${tourney.id}`} key={i}>
                          <div className="flex items-center justify-between p-6 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm">
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-2xl bg-[#0B1F3A] text-sky-400 flex items-center justify-center">
                                <Trophy className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-black text-[#0B1F3A] italic uppercase">{tourney.name}</h4>
                                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{tourney.city}</p>
                              </div>
                            </div>
                            <Badge className="bg-sky-500 text-white font-black px-3">LIVE</Badge>
                          </div>
                        </Link>
                      )) : (
                        <div className="py-12 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem]">
                          <p className="text-[10px] font-black text-slate-400 uppercase">No Active Circuits</p>
                        </div>
                      )}
                    </div>
                  </section>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Court;