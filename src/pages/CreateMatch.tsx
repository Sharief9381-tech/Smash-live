"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Play, Activity, Users, MapPin, Zap, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { showSuccess } from '@/utils/toast';

const CreateMatch = () => {
  const navigate = useNavigate();
  const [matchType, setMatchType] = useState<'individual' | 'tournament'>('individual');

  const handleStartMatch = () => {
    showSuccess("Initializing live scoring engine...");
    setTimeout(() => navigate('/live-match/active'), 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container max-w-4xl px-4 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <span className="text-sm font-bold text-primary uppercase tracking-widest">Quick Start</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight">Setup Live Match</h1>
          <p className="text-muted-foreground mt-2">Choose your match configuration and go live instantly.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div 
            onClick={() => setMatchType('individual')}
            className={`p-8 rounded-[2.5rem] glass-card border-2 cursor-pointer transition-all ${matchType === 'individual' ? 'border-primary shadow-[0_0_30px_rgba(182,255,42,0.1)]' : 'border-transparent opacity-60'}`}
          >
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Individual Match</h3>
            <p className="text-sm text-muted-foreground">Friendly, Practice, or Challenge match.</p>
          </div>

          <div 
            onClick={() => setMatchType('tournament')}
            className={`p-8 rounded-[2.5rem] glass-card border-2 cursor-pointer transition-all ${matchType === 'tournament' ? 'border-primary shadow-[0_0_30px_rgba(182,255,42,0.1)]' : 'border-transparent opacity-60'}`}
          >
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Tournament Match</h3>
            <p className="text-sm text-muted-foreground">Official match part of an active tournament.</p>
          </div>
        </div>

        <div className="glass-card rounded-[2.5rem] p-8 md:p-12 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Player / Team 1</Label>
              <Input placeholder="Enter name" className="bg-secondary/50 border-white/5 h-14 rounded-2xl px-6" />
            </div>
            <div className="space-y-4">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Player / Team 2</Label>
              <Input placeholder="Enter name" className="bg-secondary/50 border-white/5 h-14 rounded-2xl px-6" />
            </div>
            
            <div className="space-y-4">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Court Number</Label>
              <Input type="number" placeholder="1" className="bg-secondary/50 border-white/5 h-14 rounded-2xl px-6" />
            </div>
            <div className="space-y-4">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Venue</Label>
              <div className="relative">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Stadium Name" className="bg-secondary/50 border-white/5 h-14 rounded-2xl pl-14 pr-6" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-6">
            <Button onClick={handleStartMatch} className="bg-primary text-black font-black h-16 rounded-2xl hover:bg-primary/90 text-lg shadow-[0_0_30px_rgba(182,255,42,0.3)]">
              GO LIVE NOW <Play className="ml-3 h-5 w-5 fill-current" />
            </Button>
            <p className="text-center text-xs text-muted-foreground">Match will be broadcasted live to all SmashLive users instantly.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateMatch;