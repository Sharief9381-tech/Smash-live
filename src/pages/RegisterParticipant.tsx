"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, User, ArrowRight, Zap, Check, Loader2, MapPin } from 'lucide-react';
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
  
  const [name, setName] = useState("");

  useEffect(() => {
    const tourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
    const found = tourneys.find((t: any) => t.slug === slug);
    if (found) {
      setTournament(found);
    }
  }, [slug]);

  const handleRegister = () => {
    if (!name.trim()) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const tourneys = JSON.parse(localStorage.getItem('active_studio_tournaments') || '[]');
      const updated = tourneys.map((t: any) => {
        if (t.slug === slug) {
          return { ...t, participants: [...(t.participants || []), name] };
        }
        return t;
      });
      localStorage.setItem('active_studio_tournaments', JSON.stringify(updated));
      
      setIsLoading(false);
      setIsSuccess(true);
      showSuccess("Successfully registered for the tournament!");
    }, 1500);
  };

  if (!tournament) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black text-[#0B1F3A]">Tournament Not Found</h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">This link may have expired or is invalid</p>
          <Button onClick={() => navigate('/')} variant="outline" className="rounded-xl">Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px] space-y-8 relative z-10"
      >
        <div className="text-center space-y-4">
          <div className="bg-[#0B1F3A] w-16 h-16 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-navy/20">
            <Trophy className="h-8 w-8 text-sky-400" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-[#0B1F3A] tracking-tighter uppercase italic">{tournament.name}</h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Player Registration</p>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 space-y-8">
          {!isSuccess ? (
            <div className="space-y-6">
              <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3 text-xs font-bold text-[#0B1F3A] uppercase tracking-widest">
                  <Calendar className="h-4 w-4 text-sky-500" /> {tournament.date}
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-[#0B1F3A] uppercase tracking-widest">
                  <MapPin className="h-4 w-4 text-sky-500" /> {tournament.location}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                  <Input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name" 
                    className="h-14 bg-slate-50 border-slate-100 rounded-2xl pl-11 font-bold focus:border-sky-500"
                  />
                </div>
              </div>

              <Button 
                onClick={handleRegister}
                disabled={isLoading || !name}
                className="w-full h-16 bg-[#0B1F3A] text-white font-black text-lg rounded-[22px] shadow-2xl hover:bg-sky-500 transition-all group"
              >
                {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "JOIN TOURNAMENT"}
                {!isLoading && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
              </Button>
            </div>
          ) : (
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="h-20 w-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-500">
                <Check className="h-10 w-10 stroke-[3px]" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-[#0B1F3A]">REGISTRATION COMPLETE</h2>
                <p className="text-slate-500 font-medium">You have been successfully added to the participant list for {tournament.name}.</p>
              </div>
              <Button onClick={() => navigate('/')} className="w-full bg-[#0B1F3A] text-white rounded-xl h-12 font-black uppercase text-[10px] tracking-widest">
                Return to Home
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterParticipant;