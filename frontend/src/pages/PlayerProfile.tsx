import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar';
import ProfileHero from '@/components/profile/ProfileHero';
import PerformanceStats from '@/components/profile/PerformanceStats';
import TournamentSection from '@/components/profile/TournamentSection';
import TeamSection from '@/components/profile/TeamSection';
import AnalyticsSection from '@/components/profile/AnalyticsSection';
import AchievementSection from '@/components/profile/AchievementSection';
import RankingSection from '@/components/profile/RankingSection';
import { 
  Activity, BarChart3, 
  Trophy, Users, Award, Zap, ChevronLeft, Loader2, Star, Flame, History
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { UserAPI } from '@/services/api';
import { useSocketEvent } from '@/hooks/use-socket';

const PlayerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('performance');
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);

  const fetchAthlete = useCallback(async () => {
    setLoading(true);
    if (!id || id === 'me') {
      const saved = localStorage.getItem('userProfile');
      if (saved) setProfileData(JSON.parse(saved));
      setLoading(false);
      return;
    }
    try {
      const data = await UserAPI.getById(id);
      if (data) setProfileData(data);
    } catch {
      const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const local = registered.find((u: any) => u.id === id || u.mobile === id);
      if (local) setProfileData(local);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchAthlete(); }, [fetchAthlete]);

  // Re-fetch profile when a match involving this player completes
  useSocketEvent('feed:match_completed', (match) => {
    const playersStr = JSON.stringify(match.players || '');
    const profileName = profileData?.name || '';
    const profileId   = profileData?._id || profileData?.id || id;
    if (
      playersStr.includes(profileId) ||
      (profileName && playersStr.toLowerCase().includes(profileName.toLowerCase()))
    ) {
      fetchAthlete();
    }
  });

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
        <ProfileHero profile={profileData} isOwnProfile={isOwnProfile} />

        <div className="flex gap-2">
           <Button 
             onClick={() => navigate(`/smashed?player=${profileData?.name}`)}
             className="flex-1 h-14 bg-[#0B1F3A] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest gap-2 shadow-xl active-press border-none"
           >
             <History className="h-4 w-4" /> View Match History
           </Button>
           {!isOwnProfile && (
             <Button variant="outline" className="h-14 w-14 p-0 rounded-2xl bg-white border-slate-200">
               <Star className="h-5 w-5 text-sky-500" />
             </Button>
           )}
        </div>

        <div className="app-card flex divide-x divide-slate-50">
           <div className="flex-1 p-3 text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase">Followers</p>
              <p className="text-sm font-black">{profileData?.stats?.followers || 0}</p>
           </div>
           <div className="flex-1 p-3 text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase">Streak</p>
              <p className="text-sm font-black text-orange-500 flex items-center justify-center gap-1">
                <Flame className="h-3 w-3" /> {profileData?.stats?.streak || 0}
              </p>
           </div>
           <div className="flex-1 p-3 text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase">Win Rate</p>
              <p className="text-sm font-black text-sky-600">{profileData?.stats?.winRate || "0%"}</p>
           </div>
        </div>

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
      </main>
    </div>
  );
};

export default PlayerProfile;