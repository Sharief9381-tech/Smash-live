"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import ProfileHero from '@/components/profile/ProfileHero';
import PerformanceStats from '@/components/profile/PerformanceStats';
import TournamentSection from '@/components/profile/TournamentSection';
import TeamSection from '@/components/profile/TeamSection';
import AnalyticsSection from '@/components/profile/AnalyticsSection';
import AchievementSection from '@/components/profile/AchievementSection';
import RankingSection from '@/components/profile/RankingSection';
import { 
  Activity, BarChart3, ListOrdered, 
  Trophy, Users, Award, Zap, ChevronLeft, Loader2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

const PlayerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('performance');
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const fetchAthlete = async () => {
      if (!id || id === 'me') return;
      setLoading(true);
      try {
        const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
        if (data) setProfileData(data);
      } catch (e) {
        const local = JSON.parse(localStorage.getItem('registered_users') || '[]');
        const found = local.find((u: any) => u.id === id || u.mobile === id);
        if (found) setProfileData(found);
      } finally {
        setLoading(false);
      }
    };
    fetchAthlete();
  }, [id]);

  const tabs = [
    { id: 'performance', label: 'Intel', icon: Activity },
    { id: 'analytics', label: 'Stats', icon: BarChart3 },
    { id: 'ladder', label: 'Rank', icon: ListOrdered },
    { id: 'history', label: 'History', icon: Trophy },
    { id: 'team', label: 'Teams', icon: Users },
    { id: 'badges', label: 'Hall', icon: Award },
  ];

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-sky-500 h-10 w-10" /></div>;

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A] pb-32">
      <Navbar />
      
      <main className="container px-4 py-8 space-y-8">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="h-1 w-10 bg-sky-500 rounded-full" />
            <span className="text-[9px] font-black text-sky-600 uppercase tracking-widest">Athlete Dossier</span>
          </div>
          {id && id !== 'me' && (
            <button onClick={() => navigate(-1)} className="text-[9px] font-black text-slate-400 uppercase flex items-center gap-1"><ChevronLeft className="h-3 w-3" /> Back</button>
          )}
        </div>

        <ProfileHero />

        {/* Horizontal Navigation List */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl transition-all whitespace-nowrap",
                activeTab === tab.id 
                  ? "bg-[#0B1F3A] text-white shadow-lg scale-105" 
                  : "bg-white text-slate-400 border border-slate-100"
              )}
            >
              <tab.icon className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Display Area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'performance' && (
                <section className="space-y-6">
                  <div className="px-2">
                    <h2 className="text-xl font-black uppercase italic">Performance Core</h2>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Real-time Career pulse</p>
                  </div>
                  <PerformanceStats />
                </section>
              )}

              {activeTab === 'analytics' && (
                <section className="space-y-6">
                  <div className="px-2">
                    <h2 className="text-xl font-black uppercase italic">Strategic Analytics</h2>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Tactical intelligence breakdown</p>
                  </div>
                  <AnalyticsSection />
                </section>
              )}

              {activeTab === 'ladder' && (
                <section className="space-y-6">
                  <h2 className="text-xl font-black uppercase italic px-2 text-sky-600">Ladder Standing</h2>
                  <RankingSection />
                </section>
              )}

              {activeTab === 'history' && (
                <section className="space-y-6">
                  <h2 className="text-xl font-black uppercase italic px-2">Circuit History</h2>
                  <TournamentSection />
                </section>
              )}

              {activeTab === 'team' && (
                <section className="space-y-6">
                  <h2 className="text-xl font-black uppercase italic px-2">Team Sync</h2>
                  <TeamSection />
                </section>
              )}

              {activeTab === 'badges' && (
                <section className="space-y-6">
                  <h2 className="text-xl font-black uppercase italic px-2 text-amber-500">Hall of Fame</h2>
                  <AchievementSection />
                </section>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Refined Bottom Section */}
        <section className="bg-[#0B1F3A] p-10 rounded-[2.5rem] flex flex-col items-center text-center gap-6 relative overflow-hidden shadow-2xl">
          <Zap className="absolute -right-8 -bottom-8 h-40 w-40 text-sky-400 opacity-5" />
          <h2 className="text-3xl font-black text-white tracking-tighter leading-tight italic uppercase relative z-10">ELEVATE INTEL</h2>
          <p className="text-white/40 font-medium text-[11px] leading-relaxed relative z-10">Access advanced biomechanical court heatmaps and neural network simulations.</p>
          <button className="w-full bg-sky-500 text-white rounded-xl font-black px-8 h-14 text-xs uppercase tracking-widest shadow-xl relative z-10">UPGRADE Dossier</button>
        </section>
      </main>
    </div>
  );
};

export default PlayerProfile;