"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, Phone, ShieldCheck, Globe, ChevronDown, RefreshCcw, Loader2 } from 'lucide-react';
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
  { code: '+45', country: 'DK', flag: '🇩🇰', name: 'Denmark' },
  { code: '+60', country: 'MY', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
  { code: '+65', country: 'SG', flag: '🇸🇬', name: 'Singapore' },
  { code: '+1', country: 'US', flag: '🇺🇸', name: 'USA' },
];

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  const fullPhone = `${selectedCountry.code}${phone}`;

  const handleSendOtp = async () => {
    if (phone.length < 8) {
      showError("Please enter a valid mobile number");
      return;
    }
    
    setIsLoading(true);
    
    // Artificial delay to simulate network check
    setTimeout(async () => {
      const existingUser = AuthService.checkUserExists(fullPhone);
      
      if (existingUser) {
        // Direct Login for known numbers
        AuthService.setSession(existingUser);
        showSuccess(`Welcome back, ${existingUser.name}!`);
        setIsLoading(false);
        navigate('/court');
      } else {
        // Proceed to OTP for new numbers
        setIsLoading(false);
        setStep(2);
        setTimer(30);
        showSuccess(`Verification code [1234] sent to ${fullPhone}`);
      }
    }, 1200);
  };

  const handleVerify = async () => {
    if (otp.length !== 4) {
      showError("Please enter the 4-digit code");
      return;
    }
    setIsLoading(true);
    
    setTimeout(() => {
      if (otp === "1234") {
        // New user starts onboarding
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userProfile', JSON.stringify({
          phone: fullPhone,
          onboardingComplete: false
        }));
        showSuccess("Identity verified. Initializing dossier...");
        navigate('/onboarding');
      } else {
        showError("Invalid code. Please use 1234.");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="w-full max-w-[420px] space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="bg-[#0B1F3A] p-2.5 rounded-2xl text-white group-hover:scale-110 transition-transform shadow-lg shadow-navy/20">
              <Zap className="h-6 w-6 fill-current" />
            </div>
            <span className="text-3xl font-black text-[#0B1F3A] uppercase tracking-tighter">
              Smash<span className="text-sky-500">Live</span>
            </span>
          </Link>
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-[#0B1F3A] tracking-tight">
              {step === 1 ? 'Mobile Access' : 'Security Check'}
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              {step === 1 ? 'Direct login for recognized athletes' : `Code sent to ${fullPhone}`}
            </p>
          </div>
        </div>

        <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 shadow-2xl border-white bg-white/80">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</Label>
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-14 px-4 bg-white border-slate-100 rounded-2xl font-black flex items-center gap-2 min-w-[100px] hover:bg-slate-50">
                          <span>{selectedCountry.flag}</span>
                          <span className="text-xs">{selectedCountry.code}</span>
                          <ChevronDown className="h-3 w-3 opacity-30" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 rounded-2xl p-2 shadow-2xl border-slate-100">
                        {countryCodes.map((c) => (
                          <DropdownMenuItem key={c.code} onClick={() => setSelectedCountry(c)} className="rounded-xl p-3 flex justify-between cursor-pointer">
                            <span className="text-xs font-bold">{c.flag} {c.name}</span>
                            <span className="text-[10px] font-black opacity-40">{c.code}</span>
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
                        className="h-14 bg-white border-slate-100 rounded-2xl pl-11 font-black text-lg focus:border-sky-500 shadow-sm"
                      />
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={handleSendOtp} 
                  disabled={isLoading}
                  className="w-full h-16 bg-[#0B1F3A] text-white font-black rounded-3xl shadow-xl hover:bg-sky-500 transition-all group"
                >
                  {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "ENTER THE COURT"}
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">4-Digit Security Code</Label>
                  <Input 
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="• • • •" 
                    className="h-16 bg-white border-slate-100 rounded-2xl font-black text-2xl text-center tracking-[0.5em] focus:border-sky-500 shadow-sm"
                  />
                  <p className="text-center text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Enter <span className="text-sky-500">1234</span> for new account setup
                  </p>
                </div>
                <Button 
                  onClick={handleVerify} 
                  disabled={isLoading}
                  className="w-full h-16 bg-sky-500 text-white font-black rounded-3xl shadow-xl hover:bg-sky-600 transition-all"
                >
                  {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "VERIFY & PROCEED"}
                </Button>
                <button onClick={() => setStep(1)} className="w-full text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-sky-500 transition-colors">
                  Wrong Number? Change it
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-6 opacity-40">
          <div className="flex items-center gap-2">
            <Globe className="h-3 w-3" />
            <span className="text-[9px] font-black uppercase tracking-widest">Secure Cloud Sync</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3 w-3" />
            <span className="text-[9px] font-black uppercase tracking-widest">athlete Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;