"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { 
  Activity, Trophy, Zap, 
  ArrowUpRight, Users, 
  History, Radio, LayoutDashboard, 
  ChevronRight, MapPin, Target,
  TrendingUp, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container px-6 py-12 space-y-12">
        {/* Header Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4 text-sky-500" />
            <span className="text-[10px] font-black text-sky-600 uppercase tracking-[0.3em]">Operational Dashboard</span>
          </div>
          <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter uppercase italic">Command Center</h1>
          <p className="text-slate-500 font-bold max-w-2xl">
            Precision management for elite competition. Streamline your broadcasting and tournament intelligence through one unified portal.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Live Events Hub */}
            <div className="glass-panel p-10 rounded-[3rem] space-y-8 border-sky-500/10 shadow-sky-500/5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3">
                  <Activity className="h-5 w-5 text-red-500 animate-pulse" /> Live Match Feed
                </h3>
                <Link to="/live-match/active">
                  <Button variant="ghost" className="text-sky-600 font-black text-xs uppercase tracking-widest hover:bg-sky-50">
                    Smash It <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { p1: "V. Axelsen", p2: "L. Zii Jia", score: "21-19, 14-11", tournament: "BWF Finals" },
                  { p1: "An Se-young", p2: "T. Tzu-ying", score: "21-12, 18-15", tournament: "Jakarta Open" },
                ].map((match, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 p-6 rounded-3xl hover:border-sky-500/30 transition-all cursor-pointer group">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{match.tournament}</p>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-black text-[#0B1F3A] group-hover:text-sky-600 transition-colors">{match.p1}</p>
                        <p className="font-black text-[#0B1F3A] group-hover:text-sky-600 transition-colors">{match.p2}</p>
                      </div>
                      <span className="text-xl font-mono font-black text-sky-600 group-hover:scale-110 transition-transform">{match.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Global Tournaments Hub */}
            <div className="glass-panel p-10 rounded-[3rem] space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-sky-500" /> Live Global Tournaments
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ongoing high-stakes events</p>
                </div>
                <Link to="/tournaments">
                  <Button variant="outline" className="rounded-xl border-slate-200 font-black text-xs px-6 h-10 text-[#0B1F3A] hover:bg-slate-50">
                    SMASH IT
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {[
                  { name: "BWF World Tour Finals", loc: "Jakarta, ID", status: "Live", players: 32, cat: "Major", points: "12,000", bg: "bg-sky-500/5" },
                  { name: "China Masters 2024", loc: "Shenzhen, CN", status: "Live", players: 64, cat: "Super 750", points: "9,200", bg: "bg-slate-50" },
                  { name: "European Championships", loc: "Saarbrücken, DE", status: "Break", players: 128, cat: "Continental", points: "7,000", bg: "bg-slate-50" },
                ].map((tourney, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 5 }}
                    className={`flex flex-col md:flex-row items-center justify-between p-6 rounded-[2rem] border border-slate-100 ${tourney.bg} group transition-all cursor-pointer`}
                  >
                    <div className="flex items-center gap-6">
                      <div className="h-14 w-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-sky-500 shadow-sm group-hover:border-sky-500 group-hover:bg-[#0B1F3A] group-hover:text-white transition-all">
                        <Trophy className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-black text-[#0B1F3A]">{tourney.name}</h4>
                          <Badge className={tourney.status === 'Live' ? 'bg-red-500 animate-pulse text-white font-black' : 'bg-slate-200 text-slate-600 font-black'}>
                            {tourney.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {tourney.loc}</span>
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {tourney.players} Players</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 mt-4 md:mt-0">
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prize Points</p>
                        <p className="text-lg font-black text-[#0B1F3A]">{tourney.points}</p>
                      </div>
                      <Button size="icon" className="h-12 w-12 rounded-2xl bg-white border border-slate-100 text-[#0B1F3A] hover:bg-sky-500 hover:text-white transition-all shadow-sm">
                        <ArrowUpRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0B1F3A] p-10 rounded-[3rem] text-white space-y-6 relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:rotate-12 transition-transform">
                <Radio className="h-40 w-40" />
              </div>
              <div className="space-y-4 relative z-10">
                <Badge className="bg-sky-500 text-white border-none font-black px-4 py-1 text-[10px]">STUDIO READY</Badge>
                <h3 className="text-2xl font-black tracking-tight italic">Broadcast Studio</h3>
                <p className="text-white/70 text-sm font-bold">Initialize 4K low-latency streams with live AI commentary overlays.</p>
                <Link to="/broadcast/create" className="block pt-4">
                  <Button className="w-full h-14 bg-white text-[#0B1F3A] font-black rounded-2xl hover:bg-sky-500 hover:text-white transition-all shadow-xl border-none">
                    LAUNCH STUDIO <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Personal Intelligence Panel */}
            <div className="glass-panel p-10 rounded-[3rem] space-y-6">
              <h3 className="text-sm font-black text-[#0B1F3A] uppercase tracking-widest flex items-center gap-2">
                <Target className="h-4 w-4 text-sky-500" /> Personal Intelligence
              </h3>
              <div className="space-y-6">
                 {[
                   { label: "Win Rate", val: "88.4%", icon: TrendingUp, color: "text-green-500" },
                   { label: "Matches Today", val: "4", icon: Activity, color: "text-sky-500" },
                   { label: "Circuit Points", val: "105.4k", icon: Trophy, color: "text-amber-500" },
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
              <Link to="/player/me">
                <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200 font-black text-xs uppercase hover:bg-slate-50 text-[#0B1F3A]">
                  VIEW FULL PERFORMANCE <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>

            {/* Global Reach Insights */}
            <div className="glass-panel p-10 rounded-[3rem] space-y-6 bg-gradient-to-br from-sky-500/5 to-transparent">
              <h3 className="text-sm font-black text-[#0B1F3A] uppercase tracking-widest flex items-center gap-2">
                <Globe className="h-4 w-4 text-sky-500" /> Global Pulse
              </h3>
              <div className="space-y-4">
                 <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                    <p className="text-[11px] font-bold text-[#0B1F3A] leading-tight italic">
                      "Axelsen's win probability has shifted to 92% following today's warm-up session."
                    </p>
                    <p className="text-[9px] text-slate-400 font-black mt-2 uppercase tracking-widest">AI Analyst • 12m ago</p>
                 </div>
                 <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                    <p className="text-[11px] font-bold text-[#0B1F3A] leading-tight">
                      New tournament registry open for Malaysia Open 2025.
                    </p>
                    <p className="text-[9px] text-slate-400 font-black mt-2 uppercase tracking-widest">Circuit News • 1h ago</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;