"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import { Radio, Users, Activity } from 'lucide-react';

const LiveBroadcast = () => {
  const { matchId } = useParams();
  const [match, setMatch] = useState<any>(null);

  useEffect(() => {
    const fetchMatch = async () => {
      const { data } = await supabase.from('matches').select('*').eq('id', matchId).single();
      if (data) setMatch(data);
    };
    fetchMatch();

    const channel = supabase.channel(`broadcast-${matchId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'matches', filter: `id=eq.${matchId}` }, (payload) => {
        setMatch(payload.new);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [matchId]);

  if (!match) return <div className="h-screen flex items-center justify-center font-black uppercase italic text-slate-300">Connecting to feed...</div>;

  return (
    <div className="min-h-screen bg-[#0B1F3A] text-white">
      <Navbar />
      <main className="container px-6 py-12 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Badge className="bg-red-500 animate-pulse text-white uppercase font-black px-4">Live</Badge>
            <h1 className="text-xl font-black uppercase italic tracking-tighter">{match.name}</h1>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/50">
            <span className="flex items-center gap-2"><Users className="h-4 w-4 text-sky-500" /> 1.2k Watching</span>
            <span className="flex items-center gap-2"><Activity className="h-4 w-4 text-green-500" /> 24ms Latency</span>
          </div>
        </div>

        <div className="aspect-video bg-black rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 relative group">
           <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <Radio className="h-16 w-16 text-white animate-ping" />
           </div>
           {/* Broadcast Content would go here */}
           <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6">
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] flex items-center justify-between shadow-2xl">
                 <div className="text-center">
                    <p className="text-[10px] font-black uppercase text-white/40 mb-1">{match.player1}</p>
                    <span className="text-6xl font-black italic">{match.current_score?.[0] || 0}</span>
                 </div>
                 <div className="h-12 w-px bg-white/10" />
                 <div className="text-center">
                    <p className="text-[10px] font-black uppercase text-white/40 mb-1">{match.player2}</p>
                    <span className="text-6xl font-black italic">{match.current_score?.[1] || 0}</span>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default LiveBroadcast;