"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, MapPin, ArrowRight, Loader2, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
      // Connecting to the database using your specific required query logic
      const profile = await AuthService.registerAthlete({
        name: tempData.name,
        gender: tempData.gender,
        mobile: tempData.mobile,
        state: state
      });

      AuthService.setLocalSession(profile);
      localStorage.removeItem('temp_reg');
      showSuccess("Athlete Dossier Synchronized!");
      navigate('/court');
    } catch (err: any) {
      showError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!tempData) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[500px] space-y-8">
        <div className="text-center space-y-1">
          <h1 className="text-4xl font-black text-[#071D49] tracking-tighter uppercase italic leading-none">Dossier Finalization</h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Athlete Registry Protocol</p>
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
              <Select value={state} onValueChange={setState}>
                <SelectTrigger className="h-14 rounded-[18px] font-bold text-[#071D49]">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {INDIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleComplete} 
            disabled={isLoading || !state}
            className="w-full h-16 bg-gradient-to-r from-[#071D49] to-[#1DA1F2] text-white font-black text-lg rounded-[22px] shadow-xl transition-all"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "FINALIZE & SAVE"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;