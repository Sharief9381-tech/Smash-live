"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Zap } from 'lucide-react';

const CourtPage = () => {
  const [activeMatch, setActiveMatch] = useState<any>(null);

  useEffect(() => {
    const fetchActive = async () => {
      const { data } = await supabase.from('matches').select('*').eq('status', 'live').limit(1).single();
      if (data) setActiveMatch(data);
    };
    fetchActive();

    const channel = supabase.channel('court-display')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, fetchActive)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  if (!activeMatch) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center gap-6">
      <Zap className="h-16 w-16 text-sky-500 fill-current animate-pulse" />
      <p className="text-white font-black uppercase italic tracking-[0.5em] text-2xl">Ready for Protocol</p>
    </div>
  );

  return (
    <div className="h-screen bg-black text-white p-12 flex flex-col overflow-hidden">
      <div className="flex justify-between items-start mb-12">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter text-sky-500">SmashIntel <span className="text-white">Court Display</span></h1>
        <div className="text-right">
          <p className="text-sm font-black text-white/40 uppercase tracking-widest">{activeMatch.tournament_name}</p>
          <p className="text-xl font-black uppercase italic">{activeMatch.name}</p>
        </div>
      </div>

      <div className="flex-1 flex gap-12">
        {[1, 2].map((side) => (
          <div key={side} className="flex-1 rounded-[4rem] bg-white/5 border border-white/10 p-24 flex flex-col items-center justify-center gap-8">
            <h2 className="text-4xl font-black uppercase italic text-center max-w-sm">
              {side === 1 ? activeMatch.player1 : activeMatch.player2}
            </h2>
            <div className="text-[25rem] font-black leading-none italic text-sky-500">
              {activeMatch.current_score?.[side-1] || 0}
            </div>
            {activeMatch.serving === side && (
               <div className="bg-sky-500 px-12 py-4 rounded-full text-black font-black uppercase italic text-2xl animate-bounce">
                 Service
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourtPage;