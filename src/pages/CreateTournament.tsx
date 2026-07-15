"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Trophy, Users, Calendar, MapPin, 
  Settings, Zap, Shield, Plus, X, Upload,
  Loader2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';

const CreateTournament = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: ""
  });

  const [participants, setParticipants] = useState(["", "", ""]);
  const [format, setFormat] = useState<'elimination' | 'round-robin' | 'league'>('elimination');

  const handleAddParticipant = () => {
    setParticipants([...participants, ""]);
  };

  const handleRemoveParticipant = (index: number) => {
    const newList = [...participants];
    newList.splice(index, 1);
    setParticipants(newList);
  };

  const handleParticipantChange = (index: number, value: string) => {
    const newList = [...participants];
    newList[index] = value;
    setParticipants(newList);
  };

  const handleImportCSV = () => {
    showSuccess("Parsing CSV data... Imported 16 players.");
    setParticipants(Array(16).fill("").map((_, i) => `Seeded Player ${i + 1}`));
  };

  const handleGenerate = () => {
    if (!formData.name || !formData.date || !formData.location) {
      showError("Please complete Basic Intelligence details.");
      return;
    }

    const activeParticipants = participants.filter(p => p.trim() !== "");
    if (activeParticipants.length < 2) {
      showError("Please add at least 2 participants.");
      return;
    }

    setIsLoading(true);
    
    // Simulate API/Database call
    setTimeout(() => {
      setIsLoading(false);
      showSuccess(`Tournament "${formData.name}" initialized successfully!`);
      navigate('/tournaments');
    }, 1500);
  };

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
                    <Input 
                      placeholder="e.g. Smash Masters 2024" 
                      className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 font-bold" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Start Date</Label>
                      <Input 
                        type="date" 
                        className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 font-bold" 
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Location</Label>
                      <Input 
                        placeholder="City, Country" 
                        className="h-14 bg-white/5 border-white/5 rounded-2xl px-6 font-bold" 
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="glass-card p-8 rounded-[2.5rem] space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black tracking-tight">Player Registry</h3>
                  <Button 
                    onClick={handleImportCSV}
                    variant="ghost" 
                    size="sm" 
                    className="text-primary font-black uppercase text-[10px] tracking-widest hover:bg-primary/10"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Import CSV
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {participants.map((name, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-transparent hover:border-primary/20 transition-all group">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-bold text-xs">
                        #{i + 1}
                      </div>
                      <Input 
                        placeholder={`Seed ${i + 1} Player Name`} 
                        className="h-10 bg-transparent border-none font-bold" 
                        value={name}
                        onChange={(e) => handleParticipantChange(i, e.target.value)}
                      />
                      <Button 
                        onClick={() => handleRemoveParticipant(i)}
                        variant="ghost" 
                        size="icon" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    onClick={handleAddParticipant}
                    variant="outline" 
                    className="w-full h-14 border-dashed border-white/10 hover:border-primary/50 rounded-2xl font-bold gap-2"
                  >
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
                  <div 
                    onClick={() => setFormat('elimination')}
                    className={cn(
                      "p-4 rounded-2xl cursor-pointer group transition-all",
                      format === 'elimination' ? "bg-primary text-black" : "bg-white/5 hover:bg-white/10 border border-white/5"
                    )}
                  >
                    <h4 className="font-bold flex items-center justify-between">
                      Single Elimination
                      {format === 'elimination' && <Shield className="h-4 w-4" />}
                    </h4>
                    <p className={cn("text-[10px] font-bold uppercase mt-1", format === 'elimination' ? "opacity-60" : "text-muted-foreground")}>
                      Standard 16-Bracket
                    </p>
                  </div>
                  
                  <div 
                    onClick={() => setFormat('round-robin')}
                    className={cn(
                      "p-4 rounded-2xl cursor-pointer group transition-all",
                      format === 'round-robin' ? "bg-primary text-black" : "bg-white/5 hover:bg-white/10 border border-white/5"
                    )}
                  >
                    <h4 className="font-bold flex items-center justify-between">
                      Round Robin
                      {format === 'round-robin' && <Shield className="h-4 w-4" />}
                    </h4>
                    <p className={cn("text-[10px] font-bold uppercase mt-1", format === 'round-robin' ? "opacity-60" : "text-muted-foreground")}>
                      Group Stages • Best of 3
                    </p>
                  </div>
                  
                  <div 
                    onClick={() => setFormat('league')}
                    className={cn(
                      "p-4 rounded-2xl cursor-pointer group transition-all",
                      format === 'league' ? "bg-primary text-black" : "bg-white/5 hover:bg-white/10 border border-white/5"
                    )}
                  >
                    <h4 className="font-bold flex items-center justify-between">
                      League Format
                      {format === 'league' && <Shield className="h-4 w-4" />}
                    </h4>
                    <p className={cn("text-[10px] font-bold uppercase mt-1", format === 'league' ? "opacity-60" : "text-muted-foreground")}>
                      Season Long • Point Based
                    </p>
                  </div>
                </div>
              </section>

              <section className="glass-card p-8 rounded-[2.5rem] space-y-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary fill-current" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Summary</span>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-muted-foreground uppercase">Participants</span>
                      <span>{participants.filter(p => p.trim() !== "").length} Players</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-muted-foreground uppercase">Circuit Pts</span>
                      <span className="text-primary">+1,200</span>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="w-full h-14 bg-primary text-black font-black rounded-2xl shadow-[0_0_30px_rgba(182,255,42,0.2)] hover:scale-[1.02] transition-transform"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "GENERATE BRACKET"}
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