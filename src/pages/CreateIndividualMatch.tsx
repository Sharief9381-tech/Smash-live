"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { 
  Target, Users, Trophy, Zap, Search,
  X, User, ChevronRight, ShieldCheck, Loader2, UserPlus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '@/utils/toast';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

const PlayerSlot = ({ 
  label, 
  selectedPlayer, 
  searchQuery, 
  onSearchChange, 
  onSelect, 
  onRemove,
  registeredAthletes,
  compact = false
}: { 
  label: string;
  selectedPlayer: any | null;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onSelect: (player: any) => void;
  onRemove: () => void;
  registeredAthletes: any[];
  compact?: boolean;
}) => {
  const filtered = registeredAthletes.filter(p => 
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.smashId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.smash_id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-3">
      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</Label>
      <div className="relative">
        {!selectedPlayer ? (
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
            <Input 
              placeholder="Search Name or ID" 
              className={cn(
                "bg-white border-slate-100 rounded-2xl pl-11 font-bold focus:border-sky-500 shadow-sm",
                compact ? "h-12 text-xs" : "h-14"
              )}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-[2rem] shadow-2xl overflow-hidden p-2">
                  {filtered.length > 0 && filtered.slice(0, 3).map(p => (
                    <button key={p.id || p.mobile} onClick={() => onSelect(p)} className="w-full p-3 flex items-center gap-4 hover:bg-slate-50 rounded-2xl transition-all text-left group">
                      <div className="h-8 w-8 rounded-full bg-[#0B1F3A] flex items-center justify-center text-[10px] font-black text-sky-500 uppercase">{p.name[0]}</div>
                      <div className="flex-1">
                        <p className="font-black text-xs text-[#0B1F3A] group-hover:text-sky-600">{p.name}</p>
                        <p className="text-[8px] font-black text-slate-400 uppercase">{p.smash_id || p.smashId || "Dossier Active"}</p>
                      </div>
                      <ShieldCheck className="h-3 w-3 text-sky-500" />
                    </button>
                  ))}
                  <button 
                    onClick={() => onSelect({ name: searchQuery, isGuest: true, id: 'guest_' + Date.now() })}
                    className="w-full p-3 flex items-center gap-4 hover:bg-sky-50 rounded-2xl transition-all text-left border-t border-slate-50 mt-1"
                  >
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><UserPlus className="h-4 w-4" /></div>
                    <div className="flex-1">
                      <p className="font-black text-xs text-[#0B1F3A]">Use "{searchQuery}"</p>
                      <p className="text-[8px] font-black text-slate-400 uppercase italic">Add as Guest</p>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={cn(
            "bg-[#0B1F3A] rounded-[2rem] px-5 flex items-center justify-between border border-sky-500/20 shadow-2xl",
            compact ? "h-20" : "h-24"
          )}>
            <div className="flex items-center gap-4">
              <div className={cn(
                "rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center font-black text-sky-400",
                compact ? "h-10 w-10 text-xs" : "h-14 w-14 text-sm"
              )}>
                {selectedPlayer.name[0].toUpperCase()}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <p className={cn("font-black text-white leading-tight uppercase italic", compact ? "text-sm" : "text-lg")}>{selectedPlayer.name}</p>
                  {!selectedPlayer.isGuest && <ShieldCheck className="h-3 w-3 text-sky-500" />}
                </div>
                <p className="text-[8px] font-black text-sky-400 uppercase tracking-widest">
                  {selectedPlayer.isGuest ? "Guest" : (selectedPlayer.smash_id || "Athlete")}
                </p>
              </div>
            </div>
            <button onClick={onRemove} className="h-8 w-8 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all flex items-center justify-center">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const CreateIndividualMatch = () => {
  const navigate = useNavigate();
  const [isInitializing, setIsInitializing] = useState(false);
  const [registeredAthletes, setRegisteredAthletes] = useState<any[]>([]);
  const [matchType, setMatchType] = useState<'singles' | 'doubles' | 'mixed'>('singles');
  
  // Dynamic player slots based on matchType
  const [selectedPlayers, setSelectedPlayers] = useState<Record<string, any | null>>({
    p1: null, p2: null, tA1: null, tA2: null, tB1: null, tB2: null
  });
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({
    p1: "", p2: "", tA1: "", tA2: "", tB1: "", tB2: ""
  });
  
  const [formData, setFormData] = useState({
    name: "Friendly Match",
    round: "Friendly",
    court: "01",
    sets: "3"
  });

  useEffect(() => {
    const fetchAthletes = async () => {
      const { data } = await supabase.from('profiles').select('*');
      const local = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const combined = [...(data || []), ...local];
      setRegisteredAthletes(combined);
    };
    fetchAthletes();
  }, []);

  const handleStart = async () => {
    const isDoubles = matchType !== 'singles';
    const hasEnoughPlayers = isDoubles 
      ? (selectedPlayers.tA1 && selectedPlayers.tA2 && selectedPlayers.tB1 && selectedPlayers.tB2)
      : (selectedPlayers.p1 && selectedPlayers.p2);

    if (!formData.name || !hasEnoughPlayers) {
      showError("Please complete the team rosters");
      return;
    }

    setIsInitializing(true);
    const matchId = `live_${Date.now()}`;
    
    // Structure players object for database
    const finalPlayers = isDoubles ? {
      sideA: [selectedPlayers.tA1, selectedPlayers.tA2],
      sideB: [selectedPlayers.tB1, selectedPlayers.tB2]
    } : {
      p1: selectedPlayers.p1,
      p2: selectedPlayers.p2
    };

    try {
      const { data, error } = await supabase
        .from('matches')
        .insert([{
          name: formData.name,
          players: finalPlayers,
          match_type: matchType,
          status: 'live',
          current_score: [0, 0],
          sets_won: [0, 0],
          total_sets: parseInt(formData.sets),
          serving: 1
        }])
        .select().single();

      if (error) throw error;
      navigate(`/scoring/${data.id}`);
    } catch (err) {
      // Fallback to local
      const localMatch = { ...formData, players: finalPlayers, match_type: matchType, id: matchId, status: 'live', current_score: [0,0], sets_won: [0,0] };
      localStorage.setItem(matchId, JSON.stringify(localMatch));
      const active = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
      active.push(localMatch);
      localStorage.setItem('active_studio_matches', JSON.stringify(active));
      navigate(`/scoring/${matchId}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      <main className="container max-w-7xl px-4 py-8 space-y-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-[#0B1F3A] uppercase italic leading-none">Studio Setup</h1>
          <p className="text-[10px] font-black text-sky-600 uppercase tracking-[0.4em]">Initialize Session</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Match Name</Label>
                    <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Category</Label>
                    <Select value={matchType} onValueChange={(v: any) => setMatchType(v)}>
                      <SelectTrigger className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold"><SelectValue /></SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="singles">Singles</SelectItem>
                        <SelectItem value="doubles">Doubles</SelectItem>
                        <SelectItem value="mixed">Mixed Doubles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400">Court</Label>
                      <Input value={formData.court} onChange={e => setFormData({...formData, court: e.target.value})} className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400">Protocol</Label>
                      <Select value={formData.sets} onValueChange={v => setFormData({...formData, sets: v})}>
                        <SelectTrigger className="h-12 bg-slate-50 border-slate-100 rounded-xl font-bold"><SelectValue /></SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="1">1 Set</SelectItem>
                          <SelectItem value="3">3 Sets</SelectItem>
                          <SelectItem value="5">5 Sets</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 min-h-[450px] shadow-sm">
              {matchType === 'singles' ? (
                <div className="grid md:grid-cols-2 gap-8">
                  <PlayerSlot 
                    label="Side A Athlete" 
                    selectedPlayer={selectedPlayers.p1} 
                    searchQuery={searchQueries.p1}
                    onSearchChange={v => setSearchQueries(prev => ({ ...prev, p1: v }))}
                    onSelect={p => { setSelectedPlayers(prev => ({ ...prev, p1: p })); setSearchQueries(prev => ({ ...prev, p1: "" })); }}
                    onRemove={() => setSelectedPlayers(prev => ({ ...prev, p1: null }))}
                    registeredAthletes={registeredAthletes}
                  />
                  <PlayerSlot 
                    label="Side B Athlete" 
                    selectedPlayer={selectedPlayers.p2} 
                    searchQuery={searchQueries.p2}
                    onSearchChange={v => setSearchQueries(prev => ({ ...prev, p2: v }))}
                    onSelect={p => { setSelectedPlayers(prev => ({ ...prev, p2: p })); setSearchQueries(prev => ({ ...prev, p2: "" })); }}
                    onRemove={() => setSelectedPlayers(prev => ({ ...prev, p2: null }))}
                    registeredAthletes={registeredAthletes}
                  />
                </div>
              ) : (
                <div className="space-y-12">
                   <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="h-1 w-8 bg-sky-500 rounded-full" />
                        <span className="text-[10px] font-black uppercase italic text-[#0B1F3A]">Side A Intel</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <PlayerSlot 
                          label="Partner 01" 
                          selectedPlayer={selectedPlayers.tA1} 
                          searchQuery={searchQueries.tA1}
                          onSearchChange={v => setSearchQueries(prev => ({ ...prev, tA1: v }))}
                          onSelect={p => { setSelectedPlayers(prev => ({ ...prev, tA1: p })); setSearchQueries(prev => ({ ...prev, tA1: "" })); }}
                          onRemove={() => setSelectedPlayers(prev => ({ ...prev, tA1: null }))}
                          registeredAthletes={registeredAthletes}
                          compact
                        />
                        <PlayerSlot 
                          label="Partner 02" 
                          selectedPlayer={selectedPlayers.tA2} 
                          searchQuery={searchQueries.tA2}
                          onSearchChange={v => setSearchQueries(prev => ({ ...prev, tA2: v }))}
                          onSelect={p => { setSelectedPlayers(prev => ({ ...prev, tA2: p })); setSearchQueries(prev => ({ ...prev, tA2: "" })); }}
                          onRemove={() => setSelectedPlayers(prev => ({ ...prev, tA2: null }))}
                          registeredAthletes={registeredAthletes}
                          compact
                        />
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="h-1 w-8 bg-indigo-500 rounded-full" />
                        <span className="text-[10px] font-black uppercase italic text-[#0B1F3A]">Side B Intel</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <PlayerSlot 
                          label="Partner 01" 
                          selectedPlayer={selectedPlayers.tB1} 
                          searchQuery={searchQueries.tB1}
                          onSearchChange={v => setSearchQueries(prev => ({ ...prev, tB1: v }))}
                          onSelect={p => { setSelectedPlayers(prev => ({ ...prev, tB1: p })); setSearchQueries(prev => ({ ...prev, tB1: "" })); }}
                          onRemove={() => setSelectedPlayers(prev => ({ ...prev, tB1: null }))}
                          registeredAthletes={registeredAthletes}
                          compact
                        />
                        <PlayerSlot 
                          label="Partner 02" 
                          selectedPlayer={selectedPlayers.tB2} 
                          searchQuery={searchQueries.tB2}
                          onSearchChange={v => setSearchQueries(prev => ({ ...prev, tB2: v }))}
                          onSelect={p => { setSelectedPlayers(prev => ({ ...prev, tB2: p })); setSearchQueries(prev => ({ ...prev, tB2: "" })); }}
                          onRemove={() => setSelectedPlayers(prev => ({ ...prev, tB2: null }))}
                          registeredAthletes={registeredAthletes}
                          compact
                        />
                      </div>
                   </div>
                </div>
              )}
            </div>
            <Button onClick={handleStart} disabled={isInitializing} className="w-full h-20 bg-[#0B1F3A] text-white font-black text-2xl rounded-[2rem] shadow-xl hover:bg-sky-500 transition-all">
              {isInitializing ? <Loader2 className="animate-spin" /> : "START MATCH"}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateIndividualMatch;