"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, MapPin, Flag, User, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { showSuccess } from '@/utils/toast';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Chandigarh", "Jammu and Kashmir", "Ladakh"
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [state, setState] = useState("");

  useEffect(() => {
    const temp = localStorage.getItem('temp_reg_data');
    if (temp) {
      setUserData(JSON.parse(temp));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleComplete = () => {
    if (!state) return;
    
    setIsLoading(true);
    setTimeout(() => {
      const finalProfile = {
        ...userData,
        state: state,
        country: "India",
        onboardingComplete: true,
        smashId: `Smash#${Math.floor(1000 + Math.random() * 9000)}`,
        image: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop"
      };
      
      // Save to mock database
      const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
      users.push(finalProfile);
      localStorage.setItem('registered_users', JSON.stringify(users));
      
      // Set active session
      localStorage.setItem('userProfile', JSON.stringify(finalProfile));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.removeItem('temp_reg_data');
      
      showSuccess("Athlete Dossier Initialized!");
      navigate('/court');
    }, 1500);
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1DA1F2]/5 blur-[120px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[500px] space-y-8 relative z-10"
      >
        <div className="text-center space-y-4">
          <div className="bg-[#071D49] w-16 h-16 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl">
            <Zap className="h-8 w-8 text-[#1DA1F2] fill-current" />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-[#071D49] tracking-tighter uppercase italic">Athlete Dossier</h1>
            <p className="text-[#64748B] font-bold uppercase text-[10px] tracking-[0.3em]">Configure your global intelligence profile</p>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-10 shadow-[0_20px_50px_rgba(7,29,73,0.08)] border border-[#E2E8F0] space-y-8">
          <div className="space-y-6">
            {/* Read-only Name Section */}
            <div className="p-5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] flex items-center gap-4">
               <div className="h-12 w-12 rounded-full bg-[#071D49] flex items-center justify-center text-[#1DA1F2] font-black">
                  {userData.name.split(' ').map((n:any) => n[0]).join('')}
               </div>
               <div>
                  <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">Athlete Name</p>
                  <p className="text-lg font-bold text-[#071D49]">{userData.name}</p>
               </div>
            </div>

            {/* Locked Country */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-2">Country</Label>
              <div className="h-14 flex items-center gap-3 px-6 border border-[#E2E8F0] rounded-[18px] bg-[#F1F5F9] font-bold text-[#64748B] cursor-not-allowed">
                <span className="text-lg">🇮🇳</span>
                <span>India</span>
                <div className="flex-1" />
                <Lock className="h-4 w-4 opacity-30" />
              </div>
            </div>

            {/* Select State */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-2">Home State</Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger className="h-14 rounded-[18px] border-[#E2E8F0] font-bold text-[#071D49] focus:ring-0 focus:border-[#1DA1F2] focus:shadow-[0_0_0_4px_rgba(29,161,242,0.15)]">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent className="max-h-60 rounded-xl">
                  {INDIAN_STATES.sort().map(s => (
                    <SelectItem key={s} value={s} className="font-bold text-[#071D49]">{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleComplete}
            disabled={isLoading || !state}
            className="w-full h-16 bg-gradient-to-r from-[#071D49] to-[#1DA1F2] text-white font-black text-lg rounded-[22px] shadow-2xl hover:translate-y-[-2px] transition-all group"
          >
            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "FINALIZE DOSSIER"}
            {!isLoading && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;