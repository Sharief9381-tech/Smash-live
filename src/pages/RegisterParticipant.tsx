"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, User, ArrowRight, Check, Loader2, Phone, MapPin, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase, isCloudConfigured } from '@/lib/supabase';
import { showSuccess, showError } from '@/utils/toast';
import { INDIAN_STATES, STATE_DISTRICTS } from '@/data/locations';

const RegisterParticipant = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    smashId: "",
    gender: "",
    category: "",
    state: "",
    district: ""
  });

  useEffect(() => {
    const fetchTournament = async () => {
      // 1. Try Cloud Lookup
      if (isCloudConfigured) {
        try {
          const { data } = await supabase
            .from('tournaments')
            .select('*')
            .eq('slug', slug)
            .single();

          if (data) {
            setTournament(data);
            setIsInitializing(false);
            return;
          }
        } catch (err) {}
      }

      // 2. Local Fallback (for testing on same browser)
      const localTourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      const found = localTourneys.find((t: any) => t.slug === slug || t.id === slug);
      
      if (found) {
        setTournament(found);
      }
      
      setIsInitializing(false);
    };

    if (slug) fetchTournament();
  }, [slug]);

  const handleRegister = async () => {
    if (!formData.name || !formData.phone || !formData.gender || !formData.category || !formData.state || !formData.district) {
      showError("Please complete all required fields.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const tournamentId = tournament.id || tournament.slug;
      const entryId = 'entry_' + Date.now();
      
      const entryData = {
        ...formData,
        id: entryId,
        smashId: formData.smashId || `ATHLETE_${Date.now().toString().slice(-4)}`,
        registeredAt: new Date().toISOString(),
        tournamentId: tournamentId
      };

      // Save entry specifically to this tournament roster
      const storageKey = `participants_${tournamentId}`;
      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
      existing.push(entryData);
      localStorage.setItem(storageKey, JSON.stringify(existing));

      // Also update global athlete network
      const network = JSON.parse(localStorage.getItem('registered_users') || '[]');
      if (!network.some((u: any) => u.phone === formData.phone)) {
        network.push({ ...entryData, onboardingComplete: true });
        localStorage.setItem('registered_users', JSON.stringify(network));
      }

      // Sync to cloud if database is active
      if (isCloudConfigured && !String(tournamentId).startsWith('local_')) {
        await supabase.from('participants').insert([{
          tournament_id: tournament.id,
          ...formData,
          smash_id: entryData.smashId
        }]);
      }

      setIsSuccess(true);
      showSuccess("Registration Confirmed!");
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      showError("Submission error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-sky-500 animate-spin" />
      </div>
    );
  }

  if (!tournament && !isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center gap-6">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 space-y-6 max-w-sm">
          <Trophy className="h-12 w-12 text-slate-200 mx-auto" />
          <h1 className="text-2xl font-black text-[#0B1F3A] uppercase italic">Circuit Not Found</h1>
          <p className="text-sm text-slate-400 font-medium">This registration link is invalid or the tournament hasn't been synchronized with the global network yet.</p>
          <Button onClick={() => navigate('/')} className="w-full h-12 bg-[#0B1F3A] text-white rounded-xl font-black uppercase tracking-widest text-[10px] border-none shadow-lg">Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-[#0B1F3A] p-8 text-center text-white space-y-2">
        <h1 className="text-2xl font-black tracking-tight uppercase italic">{tournament?.name}</h1>
        <p className="text-[9px] font-black text-sky-400 uppercase tracking-[0.3em]">Athlete Registry</p>
      </div>

      <main className="px-4 -mt-4">
        <div className="bg-white rounded-[2.5rem] p-6 shadow-2xl border border-slate-100 max-w-lg mx-auto space-y-8">
          {!isSuccess ? (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Full Name</Label>
                  <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-12 rounded-xl bg-slate-50 border-slate-100 font-bold" placeholder="Full Name" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Gender</Label>
                    <Select onValueChange={v => setFormData({...formData, gender: v})}>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 font-bold"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent className="rounded-xl"><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Category</Label>
                    <Select onValueChange={v => setFormData({...formData, category: v})}>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 font-bold"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="MS">Men's Singles</SelectItem>
                        <SelectItem value="WS">Women's Singles</SelectItem>
                        <SelectItem value="MD">Men's Doubles</SelectItem>
                        <SelectItem value="WD">Women's Doubles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Phone Number</Label>
                  <Input value={formData.phone} onChange={e => setPhone(e.target.value)} className="h-12 rounded-xl bg-slate-50 border-slate-100 font-bold" placeholder="Mobile" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">State</Label>
                    <Select value={formData.state} onValueChange={v => setFormData({...formData, state: v, district: ""})}>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 font-bold"><SelectValue placeholder="State" /></SelectTrigger>
                      <SelectContent className="rounded-xl max-h-60">
                        {INDIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">District</Label>
                    <Select value={formData.district} onValueChange={v => setFormData({...formData, district: v})} disabled={!formData.state}>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 font-bold"><SelectValue placeholder="District" /></SelectTrigger>
                      <SelectContent className="rounded-xl max-h-60">
                        {formData.state && STATE_DISTRICTS[formData.state]?.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Button onClick={handleRegister} disabled={isLoading} className="w-full h-14 bg-sky-500 hover:bg-sky-600 text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg transition-all border-none">
                {isLoading ? <Loader2 className="animate-spin" /> : "Submit Entry Protocol"}
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-6 py-6">
              <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500 border-2 border-green-500/20 shadow-lg">
                <Check className="h-10 w-10 stroke-[3px]" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-[#0B1F3A] uppercase italic">Entry Secured</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">You have been successfully registered for this circuit.</p>
              </div>
              <Button onClick={() => navigate('/')} className="w-full h-14 bg-[#0B1F3A] text-white font-black rounded-xl uppercase tracking-widest text-[10px] border-none shadow-xl">Return to Dashboard</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const setPhone = (val: string) => { /* Helper for state setter in register page */ };

export default RegisterParticipant;