"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Trophy, User, Radio, MapPin, 
  Clock, Camera, Layout, Zap,
  ChevronRight, Upload, Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BroadcastStudio = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<'tournament' | 'individual'>('tournament');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container max-w-4xl px-4 py-12">
        <div className="space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="bg-red-500/20 p-2 rounded-xl text-red-500 animate-pulse">
                  <Radio className="h-6 w-6" />
                </div>
                <span className="text-xs font-black text-red-500 uppercase tracking-[0.3em]">Broadcast Studio</span>
              </div>
              <h1 className="text-5xl font-black tracking-tighter italic">GO LIVE</h1>
              <p className="text-muted-foreground font-medium">Configure your professional stream settings and score overlays.</p>
            </div>
            
            <div className="flex gap-3">
              <Badge variant="outline" className="h-10 px-4 border-white/10 gap-2">
                <Layout className="h-4 w-4" /> 4K Stream Ready
              </Badge>
              <Badge variant="outline" className="h-10 px-4 border-white/10 gap-2">
                <Zap className="h-4 w-4 text-primary" /> Low Latency
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="tournament" onValueChange={(v) => setType(v as any)} className="space-y-8">
            <TabsList className="bg-secondary/50 p-1.5 rounded-[2rem] w-full max-w-md h-auto grid grid-cols-2">
              <TabsTrigger 
                value="tournament" 
                className="rounded-[1.5rem] py-4 data-[state=active]:bg-primary data-[state=active]:text-black font-black uppercase tracking-widest text-[10px]"
              >
                <Trophy className="mr-2 h-4 w-4" /> Tournament Match
              </TabsTrigger>
              <TabsTrigger 
                value="individual" 
                className="rounded-[1.5rem] py-4 data-[state=active]:bg-primary data-[state=active]:text-black font-black uppercase tracking-widest text-[10px]"
              >
                <User className="mr-2 h-4 w-4" /> Individual Match
              </TabsTrigger>
            </TabsList>

            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-6">
                <section className="glass-card p-8 rounded-[2.5rem] space-y-6">
                  <h3 className="text-xl font-black tracking-tight">Match Intelligence</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        {type === 'tournament' ? 'Tournament Name' : 'Match Title'}
                      </Label>
                      <Input placeholder="e.g. BWF World Finals 2024" className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 font-bold" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        {type === 'tournament' ? 'Tournament Round' : 'Match Category'}
                      </Label>
                      <Input placeholder="e.g. Semi Finals / Friendly" className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 font-bold" />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Player / Team 01</Label>
                      <Input placeholder="Home Name" className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 font-bold" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Player / Team 02</Label>
                      <Input placeholder="Away Name" className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 font-bold" />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Venue / Court</Label>
                      <div className="relative">
                        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Court 01, Main Hall" className="h-14 bg-white/5 border-white/5 rounded-2xl pl-12 pr-6 font-bold" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Start Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="datetime-local" className="h-14 bg-white/5 border-white/5 rounded-2xl pl-12 pr-6 font-bold" />
                      </div>
                    </div>
                  </div>
                </section>

                <section className="glass-card p-8 rounded-[2.5rem] space-y-6">
                  <h3 className="text-xl font-black tracking-tight">Broadcast Presentation</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Stream Title</Label>
                      <Input placeholder="AXELSEN vs ZII JIA - Road to Finals LIVE" className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 font-black italic" />
                    </div>
                    
                    <div className="border-2 border-dashed border-white/5 rounded-[2rem] p-12 text-center space-y-4 hover:border-primary/50 transition-colors cursor-pointer group">
                      <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-bold">Upload Custom Thumbnail</p>
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest mt-1">1920x1080 • JPG/PNG</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <section className="glass-card p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-transparent border-primary/20 space-y-8">
                  <div className="space-y-2">
                    <h4 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                      <Info className="h-4 w-4" /> Final Check
                    </h4>
                    <ul className="space-y-3 pt-4">
                      {[
                        "AI Scoreboard Overlay Active",
                        "Real-time Insights Enabled",
                        "Global Chat Servers Synced",
                        "Auto-Highlight Generator Ready"
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs font-bold">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={() => navigate('/broadcast/live-active')}
                    className="w-full h-16 bg-primary text-black font-black text-lg rounded-2xl shadow-[0_20px_40px_rgba(182,255,42,0.15)] group"
                  >
                    START BROADCAST <Radio className="ml-2 h-5 w-5 animate-pulse" />
                  </Button>
                </section>

                <div className="glass-card p-8 rounded-[2.5rem] space-y-4">
                  <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">PREVIEW OVERLAY</h4>
                  <div className="aspect-video rounded-2xl bg-black border border-white/5 flex items-end p-3 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-white/10" />
                    </div>
                    <div className="w-full h-6 bg-primary/20 rounded-lg flex items-center justify-between px-3">
                      <span className="text-[8px] font-black uppercase text-primary">Live Score Overlay Active</span>
                      <div className="flex gap-1">
                        <div className="h-1 w-2 bg-primary rounded-full" />
                        <div className="h-1 w-2 bg-primary rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default BroadcastStudio;