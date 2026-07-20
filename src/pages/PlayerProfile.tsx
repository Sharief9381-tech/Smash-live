"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProfileHero from '@/components/profile/ProfileHero';
import ProfileNavigation from '@/components/profile/ProfileNavigation';
import PerformanceStats from '@/components/profile/PerformanceStats';
import TournamentSection from '@/components/profile/TournamentSection';
import TeamSection from '@/components/profile/TeamSection';
import AnalyticsSection from '@/components/profile/AnalyticsSection';
import AchievementSection from '@/components/profile/AchievementSection';
import RankingSection from '@/components/profile/RankingSection';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, Activity, Target } from 'lucide-react';

const PlayerProfile = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A] selection:bg-sky-500/30">
      <Navbar />
      
      <main className="container max-w-7xl px-6 py-12 space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-16 bg-sky-500 rounded-full" />
            <span className="text-[10px] font-black text-sky-600 uppercase tracking-[0.5em]">Global Intelligence Dossier</span>
          </div>
          <ProfileHero />
        </div>

        <ProfileNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="pt-4 min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {activeTab === 'analytics' && (
                <div className="space-y-12">
                  <section className="space-y-10">
                    <div className="flex items-center justify-between px-2">
                      <div className="space-y-1">
                        <h2 className="text-3xl font-black tracking-tighter uppercase italic">Performance Core</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time synchronized career metrics</p>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 text-sky-600 border border-sky-100">
                        <ShieldCheck className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">System Verified</span>
                      </div>
                    </div>
                    <PerformanceStats />
                  </section>
                  <div className="space-y-8">
                    <h2 className="text-3xl font-black tracking-tighter uppercase px-2 italic">Strategic Analytics</h2>
                    <AnalyticsSection />
                  </div>
                </div>
              )}

              {activeTab === 'stats' && (
                <div className="space-y-12">
                  <h2 className="text-3xl font-black tracking-tighter uppercase italic px-2">Detailed Intelligence</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                      { label: "Smash Accuracy", val: "0%", icon: Target, desc: "Landing within 15cm of sidelines" },
                      { label: "Net Kill Ratio", val: "0%", icon: Zap, desc: "Successful finishes from front court" },
                      { label: "Fatigue Index", val: "--", icon: Activity, desc: "Performance drop after 40 mins" },
                      { label: "Rally Endurance", val: "0s", icon: Activity, desc: "Average duration of point winning rallies" },
                      { label: "Service Error Rate", val: "0%", icon: Target, desc: "Faults per 100 service points" },
                    ].map((s, i) => (
                      <div key={i} className="glass-panel p-8 rounded-[2.5rem] border-slate-100 bg-white shadow-sm">
                        <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-sky-500 mb-6">
                          <s.icon className="h-6 w-6" />
                        </div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</h4>
                        <p className="text-4xl font-black text-[#0B1F3A] mb-4">{s.val}</p>
                        <p className="text-[11px] font-medium text-slate-500 leading-relaxed">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'rankings' && <RankingSection />}
              {activeTab === 'history' && <TournamentSection />}
              {activeTab === 'teams' && <TeamSection />}
              {activeTab === 'achievements' && <AchievementSection />}
            </motion.div>
          </AnimatePresence>
        </div>

        <section className="bg-[#0B1F3A] p-20 rounded-[4.5rem] flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none">
            <Zap className="h-[400px] w-[400px] text-sky-400" />
          </div>
          <div className="space-y-6 max-w-2xl relative z-10">
            <h2 className="text-5xl font-black text-white tracking-tighter leading-tight italic uppercase">Elevate Your <br /> Intelligence.</h2>
            <p className="text-white/60 font-medium text-lg leading-relaxed">SmashLive Pro gives you access to biomechanical data, court coverage heatmaps, and opponent simulation AI.</p>
            <button className="bg-sky-500 text-white rounded-full font-black px-12 h-16 text-lg hover:bg-sky-400 shadow-xl transition-all">
              GO PRO NOW
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PlayerProfile;