"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Globe, Trophy, ChevronDown, Loader2, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
import { AuthService } from '@/services/auth.service';
import { showError, showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Registration States
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

  const handleSendOtp = () => {
    if (phone.length < 10) {
      showError("Please enter a valid 10-digit mobile number");
      return;
    }
    if (activeTab === 'register' && (!regData.name || !regData.gender)) {
      showError("Please fill in all registration details");
      return;
    }

    setIsLoading(true);
    // Simulating OTP dispatch
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setTimer(30);
      showSuccess(`OTP sent to +91 ${phone}. Use 123456 for testing.`);
    }, 1200);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      showError("Please enter the 6-digit OTP");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (enteredOtp === "123456") {
        const userData = {
          phone: `+91${phone}`,
          name: activeTab === 'register' ? regData.name : "Athlete",
          gender: activeTab === 'register' ? regData.gender : undefined,
          isLoggedIn: true,
          onboardingComplete: activeTab === 'login' // Registering users will still need to complete onboarding
        };
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userProfile', JSON.stringify(userData));
        
        showSuccess(activeTab === 'register' ? "Account Created Successfully!" : "Login Successful!");
        
        if (activeTab === 'register') {
            navigate('/onboarding');
        } else {
            navigate('/court');
        }
      } else {
        showError("Invalid OTP. Try 123456");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1DA1F2]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#071D49]/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="w-full max-w-[480px] space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="bg-[#071D49] p-2 rounded-xl text-white shadow-lg">
              <Zap className="h-6 w-6 fill-current text-[#1DA1F2]" />
            </div>
            <span className="text-2xl font-black text-[#071D49] tracking-tighter uppercase italic">
              Smash<span className="text-[#1DA1F2]">Live</span>
            </span>
          </div>
          <h1 className="text-4xl font-black text-[#071D49] tracking-tight leading-none">
            Welcome to SmashLive
          </h1>
          <p className="text-[#64748B] font-semibold uppercase text-xs tracking-[0.2em]">
            India's Home for Badminton
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(7,29,73,0.08)] border border-[#E2E8F0]">
          {/* Tabs */}
          {step === 'details' && (
            <div className="flex p-1.5 bg-[#F1F5F9] rounded-full mb-10">
              <button 
                onClick={() => setActiveTab('login')}
                className={cn(
                  "flex-1 py-3.5 rounded-full text-sm font-bold transition-all duration-300",
                  activeTab === 'login' ? "bg-[#071D49] text-white shadow-lg" : "text-[#64748B] hover:text-[#071D49]"
                )}
              >
                LOGIN
              </button>
              <button 
                onClick={() => setActiveTab('register')}
                className={cn(
                  "flex-1 py-3.5 rounded-full text-sm font-bold transition-all duration-300",
                  activeTab === 'register' ? "bg-[#071D49] text-white shadow-lg" : "text-[#64748B] hover:text-[#071D49]"
                )}
              >
                REGISTER
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 'details' ? (
              <motion.div 
                key="details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                {activeTab === 'register' && (
                  <>
                    <div className="space-y-2.5">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-4">Full Name</Label>
                      <Input 
                        value={regData.name}
                        onChange={(e) => setRegData({...regData, name: e.target.value})}
                        placeholder="Enter your full name" 
                        className="h-14 bg-white border-[#E2E8F0] rounded-[18px] px-6 text-[#071D49] font-bold placeholder:text-[#94A3B8] focus-visible:ring-0 focus-visible:border-[#1DA1F2] focus-visible:shadow-[0_0_0_4px_rgba(29,161,242,0.15)] transition-all"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-4">Gender</Label>
                      <Select value={regData.gender} onValueChange={(v) => setRegData({...regData, gender: v})}>
                        <SelectTrigger className="h-14 bg-white border-[#E2E8F0] rounded-[18px] px-6 text-[#071D49] font-bold focus:ring-0 focus:border-[#1DA1F2] focus:shadow-[0_0_0_4px_rgba(29,161,242,0.15)]">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-[#E2E8F0]">
                          <SelectItem value="male" className="font-bold text-[#071D49]">Male</SelectItem>
                          <SelectItem value="female" className="font-bold text-[#071D49]">Female</SelectItem>
                          <SelectItem value="other" className="font-bold text-[#071D49]">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <div className="space-y-2.5">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] ml-4">Mobile Number</Label>
                  <div className="flex gap-3">
                    <div className="h-14 flex items-center gap-2 px-4 border border-[#E2E8F0] rounded-[18px] bg-white font-bold text-[#071D49]">
                      <span className="text-lg">🇮🇳</span>
                      <span className="text-sm">+91</span>
                    </div>
                    <Input 
                      type="tel" 
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter mobile number" 
                      className="h-14 bg-white border-[#E2E8F0] rounded-[18px] px-6 text-[#071D49] font-bold placeholder:text-[#94A3B8] focus-visible:ring-0 focus-visible:border-[#1DA1F2] focus-visible:shadow-[0_0_0_4px_rgba(29,161,242,0.15)] transition-all flex-1"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSendOtp}
                  disabled={isLoading}
                  className="w-full h-[56px] rounded-[18px] bg-gradient-to-r from-[#071D49] to-[#1DA1F2] text-white font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send OTP"}
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="space-y-4 text-center">
                   <div className="bg-[#F1F5F9] w-14 h-14 rounded-full flex items-center justify-center mx-auto text-[#071D49]">
                      <Lock className="h-6 w-6" />
                   </div>
                   <div className="space-y-1">
                      <h3 className="text-xl font-black text-[#071D49]">Enter OTP</h3>
                      <p className="text-xs font-bold text-[#94A3B8]">Verification code sent to +91 {phone}</p>
                   </div>
                </div>

                <div className="flex justify-between gap-2.5">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpRefs.current[idx] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="w-12 h-14 bg-white border-[#E2E8F0] rounded-[14px] text-center font-black text-xl text-[#071D49] focus:border-[#1DA1F2] focus:shadow-[0_0_0_4px_rgba(29,161,242,0.15)] outline-none transition-all"
                    />
                  ))}
                </div>

                <div className="space-y-6">
                  <Button 
                    onClick={handleVerify}
                    disabled={isLoading}
                    className="w-full h-[56px] rounded-[18px] bg-gradient-to-r from-[#071D49] to-[#1DA1F2] text-white font-black text-sm uppercase tracking-widest shadow-xl transition-all"
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (activeTab === 'register' ? "Create Account" : "Verify & Login")}
                  </Button>
                  
                  <div className="text-center space-y-4">
                    {timer > 0 ? (
                      <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">
                        Resend OTP in <span className="text-[#1DA1F2]">{timer}s</span>
                      </p>
                    ) : (
                      <button 
                        onClick={handleSendOtp}
                        className="text-[10px] font-black text-[#1DA1F2] uppercase tracking-widest hover:underline"
                      >
                        Resend OTP Now
                      </button>
                    )}
                    <button 
                      onClick={() => setStep('details')}
                      className="block mx-auto text-[10px] font-black text-[#94A3B8] uppercase tracking-widest hover:text-[#071D49] transition-colors"
                    >
                      Change Mobile Number
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="space-y-6 text-center">
           <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em]">Premium sports-tech authentication.</p>
           <div className="flex items-center justify-center gap-6 text-[#94A3B8]">
              <div className="flex items-center gap-2">
                 <ShieldCheck className="h-4 w-4" />
                 <span className="text-[9px] font-bold uppercase">Secure Auth</span>
              </div>
              <div className="flex items-center gap-2">
                 <Trophy className="h-4 w-4" />
                 <span className="text-[9px] font-bold uppercase">Built for Badminton</span>
              </div>
              <div className="flex items-center gap-2">
                 <Globe className="h-4 w-4" />
                 <span className="text-[9px] font-bold uppercase">Made for India</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;