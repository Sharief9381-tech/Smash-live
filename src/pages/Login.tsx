"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';
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
      const existing = await AuthService.getProfileByMobile(phone);

      if (activeTab === 'login' && !existing) {
        throw new Error("Athlete not found. Please register first.");
      }
      if (activeTab === 'register' && existing) {
        throw new Error("This number is already registered.");
      }
      if (activeTab === 'register' && (!regData.name || !regData.gender)) {
        throw new Error("Please complete name and gender fields.");
      }

      setTimeout(() => {
        setIsLoading(false);
        setStep('otp');
        showSuccess(`Security code [123456] sent to +91 ${phone}`);
      }, 800);
    } catch (err: any) {
      showError(err.message);
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (otp.join("") !== "123456") {
      showError("Invalid code. Use 123456.");
      return;
    }

    setIsLoading(true);
    try {
      if (activeTab === 'register') {
        // We move to Onboarding to collect 'state' before the final insert
        localStorage.setItem('temp_reg', JSON.stringify({ ...regData, mobile: phone }));
        navigate('/onboarding');
      } else {
        const profile = await AuthService.getProfileByMobile(phone);
        AuthService.setLocalSession(profile);
        showSuccess("Welcome to the Court!");
        navigate('/court');
      }
    } catch (err: any) {
      showError(err.message);
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
      <div className="w-full max-w-[460px] space-y-8 relative z-10">
        <div className="text-center space-y-3">
          <div className="bg-[#071D49] w-16 h-16 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl mb-4">
            <Zap className="h-8 w-8 text-[#1DA1F2] fill-current" />
          </div>
          <h1 className="text-4xl font-black text-[#071D49] tracking-tighter uppercase italic">
            {activeTab === 'login' ? 'Enter the Court' : 'Join the Circuit'}
          </h1>
        </div>

        <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-[#E2E8F0]">
          <AnimatePresence mode="wait">
            {step === 'details' ? (
              <motion.div key="details" className="space-y-6">
                <div className="flex p-1 bg-[#F1F5F9] rounded-full mb-6">
                  <button onClick={() => setActiveTab('login')} className={cn("flex-1 py-3 rounded-full text-xs font-black transition-all", activeTab === 'login' ? "bg-[#071D49] text-white" : "text-[#64748B]")}>LOGIN</button>
                  <button onClick={() => setActiveTab('register')} className={cn("flex-1 py-3 rounded-full text-xs font-black transition-all", activeTab === 'register' ? "bg-[#071D49] text-white" : "text-[#64748B]")}>REGISTER</button>
                </div>

                {activeTab === 'register' && (
                  <div className="space-y-4">
                    <Input value={regData.name} onChange={e => setRegData({...regData, name: e.target.value})} placeholder="Full Name" className="h-14 rounded-2xl" />
                    <Select value={regData.gender} onValueChange={v => setRegData({...regData, gender: v})}>
                      <SelectTrigger className="h-14 rounded-2xl"><SelectValue placeholder="Gender" /></SelectTrigger>
                      <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex gap-2">
                  <div className="h-14 flex items-center px-4 border rounded-2xl bg-slate-50 font-black text-sm">+91</div>
                  <Input maxLength={10} value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ""))} placeholder="Mobile Number" className="h-14 rounded-2xl flex-1" />
                </div>

                <Button onClick={handleSendOtp} disabled={isLoading} className="w-full h-14 rounded-2xl bg-[#071D49] text-white font-black uppercase">
                  {isLoading ? <Loader2 className="animate-spin" /> : "Access System"}
                </Button>
              </motion.div>
            ) : (
              <motion.div key="otp" className="space-y-8">
                <button onClick={() => setStep('details')} className="text-xs font-bold text-slate-400">← Back</button>
                <div className="grid grid-cols-6 gap-2">
                  {otp.map((d, i) => (
                    <input key={i} ref={el => otpRefs.current[i] = el} type="text" maxLength={1} value={d} onChange={e => handleOtpChange(i, e.target.value)} className="w-full h-14 border-2 rounded-xl text-center font-black text-xl" />
                  ))}
                </div>
                <Button onClick={handleVerify} disabled={isLoading} className="w-full h-14 rounded-2xl bg-[#1DA1F2] text-white font-black uppercase">Verify Code</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Login;