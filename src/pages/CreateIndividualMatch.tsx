"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Target, Users, Trophy, Calendar, 
  Clock, Hash, MapPin, Zap, Search,
  AlertCircle, ChevronRight, X, User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { playersDatabase, Player } from '@/data/players';
import { showSuccess, showError } from '@/utils/toast';
import { motion, AnimatePresence } from 'framer-motion';

const CreateIndividualMatch = () => {
  const navigate = useNavigate();
  const [matchType, setMatchType] = useState<'singles' | 'doubles'>('singles');
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({});
  const [selectedPlayers, setSelectedPlayers] = useState<Record<string, Player | null>>({
    p1: null, p2: null, tA1: null, tA2: null, tB1: null, tB2: null
  });
  
  const [formData, setFormData] = useState({
    name: "Standard Exhibition Match",
    round: "Friendly",
    court: "01",
    sets: "3",
    server: "sideA",
    side: "left",
    aiCommentary: true,
    broadcast: true
  });

  const handleSearch = (id: string, query: string) => {
    setSearchQueries(prev => ({ ...prev, [id]: query }));
  };

  const selectPlayer = (id: string, player: Player) => {
    // Validation: Same player selected twice
    const alreadySelected = Object.values(selectedPlayers).some(p => p?.id === player.id);
    if (alreadySelected) {
      showError("Player cannot be selected on both sides");
      return;
    }

    setSelectedPlayers(prev => ({ ...prev, [id]: player }));
    setSearchQueries(prev => ({ ...prev, [id]: "" }));
  };

  const startMatch = () => {
    // Basic Validation
    if (!formData.name || !formData.court) {
      showError("Please complete match name and court number");
      return;
    }

    const requiredKeys = matchType === 'singles' ? ['p1', 'p2'] : ['tA1', 'tA2', 'tB1', 'tB2'];
    const missing = requiredKeys.find(k => !selectedPlayers[k]);
    
    if (missing) {
      showError(matchType === 'doubles' ? "Doubles requires 4 selected players" : "Please select both players");
      return;
    }

    const matchId = `match_${Date.now()}`;
    // Save match configuration (Mock)
    localStorage.setItem(matchId, JSON.stringify({
      ...formData,
      matchType,
      players: selectedPlayers,
      startTime: new Date().toISOString()
    }));

    showSuccess("Match started successfully — redirecting to scoring");
    setTimeout(() => navigate(`/scoring/${matchId}`), 800);
  };

  return (
    <div className="min-h-screen bg-[#0B1F3A] text-white selection:bg-sky-500/30">
      <Navbar />
      
      <main className="container max-w-6xl px-6 py-12 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-sky-400 fill-sky-400" />
              <span className="text-xs font-black text-sky-400 uppercase tracking-[0.4em]">Studio Intelligence</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter italic uppercase">Start Individual Match</h1>
          </div>
          <Button variant="ghost" onClick={() => navigate('/broadcast/center')} className="text-white/60 hover:text-white font-bold">
            ← Back to Broadcast Center
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Match Setup Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-8 rounded-[3rem] border-white/10 space-y-8 bg-white/5">
              <h3 className="text-xl font-black italic flex items-center gap-3">
                <Target className="h-5 w-5 text-sky-400" /> Match Setup
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Match Identity</Label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="h-12 bg-white/5 border-white/10 rounded-xl px-4 font-bold focus:border-sky-500 transition-all" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Type</Label>
                    <Select value={matchType} onValueChange={(v: any) => setMatchType(v)}>
                      <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0B1F3A] border-white/10 text-white">
                        <SelectItem value="singles">Singles</SelectItem>
                        <SelectItem value="doubles">Doubles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Round</Label>
                    <Select value={formData.round} onValueChange={(v) => setFormData({...formData, round: v})}>
                      <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0B1F3A] border-white/10 text-white">
                        <SelectItem value="Friendly">Friendly</SelectItem>
                        <SelectItem value="League">League</SelectItem>
                        <SelectItem value="Final">Final</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Court</Label>
                    <Input 
                      value={formData.court}
                      onChange={(e) => setFormData({...formData, court: e.target.value})}
                      className="h-12 bg-white/5 border-white/10 rounded-xl px-4 font-bold" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Best of</Label>
                    <Select value={formData.sets} onValueChange={(v) => setFormData({...formData, sets: v})}>
                      <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0B1F3A] border-white/10 text-white">
                        <SelectItem value="3">3 Sets</SelectItem>
                        <SelectItem value="5">5 Sets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-[3rem] border-white/10 space-y-6 bg-white/5">
              <h3 className="text-sm font-black uppercase tracking-widest text-white/60">Live Intelligence</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold">AI Commentary</p>
                    <p className="text-[8px] text-white/40 font-bold uppercase">Dynamic Play-by-play</p>
                  </div>
                  <Switch checked={formData.aiCommentary} onCheckedChange={(v) => setFormData({...formData, aiCommentary: v})} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold">Global Broadcast</p>
                    <p className="text-[8px] text-white/40 font-bold uppercase">Low-latency sync</p>
                  </div>
                  <Switch checked={formData.broadcast} onCheckedChange={(v) => setFormData({...formData, broadcast: v})} />
                </div>
              </div>
            </div>
          </div>

          {/* Player Selection Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-panel p-10 rounded-[3.5rem] border-white/10 space-y-10 bg-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <Users className="h-48 w-48 text-sky-400" />
              </div>
              
              <div className="space-y-2 relative z-10">
                <h3 className="text-2xl font-black italic flex items-center gap-3">
                  <Users className="h-6 w-6 text-sky-400" /> Player Selection
                </h3>
                <p className="text-white/40 text-xs font-medium">Search by Smash ID to link verified professional profiles.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 relative z-10">
                {/* Side A */}
                <div className="space-y-6">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-sky-400">Team / Side A</Label>
                  <div className="space-y-4">
                    {['1', '2'].map((num) => (
                      (matchType === 'doubles' || num === '1') && (
                        <div key={num} className="space-y-4">
                          <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                            <Input 
                              placeholder={`Search Player ${num} Smash ID...`} 
                              className="h-14 bg-white/5 border-white/10 rounded-2xl pl-12 font-bold focus:border-sky-500"
                              value={searchQueries[`tA${num}`] || ""}
                              onChange={(e) => handleSearch(`tA${num}`, e.target.value)}
                            />
                            {/* Autocomplete Suggestions */}
                            <AnimatePresence>
                              {searchQueries[`tA${num}`] && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="absolute z-50 top-full left-0 right-0 mt-2 bg-[#1a3a5f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                                >
                                  {playersDatabase
                                    .filter(p => p.name.toLowerCase().includes(searchQueries[`tA${num}`]?.toLowerCase()))
                                    .slice(0, 4)
                                    .map(p => (
                                      <button 
                                        key={p.id}
                                        onClick={() => selectPlayer(matchType === 'singles' ? 'p1' : `tA${num}`, p)}
                                        className="w-full p-4 flex items-center gap-4 hover:bg-sky-500/20 transition-colors text-left border-b border-white/5 last:border-0"
                                      >
                                        <div className="h-10 w-10 rounded-full bg-sky-500 flex items-center justify-center font-black text-xs">{p.img}</div>
                                        <div>
                                          <p className="font-bold text-sm">{p.name}</p>
                                          <p className="text-[10px] font-medium text-white/40 uppercase tracking-widest">RANK #{p.rank} • {p.country}</p>
                                        </div>
                                      </button>
                                    ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          {selectedPlayers[matchType === 'singles' ? 'p1' : `tA${num}`] && (
                            <div className="bg-sky-500/10 border border-sky-500/20 rounded-2xl p-4 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-sky-500 flex items-center justify-center font-black text-xs">
                                  {selectedPlayers[matchType === 'singles' ? 'p1' : `tA${num}`]?.img}
                                </div>
                                <span className="font-bold">{selectedPlayers[matchType === 'singles' ? 'p1' : `tA${num}`]?.name}</span>
                              </div>
                              <button onClick={() => setSelectedPlayers(prev => ({...prev, [matchType === 'singles' ? 'p1' : `tA${num}`]: null}))}>
                                <X className="h-4 w-4 text-white/40 hover:text-red-400" />
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                </div>

                {/* Side B */}
                <div className="space-y-6">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-red-400">Team / Side B</Label>
                  <div className="space-y-4">
                    {['1', '2'].map((num) => (
                      (matchType === 'doubles' || num === '1') && (
                        <div key={num} className="space-y-4">
                          <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                            <Input 
                              placeholder={`Search Player ${num} Smash ID...`} 
                              className="h-14 bg-white/5 border-white/10 rounded-2xl pl-12 font-bold focus:border-sky-500"
                              value={searchQueries[`tB${num}`] || ""}
                              onChange={(e) => handleSearch(`tB${num}`, e.target.value)}
                            />
                            <AnimatePresence>
                              {searchQueries[`tB${num}`] && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="absolute z-50 top-full left-0 right-0 mt-2 bg-[#1a3a5f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                                >
                                  {playersDatabase
                                    .filter(p => p.name.toLowerCase().includes(searchQueries[`tB${num}`]?.toLowerCase()))
                                    .slice(0, 4)
                                    .map(p => (
                                      <button 
                                        key={p.id}
                                        onClick={() => selectPlayer(matchType === 'singles' ? 'p2' : `tB${num}`, p)}
                                        className="w-full p-4 flex items-center gap-4 hover:bg-sky-500/20 transition-colors text-left border-b border-white/5 last:border-0"
                                      >
                                        <div className="h-10 w-10 rounded-full bg-sky-500 flex items-center justify-center font-black text-xs">{p.img}</div>
                                        <div>
                                          <p className="font-bold text-sm">{p.name}</p>
                                          <p className="text-[10px] font-medium text-white/40 uppercase tracking-widest">RANK #{p.rank} • {p.country}</p>
                                        </div>
                                      </button>
                                    ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          {selectedPlayers[matchType === 'singles' ? 'p2' : `tB${num}`] && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center font-black text-xs">
                                  {selectedPlayers[matchType === 'singles' ? 'p2' : `tB${num}`]?.img}
                                </div>
                                <span className="font-bold">{selectedPlayers[matchType === 'singles' ? 'p2' : `tB${num}`]?.name}</span>
                              </div>
                              <button onClick={() => setSelectedPlayers(prev => ({...prev, [matchType === 'singles' ? 'p2' : `tB${num}`]: null}))}>
                                <X className="h-4 w-4 text-white/40 hover:text-red-400" />
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-12">
                <Button 
                  onClick={startMatch}
                  className="w-full h-24 bg-sky-500 text-[#0B1F3A] font-black text-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(14,165,233,0.3)] hover:scale-[1.02] transition-all group"
                >
                  START MATCH <Zap className="ml-4 h-8 w-8 fill-current group-hover:animate-pulse" />
                </Button>
                <p className="text-center text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mt-6">All data will be synchronized with global circuit database</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateIndividualMatch;