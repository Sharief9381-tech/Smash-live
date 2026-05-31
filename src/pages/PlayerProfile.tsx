"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import ProfileHero from '@/components/profile/ProfileHero';
import ProfileNavigation from '@/components/profile/ProfileNavigation';
import PerformanceStats from '@/components/profile/PerformanceStats';
import AnalyticsSection from '@/components/profile/AnalyticsSection';
import RankingSection from '@/components/profile/RankingSection';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap } from 'lucide-react';

const PlayerProfile = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div className="min-h-screen bg-white text-[#0B1F3A]">
      <Navbar />
      
      <main className="container max-w-6xl px-6 py-12 space-y-12">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-1 w-12 bg-sky-500 rounded-full" />
            <span className="text-[9px] font-black text-sky-600 uppercase tracking-[0.5em]">Intel Dossier</span>
          </div>
          <ProfileHero />
        </div>

        <ProfileNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="pt-6 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-10"
            >
              {activeTab === 'analytics' && (
                <div className="space-y-10">
                  <section className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h2 className="text-2xl font-black tracking-tighter uppercase italic">Performance Core</h2>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Real-time Career Intelligence</p>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 text-sky-600 border border-sky-100">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span className="text-[9px] font-black uppercase tracking-widest">BWF Verified</span>
                      </div>
                    </div>
                    <PerformanceStats />
                  </section>
                  <AnalyticsSection />
                </div>
              )}

              {activeTab === 'rankings' && <RankingSection />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default PlayerProfile;