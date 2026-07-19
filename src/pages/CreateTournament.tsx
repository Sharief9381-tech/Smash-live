"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trophy, Zap, Settings, Shield, ListOrdered, Layers, ArrowRight, Loader2, Copy, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { showSuccess, showError } from '@/utils/toast';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const CreateTournament = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showLinkState, setShowLinkState] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", startDate: "", endDate: "", city: "" });
  const [format, setFormat] = useState<'elimination' | 'round-robin' | 'league'>('elimination');
  const [slug, setSlug] = useState("");

  const handleInitialize = async () => {
    if (!formData.name || !formData.startDate || !formData.city) {
      showError("Please complete all intelligence fields.");
      return;
    }

    setIsLoading(true);
    const generatedSlug = formData.name.trim().toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substring(7);

    try {
      const { data, error } = await supabase
        .from('tournaments')
        .insert([{
          name: formData.name,
          slug: generatedSlug,
          start_date: formData.startDate,
          end_date: formData.endDate,
          city: formData.city,
          format: format,
          status: 'Accepting'
        }])
        .select()
        .single();

      if (error) throw error;

      setSlug(generatedSlug);
      setShowLinkState(true);
      showSuccess("Circuit synchronized to cloud.");
    } catch (err: any) {
      showError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const registrationLink = `${window.location.origin}/register/${slug}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="container max-w-6xl px-6 py-12">
        <AnimatePresence mode="wait">
          {!showLinkState ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
               <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0B1F3A]/5 p-2.5 rounded-xl text-sky-500">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-black text-[#0B1F3A] uppercase tracking-[0.3em]">Operational Protocol</span>
                </div>
                <h1 className="text-6xl font-black tracking-tighter text-[#0B1F3A] uppercase italic">Initialize Event</h1>
              </div>

              <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7">
                  <section className="glass-panel p-10 rounded-[3.5rem] bg-white border-slate-200 space-y-8">
                    <div className="space-y-6">
                      <Label className="text-[10px] font-black uppercase text-slate-400">Event Identifier</Label>
                      <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-14 rounded-2xl" placeholder="e.g. Mumbai Open" />
                      <div className="grid grid-cols-2 gap-4">
                        <Input type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="h-14 rounded-2xl" />
                        <Input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="h-14 rounded-2xl" placeholder="City" />
                      </div>
                    </div>
                  </section>
                </div>
                <div className="lg:col-span-5">
                   <Button onClick={handleInitialize} disabled={isLoading} className="w-full h-20 bg-[#0B1F3A] text-white font-black rounded-[2rem]">
                     {isLoading ? <Loader2 className="animate-spin" /> : "START CIRCUIT"}
                   </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="max-w-xl mx-auto space-y-8 text-center">
              <div className="bg-green-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-green-500"><Check className="h-12 w-12" /></div>
              <h2 className="text-4xl font-black text-[#0B1F3A]">Link Synchronized</h2>
              <div className="p-8 bg-[#0B1F3A] rounded-[2rem] text-white">
                <p className="text-xs font-mono break-all opacity-70 mb-4">{registrationLink}</p>
                <Button onClick={() => { navigator.clipboard.writeText(registrationLink); setCopied(true); }} className="w-full bg-sky-500">
                  {copied ? "COPIED" : "COPY LINK"}
                </Button>
              </div>
              <Button onClick={() => navigate('/smashed')} variant="outline" className="w-full h-14 rounded-2xl">Enter Dashboard</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default CreateTournament;