"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  History, Radio, ChevronRight, Play, 
  Activity, Users, MapPin, Zap, ArrowRight,
  TrendingUp, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LiveMatch = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container px-6 py-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">Active Intelligence</span>
            </div>
            <h1 className="text-4xl font-black text-[#0B1F3A] tracking-tighter">Live Match Dashboard</h1>
            <p className="text-slate-500 font-bold">Monitor real-time court activity or launch your own broadcast stream.</p>
          </div>
          
          <div className="flex gap-4">
             <Button variant="outline" className="h-12 border-slate-200 rounded-xl font-black text-xs px-6 uppercase text-[#0B1F3A]">
               <History className="mr-2 h-4 w-4" /> REPLAY VAULT
             </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Dashboard Feed */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 border-sky-500/10 shadow-2xl shadow-sky-500/5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3 italic">
                  <Activity className="h-5 w-5 text-red-500" /> Active Global Courts
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  { p1: "Viktor Axelsen", p2: "Lee Zii Jia", score: "21-19, 14-11", tournament: "BWF Finals", viewers: "12.4k", status: "Live" },
                  { p1: "An Se-young", p2: "Tai Tzu-ying", score: "21-12, 18-15", tournament: "Jakarta Open", viewers: "8.2k", status: "Live" },
                  { p1: "Jonatan Christie", p2: "Anthony Ginting", score: "0-0", tournament: "Indonesia Master", viewers: "3.1k", status: "Warm-up" },
                ].map((match, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-center justify-between p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-sky-500/30 transition-all group cursor-pointer">
                    <div className="flex items-center gap-8">
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{match.tournament}</p>
                          <div className="flex items-center gap-4">
                             <div className="font-black text-xl text-[#0B1F3A]">{match.p1} <span className="text-sky-500">vs</span> {match.p2}</div>
                          </div>
                          <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase">
                             <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {match.viewers} watching</span>
                             <span className="h-1 w-1 bg-slate-200 rounded-full" />
                             <span className="flex items-center gap-1 text-red-500"><Globe className="h-3 w-3" /> {match.status}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-8 mt-6 md:mt-0">
                       <span className="text-3xl font-mono font-black text-sky-600 tabular-nums">{match.score}</span>
                       <Link to="/broadcast/live">
                        <Button className="h-14 w-14 rounded-2xl bg-[#0B1F3A] text-white hover:bg-sky-500 transition-all shadow-xl group-hover:scale-105">
                           <Play className="h-6 w-6 fill-current" />
                        </Button>
                       </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Broadcast Studio Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0B1F3A] p-12 rounded-[4rem] text-white space-y-8 relative overflow-hidden group border border-white/5 shadow-2xl">
              <div className="absolute -right-20 -bottom-20 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                <Radio className="h-64 w-64" />
              </div>
              
              <div className="space-y-6 relative z-10">
                <div className="h-16 w-16 bg-sky-500 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.3)]">
                  <Radio className="h-8 w-8 text-white animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tighter italic leading-none">Broadcast <br /> Studio</h3>
                  <p className="text-white/60 text-sm font-bold leading-relaxed">Broadcast professional matches with ultra-low latency and AI overlays.</p>
                </div>
                <Link to="/broadcast/create">
                  <Button className="w-full h-16 bg-white text-[#0B1F3A] font-black rounded-2xl hover:bg-sky-500 hover:text-white transition-all shadow-xl border-none">
                    START STREAMING <Zap className="ml-2 h-5 w-5 fill-current" />
                  </Button>
                </Link>
              </div>
              
              <div className="pt-8 border-t border-white/10 relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Studio Metrics</span>
                  <Badge className="bg-sky-500/20 text-sky-400 border-none font-black text-[8px]">ACTIVE EDGE</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xl font-black">4K</p>
                    <p className="text-[8px] font-bold text-white/40 uppercase">MAX RES</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-black">42ms</p>
                    <p className="text-[8px] font-bold text-white/40 uppercase">LATENCY</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveMatch;