"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, Phone, ShieldCheck, ChevronDown, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const countryCodes = [
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+62', country: 'ID', flag: '🇮🇩' },
  { code: '+45', country: 'DK', flag: '🇩🇰' },
  { code: '+60', country: 'MY', flag: '🇲🇾' },
  { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
  { code: '+66', country: 'TH', flag: '🇹🇭' },
  { code: '+82', country: 'KR', flag: '🇰🇷' },
];

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Phone Entry, 2: OTP Verification
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else {
      navigate('/dashboard'); // Redirecting to Dashboard after successful OTP
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-sky-500/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#0B1F3A]/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] space-y-8 relative z-10"
      >
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="bg-[#0B1F3A] p-2 rounded-xl text-white">
              <Zap className="h-6 w-6 fill-current" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-[#0B1F3A] uppercase">
              Smash<span className="text-sky-500">Live</span>
            </span>
          </Link>
          <h1 className="text-3xl font-black text-[#0B1F3A] tracking-tight">
            {step === 1 ? 'Welcome Back' : 'Verify Identity'}
          </h1>
          <p className="text-slate-500 font-medium">
            {step === 1 
              ? 'Enter your mobile number to receive a secure code.' 
              : 'We\'ve sent a 6-digit verification code to your phone.'}
          </p>
        </div>

        <div className="glass-panel p-10 rounded-[3rem] space-y-8">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Mobile Intelligence Registry</Label>
                  <div className="flex gap-2">
                    <div className="relative group">
                      <div className="h-14 w-24 bg-white border border-slate-100 rounded-2xl flex items-center justify-center gap-2 px-3 cursor-pointer group-hover:border-sky-500 transition-all">
                        <span className="text-lg">{selectedCountry.flag}</span>
                        <span className="text-sm font-bold text-[#0B1F3A]">{selectedCountry.code}</span>
                      </div>
                      <select 
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        onChange={(e) => setSelectedCountry(countryCodes.find(c => c.code === e.target.value) || countryCodes[0])}
                        value={selectedCountry.code}
                      >
                        {countryCodes.map((c) => (
                          <option key={c.code} value={c.code}>{c.flag} {c.country} ({c.code})</option>
                        ))}
                      </select>
                    </div>
                    <div className="relative flex-1">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        type="tel" 
                        placeholder="Phone Number" 
                        className="h-14 bg-white border-slate-100 rounded-2xl pl-11 font-bold focus:border-sky-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleNextStep}
                  className="w-full h-16 bg-[#0B1F3A] text-white font-black text-lg rounded-full shadow-xl hover:bg-[#0B1F3A]/90 transition-all group"
                >
                  Send OTP Code <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Verification</Label>
                    <button 
                      onClick={() => setStep(1)}
                      className="text-[10px] font-black uppercase tracking-widest text-sky-600 hover:text-sky-500"
                    >
                      Change Number?
                    </button>
                  </div>
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      type="text" 
                      placeholder="Enter 6-digit code" 
                      maxLength={6}
                      className="h-14 bg-white border-slate-100 rounded-2xl pl-11 font-bold tracking-[0.5em] focus:border-sky-500 transition-all text-center"
                    />
                  </div>
                  <div className="text-center">
                    <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0B1F3A] transition-colors">
                      Didn't receive code? <span className="text-sky-600">Resend in 00:59</span>
                    </button>
                  </div>
                </div>

                <Button 
                  onClick={handleNextStep}
                  className="w-full h-16 bg-sky-500 text-white font-black text-lg rounded-full shadow-[0_10px_30px_rgba(14,165,233,0.3)] hover:bg-sky-400 transition-all group"
                >
                  Verify & Continue <Zap className="ml-2 h-5 w-5 fill-current" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-4 flex items-center justify-center gap-2 text-slate-400">
            <Globe className="h-3 w-3" />
            <span className="text-[9px] font-black uppercase tracking-widest">Global Encryption Standard Secured</span>
          </div>
        </div>

        <p className="text-center text-sm font-medium text-slate-500">
          Encountering issues? <Link to="/" className="text-sky-600 font-black">Contact SmashLive Support</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;