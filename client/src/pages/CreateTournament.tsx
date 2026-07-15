"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Trophy, Users, Calendar, MapPin, 
  Settings, Zap, Shield, Plus, X 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CreateTournament = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container max-w-4xl px-4 py-12">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-xl text-primary">
                <Trophy className="h-6 w-6" />
              </div>
              <span className="text-xs font-black text-primary uppercase tracking-[0.3em]">Organizer Studio</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter">Initialize Event</h1>
            <p className="text-muted-foreground font-medium">Configure brackets, rules, and seeding for your tournament.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="md:col-span-2 space-y-8">
              <section className="glass-card p-8 rounded-[2.5rem] space-y-6">
                <h3 className="text-xl font-black tracking-tight">Basic Intelligence</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Event Name</Label>
                    <Input placeholder="e.g. Smash Masters 2024" className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 font-bold" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Start Date</Label>
                      <Input type="date" className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 font-bold" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Location</Label>
                      <Input placeholder="City, Country" className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 font-bold" />
                    </div>
                  </div>
                </div>
              </section>

              <section className="glass-card p-8 rounded-[2.5rem] space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black tracking-tight">Player Registry</h3>
                  <Button variant="ghost" size="sm" className="text-primary font-black uppercase text-[10px] tracking-widest">
                    <Plus className="mr-2 h-4 w-4" /> Import CSV
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-transparent hover:border-primary/20 transition-all group">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-bold text-xs">
                        #{i}
                      </div>
                      <Input placeholder={`Seed ${i} Player Name`} className="h-10 bg-transparent border-none font-bold" />
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full h-14 border-dashed border-white/10 hover:border-primary/50 rounded-2xl font-bold gap-2">
                    <Plus className="h-4 w-4" /> Add Another Participant
                  </Button>
                </div>
              </section>
            </div>

            {/* Sidebar/Presets Section */}
            <div className="space-y-8">
              <section className="glass-card p-8 rounded-[2.5rem] space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Settings className="h-4 w-4 text-primary" /> Configuration
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-primary text-black cursor-pointer group">
                    <h4 className="font-bold flex items-center justify-between">
                      Single Elimination
                      <Shield className="h-4 w-4" />
                    </h4>
                    <p className="text-[10px] font-bold opacity-60 mt-1 uppercase">Standard 16-Bracket</p>
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5 group">
                    <h4 className="font-bold">Round Robin</h4>
                    <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase">Group Stages • Best of 3</p>
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5 group">
                    <h4 className="font-bold">League Format</h4>
                    <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase">Season Long • Point Based</p>
                  </div>
                </div>
              </section>

              <section className="glass-card p-8 rounded-[2.5rem] space-y-6 bg-gradient-to-br from-primary/10 to-transparent">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary fill-current" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Summary</span>
                  </div>
                  <div className="space-y-4 pt-4">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-muted-foreground uppercase">Estimated Matches</span>
                      <span>15 Matches</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-muted-foreground uppercase">Trophy Points</span>
                      <span className="text-primary">+1,200</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full h-14 bg-primary text-black font-black rounded-2xl shadow-[0_0_30px_rgba(182,255,42,0.2)] hover:scale-[1.02] transition-transform">
                  GENERATE BRACKET
                </Button>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateTournament;