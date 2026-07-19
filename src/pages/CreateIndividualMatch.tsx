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
import { Player } from '@/data/players';
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
  registeredAthletes
}: { 
  label: string;
  selectedPlayer: any | null;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onSelect: (player: any) => void;
  onRemove: () => void;
  registeredAthletes: any[];
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
              placeholder="Search Name or Smash ID" 
              className="h-14 bg-white border-slate-100 rounded-2xl pl-11 font-bold focus:border-sky-500 shadow-sm"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-[2rem] shadow-2xl overflow-hidden p-2">
                  {filtered.length > 0 && filtered.slice(0, 3).map(p => (
                    <button key={p.id || p.mobile} onClick={() => onSelect(p)} className="w-full p-3 flex items-center gap-4 hover:bg-slate-50 rounded-2xl transition-all text-left group">
                      <div className="h-10 w-10 rounded-full bg-[#0B1F3A] flex items-center justify-center text-[10px] font-black text-sky-500 uppercase">{p.name[0]}</div>
                      <div className="flex-1">
                        <p className="font-black text-sm text-[#0B1F3A] group-hover:text-sky-600">{p.name}</p>
                        <p className="text-[8px] font-black text-slate-400 uppercase">{p.smash_id || p.smashId || "Dossier Active"}</p>
                      </div>
                      <ShieldCheck className="h-4 w-4 text-sky-500" />
                    </button>
                  ))}
                  
                  {/* Guest Option - Allow creating a player from just the name */}
                  <button 
                    onClick={() => onSelect({ name: searchQuery, isGuest: true, id: 'guest_' + Date.now() })}
                    className="w-full p-4 flex items-center gap-4 hover:bg-sky-50 rounded-2xl transition-all text-left border-t border-slate-50 mt-1"
                  >
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><UserPlus className="h-5 w-5" /></div>
                    <div className="flex-1">
                      <p className="font-black text-sm text-[#0B1F3A]">Continue as Guest</p>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest italic">Use "{searchQuery}" without account</p>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-24 bg-[#0B1F3A] rounded-[2rem] p-5 flex items-center justify-between border border-sky-500/20 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sm font-black text-sky-400">
                {selectedPlayer.name[0].toUpperCase()}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-black text-white text-lg leading-tight uppercase italic">{selectedPlayer.name}</p>
                  {!selectedPlayer.isGuest && <ShieldCheck className="h-4 w-4 text-sky-500" />}
                </div>
                <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest">
                  {selectedPlayer.isGuest ? "Guest Entry" : (selectedPlayer.smash_id || "Registered Athlete")}
                </p>
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
};

const CreateIndividualMatch = () => {
  const navigate = useNavigate();
  const [isInitializing, setIsInitializing] = useState(false);
  const [registeredAthletes, setRegisteredAthletes] = useState<any[]>([]);
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({ p1: "", p2: "" });
  const [selectedPlayers, setSelectedPlayers] = useState<Record<string, any | null>>({ p1: null, p2: null });
  
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
    if (!formData.name || !selectedPlayers.p1 || !selectedPlayers.p2) {
      showError("Please complete the setup protocol");
      return;
    }

    setIsInitializing(true);
    const matchId = `live_${Date.now()}`;
    
    try {
      const { data, error } = await supabase
        .from('matches')
        .insert([{
          name: formData.name,
          players: selectedPlayers,
          match_type: 'singles',
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
      // Fallback
      localStorage.setItem(matchId, JSON.stringify({ ...formData, players: selectedPlayers, id: matchId }));
      const active = JSON.parse(localStorage.getItem('active_studio_matches') || '[]');
      active.push({ ...formData, players: selectedPlayers, id: matchId, current_score: [0,0], status: 'live' });
      localStorage.setItem('active_studio_matches', JSON.stringify(active));
      navigate(`/scoring/${matchId}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="container max-w-7xl px-6 py-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-2">
            <h1 className="text-6xl font-black text-[#0B1F3A] tracking-tighter uppercase italic leading-none">Studio Setup</h1>
            <p className="text-[10px] font-black text-sky-600 uppercase tracking-[0.4em]">Initialize Live Session</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 bg-white border-slate-200">
               <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400">Match Name</Label>
                  <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Court</Label>
                    <Input value={formData.court} onChange={e => setFormData({...formData, court: e.target.value})} className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Protocol</Label>
                    <Select value={formData.sets} onValueChange={v => setFormData({...formData, sets: v})}>
                      <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold"><SelectValue /></SelectTrigger>
                      <SelectContent>
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

          <div className="lg:col-span-8 space-y-8">
            <div className="glass-panel p-10 rounded-[3.5rem] bg-white border-slate-200 min-h-[400px]">
              <div className="grid lg:grid-cols-2 gap-12">
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
            </div>
            <Button onClick={handleStart} disabled={isInitializing} className="w-full h-24 bg-[#0B1F3A] text-white font-black text-3xl rounded-[2.5rem] shadow-xl hover:bg-sky-500 transition-all">
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