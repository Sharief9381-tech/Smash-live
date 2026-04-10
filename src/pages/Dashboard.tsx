"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StatCard from '@/components/dashboard/StatCard';
import { motion } from 'framer-motion';
import { 
  Activity, Trophy, Target, Zap, 
  TrendingUp, Calendar, ArrowUpRight,
  Play, Users, Star, History, Radio,
  Globe, LayoutDashboard, ChevronRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const performanceData = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 600 },
  { name: 'Wed', value: 500 },
  { name: 'Thu', value: 900 },
  { name: 'Fri', value: 700 },
  { name: 'Sat', value: 1100 },
  { name: 'Sun', value: 1300 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container px-6 py-12 space-y-10">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <LayoutDashboard className="h-4 w-4 text-sky-500" />
              <span className="text-[10px] font-black text-sky-600 uppercase tracking-[0.3em]">Command Center</span>
            </div>
            <h1 className="text-4xl font-black text-[#0B1F3A] tracking-tighter">Unified Intelligence Dashboard</h1>
            <p className="text-slate-500 font-medium italic uppercase tracking-widest text-[10px]">Connected to Global Edge Nodes • Last Sync: 12s ago</p>
          </div>
          <div className="flex gap-4">
            <Link to="/live-match/create">
              <Button size="lg" className="bg-[#0B1F3A] text-white hover:bg-[#0B1F3A]/90 h-14 rounded-2xl font-black px-8 shadow-xl">
                NEW MATCH <Play className="ml-2 h-4 w-4 fill-current" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Active Matches" value="24" icon={Activity} trend="Live" trendUp={true} />
          <StatCard title="Global Rank" value="#1,402" icon={Globe} trend="+12" trendUp={true} />
          <StatCard title="Studio Quality" value="4K" icon={Radio} trend="Stable" trendUp={true} />
          <StatCard title="Fan Reach" value="1.2M" icon={Users} trend="+5.2%" trendUp={true} />
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Live Events Hub */}
            <div className="glass-panel p-10 rounded-[3rem] space-y-8 border-sky-500/10 shadow-sky-500/5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3">
                  <Activity className="h-5 w-5 text-red-500 animate-pulse" /> Live Event Feed
                </h3>
                <Link to="/live-match/active">
                  <Button variant="ghost" className="text-sky-600 font-black text-xs uppercase tracking-widest">
                    View All Live <ChevronRight className="ml-1 h-4 w-4" />
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
                        <p className="font-black text-[#0B1F3A]">{match.p1}</p>
                        <p className="font-black text-[#0B1F3A]">{match.p2}</p>
                      </div>
                      <span className="text-xl font-mono font-black text-sky-600 group-hover:scale-110 transition-transform">{match.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Analytics */}
            <div className="glass-panel p-10 rounded-[3rem] space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-sky-500" /> Platform Growth
                </h3>
                <Badge variant="outline" className="border-slate-200">System Analytics</Badge>
              </div>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Side Panel: Studio & Quick Tools */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Broadcast Studio Card */}
            <div className="bg-[#0B1F3A] p-10 rounded-[3rem] text-white space-y-6 relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:rotate-12 transition-transform">
                <Radio className="h-40 w-40" />
              </div>
              <div className="space-y-4 relative z-10">
                <Badge className="bg-sky-500 text-white border-none font-black px-4">STUDIO READY</Badge>
                <h3 className="text-2xl font-black tracking-tight italic">Broadcast Studio</h3>
                <p className="text-white/60 text-sm font-medium">Initialize 4K low-latency streams with live AI commentary overlays.</p>
                <Link to="/broadcast/create" className="block pt-4">
                  <Button className="w-full h-14 bg-white text-[#0B1F3A] font-black rounded-2xl hover:bg-sky-500 hover:text-white transition-all">
                    LAUNCH STUDIO <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Tournament Quick Access */}
            <div className="glass-panel p-10 rounded-[3rem] space-y-6">
              <h3 className="text-sm font-black text-[#0B1F3A] uppercase tracking-widest flex items-center gap-2">
                <Trophy className="h-4 w-4 text-sky-500" /> Tournament Hub
              </h3>
              <div className="space-y-4">
                {[
                  { name: "BWF Finals 2024", date: "Dec 12", type: "Major" },
                  { name: "Jakarta Open", date: "Jan 07", type: "Pro" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-sky-500/30 transition-all cursor-pointer">
                    <div>
                      <p className="text-sm font-black text-[#0B1F3A]">{t.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.date}</p>
                    </div>
                    <Badge variant="outline" className="text-[8px] font-black border-slate-200">{t.type}</Badge>
                  </div>
                ))}
              </div>
              <Link to="/tournaments/create">
                <Button variant="outline" className="w-full h-12 rounded-xl border-dashed border-slate-300 font-black text-xs uppercase hover:bg-slate-50">
                  + REGISTER EVENT
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;