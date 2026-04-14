"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, Phone, ShieldCheck, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthService } from '@/services/auth.service';
import { showError } from '@/utils/toast';

const countryCodes = [
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+62', country: 'ID', flag: '🇮🇩' },
  { code: '+45', country: 'DK', flag: '🇩🇰' },
];

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);

  const handleAuth = async () => {
    try {
      if (step === 1) {
        setStep(2);
      } else {
        // In a real scenario, this would be the actual login call
        await AuthService.login({ email: email || 'user@smashlive.com' });
        navigate('/court'); 
      }
    } catch (err: any) {
      showError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-[440px] space-y-8">
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="bg-[#0B1F3A] p-2 rounded-xl text-white"><Zap className="h-6 w-6 fill-current" /></div>
            <span className="text-3xl font-black text-[#0B1F3A] uppercase">Smash<span className="text-sky-500">Live</span></span>
          </Link>
          <h1 className="text-3xl font-black text-[#0B1F3A]">{step === 1 ? 'Welcome Back' : 'Verify Identity'}</h1>
        </div>

        <div className="glass-panel p-10 rounded-[3rem] space-y-8">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Intelligence</Label>
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Registered Email" 
                  className="h-14 bg-white border-slate-100 rounded-2xl font-bold focus:border-sky-500"
                />
              </div>
              <Button onClick={handleAuth} className="w-full h-16 bg-[#0B1F3A] text-white font-black rounded-full">Continue <ArrowRight className="ml-2 h-5 w-5" /></Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Code</Label>
                <Input placeholder="Enter 6-digit code" className="h-14 bg-white border-slate-100 rounded-2xl font-bold text-center tracking-widest" />
              </div>
              <Button onClick={handleAuth} className="w-full h-16 bg-sky-500 text-white font-black rounded-full">Verify & Start <Zap className="ml-2 h-5 w-5" /></Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;