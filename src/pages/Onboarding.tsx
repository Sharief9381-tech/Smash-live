"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Flag, Activity, ArrowRight, Zap, Target, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from '@/utils/toast';
import { COUNTRIES_DATA } from '@/data/locations';

const Onboarding = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    state: "",
    category: "singles",
    hand: "right",
    height: ""
  });

  const availableStates = formData.country ? COUNTRIES_DATA[formData.country] : [];

  const handleComplete = () => {
    if (!formData.name || !formData.country || !formData.state) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const currentSession = JSON.parse(localStorage.getItem('userProfile') || '{}');
      const finalProfile = {
        ...currentSession,
        ...formData,
        image: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop",
        onboardingComplete: true,
        smashId: `Smash#${Math.floor(Math.random() * 9000) + 1000}`
      };
      
      // Save to "database" and session
      const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
      users.push(finalProfile);
      localStorage.setItem('registered_users', JSON.stringify(users));
      localStorage.setItem('userProfile', JSON.stringify(finalProfile));
      localStorage.setItem('isLoggedIn', 'true');
      
      showSuccess("Athlete Dossier Initialized!");
      navigate('/court');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl space-y-8 relative z-10"
      >
        <div className="text-center space-y-4">
          <div className="bg-[#0B1F3A] w-16 h-16 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl">
            <Zap className="h-8 w-8 text-sky-400 fill-current" />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-[#0B1F3A] tracking-tighter uppercase italic">Athlete Dossier</h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Configure your global intelligence profile</p>
          </div>
        </div>

        <div className="glass-panel p-10 rounded-[3.5rem] border-white shadow-2xl space-y-8 bg-white/90">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Viktor Axelsen" 
                className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold focus:border-sky-500 shadow-sm"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Country</Label>
              <Select value={formData.country} onValueChange={(v) => setFormData({...formData, country: v, state: ""})}>
                <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-100">
                  {Object.keys(COUNTRIES_DATA).sort().map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">State / Region</Label>
              <Select disabled={!formData.country} value={formData.state} onValueChange={(v) => setFormData({...formData, state: v})}>
                <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold">
                  <SelectValue placeholder={formData.country ? "Select State" : "Pick Country First"} />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-100">
                  {availableStates.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-black uppercase italic">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-100">
                  <SelectItem value="singles">Singles</SelectItem>
                  <SelectItem value="doubles">Doubles</SelectItem>
                  <SelectItem value="mixed">Mixed Doubles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Main Hand</Label>
              <Select value={formData.hand} onValueChange={(v) => setFormData({...formData, hand: v})}>
                <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-100">
                  <SelectItem value="right">Right Handed</SelectItem>
                  <SelectItem value="left">Left Handed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Height (cm)</Label>
              <Input 
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({...formData, height: e.target.value})}
                placeholder="194" 
                className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold focus:border-sky-500 shadow-sm"
              />
            </div>
          </div>

          <Button 
            onClick={handleComplete}
            disabled={isLoading || !formData.name || !formData.country || !formData.state}
            className="w-full h-18 bg-[#0B1F3A] text-white font-black text-lg rounded-[2rem] shadow-2xl hover:bg-sky-500 transition-all group border-none"
          >
            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "SYNC TO GLOBAL NETWORK"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;