"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Loader2, ChevronLeft, MapPin } from 'lucide-react';
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
  
  const [regData, setRegData] = useState({ name: "", gender: "", state: "", district: "" });

  const handleSendOtp = async () => {
    if (activeTab === 'register' && (!regData.name || !regData.gender || !regData.state || !regData.district)) {
      showError("Complete registration fields"); return;
    }
    if (phone.length < 10) { showError("Enter 10-digit number"); return; }
    setStep('otp');
    showSuccess("Security code [123456] sent.");
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) { showError("Enter 6-digit code"); return; }
    if (code !== "123456") { showError("Invalid code. Use 123456."); return; }
    setIsLoading(true);
    try {
      if (activeTab === 'register') {
        const profile = await AuthService.registerAthlete({ ...regData, mobile: phone });
        AuthService.setLocalSession(profile);
        navigate('/dashboard', { replace: true });
      } else {
        const profile = await AuthService.getProfileByMobile(phone);
        AuthService.setLocalSession(profile);
        navigate(profile.onboardingComplete ? '/dashboard' : '/onboarding', { replace: true });
      }
    } catch (err) { showError("Sync issue"); } finally { setIsLoading(false); }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp]; newOtp[index] = value.slice(-1); setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  return (
    <div className="min-h-screen bg-[#0B1F3A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-sky-500/10 blur-[100px] rounded-full" />
      
      <div className="w-full max-w-[440px] space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="bg-white p-3 rounded-2xl shadow-2xl"><Zap className="h-7 w-7 text-[#0EA5E9] fill-current" /></div>
            <div className="text-left"><h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Smash<span className="text-sky-400">Live</span></h1><p className="text-[8px] font-black text-sky-400/60 uppercase tracking-widest">Athlete Network</p></div>
          </Link>
        </div>

        <div className="bg-white rounded-[3.5rem] p-8 shadow-2xl space-y-8 border-t-4 border-sky-500">
          <div className="flex p-1.5 bg-slate-100 rounded-2xl">
            {['login', 'register'].map((tab) => (
              <button key={tab} onClick={() => { setActiveTab(tab as any); setStep('details'); }} className={cn("flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all", activeTab === tab ? "bg-[#0B1F3A] text-white shadow-lg" : "text-slate-400")}>{tab.toUpperCase()}</button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 'details' ? (
              <motion.div key="details" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {activeTab === 'register' && (
                  <div className="space-y-4">
                    <Input value={regData.name} onChange={e => setRegData({...regData, name: e.target.value})} placeholder="Athlete Name" className="h-14 rounded-2xl bg-slate-50 border-slate-100 font-bold" />
                    <div className="grid grid-cols-2 gap-3">
                      <Select value={regData.gender} onValueChange={v => setRegData({...regData, gender: v})}><SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-slate-100"><SelectValue placeholder="Gender" /></SelectTrigger><SelectContent className="rounded-xl"><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent></Select>
                      <Select value={regData.state} onValueChange={v => setRegData({...regData, state: v, district: ""})}><SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-slate-100"><SelectValue placeholder="State" /></SelectTrigger><SelectContent className="rounded-xl">{INDIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  <div className="h-14 px-4 border border-slate-100 rounded-2xl bg-slate-50 flex items-center font-black text-sm">+91</div>
                  <Input maxLength={10} value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ""))} placeholder="Mobile Number" className="h-14 rounded-2xl bg-slate-50 flex-1 font-black text-lg border-slate-100" />
                </div>
                <Button onClick={handleSendOtp} className="w-full h-16 rounded-[1.5rem] bg-[#0B1F3A] text-white font-black uppercase tracking-widest shadow-xl">Request Access</Button>
              </motion.div>
            ) : (
              <motion.div key="otp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center">
                <div className="grid grid-cols-6 gap-2">
                  {otp.map((d, i) => <input key={i} ref={el => otpRefs.current[i] = el} type="text" maxLength={1} value={d} onChange={e => handleOtpChange(i, e.target.value)} className="w-full h-12 border-2 border-slate-100 bg-slate-50 rounded-xl text-center font-black text-[#0B1F3A] outline-none focus:border-sky-500" />)}
                </div>
                <Button onClick={handleVerify} disabled={isLoading} className="w-full h-16 rounded-[1.5rem] bg-sky-500 text-white font-black uppercase tracking-widest shadow-xl">{isLoading ? <Loader2 className="animate-spin h-6 w-6" /> : "Verify"}</Button>
                <button onClick={() => setStep('details')} className="text-[9px] font-black text-slate-400 uppercase tracking-widest underline">Edit Details</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Login;