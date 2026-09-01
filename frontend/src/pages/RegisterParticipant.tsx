import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, User, ArrowRight, Check, Loader2,
  Phone, ChevronLeft, Globe, ShieldCheck, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TournamentAPI } from '@/services/api';
import { showSuccess, showError } from '@/utils/toast';
import { INDIAN_STATES, STATE_DISTRICTS } from '@/data/locations';

const RegisterParticipant = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate  = useNavigate();

  const [tournament,     setTournament]     = useState<any>(null);
  const [initializing,   setInitializing]   = useState(true);
  const [loading,        setLoading]        = useState(false);
  const [success,        setSuccess]        = useState(false);

  // Logged-in profile from localStorage
  const savedProfile: any = JSON.parse(localStorage.getItem('userProfile') || 'null');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' && !!savedProfile;

  // Guest-only form state
  const [form, setForm] = useState({
    name: '', phone: '', gender: '', state: '', district: '',
    partner_name: '', partner_phone: '',
  });

  useEffect(() => {
    if (!slug) return;
    TournamentAPI.getById(slug)
      .then(data => setTournament({ ...data, id: data._id || data.id }))
      .catch(() => setTournament(null))
      .finally(() => setInitializing(false));
  }, [slug]);

  const isDoubles = tournament?.category === 'doubles';

  const handleRegister = async () => {
    if (!tournament) return;
    setLoading(true);
    try {
      if (isLoggedIn) {
        // Use SmashLive profile directly
        await TournamentAPI.addParticipant(tournament.id, {
          name:       savedProfile.name,
          phone:      savedProfile.mobile,
          gender:     savedProfile.gender,
          state:      savedProfile.state,
          district:   savedProfile.district,
          smash_id:   savedProfile.smashId || savedProfile.smash_id,
          user_id:    savedProfile._id,
          ...(isDoubles && form.partner_name && {
            partner_name:  form.partner_name,
            partner_phone: form.partner_phone,
          }),
        });
      } else {
        if (!form.name || !form.phone || !form.gender || !form.state || !form.district) {
          showError('Please complete all required fields.');
          setLoading(false);
          return;
        }
        if (isDoubles && !form.partner_name) {
          showError("Please enter your partner's name.");
          setLoading(false);
          return;
        }
        await TournamentAPI.addParticipant(tournament.id, {
          name:       form.name,
          phone:      form.phone,
          gender:     form.gender,
          state:      form.state,
          district:   form.district,
          smash_id:   `GUEST_${Date.now().toString().slice(-5)}`,
          ...(isDoubles && {
            partner_name:  form.partner_name,
            partner_phone: form.partner_phone,
          }),
        });
      }
      setSuccess(true);
      showSuccess('Entry confirmed!');
    } catch (e: any) {
      showError(e.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (initializing) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Loader2 className="h-10 w-10 text-sky-500 animate-spin" />
    </div>
  );

  if (!tournament && !success) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 gap-6 text-center">
      <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 space-y-6 max-w-sm">
        <Trophy className="h-12 w-12 text-slate-200 mx-auto" />
        <h1 className="text-2xl font-black text-[#0B1F3A] uppercase italic">Tournament Not Found</h1>
        <Button onClick={() => navigate('/')} className="w-full h-12 bg-[#0B1F3A] text-white rounded-xl font-black uppercase tracking-widest text-[10px]">
          Return Home
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Header */}
      <div className="bg-[#0B1F3A] p-8 pb-16 text-center text-white space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <button onClick={() => navigate('/')} className="absolute top-6 left-6 text-white/40 hover:text-white z-20">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 relative z-10">
          <Globe className="h-3 w-3 text-sky-400" />
          <span className="text-[9px] font-black uppercase tracking-widest">Tournament Entry</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight uppercase italic relative z-10">{tournament?.name}</h1>
        <p className="text-[9px] font-black text-sky-400 uppercase tracking-[0.3em] relative z-10">
          {tournament?.category} · {tournament?.format === 'round_robin' ? 'Round Robin' : 'Knockout'}
        </p>
      </div>

      <main className="px-6 -mt-8 relative z-30">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100 max-w-lg mx-auto space-y-8">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div key="success" initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                className="text-center space-y-6 py-6">
                <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border-2 border-green-200">
                  <Check className="h-10 w-10 text-green-500 stroke-[3px]" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-[#0B1F3A] uppercase italic">Entry Confirmed</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">You're on the roster.</p>
                </div>
                <Button onClick={() => navigate('/')} className="w-full h-14 bg-[#0B1F3A] text-white font-black rounded-xl uppercase tracking-widest text-[10px]">
                  Return Home
                </Button>
              </motion.div>

            ) : isLoggedIn ? (
              /* ── LOGGED IN: one-tap confirm ── */
              <motion.div key="loggedin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex items-center gap-3 p-4 bg-sky-50 rounded-2xl border border-sky-100">
                  <ShieldCheck className="h-5 w-5 text-sky-500 shrink-0" />
                  <p className="text-[10px] font-black text-sky-700 uppercase tracking-widest">
                    Registering with your SmashLive profile
                  </p>
                </div>

                {/* Profile card */}
                <div className="p-5 rounded-2xl bg-[#0B1F3A] flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 font-black text-lg uppercase">
                    {savedProfile.name?.[0]}
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-black text-white uppercase italic text-lg leading-tight">{savedProfile.name}</p>
                    <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest">
                      {savedProfile.smashId || savedProfile.smash_id || 'SmashLive Athlete'}
                    </p>
                    <p className="text-[9px] font-black text-white/40 uppercase">
                      {savedProfile.state}{savedProfile.district ? ` · ${savedProfile.district}` : ''}
                    </p>
                  </div>
                </div>

                {/* Doubles partner (only field needed) */}
                {isDoubles && (
                  <div className="space-y-3 p-4 bg-sky-50 rounded-2xl border border-sky-100">
                    <Label className="text-[10px] font-black uppercase text-sky-600">Partner Name</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                      <Input value={form.partner_name}
                        onChange={e => setForm(f => ({ ...f, partner_name: e.target.value }))}
                        className="h-12 rounded-xl bg-white border-sky-100 font-bold pl-12"
                        placeholder="Partner full name" />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                      <Input value={form.partner_phone}
                        onChange={e => setForm(f => ({ ...f, partner_phone: e.target.value.replace(/\D/g,'') }))}
                        className="h-12 rounded-xl bg-white border-sky-100 font-bold pl-12"
                        placeholder="Partner mobile (optional)" maxLength={10} />
                    </div>
                  </div>
                )}

                <Button onClick={handleRegister} disabled={loading}
                  className="w-full h-14 bg-sky-500 hover:bg-sky-600 text-white font-black uppercase tracking-widest text-[11px] rounded-xl shadow-xl gap-3">
                  {loading
                    ? <Loader2 className="animate-spin h-5 w-5" />
                    : <><Zap className="h-5 w-5 fill-current" /> Confirm Entry</>
                  }
                </Button>

                <p className="text-center text-[9px] font-black text-slate-300 uppercase tracking-widest">
                  Not you?{' '}
                  <button onClick={() => { localStorage.clear(); navigate('/login'); }}
                    className="text-sky-500 underline underline-offset-4">
                    Sign in with another account
                  </button>
                </p>
              </motion.div>

            ) : (
              /* ── GUEST: full form ── */
              <motion.div key="guest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <Zap className="h-5 w-5 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest">No SmashLive account?</p>
                    <button onClick={() => navigate('/login')}
                      className="text-[9px] font-black text-sky-500 underline underline-offset-2">
                      Sign in for instant entry →
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-2">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                      <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="h-12 rounded-xl bg-slate-50 border-slate-100 font-bold pl-12" placeholder="Your full name" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Gender</Label>
                      <Select onValueChange={v => setForm(f => ({ ...f, gender: v }))}>
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 font-bold text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Mobile</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                        <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g,'') }))}
                          className="h-12 rounded-xl bg-slate-50 border-slate-100 font-bold pl-10" placeholder="10 digits" maxLength={10} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">State</Label>
                      <Select value={form.state} onValueChange={v => setForm(f => ({ ...f, state: v, district: '' }))}>
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 font-bold text-sm"><SelectValue placeholder="State" /></SelectTrigger>
                        <SelectContent className="rounded-xl max-h-60">
                          {INDIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">District</Label>
                      <Select value={form.district} onValueChange={v => setForm(f => ({ ...f, district: v }))} disabled={!form.state}>
                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-100 font-bold text-sm"><SelectValue placeholder="District" /></SelectTrigger>
                        <SelectContent className="rounded-xl max-h-60">
                          {form.state && STATE_DISTRICTS[form.state]?.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {isDoubles && (
                    <div className="space-y-3 p-4 bg-sky-50 rounded-2xl border border-sky-100">
                      <Label className="text-[10px] font-black uppercase text-sky-600">Partner (Doubles)</Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                        <Input value={form.partner_name} onChange={e => setForm(f => ({ ...f, partner_name: e.target.value }))}
                          className="h-12 rounded-xl bg-white border-sky-100 font-bold pl-12" placeholder="Partner full name" />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                        <Input value={form.partner_phone} onChange={e => setForm(f => ({ ...f, partner_phone: e.target.value.replace(/\D/g,'') }))}
                          className="h-12 rounded-xl bg-white border-sky-100 font-bold pl-12" placeholder="Partner mobile (optional)" maxLength={10} />
                      </div>
                    </div>
                  )}
                </div>

                <Button onClick={handleRegister} disabled={loading}
                  className="w-full h-14 bg-sky-500 hover:bg-sky-600 text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-xl">
                  {loading ? <Loader2 className="animate-spin" /> : 'Submit Entry'}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default RegisterParticipant;
