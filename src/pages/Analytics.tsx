"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { 
  BarChart3, Activity, Target, Zap, 
  TrendingUp, Users, Calendar, ArrowUpRight,
  Globe, ShieldCheck, Flame, PieChart
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, 
  Cell, LineChart, Line 
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const performanceData = [
  { month: 'Jan', score: 8200 },
  { month: 'Feb', score: 7500 },
  { month: 'Mar', score: 9100 },
  { month: 'Apr', score: 8800 },
  { month: 'May', score: 10200 },
  { month: 'Jun', score: 12500 },
  { month: 'Jul', score: 11000 },
];

const smashSpeedData = [
  { player: 'Axelsen', speed: 410 },
  { player: 'Zii Jia', speed: 405 },
  { player: 'Shi Yuqi', speed: 395 },
  { player: 'Christie', speed: 388 },
  { player: 'Ginting', speed: 382 },
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container px-6 py-16 space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-sky-500" />
              <span className="text-xs font-black text-sky-600 uppercase tracking-[0.3em]">Intelligence & Insights</span>
            </div>
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter">Performance Analytics</h1>
            <p className="text-slate-500 font-medium">Detailed tracking of global badminton performance metrics and tournament trends.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="h-12 rounded-xl border-slate-200 font-bold px-6">
              Download Report
            </Button>
            <Button className="bg-[#0B1F3A] text-white hover:bg-[#0B1F3A]/90 h-12 rounded-xl font-bold px-8 shadow-xl">
              Compare Players
            </Button>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Active Pro Matches", val: "1,248", icon: Activity, change: "+12.5%", up: true },
            { label: "Total Data Points", val: "84.2M", icon: Zap, change: "+5.2%", up: true },
            { label: "Global Viewer Reach", val: "12.8M", icon: Users, change: "+24%", up: true },
            { label: "AI Prediction Accuracy", val: "94.2%", icon: ShieldCheck, change: "-0.5%", up: false },
          ].map((kpi, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="glass-panel p-6 rounded-[2rem] space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-[#0B1F3A]/5 flex items-center justify-center text-[#0B1F3A]">
                  <kpi.icon className="h-5 w-5" />
                </div>
                <Badge className={kpi.up ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
                  {kpi.change}
                </Badge>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{kpi.label}</p>
                <h3 className="text-3xl font-black text-[#0B1F3A] tracking-tighter">{kpi.val}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Growth Chart */}
          <div className="lg:col-span-2 glass-panel p-10 rounded-[3rem] space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-[#0B1F3A]">Circuit Activity Trends</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Monthly match volume vs viewer engagement</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-lg text-[10px] font-black h-8">MATCHES</Button>
                <Button size="sm" className="bg-sky-500 text-white rounded-lg text-[10px] font-black h-8">VIEWERS</Button>
              </div>
            </div>
            
            <div className="h-[300px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#0ea5e9', fontWeight: 'bold', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Smash Speed Leaderboard */}
          <div className="glass-panel p-10 rounded-[3rem] space-y-8">
            <div>
              <h3 className="text-xl font-black text-[#0B1F3A]">Top Smash Speeds</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Peak performance (km/h)</p>
            </div>
            
            <div className="space-y-6">
              {smashSpeedData.map((s, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black text-[#0B1F3A] uppercase tracking-tighter">{s.player}</span>
                    <span className="text-sm font-black text-sky-600">{s.speed} <span className="text-[10px] text-slate-400">KM/H</span></span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(s.speed / 420) * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-sky-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-100">
              <div className="bg-sky-500/5 rounded-2xl p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-sky-500 text-white flex items-center justify-center">
                  <Flame className="h-5 w-5 fill-current" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-sky-600 uppercase tracking-widest">New Record</p>
                  <p className="text-xs font-bold text-[#0B1F3A]">Axelsen hit 410km/h in BWF Finals</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Distribution */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-panel p-10 rounded-[3rem] space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <Globe className="h-60 w-60 text-sky-500" />
            </div>
            <div className="space-y-2 relative z-10">
              <h3 className="text-2xl font-black text-[#0B1F3A]">Global Reach</h3>
              <p className="text-slate-500 font-medium">Player density and viewer engagement across continents.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 relative z-10">
              {[
                { label: "Asia-Pacific", val: "62%", color: "bg-sky-500" },
                { label: "Europe", val: "24%", color: "bg-[#0B1F3A]" },
                { label: "Americas", val: "8%", color: "bg-slate-400" },
                { label: "Other", val: "6%", color: "bg-slate-200" },
              ].map((region, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-2 w-2 rounded-full", region.color)} />
                    <span className="text-xs font-black text-[#0B1F3A] uppercase tracking-widest">{region.label}</span>
                  </div>
                  <p className="text-2xl font-black text-[#0B1F3A]">{region.val}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-10 rounded-[3rem] flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Activity className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-[#0B1F3A] tracking-tighter">AI Prediction Pulse</h3>
                <p className="text-slate-500 font-medium">Our neural network analyzes over 12,000 match scenarios per second to provide real-time win probability.</p>
              </div>
            </div>
            <div className="pt-8">
              <Button className="bg-[#0B1F3A] text-white rounded-full px-8 font-black h-14 group-hover:translate-x-2 transition-transform">
                View Scenarios <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;