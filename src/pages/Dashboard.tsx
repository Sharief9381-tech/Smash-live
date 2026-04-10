"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StatCard from '@/components/dashboard/StatCard';
import { motion } from 'framer-motion';
import { 
  Activity, Trophy, Target, Zap, 
  TrendingUp, Calendar, ArrowUpRight,
  Play, Users, Star, History
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
      
      <main className="container px-6 py-12 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-[#0B1F3A] tracking-tighter">Welcome Back, Player</h1>
            <p className="text-slate-500 font-medium italic uppercase tracking-widest text-[10px]">Intelligence Sync Active • Last Update: 2m ago</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="h-12 rounded-2xl border-slate-200 font-bold px-6">
              View Profile
            </Button>
            <Button className="bg-[#0B1F3A] text-white hover:bg-[#0B1F3A]/90 h-12 rounded-2xl font-bold px-8 shadow-xl">
              Start Match <Play className="ml-2 h-4 w-4 fill-current" />
            </Button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Matches Played" value="142" icon={Activity} trend="+12" trendUp={true} />
          <StatCard title="Win Rate" value="78.4%" icon={Trophy} trend="+2.1%" trendUp={true} />
          <StatCard title="World Ranking" value="#4,210" icon={Star} trend="-140" trendUp={true} />
          <StatCard title="Avg. Smash" value="382" icon={Zap} trend="+12km/h" trendUp={true} />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Performance Chart */}
          <div className="lg:col-span-2 glass-panel p-10 rounded-[3rem] space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3 italic">
                <TrendingUp className="h-5 w-5 text-sky-500" /> Performance Momentum
              </h3>
              <Badge variant="outline" className="border-slate-200">Last 7 Days</Badge>
            </div>
            
            <div className="h-[300px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#0ea5e9', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="glass-panel p-10 rounded-[3rem] space-y-8">
            <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3 italic">
              <History className="h-5 w-5 text-sky-500" /> Recent Activity
            </h3>
            
            <div className="space-y-6">
              {[
                { title: "Match Victory", detail: "vs. Alex Chen • 21-18, 21-14", time: "2h ago", icon: Trophy, color: "text-green-500" },
                { title: "Smash Record", detail: "New peak: 402 km/h", time: "Yesterday", icon: Zap, color: "text-yellow-500" },
                { title: "Tournament Join", detail: "Jakarta Open 2024", time: "2 days ago", icon: Target, color: "text-sky-500" },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className={`h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 ${activity.color} group-hover:bg-[#0B1F3A] group-hover:text-white transition-colors`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-black text-[#0B1F3A]">{activity.title}</p>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{activity.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{activity.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="ghost" className="w-full text-sky-600 font-black text-xs uppercase tracking-widest hover:bg-sky-50 transition-colors">
              View All History <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;