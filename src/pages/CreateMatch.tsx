"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Zap, Users, Play, Radio, 
  Dribbble, BarChart3, Globe, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateMatch = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A]">
      <Navbar />
      
      <main className="container max-w-2xl px-4 py-16">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto bg-[#0B1F3A]/5 p-4 rounded-3xl text-[#0B1F3A] w-fit border border-[#0B1F3A]/5 shadow-sm">
              <Radio className="h-8 w-8 animate-pulse text-sky-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl font-black tracking-tighter italic uppercase">Live Studio</h1>
              <p className="text-slate-400 font-medium uppercase tracking-[0.2em] text-[10px]">Prepare broadcast for quick match initialization</p>
            </div>
          </div>

          <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 relative overflow-hidden bg-white border-slate-200 shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Dribbble className="h-32 w-32" />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Home Player / Team</Label>
                  <Input placeholder="Enter Name" className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-black text-lg focus:border-sky-500 transition-colors" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Away Player / Team</Label>
                  <Input placeholder="Enter Name" className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-black text-lg focus:border-sky-500 transition-colors" />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category & Venue</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3 group hover:border-sky-500 cursor-pointer transition-all">
                    <Users className="h-5 w-5 text-slate-400 group-hover:text-sky-500" />
                    <span className="text-sm font-black uppercase tracking-tight">Men's Singles</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3 group hover:border-sky-500 cursor-pointer transition-all">
                    <Globe className="h-5 w-5 text-slate-400 group-hover:text-sky-500" />
                    <span className="text-sm font-black uppercase tracking-tight">Main Court 01</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex flex-col gap-4">
                <Button 
                  onClick={() => navigate('/live-match/active')}
                  className="w-full h-20 bg-[#0B1F3A] text-white font-black text-xl rounded-[2rem] shadow-[0_20px_40px_rgba(11,31,58,0.2)] hover:bg-sky-500 transition-all group active:scale-95"
                >
                  INITIALIZE BROADCAST <Play className="ml-3 h-6 w-6 fill-current group-hover:scale-110 transition-transform" />
                </Button>
                <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Match data will be synchronized across global servers
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats Placeholder */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: "Active Servers", val: "24", icon: Globe },
              { label: "Est. Viewers", val: "1.2k", icon: Users },
              { label: "Data Latency", val: "42ms", icon: BarChart3 },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-4">
                <s.icon className="h-5 w-5 text-sky-500/40" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</span>
                <span className="text-xl font-black text-[#0B1F3A]">{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateMatch;