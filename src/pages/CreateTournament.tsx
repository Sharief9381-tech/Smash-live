"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Trophy, Calendar, MapPin, 
  Settings, Zap, Shield, Copy, 
  Check, ArrowRight, Loader2, Link as LinkIcon
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const CreateTournament = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showLinkState, setShowLinkState] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: ""
  });

  const [format, setFormat] = useState<'elimination' | 'round-robin' | 'league'>('elimination');

  // Use application origin so the link is actually reachable in this environment
  const slug = formData.name.toLowerCase().replace(/\s+/g, '-') || 'new-event';
  const registrationLink = `${window.location.origin}/register/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(registrationLink);
    setCopied(true);
    showSuccess("Registration link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInitialize = () => {
    if (!formData.name || !formData.date || !formData.location) {
      showError("Please complete Basic Intelligence details.");
      return;
    }

    setIsLoading(true);
    
    // Simulate API/Database call
    setTimeout(() => {
      const tourneyId = `t_${Date.now()}`;
      const newTourney = {
        id: tourneyId,
        slug: slug,
        name: formData.name,
        date: formData.date,
        location: formData.location,
        format: format,
        status: 'Accepting',
        participants: [],
        createdAt: new Date().toISOString()
      };
      
      const existing = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      localStorage.setItem('active_studio_tournaments', JSON.stringify([...existing, newTourney]));
      
      setIsLoading(false);
      setShowLinkState(true);
      showSuccess(`Tournament "${formData.name}" initialized!`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container max-w-4xl px-4 py-12">
        <AnimatePresence mode="wait">
          {!showLinkState ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-xl text-primary">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-black text-primary uppercase tracking-[0.3em]">Organizer Studio</span>
                </div>
                <h1 className="text-5xl font-black tracking-tighter text-[#0B1F3A]">Initialize Event</h1>
                <p className="text-muted-foreground font-medium">Configure rules and logistics. Participants will register via a custom link.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <section className="glass-card p-8 rounded-[2.5rem] space-y-6">
                    <h3 className="text-xl font-black tracking-tight italic text-[#0B1F3A]">Basic Intelligence</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Event Name</Label>
                        <Input 
                          placeholder="e.g. Smash Masters 2024" 
                          className="h-14 bg-slate-50 border-slate-200 rounded-2xl px-6 font-bold" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Start Date</Label>
                          <Input 
                            type="date" 
                            className="h-14 bg-slate-50 border-slate-200 rounded-2xl px-6 font-bold" 
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Location</Label>
                          <Input 
                            placeholder="City, Country" 
                            className="h-14 bg-slate-50 border-slate-200 rounded-2xl px-6 font-bold" 
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="glass-card p-8 rounded-[2.5rem] space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2 text-[#0B1F3A]">
                      <Settings className="h-4 w-4 text-sky-500" /> Tournament Format
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div 
                        onClick={() => setFormat('elimination')}
                        className={cn(
                          "p-6 rounded-2xl cursor-pointer transition-all border flex flex-col items-center text-center gap-2",
                          format === 'elimination' ? "bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-lg" : "bg-slate-50 border-slate-200 hover:border-sky-500"
                        )}
                      >
                        <Shield className="h-6 w-6" />
                        <span className="text-[10px] font-black uppercase">Elimination</span>
                      </div>
                      <div 
                        onClick={() => setFormat('round-robin')}
                        className={cn(
                          "p-6 rounded-2xl cursor-pointer transition-all border flex flex-col items-center text-center gap-2",
                          format === 'round-robin' ? "bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-lg" : "bg-slate-50 border-slate-200 hover:border-sky-500"
                        )}
                      >
                        <Trophy className="h-6 w-6" />
                        <span className="text-[10px] font-black uppercase">Round Robin</span>
                      </div>
                      <div 
                        onClick={() => setFormat('league')}
                        className={cn(
                          "p-6 rounded-2xl cursor-pointer transition-all border flex flex-col items-center text-center gap-2",
                          format === 'league' ? "bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-lg" : "bg-slate-50 border-slate-200 hover:border-sky-500"
                        )}
                      >
                        <Zap className="h-6 w-6" />
                        <span className="text-[10px] font-black uppercase">League</span>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="space-y-8">
                  <section className="glass-card p-8 rounded-[2.5rem] space-y-6 bg-[#0B1F3A] text-white border-none shadow-2xl">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-sky-400 fill-sky-400" />
                        <span className="text-[10px] font-black text-sky-400 uppercase tracking-[0.2em]">Summary</span>
                      </div>
                      <div className="space-y-4 pt-4 border-t border-white/10">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-white/60 uppercase">Format</span>
                          <span className="capitalize">{format}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-white/60 uppercase">Access</span>
                          <span>Open via Link</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={handleInitialize}
                      disabled={isLoading}
                      className="w-full h-14 bg-sky-500 text-white font-black rounded-2xl shadow-xl hover:bg-sky-400 transition-transform active:scale-95"
                    >
                      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "INITIALIZE EVENT"}
                    </Button>
                  </section>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto space-y-8 pt-12"
            >
              <div className="text-center space-y-4">
                <div className="bg-green-500/20 w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto text-green-500 shadow-xl">
                  <Check className="h-10 w-10 stroke-[3px]" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-4xl font-black tracking-tighter uppercase italic text-[#0B1F3A]">Event Initialized</h2>
                  <p className="text-muted-foreground font-medium">Your tournament circuit is live. Share the registration link below.</p>
                </div>
              </div>

              <div className="glass-card p-8 rounded-[3rem] space-y-6 bg-[#0B1F3A] text-white border-none shadow-2xl">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-sky-400 ml-2">Public Registration Link</Label>
                  <div className="flex gap-2 p-2 bg-black/40 rounded-2xl border border-white/10">
                    <div className="flex-1 px-4 flex items-center overflow-hidden">
                      <p className="text-sm font-mono font-bold text-white/60 truncate">{registrationLink}</p>
                    </div>
                    <Button 
                      onClick={handleCopyLink}
                      className={cn(
                        "h-12 px-6 rounded-xl font-black transition-all border-none",
                        copied ? "bg-green-500 text-white" : "bg-sky-500 text-white hover:bg-sky-400"
                      )}
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copied ? "COPIED" : "COPY"}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Event ID</p>
                    <p className="text-lg font-black text-white">{formData.name.split(' ').map(s => s[0]).join('') || 'SMASH'}-{Date.now().toString().slice(-4)}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Status</p>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-lg font-black text-white">Accepting</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button 
                  onClick={() => navigate('/smashed')}
                  className="w-full h-16 bg-[#0B1F3A] text-white font-black rounded-2xl hover:bg-[#0B1F3A]/90 transition-all text-lg uppercase tracking-widest shadow-xl"
                >
                  View My Tournaments <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <button 
                  onClick={() => setShowLinkState(false)}
                  className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-[#0B1F3A] transition-colors"
                >
                  Create Another Event
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default CreateTournament;