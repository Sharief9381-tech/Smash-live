"use client";

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from '@/components/ui/badge';
import { 
  Target, Users, Trophy, Zap, Search,
  X, User, ChevronRight, MapPin, Calendar, Clock,
  ShieldCheck, Loader2, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { playersDatabase, Player } from '@/data/players';
import { showSuccess, showError } from '@/utils/toast';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const CreateIndividualMatch = () => {
  const navigate = useNavigate();
  const [isInitializing, setIsInitializing] = useState(false);
  const [matchType, setMatchType] = useState<'singles' | 'doubles' | 'mixed'>('singles');
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({});
  const [selectedPlayers, setSelectedPlayers] = useState<Record<string, Player | null>>({
    p1: null, p2: null, tA1: null, tA2: null, tB1: null, tB2: null
  });
  
  const [formData, setFormData] = useState({
    name: "Smash Exhibition",
    round: "Friendly",
    court: "01",
    date: new Date().toISOString().split('T')[0],
    time: "14:00",
    sets: "3",
    server: "sideA",
    side: "left",
    aiCommentary: true,
    broadcast: true,
    warmUp: "3"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Match name is required";
    if (!formData.court) newErrors.court = "Court number is required";
    if (!formData.time) newErrors.time = "Start time is required";

    // Player validations
    if (matchType === 'singles') {
      if (!selectedPlayers.p1) newErrors.p1 = "Player 1 required";
      if (!selectedPlayers.p2) newErrors.p2 = "Player 2 required";
    } else {
      if (!selectedPlayers.tA1) newErrors.tA1 = "Team A Player 1 required";
      if (!selectedPlayers.tA2) newErrors.tA2 = "Team A Player 2 required";
      if (!selectedPlayers.tB1) newErrors.tB1 = "Team B Player 1 required";
      if (!selectedPlayers.tB2) newErrors.tB2 = "Team B Player 2 required";
    }

    // Court occupancy check (Simulated)
    const existingMatches = Object.keys(localStorage).filter(k => k.startsWith('live_'));
    const isOccupied = existingMatches.some(k => {
      const data = JSON.parse(localStorage.getItem(k) || "{}");
      return data.court === formData.court && data.status === 'live';
    });
    if (isOccupied) newErrors.court = "Court already occupied with a live match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const selectPlayer = (id: string, player: Player) => {
    const isAlreadyOnCourt = Object.entries(selectedPlayers).some(([slot, p]) => p?.id === player.id);
    if (isAlreadyOnCourt) {
      showError("Player cannot be selected on both sides");
      return;
    }
    setSelectedPlayers(prev => ({ ...prev, [id]: player }));
    setSearchQueries(prev => ({ ...prev, [id]: "" }));
    setErrors(prev => {
      const n = { ...prev };
      delete n[id];
      return n;
    });
  };

  const handleStart = async () => {
    if (!validate()) {
      showError("Please fix validation errors before starting");
      return;
    }

    setIsInitializing(true);
    
    // Simulate Network Check
    const networkSuccess = Math.random() > 0.05;
    if (!networkSuccess) {
      setTimeout(() => {
        setIsInitializing(false);
        showError("Unable to start match. Please try again");
      }, 1500);
      return;
    }

    const matchId = `live_${Date.now()}`;
    const payload = {
      ...formData,
      matchType,
      players: selectedPlayers,
      status: 'live',
      id: matchId
    };

    localStorage.setItem(matchId, JSON.stringify(payload));
    showSuccess("Match started successfully — redirecting to scoring");
    
    setTimeout(() => {
      navigate(`/scoring/${matchId}`);
    }, 1500);
  };

  const PlayerSlot = ({ id, label }: { id: string; label: string }) => (
    <div className="space-y-3">
      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</Label>
      <div className="relative">
        {!selectedPlayers[id] ? (
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
            <Input 
              placeholder="Search Smash ID (e.g. Smash#01)" 
              className={cn(
                "h-14 bg-white border-slate-100 rounded-2xl pl-11 font-bold focus:border-sky-500 shadow-sm",
                errors[id] && "border-red-500 bg-red-50/10"
              )}
              value={searchQueries[id] || ""}
              onChange={(e) => setSearchQueries(prev => ({ ...prev, [id]: e.target.value }))}
            />
            <AnimatePresence>
              {searchQueries[id] && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-[2rem] shadow-2xl overflow-hidden p-2">
                  {playersDatabase.filter(p => p.name.toLowerCase().includes(searchQueries[id].toLowerCase())).length > 0 ? (
                    playersDatabase.filter(p => p.name.toLowerCase().includes(searchQueries[id].toLowerCase())).slice(0, 4).map(p => (
                      <button key={p.id} onClick={() => selectPlayer(id, p)} className="w-full p-3 flex items-center gap-4 hover:bg-slate-50 rounded-2xl transition-all text-left group">
                        <div className="h-12 w-12 rounded-full bg-[#0B1F3A] flex items-center justify-center text-[10px] font-black text-sky-500 border border-slate-100">{p.img}</div>
                        <div className="flex-1">
                          <p className="font-black text-sm text-[#0B1F3A] group-hover:text-sky-600 transition-colors">{p.name}</p>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Rank #{p.rank} • {p.country}</p>
                          <p className="text-[8px] font-bold text-slate-300 uppercase">{p.state} Badminton Club</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-slate-200 group-hover:text-sky-500" />
                      </button>
                    ))
                  ) : (
                    <div className="p-6 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">No player found for this Smash ID</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            {errors[id] && <p className="text-[10px] font-bold text-red-500 mt-1.5 ml-1">{errors[id]}</p>}
          </div>
        ) : (
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-24 bg-[#0B1F3A] rounded-[2rem] p-5 flex items-center justify-between border border-sky-500/20 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sm font-black text-sky-400 shadow-inner">
                {selectedPlayers[id]?.img}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-black text-white text-lg leading-tight uppercase italic">{selectedPlayers[id]?.name}</p>
                  <ShieldCheck className="h-4 w-4 text-sky-500" />
                </div>
                <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest">BWF Certified • {selectedPlayers[id]?.country}</p>
              </div>
            </div>
            <button onClick={() => setSelectedPlayers(p => ({ ...p, [id]: null }))} className="h-10 w-10 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all flex items-center justify-center">
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-sky-500/30">
      <Navbar />
      
      {isInitializing && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-md z-[100] flex flex-col items-center justify-center gap-6">
          <Loader2 className="h-16 w-16 text-sky-600 animate-spin" />
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-[#0B1F3A] tracking-tighter uppercase italic">Initializing Studio</h2>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Syncing data with global servers...</p>
          </div>
        </div>
      )}

      <main className="container max-w-7xl px-6 py-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-sky-500 fill-current" />
              <span className="text-[10px] font-black text-sky-600 uppercase tracking-[0.4em]">Operational Broadcast Workflow</span>
            </div>
            <h1 className="text-6xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-none">Studio Setup</h1>
          </div>
          <Button onClick={() => navigate('/broadcast/center')} variant="outline" className="h-14 rounded-2xl border-slate-200 bg-white font-black text-slate-400 px-8 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all">
            EXIT WORKFLOW
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Section 1: Match Setup */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 border-slate-200 shadow-xl shadow-slate-900/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Target className="h-40 w-40 text-[#0B1F3A]" />
              </div>
              <div className="flex items-center gap-4 border-b border-slate-100 pb-6 relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-[#0B1F3A] text-white flex items-center justify-center shadow-lg">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">Match Setup</h3>
              </div>
              
              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Event Identifier</Label>
                  <Input 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    className={cn("h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold", errors.name && "border-red-500")}
                  />
                  {errors.name && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</Label>
                    <Select value={matchType} onValueChange={(v: any) => setMatchType(v)}>
                      <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="singles">Singles</SelectItem>
                        <SelectItem value="doubles">Doubles</SelectItem>
                        <SelectItem value="mixed">Mixed Doubles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Round</Label>
                    <Select value={formData.round} onValueChange={(v: any) => setFormData({...formData, round: v})}>
                      <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Friendly">Friendly</SelectItem>
                        <SelectItem value="League">League</SelectItem>
                        <SelectItem value="Quarter Final">Quarter Final</SelectItem>
                        <SelectItem value="Semi Final">Semi Final</SelectItem>
                        <SelectItem value="Final">Final</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Court #</Label>
                    <Input 
                      value={formData.court} 
                      onChange={e => setFormData({...formData, court: e.target.value})} 
                      className={cn("h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold", errors.court && "border-red-500")}
                    />
                    {errors.court && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.court}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Best of</Label>
                    <Select value={formData.sets} onValueChange={(v: any) => setFormData({...formData, sets: v})}>
                      <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Set</SelectItem>
                        <SelectItem value="3">3 Sets</SelectItem>
                        <SelectItem value="5">5 Sets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Date</Label>
                    <Input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-4 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Time</Label>
                    <Input type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-4 font-bold" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Player Selection */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-panel p-10 rounded-[3.5rem] space-y-10 border-slate-200 shadow-xl min-h-[500px]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-lg">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">Player Selection</h3>
                </div>
                <Badge className="bg-slate-100 text-[#0B1F3A] border-none font-black text-[10px] px-4">{matchType.toUpperCase()} MODE</Badge>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-100 font-black text-[12rem] italic pointer-events-none select-none opacity-50">VS</div>
                
                {/* Side A */}
                <div className="space-y-8 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="h-1 w-8 bg-sky-500 rounded-full" />
                    <span className="text-xs font-black text-[#0B1F3A] uppercase tracking-widest italic">SIDE A INTELLIGENCE</span>
                  </div>
                  
                  {matchType === 'singles' ? (
                    <PlayerSlot id="p1" label="Player 01 Smash ID" />
                  ) : (
                    <div className="space-y-6">
                      <PlayerSlot id="tA1" label="Member 01 Smash ID" />
                      <PlayerSlot id="tA2" label="Member 02 Smash ID" />
                    </div>
                  )}
                </div>

                {/* Side B */}
                <div className="space-y-8 relative z-10 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <span className="text-xs font-black text-[#0B1F3A] uppercase tracking-widest italic">SIDE B INTELLIGENCE</span>
                    <div className="h-1 w-8 bg-red-500 rounded-full" />
                  </div>

                  {matchType === 'singles' ? (
                    <PlayerSlot id="p2" label="Player 02 Smash ID" />
                  ) : (
                    <div className="space-y-6">
                      <PlayerSlot id="tB1" label="Member 01 Smash ID" />
                      <PlayerSlot id="tB2" label="Member 02 Smash ID" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Match Settings */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 border-slate-200 shadow-xl">
                 <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                  <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
                    <Zap className="h-5 w-5 fill-current" />
                  </div>
                  <h3 className="text-lg font-black text-[#0B1F3A] uppercase italic">Studio Settings</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-black text-[#0B1F3A]">AI Tactical Commentary</p>
                      <p className="text-[10px] font-bold text-slate-400">Context-aware event logs</p>
                    </div>
                    <Switch checked={formData.aiCommentary} onCheckedChange={v => setFormData({...formData, aiCommentary: v})} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-black text-[#0B1F3A]">Live Viewer Broadcast</p>
                      <p className="text-[10px] font-bold text-slate-400">Stream scores globally</p>
                    </div>
                    <Switch checked={formData.broadcast} onCheckedChange={v => setFormData({...formData, broadcast: v})} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Warm-up Timer (min)</Label>
                    <Select value={formData.warmUp} onValueChange={(v: any) => setFormData({...formData, warmUp: v})}>
                      <SelectTrigger className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No Warm-up</SelectItem>
                        <SelectItem value="1">1 Minute</SelectItem>
                        <SelectItem value="3">3 Minutes</SelectItem>
                        <SelectItem value="5">5 Minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 border-slate-200 shadow-xl bg-[#0B1F3A] text-white">
                <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                  <div className="h-10 w-10 rounded-xl bg-sky-500 text-white flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-black uppercase italic">Technical Layout</h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-sky-400 ml-1">Initial Service Node</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => setFormData({...formData, server: 'sideA'})}
                        className={cn("h-12 rounded-xl border-2 font-black text-[10px] transition-all", formData.server === 'sideA' ? "border-sky-500 bg-sky-500/20 text-white" : "border-white/10 text-white/40")}
                      >
                        SIDE A SERVES
                      </button>
                      <button 
                        onClick={() => setFormData({...formData, server: 'sideB'})}
                        className={cn("h-12 rounded-xl border-2 font-black text-[10px] transition-all", formData.server === 'sideB' ? "border-red-500 bg-red-500/20 text-white" : "border-white/10 text-white/40")}
                      >
                        SIDE B SERVES
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-sky-400 ml-1">Side Allocation (Team A)</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => setFormData({...formData, side: 'left'})}
                        className={cn("h-12 rounded-xl border-2 font-black text-[10px] transition-all", formData.side === 'left' ? "border-sky-500 bg-sky-500/20 text-white" : "border-white/10 text-white/40")}
                      >
                        LEFT COURT
                      </button>
                      <button 
                        onClick={() => setFormData({...formData, side: 'right'})}
                        className={cn("h-12 rounded-xl border-2 font-black text-[10px] transition-all", formData.side === 'right' ? "border-sky-500 bg-sky-500/20 text-white" : "border-white/10 text-white/40")}
                      >
                        RIGHT COURT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Action */}
            <div className="pt-4">
              <Button 
                onClick={handleStart}
                disabled={isInitializing}
                className="w-full h-24 bg-[#0B1F3A] text-white font-black text-3xl rounded-[2.5rem] shadow-[0_25px_50px_rgba(11,31,58,0.2)] hover:bg-sky-500 transition-all group flex items-center justify-center gap-6"
              >
                {isInitializing ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : (
                  <>
                    INITIALIZE MATCH <Zap className="h-8 w-8 fill-sky-400 text-sky-400 group-hover:scale-125 transition-transform" />
                  </>
                )}
              </Button>
              <div className="flex items-center justify-center gap-2 mt-6 text-slate-400">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Session ID: M{Date.now().toString().slice(-6)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateIndividualMatch;