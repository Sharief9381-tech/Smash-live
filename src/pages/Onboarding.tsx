"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Flag, Activity, ArrowRight, Zap, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess } from '@/utils/toast';

const Onboarding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    country: "Indonesia",
    state: "Jakarta",
    category: "singles",
    hand: "right",
    height: ""
  });

  const handleComplete = () => {
    if (!formData.name) return;
    
    // Save to local storage for the dossier
    const currentProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const updatedProfile = {
      ...currentProfile,
      ...formData,
      image: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop",
      onboardingComplete: true
    };
    
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    showSuccess("Athlete Dossier Initialized!");
    navigate('/court');
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
          <div className="bg-[#0B1F3A] w-16 h-16 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-navy/20">
            <Zap className="h-8 w-8 text-sky-400 fill-current" />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-[#0B1F3A] tracking-tighter uppercase italic">Athlete Onboarding</h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Configure your global intelligence profile</p>
          </div>
        </div>

        <div className="glass-panel p-12 rounded-[4rem] border-white shadow-2xl space-y-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Viktor Axelsen" 
                  className="h-14 bg-slate-50 border-slate-100 rounded-2xl pl-11 font-bold focus:border-sky-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Country</Label>
              <div className="relative">
                <Flag className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 z-10" />
                <Select value={formData.country} onValueChange={(v) => setFormData({...formData, country: v})}>
                  <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl pl-11 font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-100">
                    <SelectItem value="Denmark">Denmark</SelectItem>
                    <SelectItem value="Indonesia">Indonesia</SelectItem>
                    <SelectItem value="Malaysia">Malaysia</SelectItem>
                    <SelectItem value="China">China</SelectItem>
                    <SelectItem value="Thailand">Thailand</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">State / Club Region</Label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                <Input 
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  placeholder="e.g. Jakarta" 
                  className="h-14 bg-slate-50 border-slate-100 rounded-2xl pl-11 font-bold focus:border-sky-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Main Hand</Label>
              <div className="relative">
                <Activity className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 z-10" />
                <Select value={formData.hand} onValueChange={(v) => setFormData({...formData, hand: v})}>
                  <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl pl-11 font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-100">
                    <SelectItem value="right">Right Handed</SelectItem>
                    <SelectItem value="left">Left Handed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Primary Category</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-100">
                  <SelectItem value="singles">Singles</SelectItem>
                  <SelectItem value="doubles">Doubles</SelectItem>
                  <SelectItem value="mixed">Mixed Doubles</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Height (cm)</Label>
              <div className="relative">
                <Target className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                <Input 
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: e.target.value})}
                  placeholder="e.g. 194" 
                  className="h-14 bg-slate-50 border-slate-100 rounded-2xl pl-11 font-bold focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          <Button 
            onClick={handleComplete}
            disabled={!formData.name}
            className="w-full h-20 bg-[#0B1F3A] text-white font-black text-xl rounded-[2.5rem] shadow-2xl hover:bg-sky-500 transition-all group border-none"
          >
            COMPLETE PROFILE <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;