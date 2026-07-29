"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, User, ArrowRight, Check, Loader2, Phone, Fingerprint, MapPin, ChevronLeft } from 'lucide-react';
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
      // 1. Try Cloud First
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

      // 2. Fallback to Local Session
      const localTourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      const localMatch = localTourneys.find((t: any) => t.slug === slug || t.id === slug);
      
      if (localMatch) {
        setTournament(localMatch);
      }
      
      setIsInitializing(false);
    };

    if (slug) fetchTournament();
  }, [slug]);

  const handleRegister = async () => {
    if (!formData.name || !formData.phone || !formData.gender || !formData.category || !formData.state || !formData.district) {
      showError("Please complete all registration fields.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const tournamentId = tournament.id || tournament.slug;
      
      // Save to a tournament-specific local storage key so the admin can see it
      const participantData = {
        ...formData,
        smashId: formData.smashId || `GUEST_${Date.now()}`,
        registeredAt: new Date().toISOString(),
        tournamentId: tournamentId
      };

      const storageKey = `participants_${tournamentId}`;
      const existingParticipants = JSON.parse(localStorage.getItem(storageKey) || '[]');
      existingParticipants.push(participantData);
      localStorage.setItem(storageKey, JSON.stringify(existingParticipants));

      // Also add to global athlete registry for the network
      const globalRegistry = JSON.parse(localStorage.getItem('registered_users') || '[]');
      if (!globalRegistry.some((u: any) => u.phone === formData.phone)) {
        globalRegistry.push({ ...participantData, onboardingComplete: true });
        localStorage.setItem('registered_users', JSON.stringify(globalRegistry));
      }

      // Cloud sync if available
      if (isCloudConfigured && !String(tournamentId).startsWith('local_')) {
        await supabase
          .from('participants')
          .insert([{
            tournament_id: tournament.id,
            ...formData,
            smash_id: participantData.smashId
          }]);
      }

      setIsSuccess(true);
      showSuccess("Entry Verified!");
    } catch (err: any) {
      showError("Sync error. Please retry.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 text-sky-500 animate-spin" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Validating Circuit...</p>
      </div>
    );
  }

  if (!tournament && !isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8 max-w-sm">
          <div className="bg-red-50 w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto text-red-500 shadow-xl border border-red-100">
            <Trophy className="h-10 w-10 opacity-20" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-[#0B1F3A] uppercase italic">Circuit Not Found</h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest leading-relaxed">
              The registration protocol for this circuit is not active on this node.
            </p>
          </div>
          <Button onClick={() => navigate('/')} className="w-full h-14 bg-[#0B1F3A] text-white font-black rounded-2xl shadow-xl uppercase tracking-widest text-[10px] border-none">
            Return to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <div className="bg-[#0B1F3A] p-8 pb-16 text-center space-y-4">
         <button onClick={() => navigate('/')} className="absolute top-6 left-6 text-white/40 hover:text-white transition-colors">
            <ChevronLeft className="h-6 w-6" />
         </button>
         <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border border-white/10">
            <Trophy className="h-8 w-8 text-sky-400" />
         </div>
         <div className="space-y-1">
            <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic truncate px-4">{tournament?.name}</h1>
            <p className="text-sky-400 font-bold uppercase text-[9px] tracking-[0.3em]">Athlete Entry Portal</p>
         </div>
      </div>

      <main className="px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 space-y-8 max-w-lg mx-auto">
          {!isSuccess ? (
            <div className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <Input 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter Full Name" 
                      className="h-12 bg-slate-50 border-slate-100 rounded-xl pl-12 font-bold text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">Gender</Label>
                    <Select value={formData.gender} onValueChange={(v) => setFormData({...formData, gender: v})}>
                      <SelectTrigger className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">Category</Label>
                    <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                      <SelectTrigger className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
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
                    <Input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      placeholder="10-digit Mobile" 
                      className="h-12 bg-slate-50 border-slate-100 rounded-xl pl-12 font-bold text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">State</Label>
                    <Select value={formData.state} onValueChange={(v) => setFormData({...formData, state: v, district: ""})}>
                      <SelectTrigger className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold text-sm"><SelectValue placeholder="Select State" /></SelectTrigger>
                      <SelectContent className="rounded-xl max-h-[300px]">
                        {INDIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">District</Label>
                    <Select value={formData.district} onValueChange={(v) => setFormData({...formData, district: v})} disabled={!formData.state}>
                      <SelectTrigger className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent className="rounded-xl max-h-[300px]">
                        {formData.state && STATE_DISTRICTS[formData.state]?.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleRegister}
                disabled={isLoading}
                className="w-full h-14 bg-sky-500 hover:bg-sky-600 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-xl transition-all border-none"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify & Submit Entry"}
              </Button>
            </div>
          ) : (
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center space-y-6 py-4">
              <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500 border border-green-500/20">
                <Check className="h-10 w-10 stroke-[3px]" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-black text-[#0B1F3A] uppercase italic leading-none">Entry Secured</h2>
                <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">You have been registered for the tournament.</p>
              </div>
              <Button onClick={() => navigate('/')} className="w-full h-14 bg-[#0B1F3A] text-white font-black rounded-xl uppercase tracking-widest text-[10px] border-none shadow-lg">Return Home</Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RegisterParticipant;