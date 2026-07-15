"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Trophy, Calendar, MapPin, 
  Settings, Zap, Shield, Copy, 
  Check, ArrowRight, Loader2, Link as LinkIcon,
  Layers, ListOrdered, Award
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
    startDate: "",
    endDate: "",
    city: ""
  });

  const [format, setFormat] = useState<'elimination' | 'round-robin' | 'league'>('elimination');

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
    if (!formData.name || !formData.startDate || !formData.endDate || !formData.city) {
      showError("Please complete all intelligence fields before initializing.");
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      const tourneyId = `t_${Date.now()}`;
      const newTourney = {
        id: tourneyId,
        slug: slug,
        name: formData.name.trim(),
        startDate: formData.startDate,
        endDate: formData.endDate,
        city: formData.city,
        format: format,
        status: 'Accepting',
        participants: [],
        createdAt: new Date().toISOString()
      };
      
      const existing = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      const filtered = existing.filter((t: any) => t.slug !== slug);
      localStorage.setItem('active_studio_tournaments', JSON.stringify([...filtered, newTourney]));
      
      setIsLoading(false);
      setShowLinkState(true);
      showSuccess(`"${newTourney.name}" has been synchronized to the circuit!`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="container max-w-6xl px-6 py-12">
        <AnimatePresence mode="wait">
          {!showLinkState ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0B1F3A]/5 p-2.5 rounded-xl text-sky-500">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-black text-[#0B1F3A] uppercase tracking-[0.3em]">Operational Protocol</span>
                </div>
                <h1 className="text-6xl font-black tracking-tighter text-[#0B1F3A] uppercase italic">Initialize Event</h1>
                <p className="text-slate-500 font-medium max-w-2xl text-lg">Define tournament parameters and format to launch your digital registration portal.</p>
              </div>

              <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7 space-y-8">
                  <section className="glass-panel p-10 rounded-[3.5rem] space-y-10 border-slate-200 bg-white">
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-8">
                       <Zap className="h-6 w-6 text-sky-500 fill-current" />
                       <h3 className="text-2xl font-black text-[#0B1F3A] uppercase italic">Basic Intelligence</h3>
                    </div>
                    
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-2">Event Identifier</Label>
                        <Input 
                          placeholder="e.g. Hyderabad Open 2024" 
                          className="h-16 bg-[#F8FAFC] border-[#E2E8F0] rounded-[18px] px-8 font-black text-xl text-[#0B1F3A] focus:border-sky-500 transition-all" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-2">Circuit Start</Label>
                          <Input 
                            type="date" 
                            className="h-14 bg-[#F8FAFC] border-[#E2E8F0] rounded-[18px] px-6 font-bold" 
                            value={formData.startDate}
                            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-2">Circuit End</Label>
                          <Input 
                            type="date" 
                            className="h-14 bg-[#F8FAFC] border-[#E2E8F0] rounded-[18px] px-6 font-bold" 
                            value={formData.endDate}
                            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-2">Event City</Label>
                        <div className="relative">
                          <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-500" />
                          <Input 
                            placeholder="e.g. Bangalore" 
                            className="h-14 bg-[#F8FAFC] border-[#E2E8F0] rounded-[18px] pl-14 px-6 font-bold" 
                            value={formData.city}
                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="lg:col-span-5 space-y-8">
                  <section className="glass-panel p-10 rounded-[3.5rem] space-y-8 border-slate-200 bg-white">
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                       <Settings className="h-6 w-6 text-sky-500" />
                       <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">Format Protocol</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <button 
                        onClick={() => setFormat('elimination')}
                        className={cn(
                          "w-full p-6 rounded-[22px] border-2 transition-all text-left flex items-center gap-6 group",
                          format === 'elimination' ? "bg-[#0B1F3A] border-[#0B1F3A] text-white shadow-xl" : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-sky-500/50"
                        )}
                      >
                        <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center transition-colors", format === 'elimination' ? "bg-sky-500 text-white" : "bg-white text-slate-400 group-hover:text-sky-500 shadow-sm")}>
                          <Shield className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-black text-lg leading-tight uppercase">Elimination</p>
                          <p className={cn("text-[10px] font-bold uppercase tracking-widest mt-1", format === 'elimination' ? "text-sky-400" : "text-slate-400")}>Standard Bracket Logic</p>
                        </div>
                      </button>

                      <button 
                        onClick={() => setFormat('round-robin')}
                        className={cn(
                          "w-full p-6 rounded-[22px] border-2 transition-all text-left flex items-center gap-6 group",
                          format === 'round-robin' ? "bg-[#0B1F3A] border-[#0B1F3A] text-white shadow-xl" : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-sky-500/50"
                        )}
                      >
                        <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center transition-colors", format === 'round-robin' ? "bg-sky-500 text-white" : "bg-white text-slate-400 group-hover:text-sky-500 shadow-sm")}>
                          <ListOrdered className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-black text-lg leading-tight uppercase">Round Robin</p>
                          <p className={cn("text-[10px] font-bold uppercase tracking-widest mt-1", format === 'round-robin' ? "text-sky-400" : "text-slate-400")}>Group Stage Intelligence</p>
                        </div>
                      </button>

                      <button 
                        onClick={() => setFormat('league')}
                        className={cn(
                          "w-full p-6 rounded-[22px] border-2 transition-all text-left flex items-center gap-6 group",
                          format === 'league' ? "bg-[#0B1F3A] border-[#0B1F3A] text-white shadow-xl" : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-sky-500/50"
                        )}
                      >
                        <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center transition-colors", format === 'league' ? "bg-sky-500 text-white" : "bg-white text-slate-400 group-hover:text-sky-500 shadow-sm")}>
                          <Layers className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-black text-lg leading-tight uppercase">League</p>
                          <p className={cn("text-[10px] font-bold uppercase tracking-widest mt-1", format === 'league' ? "text-sky-400" : "text-slate-400")}>Points-Based Ranking</p>
                        </div>
                      </button>
                    </div>

                    <div className="pt-4">
                      <Button 
                        onClick={handleInitialize}
                        disabled={isLoading}
                        className="w-full h-20 bg-gradient-to-r from-[#0B1F3A] to-sky-600 text-white font-black text-xl rounded-[25px] shadow-2xl hover:translate-y-[-2px] transition-all group active:scale-95"
                      >
                        {isLoading ? <Loader2 className="h-8 w-8 animate-spin" /> : "START CIRCUIT"}
                        {!isLoading && <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />}
                      </Button>
                    </div>
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
                <div className="bg-green-500/10 w-24 h-24 rounded-[3rem] flex items-center justify-center mx-auto text-green-500 shadow-2xl border border-green-500/20">
                  <Check className="h-12 w-12 stroke-[4px]" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-4xl font-black tracking-tighter uppercase italic text-[#0B1F3A]">Link Synchronized</h2>
                  <p className="text-slate-500 font-medium text-lg">Your tournament registration portal is now operational. Athletes can register via the unique URL below.</p>
                </div>
              </div>

              <div className="glass-panel p-10 rounded-[3.5rem] space-y-6 bg-[#0B1F3A] text-white border-none shadow-2xl">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-sky-400 ml-2">Public Registration URL</Label>
                  <div className="flex gap-2 p-2 bg-black/40 rounded-[22px] border border-white/10">
                    <div className="flex-1 px-4 flex items-center overflow-hidden">
                      <p className="text-sm font-mono font-bold text-sky-500/80 truncate">{registrationLink}</p>
                    </div>
                    <Button 
                      onClick={handleCopyLink}
                      className={cn(
                        "h-14 px-8 rounded-[18px] font-black transition-all border-none shadow-xl",
                        copied ? "bg-green-500 text-white" : "bg-sky-500 text-white hover:bg-sky-400"
                      )}
                    >
                      {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5 mr-2" />}
                      {copied ? "COPIED" : "COPY URL"}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button 
                  onClick={() => navigate('/smashed')}
                  className="w-full h-18 py-8 bg-[#0B1F3A] text-white font-black rounded-[25px] hover:bg-sky-600 transition-all text-xl uppercase tracking-widest shadow-2xl"
                >
                  ACCESS DASHBOARD <ArrowRight className="ml-3 h-6 w-6" />
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