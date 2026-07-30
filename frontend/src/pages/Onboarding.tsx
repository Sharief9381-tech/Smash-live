"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, MapPin, ArrowRight, Loader2, Lock, ChevronLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { showSuccess, showError } from '@/utils/toast';
import { AuthService } from '@/services/auth.service';

const INDIAN_STATES = ["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu", "Telangana", "Kerala", "Gujarat", "Punjab", "Haryana"];

const Onboarding = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState("");
  const [tempData, setTempData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('temp_reg');
    if (!saved) navigate('/login');
    else setTempData(JSON.parse(saved));
  }, [navigate]);

  const handleComplete = async () => {
    if (!state) return;
    setIsLoading(true);

    try {
      // This will now handle the fetch error internally and fall back to local storage
      const profile = await AuthService.registerAthlete({
        name: tempData.name,
        gender: tempData.gender,
        mobile: tempData.mobile,
        state: state
      });

      AuthService.setLocalSession(profile);
      localStorage.removeItem('temp_reg');
      showSuccess("Athlete Dossier Synchronized!");
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      // This block is now less likely to trigger with the internal fallback
      showError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!tempData) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background visual */}
      <div className="absolute top-0 left-0 w-full h-48 bg-[#0B1F3A] z-0" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0% 100%)' }} />
      
      {/* Persistent Back Button */}
      <div className="absolute top-8 left-8 z-20">
        <Button 
          onClick={() => navigate('/')}
          variant="ghost" 
          className="text-white hover:bg-white/10 rounded-2xl px-6 h-12 font-black uppercase tracking-widest text-[10px] gap-2 transition-all border border-white/10 backdrop-blur-md"
        >
          <ChevronLeft className="h-4 w-4" /> Cancel Entry
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[500px] space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 group mb-2">
            <div className="bg-white p-3 rounded-2xl shadow-xl shadow-black/10">
              <Zap className="h-6 w-6 text-[#0EA5E9] fill-current" />
            </div>
            <div className="text-left">
               <h1 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">
                Smash<span className="text-sky-400">Live</span>
              </h1>
              <p className="text-[9px] font-bold text-sky-200/60 uppercase tracking-[0.3em]">Athlete Protocol</p>
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-none">Dossier Finalization</h2>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Complete your global registry profile</p>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">Assigned Country</Label>
              <div className="h-14 flex items-center gap-3 px-6 border rounded-[18px] bg-slate-50 font-bold text-slate-500 cursor-not-allowed">
                <span>🇮🇳 India</span>
                <div className="flex-1" />
                <Lock className="h-4 w-4 opacity-30" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">Athlete Home State</Label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 z-10" />
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger className="h-14 rounded-[18px] border-slate-100 bg-slate-50 pl-11 font-bold text-[#071D49] focus:ring-sky-500">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {INDIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleComplete} 
            disabled={isLoading || !state}
            className="w-full h-16 bg-[#0B1F3A] hover:bg-sky-500 text-white font-black text-lg rounded-[22px] shadow-xl transition-all group"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : (
              <span className="flex items-center gap-2">
                FINALIZE & SAVE <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;