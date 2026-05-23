"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, Phone, ShieldCheck, Globe, ChevronDown } from 'lucide-react';
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
  { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
  { code: '+62', country: 'ID', flag: '🇮🇩', name: 'Indonesia' },
  { code: '+45', country: 'DK', flag: '🇩🇰', name: 'Denmark' },
  { code: '+60', country: 'MY', flag: '🇲🇾', name: 'Malaysia' },
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

  const handleSendOtp = async () => {
    if (phone.length < 8) {
      showError("Please enter a valid mobile number");
      return;
    }
    setIsLoading(true);
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      showSuccess(`Verification code sent to ${selectedCountry.code} ${phone}`);
    }, 1000);
  };

  const handleVerify = async () => {
    if (otp.length !== 4) {
      showError("Please enter the 4-digit verification code");
      return;
    }
    setIsLoading(true);
    try {
      // In a real scenario, this would verify the phone/OTP
      await AuthService.login({ email: `${phone}@smashlive.com` });
      showSuccess("Authentication successful. Welcome to the Court.");
      navigate('/court'); 
    } catch (err: any) {
      showError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0B1F3A]/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="w-full max-w-[440px] space-y-8 relative z-10">
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
              {step === 1 ? 'Mobile Access' : 'Secure Verification'}
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              {step === 1 ? 'Enter your phone to enter the court' : `Enter the code sent to ${selectedCountry.code}${phone}`}
            </p>
          </div>
        </div>

        <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 shadow-2xl border-white">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Mobile Number</Label>
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-14 px-4 bg-white border-slate-100 rounded-2xl font-black flex items-center gap-2 min-w-[100px] hover:bg-slate-50 transition-all">
                          <span>{selectedCountry.flag}</span>
                          <span className="text-sm">{selectedCountry.code}</span>
                          <ChevronDown className="h-3 w-3 opacity-40" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 rounded-2xl border-slate-100 p-2 shadow-2xl">
                        {countryCodes.map((country) => (
                          <DropdownMenuItem 
                            key={country.code} 
                            onClick={() => setSelectedCountry(country)}
                            className="rounded-xl p-3 flex items-center justify-between cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <span>{country.flag}</span>
                              <span className="text-xs font-bold">{country.name}</span>
                            </div>
                            <span className="text-[10px] font-black opacity-40">{country.code}</span>
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
                        placeholder="000 000 0000" 
                        className="h-14 bg-white border-slate-100 rounded-2xl pl-11 font-black text-lg focus:border-sky-500 shadow-sm"
                      />
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={handleSendOtp} 
                  disabled={isLoading}
                  className="w-full h-16 bg-[#0B1F3A] text-white font-black rounded-3xl shadow-xl hover:bg-sky-500 transition-all group active:scale-95"
                >
                  {isLoading ? "PROCCESSING..." : "GET SECURE CODE"} 
                  {!isLoading && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">4-Digit Verification Code</Label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-500" />
                    <Input 
                      maxLength={4}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="• • • •" 
                      className="h-16 bg-white border-slate-100 rounded-2xl pl-12 font-black text-2xl text-center tracking-[0.5em] focus:border-sky-500 shadow-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Button 
                    onClick={handleVerify} 
                    disabled={isLoading}
                    className="w-full h-16 bg-sky-500 text-white font-black rounded-3xl shadow-xl hover:bg-sky-600 transition-all active:scale-95"
                  >
                    {isLoading ? "VERIFYING..." : "VERIFY & ENTER COURT"}
                  </Button>
                  <button 
                    onClick={() => setStep(1)}
                    className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-sky-500 transition-colors"
                  >
                    Change Mobile Number
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <Globe className="h-3 w-3 text-slate-300" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Secure Node: SG-01</span>
          </div>
          <div className="h-1 w-1 bg-slate-200 rounded-full" />
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3 w-3 text-slate-300" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">End-to-End Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;