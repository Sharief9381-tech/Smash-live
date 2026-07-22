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
  Trophy, Users, Award, Zap, ChevronLeft, Loader2, Star, Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

const PlayerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('performance');
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const fetchAthlete = async () => {
      setLoading(true);
      if (!id || id === 'me') {
        const saved = localStorage.getItem('userProfile');
        if (saved) setProfileData(JSON.parse(saved));
        setLoading(false);
        return;
      }

      try {
        const { data } = await supabase.from('profiles').select('*').eq('id', id).single();
        if (data) setProfileData(data);
      } catch (e) { console.warn("Sync issue."); }
      finally { setLoading(false); }
    };
    fetchAthlete();
  }, [id]);

  const tabs = [
    { id: 'performance', label: 'Stats', icon: Activity },
    { id: 'analytics', label: 'Tech', icon: BarChart3 },
    { id: 'history', label: 'Matches', icon: Trophy },
    { id: 'badges', label: 'Awards', icon: Award },
  ];

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-sky-500 h-10 w-10" /></div>;

  const isOwnProfile = !id || id === 'me' || profileData?.mobile === JSON.parse(localStorage.getItem('userProfile') || '{}').mobile;

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A] pb-32">
      <Navbar />
      
      <main className="container max-w-lg px-4 py-6 space-y-6">
        {/* Profile Identity Card */}
        <ProfileHero profile={profileData} isOwnProfile={isOwnProfile} />

        {/* Engagement Ribbon */}
        <div className="app-card flex divide-x divide-slate-50">
           <div className="flex-1 p-3 text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase">Followers</p>
              <p className="text-sm font-black">1.2k</p>
           </div>
           <div className="flex-1 p-3 text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase">Streak</p>
              <p className="text-sm font-black text-orange-500 flex items-center justify-center gap-1">
                <Flame className="h-3 w-3" /> 4
              </p>
           </div>
           <div className="flex-1 p-3 text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase">Win Rate</p>
              <p className="text-sm font-black text-sky-600">84%</p>
           </div>
        </div>

        {/* Horizontal Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all whitespace-nowrap active-press",
                activeTab === tab.id 
                  ? "bg-[#0B1F3A] text-white shadow-lg" 
                  : "bg-white text-slate-400 border border-slate-100"
              )}
            >
              <tab.icon className="h-3.5 w-3.5" />
              <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content with Smooth Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="min-h-[400px]"
          >
            {activeTab === 'performance' && <PerformanceStats stats={profileData?.stats} />}
            {activeTab === 'analytics' && <AnalyticsSection />}
            {activeTab === 'history' && <TournamentSection />}
            {activeTab === 'badges' && <AchievementSection />}
          </motion.div>
        </AnimatePresence>

        {/* Shareable Card Button */}
        <Button className="w-full h-14 bg-sky-500 text-white rounded-2xl font-black text-btn gap-2 shadow-lg active-press">
          <Star className="h-4 w-4" /> Share Athlete Dossier
        </Button>
      </main>
    </div>
  );
};

export default PlayerProfile;