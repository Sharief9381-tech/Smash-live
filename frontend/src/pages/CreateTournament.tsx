import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trophy, Check, Loader2, ChevronLeft, MapPin, Calendar, QrCode, Copy, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TournamentAPI } from '@/services/api';
import { showSuccess, showError } from '@/utils/toast';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const CreateTournament = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showLinkState, setShowLinkState] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", startDate: "", city: "" });
  const [slug, setSlug] = useState("");

  const handleInitialize = async () => {
    if (!formData.name || !formData.startDate || !formData.city) {
      showError("Please fill in all details.");
      return;
    }

    setIsLoading(true);
    const generatedSlug = formData.name.trim().toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substring(7);

    try {
      const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      const tourney = await TournamentAPI.create({
        name: formData.name,
        slug: generatedSlug,
        start_date: formData.startDate,
        city: formData.city,
        status: 'Accepting',
        organizer: profile.name || 'Active Athlete',
      });
      setSlug(tourney.slug || generatedSlug);
      setShowLinkState(true);
      showSuccess("Circuit Synchronized!");
    } catch (err: any) {
      showError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const registrationLink = `${window.location.origin}/register/${slug}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(registrationLink)}`;

  const downloadQR = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `QR_${formData.name.replace(/\s+/g, '_')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      showSuccess("QR Downloaded!");
    } catch (e) {
      showError("Download failed.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      <main className="container max-w-lg px-4 py-6">
        <AnimatePresence mode="wait">
          {!showLinkState ? (
            <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-400 hover:text-[#0B1F3A]">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-black text-[#0B1F3A] uppercase italic">Start Circuit</h1>
                <Button 
                  onClick={handleInitialize} 
                  disabled={isLoading}
                  className="h-10 bg-[#0B1F3A] text-white px-6 rounded-xl font-black text-[10px] uppercase tracking-widest"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Init"}
                </Button>
              </div>

              <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Name</Label>
                    <div className="relative">
                      <Trophy className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                      <Input 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        className="h-12 pl-11 rounded-xl bg-slate-50 border-slate-100 font-bold" 
                        placeholder="e.g. Mumbai Open" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">City</Label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                      <Input 
                        value={formData.city} 
                        onChange={e => setFormData({...formData, city: e.target.value})} 
                        className="h-12 pl-11 rounded-xl bg-slate-50 border-slate-100 font-bold" 
                        placeholder="City" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Start Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                      <Input 
                        type="date" 
                        value={formData.startDate} 
                        onChange={e => setFormData({...formData, startDate: e.target.value})} 
                        className="h-12 pl-11 rounded-xl bg-slate-50 border-slate-100 font-bold" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="space-y-8 text-center pt-6">
              <div className="bg-green-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-lg border border-green-100">
                <Check className="h-10 w-10 stroke-[3px]" />
              </div>
              
              <div className="space-y-1">
                <h2 className="text-3xl font-black text-[#0B1F3A] italic uppercase leading-none">Initialized</h2>
                <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">Entry Protocol Active</p>
              </div>

              <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-2xl space-y-6">
                 <div className="flex flex-col items-center gap-6">
                    <div className="relative group">
                      <div className="p-4 bg-white rounded-3xl border-4 border-[#0B1F3A]/5 shadow-inner">
                        <img src={qrUrl} alt="QR" className="w-48 h-48" />
                      </div>
                      <Button 
                        onClick={downloadQR}
                        className="absolute -bottom-3 -right-3 h-12 w-12 bg-sky-500 text-white rounded-2xl shadow-xl hover:bg-sky-600 transition-all border-none"
                      >
                        <Download className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="space-y-3 w-full">
                       <Label className="text-[9px] font-black uppercase text-slate-400">Entry Link</Label>
                       <div className="flex gap-2">
                          <div className="flex-1 h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 flex items-center overflow-hidden">
                             <span className="text-[10px] font-mono text-slate-500 truncate">{registrationLink}</span>
                          </div>
                          <Button 
                            onClick={() => { navigator.clipboard.writeText(registrationLink); setCopied(true); setTimeout(() => setCopied(false), 2000); }} 
                            className="h-12 w-12 bg-[#0B1F3A] text-white rounded-xl shadow-lg shrink-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                       </div>
                       <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Share this with athletes to populate the roster</p>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button onClick={() => navigate('/tournaments')} className="h-16 bg-[#0B1F3A] text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl">
                  GO TO TOURNAMENTS
                </Button>
                <button onClick={() => navigate('/')} className="text-[10px] font-black text-slate-400 uppercase underline decoration-2">Return Home</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default CreateTournament;