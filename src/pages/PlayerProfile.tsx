"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import ProfileHero from '@/components/profile/ProfileHero';
import ProfileNavigation from '@/components/profile/ProfileNavigation';
import PerformanceStats from '@/components/profile/PerformanceStats';
import TournamentSection from '@/components/profile/TournamentSection';
import TeamSection from '@/components/profile/TeamSection';
import AnalyticsSection from '@/components/profile/AnalyticsSection';
import AchievementSection from '@/components/profile/AchievementSection';
import RankingSection from '@/components/profile/RankingSection';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PlayerProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logic for logout would go here
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A] selection:bg-sky-500/30">
      <Navbar />
      
      <main className="container px-6 py-12 space-y-24">
        {/* Profile Controls (Top Right Float in Profile Section) */}
        <div className="flex justify-end pt-4">
           <Button 
            onClick={handleLogout}
            variant="ghost" 
            className="text-red-500 font-black text-xs uppercase tracking-widest hover:bg-red-50 hover:text-red-600 px-6 h-12 rounded-2xl"
           >
             TERMINATE SESSION <LogOut className="ml-2 h-4 w-4" />
           </Button>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-12 bg-sky-500 rounded-full" />
            <span className="text-xs font-black text-sky-600 uppercase tracking-[0.4em]">Elite Intelligence Dossier</span>
          </div>
          
          <ProfileHero />
          
          <ProfileNavigation />
        </motion.div>

        {/* Core Stats Section */}
        <section id="performance-core" className="space-y-10 scroll-mt-32">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black tracking-tighter uppercase">Performance Core</h2>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <ShieldCheck className="h-4 w-4 text-sky-500" /> Verified Statistics
            </div>
          </div>
          <PerformanceStats />
        </section>

        {/* Analytics Section */}
        <section id="strategic-analytics" className="space-y-10 scroll-mt-32">
          <h2 className="text-3xl font-black tracking-tighter uppercase">Strategic Analytics</h2>
          <AnalyticsSection />
        </section>

        {/* Rankings Section */}
        <section id="global-rankings" className="space-y-10 scroll-mt-32">
          <h2 className="text-3xl font-black tracking-tighter uppercase">Global Rankings</h2>
          <RankingSection />
        </section>

        {/* Tournaments Section */}
        <section id="circuit-history" className="space-y-10 scroll-mt-32">
          <h2 className="text-3xl font-black tracking-tighter uppercase">Circuit History</h2>
          <TournamentSection />
        </section>

        {/* Teams Section */}
        <section id="team-intelligence" className="space-y-10 scroll-mt-32">
          <TeamSection />
        </section>

        {/* Achievements Section */}
        <section id="hall-of-fame" className="space-y-12 scroll-mt-32">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black tracking-tighter uppercase italic">Hall of Fame</h2>
            <p className="text-slate-400 font-medium uppercase text-xs tracking-widest">Global career milestones and verified badges</p>
          </div>
          <AchievementSection />
        </section>

        {/* Bottom CTA Banner */}
        <section className="glass-panel p-12 rounded-[4rem] bg-gradient-to-br from-sky-500/10 via-transparent to-[#0B1F3A]/5 border-slate-200 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
          <div className="absolute -right-20 -bottom-20 opacity-5 group-hover:opacity-10 transition-opacity">
            <Zap className="h-80 w-80 text-[#0B1F3A]" />
          </div>
          
          <div className="space-y-6 max-w-xl relative z-10">
            <h2 className="text-4xl font-black tracking-tighter leading-tight">Compare performance with global elites?</h2>
            <p className="text-slate-500 font-medium">Unlock SmashLive Pro to access head-to-head simulations and deep biomechanical data.</p>
            <button className="h-16 px-10 bg-[#0B1F3A] text-white font-black rounded-2xl shadow-xl hover:translate-y-[-2px] transition-all">
              UPGRADE TO PRO STUDIO
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PlayerProfile;