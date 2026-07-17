"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Loader2, ArrowLeft, Trophy, Activity, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showError, showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';
import { AuthService } from '@/services/auth.service';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const [regData, setRegData] = useState({ name: "", gender: "" });

  const handleSendOtp = async () => {
    if (phone.length < 10) {
      showError("Please enter a valid 10-digit mobile number");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      showSuccess("Security code [123456] sent successfully.");
    }, 800);
  };

  const handleVerify = async () => {
    if (otp.join("") !== "123456") {
      showError("Invalid code. Use 123456 for testing.");
      return;
    }

    setIsLoading(true);
    try {
      if (activeTab === 'register') {
        localStorage.setItem('temp_reg', JSON.stringify({ ...regData, mobile: phone }));
        navigate('/onboarding');
      } else {
        // This now auto-creates a profile if missing in local mode
        const profile = await AuthService.getProfileByMobile(phone);
        AuthService.setLocalSession(profile);
        showSuccess("Identity Verified. Welcome!");
        
        if (profile.onboardingComplete) navigate('/court');
        else navigate('/onboarding');
      }
    } catch (err) {
      showError("Synchronization issue. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  return (
    <div className="min-h-screen bg-[#0B1F3A] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-sky-600/10 blur-[100px] rounded-full" />

      <div className="w-full max-w-[460px] space-y-8 relative z-10">
        <div className="text-center space-y-6">
          <Link to="/" className="inline-flex items-center gap-4 group">
            <div className="bg-white p-4 rounded-[1.5rem] shadow-2xl group-hover:scale-110 transition-transform">
              <Zap className="h-8 w-8 text-[#0EA5E9] fill-current" />
            </div>
            <div className="text-left">
               <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                Smash<span className="text-sky-400">Live</span>
              </h1>
              <p className="text-[10px] font-black text-sky-400/60 uppercase tracking-[0.4em]">Operational Network</p>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl space-y-8 border-t-4 border-sky-500">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-black text-[#0B1F3A] tracking-tight uppercase italic">
              {activeTab === 'login' ? 'The Indoor' : 'Join Circuit'}
            </h2>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              {step === 'details' ? 'Athlete Authentication' : 'Enter 6-Digit Code'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 'details' ? (
              <motion.div key="details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex p-1.5 bg-slate-100 rounded-2xl">
                  {['login', 'register'].map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab as any)} 
                      className={cn(
                        "flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all", 
                        activeTab === tab ? "bg-[#0B1F3A] text-white shadow-lg" : "text-slate-400"
                      )}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>

                {activeTab === 'register' && (
                  <div className="space-y-4">
                    <Input 
                      value={regData.name} 
                      onChange={e => setRegData({...regData, name: e.target.value})} 
                      placeholder="Full Athlete Name" 
                      className="h-14 rounded-2xl bg-slate-50 font-bold" 
                    />
                    <Select value={regData.gender} onValueChange={v => setRegData({...regData, gender: v})}>
                      <SelectTrigger className="h-14 rounded-2xl bg-slate-50 font-bold">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex gap-2">
                  <div className="h-14 flex items-center px-5 border rounded-2xl bg-slate-50 font-black text-[#0B1F3A]">+91</div>
                  <Input 
                    maxLength={10} 
                    value={phone} 
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ""))} 
                    placeholder="Mobile Number" 
                    className="h-14 rounded-2xl bg-slate-50 flex-1 font-black text-lg focus:ring-sky-500" 
                  />
                </div>

                <Button 
                  onClick={handleSendOtp} 
                  disabled={isLoading} 
                  className="w-full h-16 rounded-[1.5rem] bg-[#0B1F3A] text-white font-black uppercase tracking-widest hover:bg-sky-500 transition-all shadow-xl"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : "Request Access"}
                </Button>
              </motion.div>
            ) : (
              <motion.div key="otp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="grid grid-cols-6 gap-2">
                  {otp.map((d, i) => (
                    <input 
                      key={i} 
                      ref={el => otpRefs.current[i] = el} 
                      type="text" 
                      maxLength={1} 
                      value={d} 
                      onChange={e => handleOtpChange(i, e.target.value)} 
                      className="w-full h-14 border-2 border-slate-100 bg-slate-50 rounded-xl text-center font-black text-xl text-[#0B1F3A] focus:border-sky-500 outline-none" 
                    />
                  ))}
                </div>
                <Button onClick={handleVerify} disabled={isLoading} className="w-full h-16 rounded-[1.5rem] bg-sky-500 text-white font-black uppercase tracking-widest shadow-xl">
                  {isLoading ? <Loader2 className="animate-spin" /> : "Verify Identity"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Login;