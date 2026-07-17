"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Loader2, ArrowLeft, Trophy, Activity } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
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
  
  const [regData, setRegData] = useState({
    name: "",
    gender: "",
  });

  const handleSendOtp = async () => {
    if (phone.length < 10) {
      showError("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsLoading(true);
    try {
      // We check if athlete exists. If fetch fails, the service now handles it gracefully.
      const existing = await AuthService.getProfileByMobile(phone);

      if (activeTab === 'login' && !existing) {
        throw new Error("Athlete profile not found. Please register to join the circuit.");
      }
      if (activeTab === 'register' && existing) {
        throw new Error("This mobile number is already registered.");
      }
      if (activeTab === 'register' && (!regData.name || !regData.gender)) {
        throw new Error("Please complete your name and gender to register.");
      }

      setStep('otp');
      showSuccess(`Security code [123456] sent to +91 ${phone}`);
    } catch (err: any) {
      showError(err.message || "Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
        const profile = await AuthService.getProfileByMobile(phone);
        AuthService.setLocalSession(profile);
        showSuccess("Identity Verified. Welcome back!");
        navigate('/court');
      }
    } catch (err: any) {
      showError("Verification failed. System synchronization issue.");
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-[#0B1F3A] clip-path-slant z-0" />
      <div className="absolute top-20 right-[-10%] w-96 h-96 bg-sky-500/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-[#0B1F3A]/5 blur-[80px] rounded-full" />

      <div className="w-full max-w-[480px] space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="bg-white p-3 rounded-2xl shadow-xl shadow-black/10 group-hover:scale-110 transition-transform">
              <Zap className="h-8 w-8 text-[#0EA5E9] fill-current" />
            </div>
            <div className="text-left">
               <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">
                Smash<span className="text-sky-400">Live</span>
              </h1>
              <p className="text-[10px] font-bold text-sky-200/60 uppercase tracking-[0.3em]">Pro Circuit Network</p>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-[3.5rem] p-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-white space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-black text-[#0B1F3A] tracking-tight uppercase italic">
              {activeTab === 'login' ? 'Enter The Court' : 'Join The Circuit'}
            </h2>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              {step === 'details' ? 'Global Athlete Authentication' : 'Secure OTP Verification'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 'details' ? (
              <motion.div 
                key="details" 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex p-1.5 bg-slate-100 rounded-2xl">
                  <button 
                    onClick={() => setActiveTab('login')} 
                    className={cn(
                      "flex-1 py-3 rounded-xl text-[11px] font-black tracking-widest transition-all", 
                      activeTab === 'login' ? "bg-[#0B1F3A] text-white shadow-lg" : "text-slate-400"
                    )}
                  >
                    LOGIN
                  </button>
                  <button 
                    onClick={() => setActiveTab('register')} 
                    className={cn(
                      "flex-1 py-3 rounded-xl text-[11px] font-black tracking-widest transition-all", 
                      activeTab === 'register' ? "bg-[#0B1F3A] text-white shadow-lg" : "text-slate-400"
                    )}
                  >
                    REGISTER
                  </button>
                </div>

                {activeTab === 'register' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">Full Name</Label>
                      <Input 
                        value={regData.name} 
                        onChange={e => setRegData({...regData, name: e.target.value})} 
                        placeholder="e.g. Viktor Axelsen" 
                        className="h-14 rounded-2xl bg-slate-50 border-slate-100 font-bold focus:border-sky-500" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">Gender</Label>
                      <Select value={regData.gender} onValueChange={v => setRegData({...regData, gender: v})}>
                        <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-slate-100 font-bold">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-100">
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">Mobile Intelligence</Label>
                  <div className="flex gap-2">
                    <div className="h-14 flex items-center px-5 border border-slate-100 rounded-2xl bg-slate-50 font-black text-sm text-[#0B1F3A] shadow-inner">+91</div>
                    <Input 
                      maxLength={10} 
                      value={phone} 
                      onChange={e => setPhone(e.target.value.replace(/\D/g, ""))} 
                      placeholder="99999 00000" 
                      className="h-14 rounded-2xl bg-slate-50 border-slate-100 flex-1 font-black text-lg focus:border-sky-500 tracking-tight" 
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSendOtp} 
                  disabled={isLoading} 
                  className="w-full h-16 rounded-[1.5rem] bg-[#0B1F3A] text-white font-black uppercase tracking-widest shadow-2xl hover:bg-sky-500 transition-all active:scale-95 group"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : (
                    <span className="flex items-center gap-2">
                      Request Access <Zap className="h-4 w-4 fill-current text-sky-400 group-hover:scale-125 transition-transform" />
                    </span>
                  )}
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                key="otp" 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <button onClick={() => setStep('details')} className="text-[10px] font-black text-sky-500 uppercase tracking-widest flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
                  <ArrowLeft className="h-3 w-3" /> Change Details
                </button>
                
                <div className="space-y-4">
                   <div className="grid grid-cols-6 gap-2">
                    {otp.map((d, i) => (
                      <input 
                        key={i} 
                        ref={el => otpRefs.current[i] = el} 
                        type="text" 
                        maxLength={1} 
                        value={d} 
                        onChange={e => handleOtpChange(i, e.target.value)} 
                        className="w-full h-14 border-2 border-slate-100 bg-slate-50 rounded-xl text-center font-black text-xl text-[#0B1F3A] focus:border-sky-500 focus:bg-white outline-none transition-all shadow-inner" 
                      />
                    ))}
                  </div>
                  <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">Code remains active for 2:00 mins</p>
                </div>

                <Button 
                  onClick={handleVerify} 
                  disabled={isLoading} 
                  className="w-full h-16 rounded-[1.5rem] bg-[#0EA5E9] text-white font-black uppercase tracking-[0.2em] shadow-xl hover:bg-sky-400 transition-all active:scale-95"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : "Verify & Enter"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-8">
           <div className="flex items-center gap-2 text-slate-400">
              <Trophy className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Global Ranking System</span>
           </div>
           <div className="h-4 w-px bg-slate-200" />
           <div className="flex items-center gap-2 text-slate-400">
              <Activity className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Live Match Tracking</span>
           </div>
        </div>
      </div>
      
      <style>{`
        .clip-path-slant {
          clip-path: polygon(0 0, 100% 0, 100% 70%, 0% 100%);
        }
      `}</style>
    </div>
  );
};

export default Login;