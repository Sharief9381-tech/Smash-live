"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import BroadcastActionCard from '@/components/broadcast/BroadcastActionCard';
import QuickControlPanel from '@/components/broadcast/QuickControlPanel';
import { motion } from 'framer-motion';
import { 
  Radio, Trophy, Target, Activity, 
  Users, MapPin, Calendar, Clock,
  ArrowUpRight, Play, Edit3, Square,
  Settings, Zap, Globe, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const BroadcastCenter = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 py-6">
        <div className="container px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-[#0B1F3A] p-2 rounded-xl text-sky-400">
              <Radio className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase italic text-[#0B1F3A]">Broadcast Center</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Calendar className="h-3 w-3" /> {currentTime.toLocaleDateString()} 
                <span className="h-1 w-1 bg-slate-300 rounded-full" />
                <Clock className="h-3 w-3" /> {currentTime.toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-slate-200">
              <Settings className="h-5 w-5 text-slate-500" />
            </Button>
            <div className="h-11 w-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-[#0B1F3A]">Admin Operator</p>
                <p className="text-[10px] font-bold text-sky-500 uppercase">Superuser</p>
              </div>
              <div className="h-11 w-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black">AD</div>
            </div>
          </div>
        </div>
      </div>

      <main className="container px-6 py-12 space-y-12">
        {/* Hero Section */}
        <section className="relative glass-panel p-12 rounded-[4rem] border-slate-200 overflow-hidden bg-[#0B1F3A] text-white">
          <div className="relative z-10 max-w-2xl space-y-6">
            <Badge className="bg-sky-500 text-white border-none font-black px-4 py-1">COMMAND CONSOLE</Badge>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter italic leading-[0.9]">
              START AND MANAGE LIVE <br /> <span className="text-sky-400">BADMINTON BROADCASTS</span>
            </h2>
            <p className="text-lg text-white/60 font-medium">Real-time scoring synchronization and multi-court broadcasting intelligence.</p>
          </div>
          
          <div className="absolute -right-20 -bottom-20 opacity-20 pointer-events-none">
            <Radio className="h-96 w-96 text-sky-400" />
          </div>
        </section>

        {/* Action Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          <BroadcastActionCard 
            title="Start Live Match"
            description="Initialize a quick individual singles or doubles match for immediate broadcasting."
            icon={Target}
            buttonText="Start Individual Match"
            onClick={() => navigate('/live-match/create')}
            variant="primary"
          />
          <BroadcastActionCard 
            title="Start Tournament"
            description="Launch an entire tournament circuit with bracket intelligence and multi-match feed."
            icon={Trophy}
            buttonText="Start Tournament"
            onClick={() => navigate('/tournaments/create')}
            variant="secondary"
          />
        </div>

        {/* Quick Setup Section */}
        <section className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-panel p-10 rounded-[3rem] space-y-10">
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <h3 className="text-xl font-black text-[#0B1F3A] flex items-center gap-3 italic">
                  <Plus className="h-6 w-6 text-sky-500" /> Quick Match Configuration
                </h3>
                <Badge variant="outline" className="border-slate-200 text-slate-400 font-black">DRAFT MODE</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tournament Name (Optional)</Label>
                    <Input placeholder="e.g. Smash Masters 2024" className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Match Identity</Label>
                    <Input placeholder="e.g. Semi Final - Court 1" className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</Label>
                      <Select>
                        <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold">
                          <SelectValue placeholder="Singles" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ms">Men's Singles</SelectItem>
                          <SelectItem value="ws">Women's Singles</SelectItem>
                          <SelectItem value="md">Men's Doubles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Court No.</Label>
                      <Input type="number" placeholder="1" className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Participant Selection</Label>
                    <Input placeholder="Search Player A / Team A" className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Opponent Selection</Label>
                    <Input placeholder="Search Player B / Team B" className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Assigned Umpire</Label>
                    <Input placeholder="Search Admin / Referee" className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <Button className="w-full h-20 bg-sky-500 text-white font-black text-xl rounded-[2rem] shadow-2xl hover:bg-sky-400 transition-all hover:scale-[1.01]">
                  INITIALIZE & GO LIVE <Play className="ml-3 h-6 w-6 fill-current" />
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <QuickControlPanel />
            
            <div className="glass-panel p-8 rounded-[3rem] border-slate-200 bg-white">
               <h3 className="text-sm font-black text-[#0B1F3A] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Activity className="h-4 w-4 text-sky-500" /> Platform Vitality
              </h3>
              <div className="space-y-6">
                {[
                  { label: "Network Latency", val: "42ms", color: "text-green-500" },
                  { label: "Active Viewers", val: "124.8k", color: "text-sky-500" },
                  { label: "Server Load", val: "24%", color: "text-[#0B1F3A]" },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                    <span className={cn("text-lg font-black", stat.color)}>{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Intelligence logs */}
        <section className="space-y-8">
           <h2 className="text-3xl font-black text-[#0B1F3A] tracking-tighter uppercase italic">Recent Intelligence logs</h2>
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Quarter Final 01", res: "Axelsen 2-0", dur: "42m" },
                { title: "Quarter Final 02", res: "Lee ZJ 2-1", dur: "1h 05m" },
                { title: "Men's Doubles R16", res: "Liang/Wang 2-0", dur: "35m" },
                { title: "Jakarta Open Finals", res: "An SY 2-0", dur: "38m" },
              ].map((log, i) => (
                <div key={i} className="glass-panel p-6 rounded-[2rem] border-slate-200 bg-white/50 space-y-4">
                   <div className="flex justify-between items-center">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{log.dur}</span>
                      <Zap className="h-3 w-3 text-amber-500 fill-current" />
                   </div>
                   <h4 className="font-black text-[#0B1F3A]">{log.title}</h4>
                   <p className="text-xs font-bold text-sky-600 uppercase tracking-widest">{log.res}</p>
                </div>
              ))}
           </div>
        </section>
      </main>
    </div>
  );
};

export default BroadcastCenter;