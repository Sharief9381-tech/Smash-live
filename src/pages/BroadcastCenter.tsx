"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Radio, Plus, Settings, Activity, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BroadcastCenter = () => {
  const [myMatches, setMyMatches] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('matches')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setMyMatches(data);
    };

    fetchMatches();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A]">
      <Navbar />
      <main className="container px-6 py-16 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-black italic uppercase tracking-tighter">Broadcast <span className="text-sky-500">Studio</span></h1>
            <p className="text-sm font-medium text-slate-400">Manage your active broadcasts and real-time scoring data.</p>
          </div>
          <Button className="h-16 px-10 rounded-2xl bg-[#0B1F3A] text-white font-black text-[10px] uppercase tracking-widest shadow-xl">
             <Plus className="mr-2 h-4 w-4" /> Initialize New Match
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 rounded-[2.5rem] border-slate-100 overflow-hidden shadow-xl">
            <CardHeader className="bg-white p-8 border-b border-slate-50">
               <CardTitle className="text-sm font-black uppercase tracking-widest">Active Circuit Feeds</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               {myMatches.length > 0 ? (
                 <div className="divide-y divide-slate-50">
                   {myMatches.map(match => (
                     <div key={match.id} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors">
                       <div className="space-y-1">
                         <h3 className="font-black uppercase italic text-lg">{match.name}</h3>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{match.player1} VS {match.player2}</p>
                       </div>
                       <Button 
                         onClick={() => navigate(`/scoring/${match.id}`)}
                         variant="outline" 
                         className="h-12 rounded-xl border-slate-200 font-black text-[10px] uppercase tracking-widest"
                       >
                         Manage Scoring <ArrowRight className="ml-2 h-4 w-4" />
                       </Button>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="p-24 text-center text-slate-300 font-black uppercase italic tracking-widest">
                   No active match broadcasts found
                 </div>
               )}
            </CardContent>
          </Card>

          <div className="space-y-8">
             <Card className="rounded-[2.5rem] bg-[#0B1F3A] text-white p-8 border-none shadow-2xl">
                <div className="h-12 w-12 bg-sky-500 rounded-2xl flex items-center justify-center mb-6">
                   <Activity className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-black uppercase italic mb-2">System Health</h3>
                <p className="text-white/50 text-[10px] font-black uppercase tracking-widest mb-6">Real-time Backend Status</p>
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                      <span className="text-[10px] font-black uppercase">Latency</span>
                      <span className="text-sky-400 font-black">Online</span>
                   </div>
                   <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                      <span className="text-[10px] font-black uppercase">Database</span>
                      <span className="text-sky-400 font-black">Synchronized</span>
                   </div>
                </div>
             </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BroadcastCenter;