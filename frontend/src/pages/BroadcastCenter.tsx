"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import BroadcastActionCard from '@/components/broadcast/BroadcastActionCard';
import PlayerBroadcastStats from '@/components/broadcast/PlayerBroadcastStats';
import { 
  Radio, Trophy, Target, 
  Calendar, Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BroadcastCenter = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-white border-b border-slate-100 p-6">
        <div className="flex items-center gap-4">
          <div className="bg-[#0B1F3A] p-2.5 rounded-xl text-sky-400">
            <Radio className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight uppercase italic text-[#0B1F3A]">Match Center</h1>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Calendar className="h-3 w-3" /> {currentTime.toLocaleDateString()} 
              <span className="h-1 w-1 bg-slate-200 rounded-full" />
              <Clock className="h-3 w-3" /> {currentTime.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      <main className="px-4 py-8 space-y-8">
        {/* Action Cards - Changed to side-by-side on larger mobile or very compact vertically */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BroadcastActionCard 
            title="Start Match"
            description="Setup a quick match with live scoring."
            icon={Target}
            buttonText="New Match"
            onClick={() => navigate('/live-match/create')}
            variant="primary"
          />
          <BroadcastActionCard 
            title="New Tournament"
            description="Organize events and live brackets."
            icon={Trophy}
            buttonText="Create"
            onClick={() => navigate('/tournaments/create')}
            variant="secondary"
          />
        </div>

        {/* Player Stats Panel */}
        <div className="pt-2">
          <PlayerBroadcastStats />
        </div>
      </main>
    </div>
  );
};

export default BroadcastCenter;