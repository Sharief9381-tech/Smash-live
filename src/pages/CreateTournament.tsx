"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Trophy, Calendar, MapPin, Users, 
  Settings2, Image as ImageIcon, ChevronRight,
  Target, LayoutGrid, CheckCircle2
} from 'lucide-react';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { showSuccess } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';

const CreateTournament = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleStart = () => {
    showSuccess("Tournament created successfully!");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container max-w-4xl px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-bold text-primary uppercase tracking-widest">New Event</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight">Create Tournament</h1>
          </div>
          
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 w-12 rounded-full transition-colors ${step >= i ? 'bg-primary' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>

        <div className="glass-card rounded-[2.5rem] overflow-hidden border-white/5 shadow-2xl">
          <div className="p-8 md:p-12">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tournament Name</Label>
                    <Input placeholder="e.g. Summer Smash Championship" className="bg-secondary/50 border-white/5 h-14 rounded-2xl px-6 focus:ring-primary" />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tournament Type</Label>
                    <Select defaultValue="knockout">
                      <SelectTrigger className="bg-secondary/50 border-white/5 h-14 rounded-2xl px-6">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="knockout">Knockout (Single Elimination)</SelectItem>
                        <SelectItem value="league">League (Points Table)</SelectItem>
                        <SelectItem value="roundrobin">Round Robin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</Label>
                    <Select defaultValue="singles">
                      <SelectTrigger className="bg-secondary/50 border-white/5 h-14 rounded-2xl px-6">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="singles">Singles</SelectItem>
                        <SelectItem value="doubles">Doubles</SelectItem>
                        <SelectItem value="mixed">Mixed Doubles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Venue</Label>
                    <div className="relative">
                      <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Stadium or Court Name" className="bg-secondary/50 border-white/5 h-14 rounded-2xl pl-14 pr-6" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={() => setStep(2)} className="bg-primary text-black font-bold h-14 px-10 rounded-2xl hover:bg-primary/90">
                    Next Step <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Start Date</Label>
                    <Input type="date" className="bg-secondary/50 border-white/5 h-14 rounded-2xl px-6" />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Start Time</Label>
                    <Input type="time" className="bg-secondary/50 border-white/5 h-14 rounded-2xl px-6" />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Teams / Players</Label>
                    <Input type="number" placeholder="16" className="bg-secondary/50 border-white/5 h-14 rounded-2xl px-6" />
                  </div>
                </div>

                <div className="p-8 border-2 border-dashed border-white/10 rounded-[2rem] bg-secondary/20 flex flex-col items-center justify-center text-center gap-4 cursor-pointer hover:border-primary/50 transition-colors">
                  <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold">Upload Tournament Banner</h4>
                    <p className="text-xs text-muted-foreground mt-1">Recommended size: 1200x400 (PNG, JPG)</p>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="ghost" onClick={() => setStep(1)} className="h-14 px-10 font-bold hover:bg-white/5">
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)} className="bg-primary text-black font-bold h-14 px-10 rounded-2xl hover:bg-primary/90">
                    Configure Brackets <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <div className="grid gap-4">
                  {[
                    { title: "Auto-Generate Fixtures", desc: "Randomly seed players into brackets", icon: Settings2 },
                    { title: "Multiple Courts", desc: "Assign matches across different courts", icon: LayoutGrid },
                    { title: "Manual Seeding", desc: "Manually set player positions in bracket", icon: Target }
                  ].map((option, i) => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-secondary/50 border border-white/5 group hover:border-primary/30 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                          <option.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold">{option.title}</h4>
                          <p className="text-xs text-muted-foreground">{option.desc}</p>
                        </div>
                      </div>
                      <div className="h-6 w-6 rounded-full border-2 border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                        <div className="h-2.5 w-2.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="ghost" onClick={() => setStep(2)} className="h-14 px-10 font-bold hover:bg-white/5">
                    Back
                  </Button>
                  <div className="flex gap-4">
                    <Button variant="outline" className="h-14 px-8 font-bold border-white/10 rounded-2xl">
                      Save Draft
                    </Button>
                    <Button onClick={handleStart} className="bg-primary text-black font-bold h-14 px-12 rounded-2xl hover:bg-primary/90 shadow-[0_0_20px_rgba(182,255,42,0.3)]">
                      START TOURNAMENT
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateTournament;