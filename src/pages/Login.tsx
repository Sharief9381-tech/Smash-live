"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Loader2, ArrowLeft, ArrowRight, ChevronLeft, MapPin, Smartphone } from 'lucide-react';
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
      showError("Complete all dossier fields");
      return;
    }
    if (phone.length < 10) { showError("Enter 10-digit mobile node"); return; }
    setStep('otp');
    showSuccess("Access Code: 123456");
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) return showError("Enter full code");
    if (code !== "123456") return showError("Invalid. Use 123456");

    setIsLoading(true);
    try {
      if (activeTab === 'register') {
        const profile = await AuthService.registerAthlete({ ...regData, mobile: phone });
        AuthService.setLocalSession(profile);
        showSuccess("Dossier Synced");
        navigate('/dashboard', { replace: true });
      } else {
        const profile = await AuthService.getProfileByMobile(phone);
        AuthService.setLocalSession(profile);
        navigate(profile.onboardingComplete ? '/dashboard' : '/onboarding', { replace: true });
      }
    } catch (err) { showError("Sync Failure"); } finally { setIsLoading(false); }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <header className="h-16 flex items-center justify-between relative z-20">
         <Link to="/" className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary fill-current" />
            <span className="text-xl font-black italic uppercase tracking-tighter">Smash<span className="text-primary">Live</span></span>
         </Link>
      </header>

      <main className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full space-y-10 relative z-10 pt-10 pb-20">
        <div className="space-y-2 text-center">
           <h1 className="text-4xl font-black uppercase italic tracking-tighter">The Indoor</h1>
           <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Athlete Authentication Hub</p>
        </div>

        <div className="bg-card border border-white/5 rounded-[3rem] p-8 space-y-8 shadow-2xl">
           <AnimatePresence mode="wait">
              {step === 'details' ? (
                <motion.div key="details" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                   <div className="flex p-1 bg-muted/30 rounded-2xl">
                      {['login', 'register'].map(t => (
                        <button key={t} onClick={() => setActiveTab(t as any)} className={cn("flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeTab === t ? "bg-primary text-white shadow-lg" : "text-muted-foreground")}>
                           {t}
                        </button>
                      ))}
                   </div>

                   {activeTab === 'register' && (
                     <div className="space-y-4">
                        <div className="space-y-2">
                           <Label className="text-[9px] font-black uppercase text-muted-foreground ml-2">Legal Name</Label>
                           <Input value={regData.name} onChange={e => setRegData({...regData, name: e.target.value})} placeholder="Athlete Full Name" className="h-14 rounded-2xl bg-muted/20 border-white/5 font-bold" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label className="text-[9px] font-black uppercase text-muted-foreground ml-2">State</Label>
                              <Select value={regData.state} onValueChange={v => setRegData({...regData, state: v, district: ""})}>
                                 <SelectTrigger className="h-14 rounded-2xl bg-muted/20 border-white/5 font-bold"><SelectValue placeholder="Node" /></SelectTrigger>
                                 <SelectContent className="bg-card border-white/5 rounded-2xl">{INDIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                              </Select>
                           </div>
                           <div className="space-y-2">
                              <Label className="text-[9px] font-black uppercase text-muted-foreground ml-2">Gender</Label>
                              <Select value={regData.gender} onValueChange={v => setRegData({...regData, gender: v})}>
                                 <SelectTrigger className="h-14 rounded-2xl bg-muted/20 border-white/5 font-bold"><SelectValue /></SelectTrigger>
                                 <SelectContent className="bg-card border-white/5 rounded-2xl">
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                        </div>
                     </div>
                   )}

                   <div className="space-y-2">
                      <Label className="text-[9px] font-black uppercase text-muted-foreground ml-2">Mobile Protocol</Label>
                      <div className="relative">
                         <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary opacity-50" />
                         <Input maxLength={10} value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ""))} placeholder="Mobile Number" className="h-14 pl-12 bg-muted/20 border-white/5 rounded-2xl font-black text-lg" />
                      </div>
                   </div>

                   <Button onClick={handleSendOtp} disabled={isLoading} className="w-full h-16 rounded-[1.5rem] bg-primary text-white font-black uppercase tracking-widest text-xs active:scale-95 transition-all shadow-xl">
                      {isLoading ? <Loader2 className="animate-spin" /> : "Request Secure Access"}
                   </Button>
                </motion.div>
              ) : (
                <motion.div key="otp" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                   <div className="flex justify-center gap-2">
                      {otp.map((d, i) => (
                        <input key={i} ref={el => otpRefs.current[i] = el} type="text" maxLength={1} value={d} onChange={e => handleOtpChange(i, e.target.value)} className="w-12 h-16 border-2 border-white/5 bg-muted/20 rounded-xl text-center font-black text-2xl text-primary focus:border-primary outline-none transition-all" />
                      ))}
                   </div>
                   <div className="space-y-4">
                      <Button onClick={handleVerify} disabled={isLoading} className="w-full h-16 rounded-2xl bg-secondary text-white font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">
                         {isLoading ? <Loader2 className="animate-spin" /> : "Verify & Sync"}
                      </Button>
                      <button onClick={() => setStep('details')} className="w-full text-center text-[9px] font-black text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors">Change mobile number</button>
                   </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>

        <div className="flex flex-col items-center gap-2 opacity-30">
           <ShieldCheck className="h-5 w-5 text-secondary" />
           <p className="text-[8px] font-black uppercase tracking-[0.4em]">End-to-End Encrypted Registry</p>
        </div>
      </main>
    </div>
  );
};

export default Login;