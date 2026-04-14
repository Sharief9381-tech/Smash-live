"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, Phone, ShieldCheck, Globe, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { showError, showSuccess } from '@/utils/toast';

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = async () => {
    if (!phone) return showError("Please enter a valid phone number");
    setLoading(true);
    
    // In a real Supabase setup, you'd use supabase.auth.signInWithOtp({ phone })
    // For this demo context, we'll simulate the OTP transition but prepare the profile
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      showSuccess("Verification code sent!");
    }, 1000);
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 6) return showError("Please enter the 6-digit code");
    setLoading(true);

    // Simulated auth success - in reality: const { data, error } = await supabase.auth.verifyOtp(...)
    setTimeout(async () => {
      localStorage.setItem('isLoggedIn', 'true');
      
      // Initialize or fetch profile with sequential ID logic
      // Note: We'd typically do this via a Supabase Trigger on Auth signup
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('phone', phone)
        .single();

      if (!profile) {
        // Create new profile - Supabase 'id' (serial) handles the 1, 2, 3 sequence
        await supabase.from('profiles').insert([
          { phone, name: "New Player", smash_id: "Auto" }
        ]);
      }

      setLoading(false);
      showSuccess("Intelligence link established!");
      navigate('/court');
    }, 1500);
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
            {step === 1 ? 'Global Access' : 'Verify Identity'}
          </h1>
          <p className="text-slate-500 font-medium">
            {step === 1 
              ? 'Connect your profile to the global intelligence network.' 
              : 'Enter the verification code sent to your device.'}
          </p>
        </div>

        <div className="glass-panel p-10 rounded-[3rem] space-y-8">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Mobile Registry</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000" 
                      className="h-14 bg-white border-slate-100 rounded-2xl pl-11 font-bold focus:border-sky-500 transition-all"
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full h-16 bg-[#0B1F3A] text-white font-black text-lg rounded-full shadow-xl hover:bg-sky-500 transition-all group"
                >
                  {loading ? <Loader2 className="animate-spin h-6 w-6" /> : <>Get Started <ArrowRight className="ml-2 h-5 w-5" /></>}
                </Button>
              </motion.div>
            ) : (
              <motion.div key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Verification Code</Label>
                  <Input 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="0 0 0 0 0 0" 
                    maxLength={6}
                    className="h-14 bg-white border-slate-100 rounded-2xl font-bold tracking-[0.5em] text-center focus:border-sky-500"
                  />
                </div>
                <Button 
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="w-full h-16 bg-sky-500 text-white font-black text-lg rounded-full shadow-xl hover:bg-sky-400 transition-all"
                >
                  {loading ? <Loader2 className="animate-spin h-6 w-6" /> : "Verify & Connect"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;