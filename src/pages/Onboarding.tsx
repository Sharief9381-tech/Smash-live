"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, MapPin, ArrowRight, Loader2, Lock, ChevronLeft, Flag, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess, showError } from '@/utils/toast';
import { AuthService } from '@/services/auth.service';
import { INDIAN_STATES } from '@/data/locations';

const Onboarding = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState("");
  const [tempData, setTempData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('temp_reg');
    if (!saved) {
       // If no temp data, check current user profile for mobile or bounce
       const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
       if (!profile.mobile) return navigate('/login');
       setTempData(profile);
    } else {
       setTempData(JSON.parse(saved));
    }
  }, [navigate]);

  const handleComplete = async () => {
    if (!state) return;
    setIsLoading(true);
    try {
      const profile = await AuthService.registerAthlete({
        name: tempData.name,
        gender: tempData.gender || "male",
        mobile: tempData.mobile,
        state: state,
        district: "Registry Node"
      });
      AuthService.setLocalSession(profile);
      localStorage.removeItem('temp_reg');
      showSuccess("Dossier Synced");
      navigate('/dashboard', { replace: true });
    } catch (err: any) { showError("Sync Failure"); } finally { setIsLoading(false); }
  };

  if (!tempData) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/5 blur-[100px] rounded-full" />

      <header className="h-16 flex items-center justify-between relative z-20">
         <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary fill-current" />
            <span className="text-xl font-black italic uppercase tracking-tighter">Smash<span className="text-primary">Live</span></span>
         </div>
         <Button onClick={() => navigate('/login')} variant="ghost" className="text-muted-foreground uppercase text-[10px] font-black tracking-widest gap-2">
            <ChevronLeft className="h-4 w-4" /> Cancel
         </Button>
      </header>

      <main className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full space-y-10 relative z-10 pt-10 pb-20">
        <div className="space-y-2 text-center">
           <h1 className="text-4xl font-black uppercase italic tracking-tighter">Profile Sync</h1>
           <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Finalizing athlete dossier</p>
        </div>

        <div className="bg-card border border-white/5 rounded-[3rem] p-10 space-y-8 shadow-2xl">
           <div className="space-y-6">
              <div className="space-y-2">
                 <Label className="text-[9px] font-black uppercase text-muted-foreground ml-2">Verified Mobile</Label>
                 <div className="h-14 flex items-center gap-3 px-6 rounded-2xl bg-muted/20 border border-white/5 text-muted-foreground font-black italic">
                    <Smartphone className="h-4 w-4 opacity-50" />
                    <span>+91 {tempData.mobile}</span>
                    <div className="flex-1" />
                    <Lock className="h-3 w-3 opacity-30" />
                 </div>
              </div>

              <div className="space-y-2">
                 <Label className="text-[9px] font-black uppercase text-muted-foreground ml-2">Circuit Node (State)</Label>
                 <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary opacity-50 z-10" />
                    <Select value={state} onValueChange={setState}>
                       <SelectTrigger className="h-14 pl-12 rounded-2xl bg-muted/20 border-white/5 font-black text-lg focus:border-primary outline-none transition-all">
                          <SelectValue placeholder="Select State" />
                       </SelectTrigger>
                       <SelectContent className="bg-card border-white/5 rounded-2xl max-h-[300px]">
                          {INDIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                       </SelectContent>
                    </Select>
                 </div>
              </div>
           </div>

           <Button 
              onClick={handleComplete} 
              disabled={isLoading || !state}
              className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all group active:scale-95"
           >
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                <span className="flex items-center gap-2">Finalize Sync <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" /></span>
              )}
           </Button>
        </div>

        <div className="text-center">
           <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest leading-relaxed">
              By finalizing, you synchronize your performance<br/>data with the global university circuit network.
           </p>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;