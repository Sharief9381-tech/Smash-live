"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import BroadcastActionCard from '@/components/broadcast/BroadcastActionCard';
import PlayerBroadcastStats from '@/components/broadcast/PlayerBroadcastStats';
import { 
  Radio, Trophy, Target, 
  Calendar, Clock,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const BroadcastCenter = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 py-6">
        <div className="container px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-[#0B1F3A] p-2 rounded-xl text-sky-400">
              <Radio className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase italic text-[#0B1F3A]">Broadcast Studio</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Calendar className="h-3 w-3" /> {currentTime.toLocaleDateString()} 
                <span className="h-1 w-1 bg-slate-300 rounded-full" />
                <Clock className="h-3 w-3" /> {currentTime.toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-slate-200">
              <Settings className="h-5 w-5 text-slate-500" />
            </Button>
            <div className="h-11 w-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-[#0B1F3A]">Admin Operator</p>
                <p className="text-[10px] font-bold text-sky-500 uppercase">Superuser</p>
              </div>
              <div className="h-11 w-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black">AD</div>
            </div>
          </div>
        </div>
      </div>

      <main className="container px-6 py-12 space-y-12">
        {/* Action Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          <BroadcastActionCard 
            title="Start Live Match"
            description="Initialize a quick individual singles or doubles match for immediate broadcasting."
            icon={Target}
            buttonText="Start Individual Match"
            onClick={() => navigate('/live-match/create')}
            variant="primary"
          />
          <BroadcastActionCard 
            title="Start Tournament"
            description="Launch an entire tournament circuit with bracket intelligence and multi-match feed."
            icon={Trophy}
            buttonText="Start Tournament"
            onClick={() => navigate('/tournaments/create')}
            variant="secondary"
          />
        </div>

        {/* Player Studio Stats Panel */}
        <section className="max-w-4xl mx-auto pt-8">
          <PlayerBroadcastStats />
        </section>
      </main>
    </div>
  );
};

export default BroadcastCenter;