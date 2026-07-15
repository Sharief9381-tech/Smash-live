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
  
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: ""
  });

  const [format, setFormat] = useState<'elimination' | 'round-robin' | 'league'>('elimination');

  // Sanitize name for a reliable URL slug
  const generateSlug = (name: string) => {
    return name.trim().toLowerCase().replace(/\s+/g, '-') || 'new-event';
  };

  const slug = generateSlug(formData.name);
  const registrationLink = `${window.location.origin}/register/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(registrationLink);
    setCopied(true);
    showSuccess("Registration link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInitialize = () => {
    if (!formData.name || !formData.date || !formData.location) {
      showError("Please complete all basic details first.");
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const tourneyId = `t_${Date.now()}`;
      const newTourney = {
        id: tourneyId,
        slug: slug,
        name: formData.name.trim(),
        date: formData.date,
        location: formData.location,
        format: format,
        status: 'Accepting',
        participants: [],
        createdAt: new Date().toISOString()
      };
      
      const existing = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      // Prevent duplicates in the array
      const filtered = existing.filter((t: any) => t.slug !== slug);
      localStorage.setItem('active_studio_tournaments', JSON.stringify([...filtered, newTourney]));
      
      setIsLoading(false);
      setShowLinkState(true);
      showSuccess(`Tournament "${newTourney.name}" is now online!`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white">
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
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="bg-[#0B1F3A]/5 p-2.5 rounded-xl text-sky-500">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-black text-[#0B1F3A] uppercase tracking-[0.3em]">Broadcast Organizer</span>
                </div>
                <h1 className="text-5xl font-black tracking-tighter text-[#0B1F3A] uppercase italic">Initialize Event</h1>
                <p className="text-slate-500 font-medium">Create a digital circuit. Players will register via your unique portal link.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <section className="glass-panel p-10 rounded-[3.5rem] space-y-8 border-slate-200">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
                       <Zap className="h-5 w-5 text-sky-500 fill-current" />
                       <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">Basic Intel</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Event Identifier</Label>
                        <Input 
                          placeholder="e.g. Smasher Tournament 2024" 
                          className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold focus:border-sky-500 transition-all" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Start Date</Label>
                          <Input 
                            type="date" 
                            className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" 
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Location</Label>
                          <Input 
                            placeholder="City, Country" 
                            className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" 
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="space-y-8">
                  <section className="glass-panel p-8 rounded-[2.5rem] space-y-6 bg-[#0B1F3A] text-white border-none shadow-2xl">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-sky-400 fill-sky-400" />
                        <span className="text-[10px] font-black text-sky-400 uppercase tracking-[0.2em]">Summary</span>
                      </div>
                      <div className="space-y-4 pt-4 border-t border-white/10">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-white/40 uppercase">Format</span>
                          <span className="capitalize">Elimination</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-white/40 uppercase">Registration</span>
                          <span>Open Link</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={handleInitialize}
                      disabled={isLoading}
                      className="w-full h-14 bg-sky-500 text-white font-black rounded-2xl shadow-xl hover:bg-sky-400 transition-all active:scale-95"
                    >
                      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "START CIRCUIT"}
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
                <div className="bg-green-500/10 w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto text-green-500 shadow-lg border border-green-500/20">
                  <Check className="h-10 w-10 stroke-[3px]" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-4xl font-black tracking-tighter uppercase italic text-[#0B1F3A]">Link Generated</h2>
                  <p className="text-slate-500 font-medium">Your tournament registration portal is live. Athletes can join via this link.</p>
                </div>
              </div>

              <div className="glass-panel p-10 rounded-[3.5rem] space-y-6 bg-[#0B1F3A] text-white border-none shadow-2xl">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-sky-400 ml-2">Registration URL</Label>
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
              </div>

              <div className="flex flex-col gap-4">
                <Button 
                  onClick={() => navigate('/smashed')}
                  className="w-full h-16 bg-[#0B1F3A] text-white font-black rounded-2xl hover:bg-[#1a3a5f] transition-all text-lg uppercase tracking-widest shadow-xl"
                >
                  GO TO DASHBOARD <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default CreateTournament;