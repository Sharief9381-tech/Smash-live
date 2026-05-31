"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Phone, Globe, ChevronDown, Loader2, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { AuthService } from '@/services/auth.service';
import { showError, showSuccess } from '@/utils/toast';

const countryCodes = [
  { code: '+62', country: 'ID', flag: '🇮🇩', name: 'Indonesia' },
  { code: '+86', country: 'CN', flag: '🇨🇳', name: 'China' },
  { code: '+45', country: 'DK', flag: '🇩🇰', name: 'Denmark' },
  { code: '+60', country: 'MY', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+66', country: 'TH', flag: '🇹🇭', name: 'Thailand' },
  { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
  { code: '+81', country: 'JP', flag: '🇯🇵', name: 'Japan' },
  { code: '+82', country: 'KR', flag: '🇰🇷', name: 'South Korea' },
  { code: '+65', country: 'SG', flag: '🇸🇬', name: 'Singapore' },
  { code: '+44', country: 'UK', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+1', country: 'US', flag: '🇺🇸', name: 'USA' },
];

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [isLoading, setIsLoading] = useState(false);

  const fullPhone = `${selectedCountry.code}${phone}`;

  const handleAccessRequest = async () => {
    if (phone.length < 8) {
      showError("Please enter a valid mobile number");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate intelligence network lookup
    setTimeout(async () => {
      const existingUser = AuthService.checkUserExists(fullPhone);
      
      if (existingUser) {
        // INSTANT LOGIN: No OTP required for recognized dossiers
        AuthService.setSession(existingUser);
        showSuccess(`Identity Recognized: Welcome back, ${existingUser.name}`);
        setIsLoading(false);
        navigate('/court');
      } else {
        // NEW ATHLETE: Trigger security verification
        setIsLoading(false);
        setStep(2);
        showSuccess(`Security code [1234] sent to ${fullPhone}`);
      }
    }, 1000);
  };

  const handleVerifyNewAthlete = async () => {
    if (otp.length !== 4) {
      showError("Please enter the 4-digit security code");
      return;
    }
    setIsLoading(true);
    
    setTimeout(() => {
      if (otp === "1234") {
        // Verify identity and proceed to Dossier Creation (Onboarding)
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userProfile', JSON.stringify({
          phone: fullPhone,
          onboardingComplete: false
        }));
        showSuccess("Identity Verified. Initializing Athlete Dossier...");
        navigate('/onboarding');
      } else {
        showError("Verification Failed. Use code 1234 for testing.");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="w-full max-w-[400px] space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="bg-[#0B1F3A] p-2.5 rounded-2xl text-white group-hover:scale-110 transition-transform shadow-xl">
              <Zap className="h-6 w-6 fill-current text-sky-400" />
            </div>
            <span className="text-3xl font-black text-[#0B1F3A] uppercase tracking-tighter">
              Smash<span className="text-sky-500">Live</span>
            </span>
          </Link>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-[#0B1F3A] tracking-tight">
              {step === 1 ? 'Operational Access' : 'Security Checkpoint'}
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[9px] tracking-[0.2em]">
              {step === 1 ? 'Global Athlete Intelligence Network' : `Verification sent to ${fullPhone}`}
            </p>
          </div>
        </div>

        <div className="glass-panel p-10 rounded-[3rem] space-y-8 shadow-2xl border-white bg-white/80 backdrop-blur-xl">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Athlete Mobile Identifier</Label>
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-14 px-4 bg-white border-slate-100 rounded-2xl font-black flex items-center gap-2 min-w-[105px] hover:bg-slate-50 transition-all">
                          <span className="text-base">{selectedCountry.flag}</span>
                          <span className="text-xs">{selectedCountry.code}</span>
                          <ChevronDown className="h-3 w-3 opacity-30" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-64 rounded-2xl p-2 shadow-2xl border-slate-100 max-h-80 overflow-y-auto">
                        {countryCodes.map((c) => (
                          <DropdownMenuItem key={c.code} onClick={() => setSelectedCountry(c)} className="rounded-xl p-3 flex justify-between cursor-pointer focus:bg-sky-50">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{c.flag}</span>
                              <span className="text-xs font-bold text-[#0B1F3A]">{c.name}</span>
                            </div>
                            <span className="text-[10px] font-black text-slate-400">{c.code}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="relative flex-1">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                      <Input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="Mobile digits" 
                        className="h-14 bg-white border-slate-100 rounded-2xl pl-11 font-black text-lg focus:border-sky-500 shadow-sm transition-all"
                      />
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={handleAccessRequest} 
                  disabled={isLoading}
                  className="w-full h-16 bg-[#0B1F3A] text-white font-black rounded-2xl shadow-xl hover:bg-sky-500 transition-all group border-none"
                >
                  {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "REQUEST ACCESS"}
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">4-Digit Security Code</Label>
                  <Input 
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="0 0 0 0" 
                    className="h-20 bg-white border-slate-100 rounded-2xl font-black text-3xl text-center tracking-[0.5em] focus:border-sky-500 shadow-sm"
                  />
                  <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                    <p className="text-[9px] font-black text-sky-600 text-center uppercase tracking-widest leading-relaxed">
                      Verification required for new dossiers. <br /> Use code <span className="text-[#0B1F3A] text-xs">1234</span>
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={handleVerifyNewAthlete} 
                  disabled={isLoading}
                  className="w-full h-16 bg-sky-500 text-white font-black rounded-2xl shadow-xl hover:bg-sky-600 transition-all border-none"
                >
                  {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "VERIFY IDENTITY"}
                </Button>
                <button onClick={() => setStep(1)} className="w-full text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-sky-500 transition-colors">
                  Wrong Identifier? Modify Phone
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-8 opacity-40">
          <div className="flex items-center gap-2">
            <Globe className="h-3 w-3" />
            <span className="text-[9px] font-black uppercase tracking-widest">Encrypted Cloud</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3 w-3" />
            <span className="text-[9px] font-black uppercase tracking-widest">Verified Athlete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;