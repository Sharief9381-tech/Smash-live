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
import { supabase } from '@/lib/supabase';

// Stable component to prevent focus loss during typing
const PlayerSlot = ({ 
  id, 
  label, 
  selectedPlayer, 
  searchQuery, 
  onSearchChange, 
  onSelect, 
  onRemove,
  error 
}: { 
  id: string; 
  label: string;
  selectedPlayer: Player | null;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onSelect: (player: Player) => void;
  onRemove: () => void;
  error?: string;
}) => (
  <div className="space-y-3">
    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</Label>
    <div className="relative">
      {!selectedPlayer ? (
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
          <Input 
            placeholder="Search Smash ID (e.g. Smash#01)" 
            className={cn(
              "h-14 bg-white border-slate-100 rounded-2xl pl-11 font-bold focus:border-sky-500 shadow-sm",
              error && "border-red-500 bg-red-50/10"
            )}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-[2rem] shadow-2xl overflow-hidden p-2">
                {playersDatabase.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                  playersDatabase.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4).map(p => (
                    <button key={p.id} onClick={() => onSelect(p)} className="w-full p-3 flex items-center gap-4 hover:bg-slate-50 rounded-2xl transition-all text-left group">
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
          {error && <p className="text-[10px] font-bold text-red-500 mt-1.5 ml-1">{error}</p>}
        </div>
      ) : (
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-24 bg-[#0B1F3A] rounded-[2rem] p-5 flex items-center justify-between border border-sky-500/20 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sm font-black text-sky-400 shadow-inner">
              {selectedPlayer?.img}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-black text-white text-lg leading-tight uppercase italic">{selectedPlayer?.name}</p>
                <ShieldCheck className="h-4 w-4 text-sky-500" />
              </div>
              <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest">BWF Certified • {selectedPlayer?.country}</p>
            </div>
          </div>
          <button onClick={onRemove} className="h-10 w-10 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all flex items-center justify-center">
            <X className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </div>
  </div>
);

const CreateIndividualMatch = () => {
  const navigate = useNavigate();
  const [isInitializing, setIsInitializing] = useState(false);
  const [matchType, setMatchType] = useState<'singles' | 'doubles' | 'mixed'>('singles');
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({
    p1: "", p2: ""
  });
  const [selectedPlayers, setSelectedPlayers] = useState<Record<string, Player | null>>({
    p1: null, p2: null
  });
  
  const [formData, setFormData] = useState({
    name: "Friendly Match",
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

    if (matchType === 'singles') {
      if (!selectedPlayers.p1) newErrors.p1 = "Side A Athlete required";
      if (!selectedPlayers.p2) newErrors.p2 = "Side B Athlete required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelect = (id: string, player: Player) => {
    setSelectedPlayers(prev => ({ ...prev, [id]: player }));
    setSearchQueries(prev => ({ ...prev, [id]: "" }));
  };

  const handleStart = async () => {
    if (!validate()) {
      showError("Please fix validation errors");
      return;
    }

    setIsInitializing(true);
    
    try {
      const { data, error } = await supabase
        .from('matches')
        .insert([{
          name: formData.name,
          players: selectedPlayers,
          match_type: matchType,
          status: 'live',
          current_score: [0, 0],
          sets_won: [0, 0],
          total_sets: parseInt(formData.sets),
          serving: 1
        }])
        .select()
        .single();

      if (error) throw error;
      
      showSuccess("Match intelligence initialized");
      navigate(`/scoring/${data.id}`);
    } catch (err: any) {
      // Fallback for demo
      const matchId = `live_${Date.now()}`;
      const payload = { ...formData, players: selectedPlayers, id: matchId, total_sets: parseInt(formData.sets) };
      localStorage.setItem(matchId, JSON.stringify(payload));
      
      const active = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
      active.push(payload);
      localStorage.setItem('active_studio_matches', JSON.stringify(active));
      
      showSuccess("Match started (Local Node)");
      navigate(`/scoring/${matchId}`);
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-sky-500/30">
      <Navbar />
      
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
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 border-slate-200 shadow-xl relative overflow-hidden bg-white">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Target className="h-40 w-40 text-[#0B1F3A]" />
              </div>
              <div className="flex items-center gap-4 border-b border-slate-100 pb-6 relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-[#0B1F3A] text-white flex items-center justify-center shadow-lg">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">Protocol</h3>
              </div>
              
              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Event Identifier</Label>
                  <Input 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    className={cn("h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold", errors.name && "border-red-500")}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</Label>
                    <Select value={matchType} onValueChange={(v: any) => setMatchType(v)}>
                      <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="singles">Singles</SelectItem>
                        <SelectItem value="doubles">Doubles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Match Type</Label>
                    <Select value={formData.round} onValueChange={(v) => setFormData({...formData, round: v})}>
                      <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Friendly">Friendly</SelectItem>
                        <SelectItem value="Exhibition">Exhibition</SelectItem>
                        <SelectItem value="Challenge">Challenge</SelectItem>
                        <SelectItem value="Practice">Practice</SelectItem>
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
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Sets Protocol</Label>
                    <Select value={formData.sets} onValueChange={(v: any) => setFormData({...formData, sets: v})}>
                      <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Set (Quick)</SelectItem>
                        <SelectItem value="3">3 Sets (Standard)</SelectItem>
                        <SelectItem value="5">5 Sets (Championship)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="glass-panel p-10 rounded-[3.5rem] space-y-10 border-slate-200 shadow-xl min-h-[400px] bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-lg">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">Athlete Selection</h3>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-100 font-black text-[12rem] italic pointer-events-none select-none opacity-50">VS</div>
                
                <div className="space-y-8 relative z-10">
                  <PlayerSlot 
                    id="p1" 
                    label="Side A Athlete" 
                    selectedPlayer={selectedPlayers.p1} 
                    searchQuery={searchQueries.p1}
                    onSearchChange={(v) => setSearchQueries(prev => ({ ...prev, p1: v }))}
                    onSelect={(p) => handleSelect('p1', p)}
                    onRemove={() => setSelectedPlayers(prev => ({ ...prev, p1: null }))}
                    error={errors.p1}
                  />
                </div>

                <div className="space-y-8 relative z-10 text-right">
                  <PlayerSlot 
                    id="p2" 
                    label="Side B Athlete" 
                    selectedPlayer={selectedPlayers.p2} 
                    searchQuery={searchQueries.p2}
                    onSearchChange={(v) => setSearchQueries(prev => ({ ...prev, p2: v }))}
                    onSelect={(p) => handleSelect('p2', p)}
                    onRemove={() => setSelectedPlayers(prev => ({ ...prev, p2: null }))}
                    error={errors.p2}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                onClick={handleStart}
                disabled={isInitializing}
                className="w-full h-24 bg-[#0B1F3A] text-white font-black text-3xl rounded-[2.5rem] shadow-[0_25px_50px_rgba(11,31,58,0.2)] hover:bg-sky-500 transition-all group flex items-center justify-center gap-6"
              >
                {isInitializing ? <Loader2 className="h-8 w-8 animate-spin" /> : "INITIALIZE MATCH"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateIndividualMatch;