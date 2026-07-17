"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Loader2, ArrowLeft, Trash2 } from 'lucide-react';
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
import { showError, showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';
import { AuthService } from '@/services/auth.service';
import { supabase } from '@/lib/supabase';

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

  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval: any;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleResetData = () => {
    if (confirm("This will clear your local session. Database data must be reset in the Supabase Dashboard. Continue?")) {
      localStorage.clear();
      showSuccess("Local session cleared.");
      window.location.reload();
    }
  };

  const handleSendOtp = async () => {
    if (phone.length < 10) {
      showError("Please enter a valid 10-digit mobile number");
      return;
    }

    const email = `${phone}@smashlive.com`;
    setIsLoading(true);

    try {
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single();

      if (activeTab === 'login' && !existingUser) {
        throw new Error("Athlete account not found. Please register first.");
      }

      if (activeTab === 'register') {
        if (!regData.name || !regData.gender) {
          throw new Error("Please provide athlete name and gender to register");
        }
        if (existingUser) {
          throw new Error("This number is already registered. Please login instead.");
        }
      }

      setTimeout(() => {
        setIsLoading(false);
        setStep('otp');
        setTimer(30);
        showSuccess(`OTP sent to +91 ${phone}. Code: 123456`);
      }, 800);
    } catch (err: any) {
      showError(err.message);
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      showError("Please enter the 6-digit code");
      return;
    }

    setIsLoading(true);
    try {
      if (enteredOtp === "123456") {
        const email = `${phone}@smashlive.com`;
        const profile = await AuthService.login(email);

        if (activeTab === 'register') {
          // Update the initial profile with the registration data
          const updated = await AuthService.updateProfile(profile.id, {
            name: regData.name,
            gender: regData.gender
          });
          AuthService.setLocalSession(updated);
          showSuccess("Identity verified. Complete your dossier.");
          navigate('/onboarding');
        } else {
          AuthService.setLocalSession(profile);
          showSuccess("Welcome back to the Court!");
          navigate('/court');
        }
      } else {
        throw new Error("Invalid OTP. Please try 123456");
      }
    } catch (err: any) {
      showError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1DA1F2]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#071D49]/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="w-full max-w-[460px] space-y-8 relative z-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="bg-[#071D49] p-2 rounded-xl text-white shadow-lg">
              <Zap className="h-6 w-6 fill-current text-[#1DA1F2]" />
            </div>
            <span className="text-2xl font-black text-[#071D49] tracking-tighter uppercase italic">
              Smash<span className="text-[#1DA1F2]">Live</span>
            </span>
          </div>
          <h1 className="text-4xl font-black text-[#071D49] tracking-tight">
            {step === 'details' ? (activeTab === 'login' ? 'Welcome Back' : 'New Athlete') : 'Security Pulse'}
          </h1>
          <p className="text-[#64748B] font-semibold uppercase text-xs tracking-[0.2em]">
            {step === 'details' ? "India's Home for Badminton" : "Verification in progress"}
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(7,29,73,0.08)] border border-[#E2E8F0]">
          <AnimatePresence mode="wait">
            {step === 'details' ? (
              <motion.div 
                key="details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex p-1 bg-[#F1F5F9] rounded-full mb-8">
                  <button 
                    onClick={() => setActiveTab('login')}
                    className={cn(
                      "flex-1 py-3 rounded-full text-xs font-black transition-all",
                      activeTab === 'login' ? "bg-[#071D49] text-white shadow-md" : "text-[#64748B]"
                    )}
                  >
                    LOGIN
                  </button>
                  <button 
                    onClick={() => setActiveTab('register')}
                    className={cn(
                      "flex-1 py-3 rounded-full text-xs font-black transition-all",
                      activeTab === 'register' ? "bg-[#071D49] text-white shadow-md" : "text-[#64748B]"
                    )}
                  >
                    REGISTER
                  </button>
                </div>

                {activeTab === 'register' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    className="space-y-4 pb-2"
                  >
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-2">Athlete Name</Label>
                      <Input 
                        value={regData.name}
                        onChange={(e) => setRegData({...regData, name: e.target.value})}
                        placeholder="Enter full name" 
                        className="h-14 rounded-[18px] border-[#E2E8F0] font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-2">Gender</Label>
                      <Select value={regData.gender} onValueChange={(v) => setRegData({...regData, gender: v})}>
                        <SelectTrigger className="h-14 rounded-[18px] border-[#E2E8F0] font-bold">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-2">Mobile Number</Label>
                  <div className="flex gap-3">
                    <div className="h-14 flex items-center gap-2 px-4 border border-[#E2E8F0] rounded-[18px] bg-[#F8FAFC] font-black text-[#071D49]">
                      <span className="text-lg">🇮🇳</span>
                      <span className="text-sm">+91</span>
                    </div>
                    <Input 
                      type="tel" 
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter mobile" 
                      className="h-14 rounded-[18px] border-[#E2E8F0] font-black text-lg flex-1"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSendOtp}
                  disabled={isLoading}
                  className="w-full h-14 rounded-[18px] bg-gradient-to-r from-[#071D49] to-[#1DA1F2] text-white font-black uppercase tracking-widest shadow-lg transition-all"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (activeTab === 'login' ? "Send OTP" : "Initialize Athlete Profile")}
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <button 
                  onClick={() => setStep('details')}
                  className="flex items-center gap-2 text-[#94A3B8] hover:text-[#071D49] transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Edit Details</span>
                </button>

                <div className="text-center space-y-2">
                   <h3 className="text-xl font-black text-[#071D49]">Enter OTP</h3>
                   <p className="text-xs font-bold text-[#94A3B8]">Sent to +91 {phone}</p>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpRefs.current[idx] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="w-full h-14 bg-white border-2 border-[#E2E8F0] rounded-[14px] text-center font-black text-xl text-[#071D49] focus:border-[#1DA1F2] outline-none transition-all"
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={handleVerify}
                    disabled={isLoading}
                    className="w-full h-14 rounded-[18px] bg-gradient-to-r from-[#071D49] to-[#1DA1F2] text-white font-black uppercase tracking-widest shadow-lg transition-all"
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify & Access"}
                  </Button>
                  
                  <div className="text-center">
                    <button onClick={handleSendOtp} className="text-[10px] font-black text-[#1DA1F2] uppercase tracking-widest hover:underline">
                      Resend OTP {timer > 0 && `(${timer}s)`}
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 flex items-center gap-3">
                   <Zap className="h-4 w-4 text-sky-500 fill-current" />
                   <p className="text-[10px] font-bold text-sky-700 leading-tight">
                     PROTOTYPE: Use code <span className="font-black underline">123456</span> to enter.
                   </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="text-center">
           <button 
             onClick={handleResetData}
             className="inline-flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-red-500 transition-colors"
           >
             <Trash2 className="h-3 w-3" /> Reset App Data
           </button>
        </div>
      </div>
    </div>
  );
};

export default Login;