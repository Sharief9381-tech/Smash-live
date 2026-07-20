"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Loader2, ArrowLeft, ArrowRight, ChevronLeft, MapPin } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showError, showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';
import { AuthService } from '@/services/auth.service';
import { INDIAN_STATES, STATE_DISTRICTS } from '@/data/locations';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const [regData, setRegData] = useState({ 
    name: "", 
    gender: "",
    state: "",
    district: ""
  });

  const handleSendOtp = async () => {
    if (activeTab === 'register') {
      if (!regData.name || !regData.gender || !regData.state || !regData.district) {
        showError("Please complete all registration fields");
        return;
      }
    }
    
    if (phone.length < 10) {
      showError("Please enter a valid 10-digit mobile number");
      return;
    }
    setStep('otp');
    showSuccess("Security code [123456] sent successfully.");
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) {
      showError("Please enter the full 6-digit code");
      return;
    }
    
    if (code !== "123456") {
      showError("Invalid code. Use 123456 for testing.");
      return;
    }

    setIsLoading(true);
    try {
      if (activeTab === 'register') {
        const profile = await AuthService.registerAthlete({
          name: regData.name,
          gender: regData.gender,
          state: regData.state,
          district: regData.district,
          mobile: phone
        });
        AuthService.setLocalSession(profile);
        showSuccess("Athlete Dossier Synchronized!");
        navigate('/dashboard', { replace: true });
      } else {
        const profile = await AuthService.getProfileByMobile(phone);
        AuthService.setLocalSession(profile);
        
        if (profile.onboardingComplete || profile.onboarding_complete) {
          navigate('/dashboard', { replace: true });
        } else {
          navigate('/onboarding', { replace: true });
        }
      }
    } catch (err) {
      showError("Synchronization issue. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        otpRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'Enter') {
      handleVerify();
    }
  };

  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => otpRefs.current[0]?.focus(), 10);
    }
  }, [step]);

  const districts = regData.state ? STATE_DISTRICTS[regData.state] || [] : [];

  return (
    <div className="min-h-screen bg-[#0B1F3A] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-sky-600/10 blur-[100px] rounded-full" />

      <div className="absolute top-8 left-8 z-20">
        <Button 
          onClick={() => navigate('/')}
          variant="ghost" 
          className="text-white hover:bg-white/10 rounded-2xl px-6 h-12 font-black uppercase tracking-widest text-[10px] gap-2 transition-all border border-white/10 backdrop-blur-md"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Home
        </Button>
      </div>

      <div className={cn("w-full transition-all duration-500 relative z-10", activeTab === 'register' ? "max-w-[560px]" : "max-w-[460px]")}>
        <div className="text-center space-y-6 mb-8">
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
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">Athlete Name</Label>
                      <Input 
                        value={regData.name} 
                        onChange={e => setRegData({...regData, name: e.target.value})} 
                        placeholder="Full Legal Name" 
                        className="h-14 rounded-2xl bg-slate-50 font-bold border-slate-100 focus:border-sky-500" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">Gender</Label>
                      <Select value={regData.gender} onValueChange={v => setRegData({...regData, gender: v})}>
                        <SelectTrigger className="h-14 rounded-2xl bg-slate-50 font-bold border-slate-100">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">State</Label>
                      <Select value={regData.state} onValueChange={v => setRegData({...regData, state: v, district: ""})}>
                        <SelectTrigger className="h-14 rounded-2xl bg-slate-50 font-bold border-slate-100">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl max-h-[300px]">
                          {INDIAN_STATES.map(state => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">District</Label>
                      <Select value={regData.district} onValueChange={v => setRegData({...regData, district: v})} disabled={!regData.state}>
                        <SelectTrigger className="h-14 rounded-2xl bg-slate-50 font-bold border-slate-100">
                          <SelectValue placeholder={regData.state ? "Select District" : "Select state first"} />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl max-h-[300px]">
                          {districts.map(dist => (
                            <SelectItem key={dist} value={dist}>{dist}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">Mobile Connection</Label>
                  <div className="flex gap-2">
                    <div className="h-14 flex items-center px-5 border border-slate-100 rounded-2xl bg-slate-50 font-black text-[#0B1F3A]">+91</div>
                    <Input 
                      maxLength={10} 
                      value={phone} 
                      onChange={e => setPhone(e.target.value.replace(/\D/g, ""))} 
                      placeholder="Number" 
                      className="h-14 rounded-2xl bg-slate-50 flex-1 font-black text-lg border-slate-100 focus:border-sky-500 transition-all" 
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSendOtp} 
                  disabled={isLoading} 
                  className="w-full h-16 rounded-[1.5rem] bg-[#0B1F3A] text-white font-black uppercase tracking-widest hover:bg-sky-500 transition-all shadow-xl active:scale-95"
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
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      onChange={e => handleOtpChange(i, e.target.value)} 
                      className="w-full h-14 border-2 border-slate-100 bg-slate-50 rounded-xl text-center font-black text-xl text-[#0B1F3A] focus:border-sky-500 focus:bg-white outline-none transition-all" 
                    />
                  ))}
                </div>
                <div className="space-y-4">
                  <Button 
                    onClick={handleVerify} 
                    disabled={isLoading} 
                    className="w-full h-16 rounded-[1.5rem] bg-sky-500 text-white font-black uppercase tracking-widest shadow-xl hover:bg-sky-600 transition-all active:scale-95"
                  >
                    {isLoading ? <Loader2 className="animate-spin" /> : "Verify Identity"}
                  </Button>
                  <button 
                    onClick={() => setStep('details')}
                    className="w-full text-center text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-[#0B1F3A] transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="h-3 w-3" /> Change Details
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Login;