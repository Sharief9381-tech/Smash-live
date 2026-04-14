"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Target, Users, Trophy, Zap, Search,
  X, User, ChevronRight, MapPin, Calendar, Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { playersDatabase, Player } from '@/data/players';
import { showSuccess, showError } from '@/utils/toast';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const CreateIndividualMatch = () => {
  const navigate = useNavigate();
  const [matchType, setMatchType] = useState<'singles' | 'doubles'>('singles');
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({});
  const [selectedPlayers, setSelectedPlayers] = useState<Record<string, Player | null>>({
    p1: null, p2: null, tA1: null, tA2: null, tB1: null, tB2: null
  });
  
  const [formData, setFormData] = useState({
    name: "Exhibition Match",
    round: "Friendly",
    court: "01",
    sets: "3",
    server: "sideA",
    aiCommentary: true,
    broadcast: true
  });

  const selectPlayer = (id: string, player: Player) => {
    const alreadySelected = Object.values(selectedPlayers).some(p => p?.id === player.id);
    if (alreadySelected) {
      showError("Player already on court");
      return;
    }
    setSelectedPlayers(prev => ({ ...prev, [id]: player }));
    setSearchQueries(prev => ({ ...prev, [id]: "" }));
  };

  const handleStart = () => {
    const req = matchType === 'singles' ? ['p1', 'p2'] : ['tA1', 'tA2', 'tB1', 'tB2'];
    if (req.some(k => !selectedPlayers[k])) {
      showError("Complete player selection first");
      return;
    }
    const matchId = `live_${Date.now()}`;
    localStorage.setItem(matchId, JSON.stringify({ ...formData, matchType, players: selectedPlayers }));
    showSuccess("Initializing Broadcast...");
    setTimeout(() => navigate(`/scoring/${matchId}`), 800);
  };

  const PlayerSlot = ({ id, label }: { id: string; label: string }) => (
    <div className="space-y-3">
      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</Label>
      <div className="relative">
        {!selectedPlayers[id] ? (
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-sky-500 transition-colors" />
            <Input 
              placeholder="Search Smash ID..." 
              className="h-14 bg-white border-slate-100 rounded-2xl pl-11 font-bold focus:border-sky-500 shadow-sm"
              value={searchQueries[id] || ""}
              onChange={(e) => setSearchQueries(prev => ({ ...prev, [id]: e.target.value }))}
            />
            <AnimatePresence>
              {searchQueries[id] && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-[2rem] shadow-2xl overflow-hidden p-2">
                  {playersDatabase.filter(p => p.name.toLowerCase().includes(searchQueries[id].toLowerCase())).slice(0, 3).map(p => (
                    <button key={p.id} onClick={() => selectPlayer(id, p)} className="w-full p-3 flex items-center gap-3 hover:bg-slate-50 rounded-xl transition-all text-left">
                      <div className="h-10 w-10 rounded-full bg-[#0B1F3A] flex items-center justify-center text-xs font-black text-sky-500">{p.img}</div>
                      <div>
                        <p className="font-bold text-sm text-[#0B1F3A]">{p.name}</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase">Rank #{p.rank} • {p.country}</p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="h-20 bg-[#0B1F3A] rounded-[1.5rem] p-4 flex items-center justify-between border border-sky-500/20 shadow-xl shadow-sky-500/5">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sm font-black text-sky-400">
                {selectedPlayers[id]?.img}
              </div>
              <div>
                <p className="font-black text-white text-lg leading-tight uppercase italic">{selectedPlayers[id]?.name}</p>
                <p className="text-[9px] font-black text-sky-400 uppercase tracking-widest">{selectedPlayers[id]?.country}</p>
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
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="container max-w-6xl px-6 py-12 space-y-12">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-sky-500 fill-current" />
              <span className="text-[10px] font-black text-sky-600 uppercase tracking-[0.3em]">Studio Workflow</span>
            </div>
            <h1 className="text-5xl font-black text-[#0B1F3A] tracking-tighter uppercase italic">Start Match</h1>
          </div>
          <Button onClick={() => navigate(-1)} variant="ghost" className="text-slate-400 font-bold">← EXIT STUDIO</Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Match Config */}
          <div className="glass-panel p-10 rounded-[3rem] space-y-8 border-slate-200 shadow-xl">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              <div className="h-12 w-12 rounded-2xl bg-[#0B1F3A] text-white flex items-center justify-center">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">Match Intelligence</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Title</Label>
                <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Type</Label>
                  <Select value={matchType} onValueChange={(v: any) => setMatchType(v)}>
                    <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl font-bold"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="singles">Singles</SelectItem><SelectItem value="doubles">Doubles</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Court</Label>
                  <Input value={formData.court} onChange={e => setFormData({...formData, court: e.target.value})} className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 font-bold" />
                </div>
              </div>
              <div className="flex items-center justify-between p-6 bg-[#0B1F3A] rounded-[2rem] text-white">
                <div className="space-y-1">
                  <p className="text-sm font-black">AI Broadcast Hub</p>
                  <p className="text-[9px] font-bold text-sky-400 uppercase">Automated Commentary & Sync</p>
                </div>
                <Switch checked={formData.aiCommentary} onCheckedChange={v => setFormData({...formData, aiCommentary: v})} />
              </div>
            </div>
          </div>

          {/* Player Selection */}
          <div className="glass-panel p-10 rounded-[3rem] space-y-8 border-slate-200 shadow-xl">
             <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              <div className="h-12 w-12 rounded-2xl bg-[#0B1F3A] text-sky-400 flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">Squad Registry</h3>
            </div>

            <div className="grid grid-cols-2 gap-6 relative">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-100 font-black text-6xl italic pointer-events-none select-none">VS</div>
              
              <div className="space-y-6">
                <Badge className="bg-sky-500 text-white border-none h-6 px-3 text-[8px] font-black">SIDE A</Badge>
                <PlayerSlot id={matchType === 'singles' ? 'p1' : 'tA1'} label="Member 01" />
                {matchType === 'doubles' && <PlayerSlot id="tA2" label="Member 02" />}
              </div>

              <div className="space-y-6 text-right">
                <div className="flex justify-end"><Badge className="bg-red-500 text-white border-none h-6 px-3 text-[8px] font-black">SIDE B</Badge></div>
                <PlayerSlot id={matchType === 'singles' ? 'p2' : 'tB1'} label="Member 01" />
                {matchType === 'doubles' && <PlayerSlot id="tB2" label="Member 02" />}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <Button 
            onClick={handleStart}
            className="w-full max-w-md h-24 bg-[#0B1F3A] text-white font-black text-2xl rounded-[2.5rem] shadow-2xl hover:bg-sky-500 transition-all group"
          >
            START BROADCAST <Zap className="ml-4 h-8 w-8 fill-sky-400 text-sky-400 group-hover:scale-125 transition-transform" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CreateIndividualMatch;