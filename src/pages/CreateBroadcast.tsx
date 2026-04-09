"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Trophy, Radio, Target, Users, 
  MapPin, Upload, ChevronRight, Play,
  Globe, Shield, Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const CreateBroadcast = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<'tournament' | 'individual' | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container max-w-4xl px-4 py-16">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto bg-primary/20 p-4 rounded-3xl text-primary w-fit">
              <Radio className="h-8 w-8 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl font-black tracking-tighter italic">BROADCAST STUDIO</h1>
              <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-xs">Configure your live stream parameters</p>
            </div>
          </div>

          {!type ? (
            /* Selection Phase */
            <div className="grid md:grid-cols-2 gap-8">
              <div 
                onClick={() => setType('tournament')}
                className="glass-card p-10 rounded-[3rem] text-center space-y-6 cursor-pointer hover:border-primary/50 transition-all group hover:scale-[1.02]"
              >
                <div className="mx-auto h-20 w-20 rounded-[2rem] bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Trophy className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black">Tournament Match</h3>
                  <p className="text-sm text-muted-foreground font-medium">Stream professional matches with bracket integration and official seeding.</p>
                </div>
                <Button className="w-full bg-secondary text-white font-bold h-12 rounded-xl group-hover:bg-primary group-hover:text-black">
                  Select Tournament <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div 
                onClick={() => setType('individual')}
                className="glass-card p-10 rounded-[3rem] text-center space-y-6 cursor-pointer hover:border-primary/50 transition-all group hover:scale-[1.02]"
              >
                <div className="mx-auto h-20 w-20 rounded-[2rem] bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Target className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black">Individual Match</h3>
                  <p className="text-sm text-muted-foreground font-medium">Practice, friendly challenges, or quick exhibitions outside of tournaments.</p>
                </div>
                <Button className="w-full bg-secondary text-white font-bold h-12 rounded-xl group-hover:bg-primary group-hover:text-black">
                  Select Individual <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            /* Form Phase */
            <div className="space-y-8">
              <Button 
                variant="ghost" 
                onClick={() => setType(null)}
                className="font-bold text-muted-foreground hover:text-white"
              >
                ← Change Broadcast Type
              </Button>

              <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-8 space-y-8">
                  <section className="glass-card p-8 rounded-[2.5rem] space-y-6">
                    <h3 className="text-xl font-black flex items-center gap-3 italic">
                      {type === 'tournament' ? <Trophy className="h-5 w-5 text-primary" /> : <Shield className="h-5 w-5 text-primary" />}
                      {type === 'tournament' ? 'Tournament Match Details' : 'Individual Match Details'}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Player / Team 1</Label>
                        <Input placeholder="Search Player" className="h-12 bg-white/5 border-white/5 rounded-xl px-4 font-bold" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Player / Team 2</Label>
                        <Input placeholder="Search Player" className="h-12 bg-white/5 border-white/5 rounded-xl px-4 font-bold" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Venue / Court</Label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Main Court 01" className="h-12 bg-white/5 border-white/5 rounded-xl pl-11 font-bold" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Match Category</Label>
                        <Input placeholder="Men's Singles" className="h-12 bg-white/5 border-white/5 rounded-xl px-4 font-bold" />
                      </div>
                    </div>
                  </section>

                  <section className="glass-card p-8 rounded-[2.5rem] space-y-6">
                    <h3 className="text-xl font-black italic">Stream Configuration</h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Stream Title</Label>
                        <Input placeholder="Enter a catchy title for your audience" className="h-14 bg-white/5 border-white/5 rounded-xl px-6 font-bold text-lg" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Thumbnail Preview</Label>
                        <div className="h-40 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center gap-3 bg-white/2 hover:bg-white/5 transition-colors cursor-pointer group">
                          <Upload className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Upload Custom Thumbnail (16:9)</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="md:col-span-4 space-y-8">
                  <div className="glass-card p-8 rounded-[2.5rem] space-y-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary fill-current" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Summary</span>
                      </div>
                      <div className="space-y-3 pt-4 border-t border-white/5">
                        <div className="flex justify-between text-xs font-bold text-muted-foreground">
                          <span>BROADCAST TYPE</span>
                          <span className="text-white uppercase">{type}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-muted-foreground">
                          <span>SERVERS</span>
                          <span className="text-white">Auto-Optimize (Edge)</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-muted-foreground">
                          <span>LATENCY</span>
                          <Badge className="bg-primary/20 text-primary border-none h-4 text-[8px] font-black">ULTRA LOW</Badge>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => navigate('/broadcast/live-active')}
                      className="w-full h-16 bg-primary text-black font-black text-lg rounded-2xl shadow-[0_0_30px_rgba(182,255,42,0.2)] hover:scale-[1.02] transition-transform"
                    >
                      GO LIVE NOW <Play className="ml-2 h-5 w-5 fill-current" />
                    </Button>
                    <p className="text-[10px] text-center font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
                      By clicking Go Live, you agree to SmashLive's broadcasting terms and conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateBroadcast;