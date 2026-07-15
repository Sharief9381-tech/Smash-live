"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, User, ArrowRight, Zap, Check, Loader2, Phone, Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showSuccess, showError } from '@/utils/toast';

const RegisterParticipant = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Registration Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    smashId: ""
  });

  useEffect(() => {
    // Attempt to find specific tournament in local studio memory
    const tourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
    const found = tourneys.find((t: any) => t.slug === slug);
    if (found) {
      setTournament(found);
    }
  }, [slug]);

  const handleRegister = () => {
    if (!formData.name || !formData.phone || !formData.smashId) {
      showError("Please complete all registration fields.");
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      // 1. Update the specific tournament's participant list
      const tourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      const updatedTourneys = tourneys.map((t: any) => {
        if (t.slug === slug) {
          return { 
            ...t, 
            participants: [...(t.participants || []), { ...formData, timestamp: new Date().toISOString() }] 
          };
        }
        return t;
      });
      localStorage.setItem('active_studio_tournaments', JSON.stringify(updatedTourneys));
      
      // 2. Add to a global registry for tracking
      const globalRegistry = JSON.parse(localStorage.getItem('global_athlete_registry') || '[]');
      globalRegistry.push({ ...formData, event: tournament?.name || "Global Entry", timestamp: new Date().toISOString() });
      localStorage.setItem('global_athlete_registry', JSON.stringify(globalRegistry));

      setIsLoading(false);
      setIsSuccess(true);
      showSuccess("Athlete Dossier submitted successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1DA1F2]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#071D49]/5 blur-[100px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[500px] space-y-8 relative z-10"
      >
        <div className="text-center space-y-4">
          <div className="bg-[#071D49] w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-navy/20">
            <Zap className="h-10 w-10 text-[#1DA1F2] fill-current" />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-[#071D49] tracking-tighter uppercase italic">
              {tournament ? tournament.name : 'Athlete Registry'}
            </h1>
            <p className="text-[#64748B] font-bold uppercase text-[10px] tracking-[0.3em]">
              {tournament ? 'Event Registration' : 'Global Player Intelligence'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[3.5rem] p-10 shadow-[0_30px_70px_rgba(7,29,73,0.1)] border border-[#E2E8F0] space-y-8">
          {!isSuccess ? (
            <div className="space-y-6">
              {/* Fallback info box if tournament is generic */}
              {!tournament && (
                <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 flex items-center gap-3">
                   <Trophy className="h-5 w-5 text-sky-500" />
                   <p className="text-[10px] font-bold text-sky-700 uppercase tracking-tight">Public Athlete Portal Active</p>
                </div>
              )}

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-2">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#94A3B8]" />
                    <Input 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Viktor Axelsen" 
                      className="h-14 bg-[#F8FAFC] border-[#E2E8F0] rounded-[18px] pl-12 font-bold text-[#071D49] focus:border-[#1DA1F2] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-2">Phone Number</Label>
                  <div className="flex gap-3">
                     <div className="h-14 flex items-center px-4 bg-[#F1F5F9] border border-[#E2E8F0] rounded-[18px] font-black text-[#071D49] text-sm">
                        +91
                     </div>
                     <div className="relative flex-1">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#94A3B8]" />
                        <Input 
                          type="tel"
                          maxLength={10}
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})}
                          placeholder="00000 00000" 
                          className="h-14 bg-[#F8FAFC] border-[#E2E8F0] rounded-[18px] pl-12 font-bold text-[#071D49] focus:border-[#1DA1F2] transition-all"
                        />
                     </div>
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
                      className="h-14 bg-[#F8FAFC] border-[#E2E8F0] rounded-[18px] pl-12 font-bold text-[#071D49] focus:border-[#1DA1F2] transition-all uppercase"
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleRegister}
                disabled={isLoading || !formData.name || !formData.phone || !formData.smashId}
                className="w-full h-16 bg-gradient-to-r from-[#071D49] to-[#1DA1F2] text-white font-black text-lg rounded-[22px] shadow-xl hover:translate-y-[-2px] transition-all group"
              >
                {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "FINALIZE ENTRY"}
                {!isLoading && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
              </Button>
            </div>
          ) : (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-8 py-4"
            >
              <div className="h-24 w-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500 border-2 border-green-500/20">
                <Check className="h-12 w-12 stroke-[4px]" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-[#071D49] uppercase italic tracking-tighter">Verified Entry</h2>
                <p className="text-[#64748B] font-medium leading-relaxed">
                  Your identity has been synchronized with <strong>{tournament?.name || 'SmashLive Network'}</strong>. See you on the court!
                </p>
              </div>
              <Button 
                onClick={() => navigate('/')} 
                variant="outline"
                className="w-full h-14 border-[#E2E8F0] rounded-2xl font-black text-[11px] uppercase tracking-widest text-[#071D49] hover:bg-[#F8FAFC]"
              >
                Return to Network
              </Button>
            </motion.div>
          )}
        </div>

        <div className="text-center">
           <p className="text-[9px] font-black text-[#94A3B8] uppercase tracking-[0.4em]">Secure Node Connectivity: PRO-ACTIVE</p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterParticipant;