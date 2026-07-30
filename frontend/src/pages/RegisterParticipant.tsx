"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, User, ArrowRight, Check, Loader2, Phone, MapPin, ChevronLeft, Globe } from 'lucide-react';
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
      if (!slug) return;
      
      // 1. Try Cloud Lookup first if configured
      if (isCloudConfigured) {
        try {
          const { data, error } = await supabase
            .from('tournaments')
            .select('*')
            .eq('slug', slug)
            .single();

          if (data && !error) {
            setTournament(data);
            setIsInitializing(false);
            return;
          }
        } catch (err) {}
      }

      // 2. Local Fallback (Only works on the same browser/device)
      const localTourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      // Search by slug or ID to be safe
      const found = localTourneys.find((t: any) => 
        String(t.slug) === slug || 
        String(t.id) === slug || 
        String(t.name).toLowerCase().replace(/\s+/g, '-') === slug
      );
      
      if (found) {
        setTournament(found);
      }
      
      setIsInitializing(false);
    };

    fetchTournament();
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

      // Save entry to local storage for this tournament roster
      const storageKey = `participants_${tournamentId}`;
      const existingEntries = JSON.parse(localStorage.getItem(storageKey) || '[]');
      existingEntries.push(entryData);
      localStorage.setItem(storageKey, JSON.stringify(existingEntries));

      // Add to global local registry for the athlete network
      const globalNetwork = JSON.parse(localStorage.getItem('registered_users') || '[]');
      if (!globalNetwork.some((u: any) => u.phone === formData.phone)) {
        globalNetwork.push({ ...entryData, onboardingComplete: true });
        localStorage.setItem('registered_users', JSON.stringify(globalNetwork));
      }

      // Sync to cloud if database is active
      if (isCloudConfigured && !String(tournamentId).startsWith('local_')) {
        await supabase.from('participants').insert([{
          tournament_id: tournament.id,
          name: formData.name,
          phone: formData.phone,
          gender: formData.gender,
          category: formData.category,
          state: formData.state,
          district: formData.district,
          smash_id: entryData.smashId
        }]);
      }

      setIsSuccess(true);
      showSuccess("Entry Registered!");
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      showError("Submission failed. Check connection.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 text-sky-500 animate-spin" />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accessing Registry...</p>
        </div>
      </div>
    );
  }

  if (!tournament && !isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center gap-6">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 space-y-6 max-w-sm">
          <div className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
             <Trophy className="h-8 w-8 text-red-300" />
          </div>
          <h1 className="text-2xl font-black text-[#0B1F3A] uppercase italic">Circuit Not Found</h1>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">
            This registration link is currently only active on the device where it was created. 
            <br/><br/>
            <span className="text-sky-600 font-bold">To share this link with others, please connect a database in the Integrations tab.</span>
          </p>
          <Button onClick={() => navigate('/')} className="w-full h-12 bg-[#0B1F3A] text-white rounded-xl font-black uppercase tracking-widest text-[10px] border-none shadow-lg">Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <div className="bg-[#0B1F3A] p-8 pb-16 text-center text-white space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <button onClick={() => navigate('/')} className="absolute top-6 left-6 text-white/40 hover:text-white transition-colors z-20">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 relative z-10">
           <Globe className="h-3 w-3 text-sky-400" />
           <span className="text-[9px] font-black uppercase tracking-widest">Tournament Registry</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight uppercase italic relative z-10">{tournament?.name}</h1>
        <p className="text-[9px] font-black text-sky-400 uppercase tracking-[0.3em] relative z-10">Athlete Protocol Entry</p>
      </div>

      <main className="px-6 -mt-8 relative z-30">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 max-w-lg mx-auto space-y-8">
          {!isSuccess ? (
            <div className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">Athlete Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <Input 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                      className="h-12 rounded-xl bg-slate-50 border-slate-100 font-bold text-sm pl-12" 
                      placeholder="Enter Full Name" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">Gender</Label>
                    <Select onValueChange={v => setFormData({...formData, gender: v})}>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 font-bold text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">Category</Label>
                    <Select onValueChange={v => setFormData({...formData, category: v})}>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 font-bold text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="MS">Men's Singles</SelectItem>
                        <SelectItem value="WS">Women's Singles</SelectItem>
                        <SelectItem value="MD">Men's Doubles</SelectItem>
                        <SelectItem value="WD">Women's Doubles</SelectItem>
                        <SelectItem value="XD">Mixed Doubles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">Contact Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <div className="absolute left-10 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">+91</div>
                    <Input 
                      value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, "")})} 
                      className="h-12 rounded-xl bg-slate-50 border-slate-100 font-bold text-sm pl-16" 
                      placeholder="10-digit Mobile" 
                      maxLength={10}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">State</Label>
                    <Select value={formData.state} onValueChange={v => setFormData({...formData, state: v, district: ""})}>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 font-bold text-sm"><SelectValue placeholder="State" /></SelectTrigger>
                      <SelectContent className="rounded-xl max-h-60">
                        {INDIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">District</Label>
                    <Select value={formData.district} onValueChange={v => setFormData({...formData, district: v})} disabled={!formData.state}>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 font-bold text-sm"><SelectValue placeholder="District" /></SelectTrigger>
                      <SelectContent className="rounded-xl max-h-60">
                        {formData.state && STATE_DISTRICTS[formData.state]?.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleRegister} 
                disabled={isLoading} 
                className="w-full h-14 bg-sky-500 hover:bg-sky-600 text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-xl transition-all border-none active:scale-95"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Verify & Submit Entry"}
              </Button>
            </div>
          ) : (
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center space-y-6 py-6">
              <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500 border-2 border-green-500/20 shadow-lg">
                <Check className="h-10 w-10 stroke-[3px]" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-[#0B1F3A] uppercase italic">Entry Secured</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                  You have been successfully synchronized with the tournament roster.
                </p>
              </div>
              <Button onClick={() => navigate('/')} className="w-full h-14 bg-[#0B1F3A] text-white font-black rounded-xl uppercase tracking-widest text-[10px] border-none shadow-xl active:scale-95 transition-all">Return to Dashboard</Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RegisterParticipant;