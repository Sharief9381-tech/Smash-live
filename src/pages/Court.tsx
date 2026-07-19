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
        // Fetch Matches
        const { data: activeMatches } = await supabase.from('matches').select('*').eq('status', 'live');
        // Fetch Tournaments
        const { data: activeTourneys } = await supabase.from('tournaments').select('*').neq('status', 'Completed');
        // Fetch Athletes
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

    const matchedMatches = matches
      .filter(m => m.name?.toLowerCase().includes(lowerQuery))
      .map(m => ({ ...m, resultType: 'Match', path: `/broadcast/${m.id}` }));

    const matchedTourneys = tournaments
      .filter(t => t.name?.toLowerCase().includes(lowerQuery) || t.city?.toLowerCase().includes(lowerQuery))
      .map(t => ({ ...t, resultType: 'Tournament', path: `/tournament/${t.id}` }));

    const matchedAthletes = athletes
      .filter(a => a.name?.toLowerCase().includes(lowerQuery) || a.smash_id?.toLowerCase().includes(lowerQuery) || a.smashId?.toLowerCase().includes(lowerQuery))
      .map(a => ({ ...a, resultType: 'Player', path: `/player/me` })); // Simplified path for demo

    return [...matchedMatches, ...matchedTourneys, ...matchedAthletes];
  }, [searchQuery, matches, tournaments, athletes]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (!val) {
       searchParams.delete('q');
       setSearchParams(searchParams);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container px-6 py-12 space-y-12 min-h-[70vh]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-sky-500 fill-current" />
              <span className="text-[10px] font-black text-sky-600 uppercase tracking-[0.3em]">Operational Command Center</span>
            </div>
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-none">THE COURT</h1>
          </div>
          
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Search Global Intelligence..." 
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="h-14 pl-12 bg-white border-slate-200 rounded-[2rem] font-bold focus:border-sky-500 transition-all shadow-sm"
            />
          </form>
        </div>

        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-10 w-10 text-sky-500 animate-spin" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Querying Cloud Circuit...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* SEARCH RESULTS VIEW */}
            <AnimatePresence mode="wait">
              {globalResults !== null ? (
                <motion.section 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                    <h2 className="text-2xl font-black text-[#0B1F3A] uppercase italic">Intelligence Results</h2>
                    <Badge className="bg-[#0B1F3A] text-white px-4 h-7 border-none">{globalResults.length} FOUND</Badge>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {globalResults.length > 0 ? globalResults.map((item, i) => (
                      <Link to={item.path} key={i}>
                        <motion.div 
                          whileHover={{ y: -5 }}
                          className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl hover:border-sky-500 transition-all group relative overflow-hidden"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <span className="text-[9px] font-black text-sky-500 uppercase tracking-[0.2em]">{item.resultType}:</span>
                            <ChevronRight className="h-4 w-4 text-slate-200 group-hover:text-sky-500 transition-colors" />
                          </div>
                          <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic leading-tight mb-2">{item.name}</h3>
                          <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            {item.resultType === 'Player' ? <User className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                            {item.city || item.state || "Active Node"}
                          </div>
                          {item.current_score && (
                             <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2">
                                <Radio className="h-3 w-3 text-red-500 animate-pulse" />
                                <span className="font-mono font-black text-sky-600 text-lg">{item.current_score[0]}-{item.current_score[1]}</span>
                             </div>
                          )}
                        </motion.div>
                      </Link>
                    )) : (
                      <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed">
                        <p className="text-sm font-black text-slate-300 uppercase tracking-widest">No matching intelligence dossiers found</p>
                      </div>
                    )}
                  </div>
                </motion.section>
              ) : (
                /* DEFAULT DASHBOARD VIEW (Only shows when search is empty) */
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 space-y-8">
                    <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 bg-white border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                        <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3 italic">
                          <Activity className="h-5 w-5 text-red-500 animate-pulse" /> Live Feed
                        </h3>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {matches.length > 0 ? matches.slice(0, 4).map((match, i) => (
                          <Link to={`/broadcast/${match.id}`} key={i} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 hover:border-sky-500/30 transition-all group">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">{match.name}</p>
                            <div className="flex justify-between items-center">
                                <span className="font-black text-[#0B1F3A] text-lg uppercase italic">Live Protocol</span>
                                <span className="text-2xl font-mono font-black text-sky-600">{match.current_score ? `${match.current_score[0]}-${match.current_score[1]}` : "0-0"}</span>
                            </div>
                          </Link>
                        )) : (
                          <div className="col-span-2 py-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">No active match nodes detected</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 bg-white border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                        <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3 italic">
                          <Trophy className="h-5 w-5 text-sky-500" /> Active Circuits
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {tournaments.length > 0 ? tournaments.slice(0, 3).map((tourney, i) => (
                          <Link to={`/tournament/${tourney.id}`} key={i} className="flex items-center justify-between p-8 rounded-[2.5rem] border border-slate-100 bg-white hover:border-sky-500/40 transition-all shadow-sm">
                            <div className="flex items-center gap-6">
                              <div className="h-12 w-12 rounded-2xl bg-[#0B1F3A] text-sky-400 flex items-center justify-center">
                                <Trophy className="h-6 w-6" />
                              </div>
                              <div>
                                <h4 className="font-black text-xl text-[#0B1F3A] uppercase italic">{tourney.name}</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tourney.city} • {tourney.format}</p>
                              </div>
                            </div>
                            <Badge className="bg-sky-500 text-white font-black px-4">{tourney.status}</Badge>
                          </Link>
                        )) : (
                        <div className="py-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 w-full">
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">No tournament circuits active</p>
                        </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-8">
                    <div className="bg-[#0B1F3A] p-10 rounded-[3.5rem] text-white space-y-8 relative overflow-hidden group shadow-2xl">
                      <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                        <Radio className="h-40 w-40" />
                      </div>
                      <div className="space-y-6 relative z-10">
                        <Badge className="bg-sky-500 text-white border-none font-black px-6 py-1 text-[10px]">STUDIO READY</Badge>
                        <h3 className="text-3xl font-black tracking-tighter italic uppercase leading-tight">Broadcast <br /> Studio</h3>
                        <Link to="/broadcast/center" className="block pt-4">
                          <Button className="w-full h-16 bg-white text-[#0B1F3A] font-black rounded-2xl hover:bg-sky-500 hover:text-white shadow-xl transition-all">
                            LAUNCH STUDIO
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
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