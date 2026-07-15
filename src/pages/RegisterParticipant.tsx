"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, User, ArrowRight, Zap, Check, Loader2, Phone, Fingerprint, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showSuccess, showError } from '@/utils/toast';

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
    smashId: ""
  });

  useEffect(() => {
    // Small delay to ensure storage is ready and prevent UI flicker
    const timer = setTimeout(() => {
      const tourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      const found = tourneys.find((t: any) => t.slug === slug);
      if (found) {
        setTournament(found);
      }
      setIsInitializing(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [slug]);

  const handleRegister = () => {
    if (!formData.name || !formData.phone || !formData.smashId) {
      showError("Please complete all registration fields.");
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      const tourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      const updatedTourneys = tourneys.map((t: any) => {
        if (t.slug === slug) {
          const participants = t.participants || [];
          // Ensure we don't add duplicate Smash IDs for this specific tournament
          if (participants.some((existing: any) => existing.smashId === formData.smashId)) {
            setIsLoading(false);
            showError("This Smash ID is already registered for this event.");
            return t;
          }
          return { 
            ...t, 
            participants: [...participants, { ...formData, id: Date.now() }] 
          };
        }
        return t;
      });
      
      localStorage.setItem('active_studio_tournaments', JSON.stringify(updatedTourneys));
      setIsLoading(false);
      setIsSuccess(true);
      showSuccess("Athlete Dossier submitted successfully!");
    }, 1200);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 text-[#1DA1F2] animate-spin" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Validating Circuit Link...</p>
      </div>
    );
  }

  if (!tournament && !isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8 max-w-sm">
          <div className="bg-red-50 w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto text-red-500 shadow-xl border border-red-100">
            <AlertCircle className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-[#071D49] tracking-tighter uppercase italic">Circuit Not Found</h1>
            <p className="text-slate-500 font-medium leading-relaxed">The registration link you used is invalid or the tournament has been archived by the organizer.</p>
          </div>
          <Button 
            onClick={() => navigate('/')} 
            className="w-full h-14 bg-[#071D49] text-white font-black rounded-2xl shadow-xl hover:bg-[#1DA1F2] transition-all"
          >
            RETURN TO HOME
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1DA1F2]/5 blur-[120px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[500px] space-y-8 relative z-10"
      >
        <div className="text-center space-y-4">
          <div className="bg-[#071D49] w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-navy/20">
            <Trophy className="h-10 w-10 text-[#1DA1F2]" />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-[#071D49] tracking-tighter uppercase italic">
              {tournament?.name}
            </h1>
            <p className="text-[#64748B] font-bold uppercase text-[10px] tracking-[0.3em]">Event Registration Registry</p>
          </div>
        </div>

        <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl border border-[#E2E8F0] space-y-8">
          {!isSuccess ? (
            <div className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-2">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#94A3B8]" />
                    <Input 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Viktor Axelsen" 
                      className="h-14 bg-[#F8FAFC] border-[#E2E8F0] rounded-[18px] pl-12 font-bold text-[#071D49] focus:border-[#1DA1F2]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-2">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#94A3B8]" />
                    <Input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Enter mobile number" 
                      className="h-14 bg-[#F8FAFC] border-[#E2E8F0] rounded-[18px] pl-12 font-bold text-[#071D49] focus:border-[#1DA1F2]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-2">Smash ID</Label>
                  <div className="relative">
                    <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#94A3B8]" />
                    <Input 
                      value={formData.smashId}
                      onChange={(e) => setFormData({...formData, smashId: e.target.value})}
                      placeholder="e.g. Smash#1234" 
                      className="h-14 bg-[#F8FAFC] border-[#E2E8F0] rounded-[18px] pl-12 font-bold text-[#071D49] focus:border-[#1DA1F2] uppercase"
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleRegister}
                disabled={isLoading || !formData.name}
                className="w-full h-16 bg-[#071D49] text-white font-black text-lg rounded-[22px] shadow-xl hover:bg-[#1DA1F2] transition-all group"
              >
                {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "JOIN TOURNAMENT"}
                {!isLoading && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
              </Button>
            </div>
          ) : (
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center space-y-6">
              <div className="h-20 w-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-lg">
                <Check className="h-10 w-10 stroke-[3px]" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-[#071D49] tracking-tight italic uppercase">Registration Complete</h2>
                <p className="text-slate-500 font-medium">Your entry has been synchronized with the tournament director.</p>
              </div>
              <Button onClick={() => navigate('/')} className="w-full h-14 bg-[#071D49] text-white font-black rounded-2xl hover:bg-[#1DA1F2] transition-all uppercase tracking-widest text-xs">Return Home</Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterParticipant;