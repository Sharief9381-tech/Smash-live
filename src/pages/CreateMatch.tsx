"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Zap, Users, Play, Radio, 
  Dribbble, BarChart3, Globe 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateMatch = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container max-w-2xl px-4 py-16">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto bg-primary/20 p-4 rounded-3xl text-primary w-fit">
              <Radio className="h-8 w-8 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl font-black tracking-tighter italic">LIVE STUDIO</h1>
              <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-xs">Prepare broadcast for quick match</p>
            </div>
          </div>

          <div className="glass-card p-10 rounded-[3rem] space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Dribbble className="h-32 w-32" />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Home Player / Team</Label>
                  <Input placeholder="Enter Name" className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 font-black text-lg focus:border-primary/50 transition-colors" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Away Player / Team</Label>
                  <Input placeholder="Enter Name" className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 font-black text-lg focus:border-primary/50 transition-colors" />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Category & Venue</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 group hover:border-primary/20 cursor-pointer">
                    <Users className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                    <span className="text-sm font-bold">Men's Singles</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 group hover:border-primary/20 cursor-pointer">
                    <Globe className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                    <span className="text-sm font-bold">Main Court 01</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex flex-col gap-4">
                <Button 
                  onClick={() => navigate('/live-match/active')}
                  className="w-full h-20 bg-primary text-black font-black text-xl rounded-[2rem] shadow-[0_20px_40px_rgba(182,255,42,0.15)] hover:scale-[1.02] transition-all group"
                >
                  INITIALIZE BROADCAST <Play className="ml-3 h-6 w-6 fill-current group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
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
                <s.icon className="h-4 w-4 text-muted-foreground/40" />
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{s.label}</span>
                <span className="text-lg font-black">{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateMatch;