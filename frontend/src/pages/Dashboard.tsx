import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { 
  Activity, Trophy, Zap, 
  ArrowUpRight,
  LayoutDashboard, 
  MapPin, Target,
  TrendingUp, Radio, Search as SearchIcon, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MatchAPI, TournamentAPI } from '@/services/api';
import { useSocketEvent } from '@/hooks/use-socket';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [liveMatches, setLiveMatches]   = useState<any[]>([]);
  const [tournaments, setTournaments]   = useState<any[]>([]);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    Promise.all([MatchAPI.getAll('live'), TournamentAPI.getAll()])
      .then(([matches, tourneys]) => {
        setLiveMatches(matches);
        setTournaments(tourneys);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Real-time score updates on dashboard cards
  useSocketEvent('feed:score_update', (payload) => {
    setLiveMatches(prev => prev.map(m =>
      (m._id || m.id) === payload.matchId
        ? { ...m, current_score: payload.current_score, status: payload.status }
        : m
    ));
  });

  useSocketEvent('feed:match_created', (match) => {
    setLiveMatches(prev => {
      if (prev.find(m => (m._id || m.id) === (match._id || match.id))) return prev;
      return [match, ...prev];
    });
  });

  useSocketEvent('feed:match_started', (match) => {
    setLiveMatches(prev => {
      if (prev.find(m => (m._id || m.id) === (match._id || match.id))) {
        return prev.map(m => (m._id || m.id) === (match._id || match.id) ? { ...m, status: 'live' } : m);
      }
      return [match, ...prev];
    });
  });

  useSocketEvent('feed:match_completed', (match) => {
    setLiveMatches(prev => prev.filter(m => (m._id || m.id) !== String(match._id)));
  });

  const getP1 = (m: any) => m.players?.p1?.name || m.players?.sideA?.[0]?.name || 'Player A';
  const getP2 = (m: any) => m.players?.p2?.name || m.players?.sideB?.[0]?.name || 'Player B';
  const getScore = (m: any) => m.current_score ? `${m.current_score[0]}-${m.current_score[1]}` : '0-0';

  const filteredMatches = useMemo(() =>
    liveMatches.filter(m =>
      getP1(m).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getP2(m).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery, liveMatches]);

  const filteredTournaments = useMemo(() =>
    tournaments.filter(t =>
      (t.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.city || '').toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery, tournaments]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container px-6 py-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4 text-sky-500" />
              <span className="text-[10px] font-black text-sky-600 uppercase tracking-[0.3em]">Operational Dashboard</span>
            </div>
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter uppercase italic">Command Center</h1>
          </div>
          
          <div className="relative w-full md:w-96">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Search Players, Tournaments, or Smash ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 bg-white border-slate-200 rounded-[2rem] font-bold focus:border-sky-500 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-panel p-10 rounded-[3rem] space-y-8 border-sky-500/10 shadow-sky-500/5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3 italic">
                  <Activity className="h-5 w-5 text-red-500 animate-pulse" /> Live Match Feed
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {loading ? (
                  <div className="col-span-2 py-12 flex justify-center"><Loader2 className="animate-spin text-sky-500 h-7 w-7" /></div>
                ) : filteredMatches.length > 0 ? filteredMatches.map((match, i) => (
                  <div key={match._id || match.id || i} className="bg-slate-50 border border-slate-100 p-6 rounded-3xl hover:border-sky-500/30 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{match.name || 'Match'}</p>
                      <div className="flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[8px] font-black text-red-400 uppercase">Live</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-black text-[#0B1F3A] group-hover:text-sky-600 transition-colors">{getP1(match)}</p>
                        <p className="font-black text-[#0B1F3A] group-hover:text-sky-600 transition-colors">{getP2(match)}</p>
                      </div>
                      <span className="text-xl font-mono font-black text-sky-600 group-hover:scale-110 transition-transform">{getScore(match)}</span>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-2 py-12 text-center bg-slate-100/50 rounded-3xl border-2 border-dashed border-slate-200">
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No live matches right now</p>
                  </div>
                )}
              </div>
            </div>

            <div className="glass-panel p-10 rounded-[3rem] space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-sky-500" /> Live Global Tournaments
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ongoing high-stakes events</p>
                </div>
              </div>

              <div className="space-y-4">
                {filteredTournaments.length > 0 ? filteredTournaments.map((tourney, i) => (
                  <motion.div 
                    key={tourney._id || tourney.id || i}
                    whileHover={{ x: 5 }}
                    className="flex flex-col md:flex-row items-center justify-between p-6 rounded-[2rem] border border-slate-100 bg-slate-50 group transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-6">
                      <div className="h-14 w-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-sky-500 shadow-sm group-hover:bg-[#0B1F3A] group-hover:text-white transition-all">
                        <Trophy className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-[#0B1F3A] mb-1">{tourney.name}</h4>
                        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {tourney.city || tourney.loc || '—'}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="icon" className="h-12 w-12 rounded-2xl bg-white border border-slate-100 text-[#0B1F3A] hover:bg-sky-50 transition-all shadow-sm mt-4 md:mt-0">
                      <ArrowUpRight className="h-5 w-5" />
                    </Button>
                  </motion.div>
                )) : (
                  <div className="py-12 text-center bg-slate-100/50 rounded-3xl border-2 border-dashed border-slate-200">
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No tournaments found</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0B1F3A] p-10 rounded-[3rem] text-white space-y-6 relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:rotate-12 transition-transform">
                <Radio className="h-40 w-40" />
              </div>
              <div className="space-y-4 relative z-10">
                <Badge className="bg-sky-500 text-white border-none font-black px-4 py-1 text-[10px]">STUDIO READY</Badge>
                <h3 className="text-2xl font-black tracking-tight italic">Broadcast Studio</h3>
                <Link to="/broadcast/create" className="block pt-4">
                  <Button className="w-full h-14 bg-white text-[#0B1F3A] font-black rounded-2xl hover:bg-sky-500 hover:text-white transition-all shadow-xl border-none">
                    LAUNCH STUDIO <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="glass-panel p-10 rounded-[3rem] space-y-6">
              <h3 className="text-sm font-black text-[#0B1F3A] uppercase tracking-widest flex items-center gap-2">
                <Target className="h-4 w-4 text-sky-500" /> Personal Intelligence
              </h3>
              <div className="space-y-6">
                 {[
                   { label: "Win Rate", val: "88.4%", icon: TrendingUp, color: "text-green-500" },
                   { label: "Matches Today", val: "4", icon: Activity, color: "text-sky-500" },
                 ].map((stat, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <stat.icon className={cn("h-4 w-4", stat.color)} />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                      </div>
                      <span className="text-lg font-black text-[#0B1F3A]">{stat.val}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;