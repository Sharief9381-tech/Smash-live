"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trophy, Check, Loader2, ChevronLeft, MapPin, Calendar, QrCode, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase, isCloudConfigured } from '@/lib/supabase';
import { showSuccess, showError } from '@/utils/toast';
import { motion, AnimatePresence } from 'framer-motion';

const CreateTournament = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showLinkState, setShowLinkState] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", startDate: "", city: "" });
  const [slug, setSlug] = useState("");

  const handleInitialize = async () => {
    if (!formData.name || !formData.startDate || !formData.city) {
      showError("Please fill in all the details.");
      return;
    }

    setIsLoading(true);
    const generatedSlug = formData.name.trim().toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substring(7);

    try {
      if (isCloudConfigured) {
        const { error } = await supabase
          .from('tournaments')
          .insert([{
            name: formData.name,
            slug: generatedSlug,
            start_date: formData.startDate,
            city: formData.city,
            format: 'elimination',
            status: 'Accepting'
          }]);
        if (error) throw error;
      }

      // Save locally as well for the list
      const active = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      active.push({ ...formData, id: 'local_' + Date.now(), slug: generatedSlug, status: 'Live' });
      localStorage.setItem('active_studio_tournaments', JSON.stringify(active));

      setSlug(generatedSlug);
      setShowLinkState(true);
      showSuccess("Tournament started!");
    } catch (err: any) {
      showError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const registrationLink = `${window.location.origin}/register/${slug}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(registrationLink)}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="container max-w-lg px-4 py-6">
        <AnimatePresence mode="wait">
          {!showLinkState ? (
            <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Top Header & Action Row */}
              <div className="flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-400 hover:text-[#0B1F3A]">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-black text-[#0B1F3A] uppercase italic">New Tournament</h1>
                <Button 
                  onClick={handleInitialize} 
                  disabled={isLoading}
                  className="h-10 bg-[#0B1F3A] text-white px-6 rounded-xl font-black text-[10px] uppercase tracking-widest"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Start"}
                </Button>
              </div>

              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Tournament Name</Label>
                    <div className="relative">
                      <Trophy className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                      <Input 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        className="h-12 pl-11 rounded-xl bg-slate-50 border-slate-100 font-bold" 
                        placeholder="e.g. Mumbai Open" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Location / City</Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                      <Input 
                        value={formData.city} 
                        onChange={e => setFormData({...formData, city: e.target.value})} 
                        className="h-12 pl-11 rounded-xl bg-slate-50 border-slate-100 font-bold" 
                        placeholder="City" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Start Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                      <Input 
                        type="date" 
                        value={formData.startDate} 
                        onChange={e => setFormData({...formData, startDate: e.target.value})} 
                        className="h-12 pl-11 rounded-xl bg-slate-50 border-slate-100 font-bold" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">
                Tournament details will be public once started.
              </p>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="space-y-8 text-center pt-10">
              <div className="bg-green-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-lg border border-green-100">
                <Check className="h-10 w-10 stroke-[3px]" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-[#0B1F3A] italic uppercase leading-none">Circuit Initialized</h2>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Registrations are now open</p>
              </div>

              <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-2xl space-y-8">
                 <div className="flex flex-col items-center gap-6">
                    <div className="p-4 bg-white rounded-3xl border-4 border-[#0B1F3A]/5 shadow-inner">
                       <img src={qrUrl} alt="Registration QR" className="w-40 h-40" />
                    </div>
                    <div className="space-y-2 w-full">
                       <Label className="text-[9px] font-black uppercase text-slate-400">Direct Entry Link</Label>
                       <div className="flex gap-2">
                          <div className="flex-1 h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 flex items-center overflow-hidden">
                             <span className="text-[10px] font-mono text-slate-500 truncate">{registrationLink}</span>
                          </div>
                          <Button 
                            onClick={() => { navigator.clipboard.writeText(registrationLink); setCopied(true); setTimeout(() => setCopied(false), 2000); }} 
                            className="h-12 w-12 bg-[#0B1F3A] text-white rounded-xl shadow-lg shrink-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button onClick={() => navigate('/tournaments')} className="h-16 bg-[#0B1F3A] text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl">
                  GO TO TOURNAMENTS
                </Button>
                <button onClick={() => navigate('/')} className="text-[10px] font-black text-slate-400 uppercase underline decoration-2">Return Home</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default CreateTournament;