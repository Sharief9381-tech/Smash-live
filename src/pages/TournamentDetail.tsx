"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import BracketNode from '@/components/tournament/BracketNode';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, Calendar, Users, MapPin, 
  Share2, ListFilter, Play, ChevronLeft,
  Clock, Timer, Activity, Globe, Info
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';

const TournamentDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A]">
      <Navbar />
      
      {/* Hero Header */}
      <div className="relative h-[450px] w-full overflow-hidden bg-[#0B1F3A]">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/60 to-transparent z-10" />
        
        <img 
          src="https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-40 scale-105"
          alt="Badminton court"
        />
        
        {/* Back Button */}
        <div className="absolute top-8 left-8 z-30">
          <Button 
            onClick={() => navigate('/tournaments')}
            variant="ghost" 
            className="group bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl px-6 h-12 hover:bg-white hover:text-[#0B1F3A] transition-all"
          >
            <ChevronLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-black uppercase tracking-widest text-[10px]">Back to Circuit</span>
          </Button>
        </div>

        <div className="container relative z-20 h-full flex flex-col justify-end pb-12 px-6">
          <div className="flex flex-col lg:grid lg:grid-cols-12 items-end gap-12">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-red-500 text-white font-black animate-pulse px-6 h-8 rounded-full border-none shadow-[0_0_20px_rgba(239,68,68,0.4)]">LIVE NOW</Badge>
                <Badge className="bg-sky-500 text-white font-black px-6 h-8 rounded-full border-none shadow-[0_0_20px_rgba(14,165,233,0.4)]">MAJOR EVENT</Badge>
                <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <Globe className="h-3 w-3 text-sky-400" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Global Broadcast Active</span>
                </div>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-white leading-[0.85]">
                BWF WORLD TOUR <br />
                <span className="text-sky-500 drop-shadow-[0_0_30px_rgba(14,165,233,0.3)]">FINALS 2024</span>
              </h1>
              
              <div className="flex flex-wrap items-center gap-8 text-xs text-white/70 font-black uppercase tracking-[0.2em]">
                <span className="flex items-center gap-2.5 bg-white/5 px-4 py-2 rounded-xl border border-white/10"><Calendar className="h-4 w-4 text-sky-500" /> Dec 12 - 18, 2024</span>
                <span className="flex items-center gap-2.5 bg-white/5 px-4 py-2 rounded-xl border border-white/10"><MapPin className="h-4 w-4 text-sky-500" /> Jakarta, Indonesia</span>
                <span className="flex items-center gap-2.5 bg-white/5 px-4 py-2 rounded-xl border border-white/10"><Users className="h-4 w-4 text-sky-500" /> 32 Pro Players</span>
              </div>
            </div>
            
            <div className="lg:col-span-4 flex w-full lg:justify-end gap-4">
              <Link to="/broadcast/live-active" className="flex-1 lg:flex-none">
                <Button size="lg" className="w-full lg:w-auto bg-white text-[#0B1F3A] font-black px-10 h-20 rounded-[2rem] shadow-2xl hover:bg-sky-500 hover:text-white transition-all group">
                  WATCH INTEL <Play className="ml-3 h-6 w-6 fill-current group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
              <Button size="icon" variant="outline" className="h-20 w-20 rounded-[2rem] border-white/20 text-white hover:bg-white/10 backdrop-blur-md">
                <Share2 className="h-7 w-7" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="container px-6 py-16">
        <Tabs defaultValue="bracket" className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-200 pb-8">
            <TabsList className="bg-slate-100 p-1.5 rounded-[2rem] border border-slate-200">
              <TabsTrigger value="bracket" className="rounded-[1.5rem] px-10 h-12 data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white font-black text-xs uppercase tracking-widest transition-all shadow-sm">BRACKETS</TabsTrigger>
              <TabsTrigger value="matches" className="rounded-[1.5rem] px-10 h-12 data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white font-black text-xs uppercase tracking-widest transition-all">MATCHES</TabsTrigger>
              <TabsTrigger value="players" className="rounded-[1.5rem] px-10 h-12 data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white font-black text-xs uppercase tracking-widest transition-all">PLAYERS</TabsTrigger>
              <TabsTrigger value="standings" className="rounded-[1.5rem] px-10 h-12 data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white font-black text-xs uppercase tracking-widest transition-all">STANDINGS</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-4">
              <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-black text-[10px] uppercase tracking-widest bg-white hover:bg-slate-50">
                <Info className="mr-2 h-4 w-4 text-sky-500" /> Rules & Seeding
              </Button>
              <Button className="h-14 px-8 rounded-2xl bg-[#0B1F3A] text-white font-black text-[10px] uppercase tracking-widest shadow-xl">
                <ListFilter className="mr-2 h-4 w-4" /> Category Filter
              </Button>
            </div>
          </div>

          <TabsContent value="bracket" className="m-0 focus-visible:ring-0">
            <div className="flex overflow-x-auto pb-12 gap-16 min-h-[600px] scrollbar-hide pt-4">
              {/* Quarter Finals */}
              <div className="space-y-12 flex-shrink-0">
                <div className="flex items-center gap-4 px-2">
                   <div className="h-10 w-1 bg-sky-500 rounded-full" />
                   <div>
                    <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">Quarter Finals</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Synchronized Circuit</p>
                   </div>
                </div>
                <div className="space-y-8">
                  <BracketNode match={{ id: '1', team1: 'Viktor Axelsen', team2: 'Lee Zii Jia', score1: 2, score2: 0, winner: 1, status: 'completed' }} />
                  <BracketNode match={{ id: '2', team1: 'Shi Yuqi', team2: 'Anders Antonsen', score1: 1, score2: 2, winner: 2, status: 'completed' }} />
                  <div className="cursor-pointer" onClick={() => navigate('/broadcast/live-active')}>
                    <BracketNode match={{ id: '3', team1: 'Jonatan Christie', team2: 'Kunlavut Vitidsarn', status: 'live' }} />
                  </div>
                  <BracketNode match={{ id: '4', team1: 'Loh Kean Yew', team2: 'Anthony Ginting', time: '18:30', status: 'scheduled' }} />
                </div>
              </div>

              {/* Semi Finals */}
              <div className="space-y-12 pt-28 flex-shrink-0">
                <div className="flex items-center gap-4 px-2">
                   <div className="h-10 w-1 bg-sky-500 rounded-full" />
                   <div>
                    <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">Semi Finals</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Seed Path</p>
                   </div>
                </div>
                <div className="space-y-48">
                  <BracketNode match={{ id: '5', team1: 'Viktor Axelsen', team2: 'Anders Antonsen', time: 'TOMORROW', status: 'scheduled' }} />
                  <div className="h-28 w-[240px] border-2 border-dashed border-slate-200 bg-white/50 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-6 space-y-2">
                    <Activity className="h-6 w-6 text-slate-300 animate-pulse" />
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Awaiting Winner QF 3 & 4</p>
                  </div>
                </div>
              </div>

              {/* Grand Final */}
              <div className="space-y-12 pt-64 flex-shrink-0">
                 <div className="flex items-center gap-4 px-2">
                   <div className="h-10 w-1 bg-amber-500 rounded-full" />
                   <div>
                    <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">The Grand Final</h3>
                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">World Championship Title</p>
                   </div>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-sky-500 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition-all" />
                  <div className="relative h-36 w-[280px] border-2 border-dashed border-sky-500/20 bg-white rounded-[3rem] flex flex-col items-center justify-center gap-3 p-8 group-hover:border-sky-500/50 transition-all cursor-pointer">
                    <Trophy className="h-8 w-8 text-amber-500 drop-shadow-lg" />
                    <div className="text-center">
                      <p className="text-[10px] font-black text-[#0B1F3A] uppercase tracking-widest">Championship Feed</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Synchronizing Dec 18, 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Other tabs content (Players, Standings) would go here with similar high-quality styling */}
        </Tabs>
      </main>
    </div>
  );
};

export default TournamentDetail;