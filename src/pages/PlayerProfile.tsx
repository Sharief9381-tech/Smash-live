"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
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
import { Button } from '@/components/ui/button';

const PlayerProfile = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div className="min-h-screen bg-white text-[#0B1F3A] selection:bg-sky-500/30">
      <Navbar />
      
      <main className="container max-w-7xl px-6 py-16 space-y-16">
        {/* Dossier Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-16 bg-sky-500 rounded-full" />
            <span className="text-[10px] font-black text-sky-600 uppercase tracking-[0.5em]">Global Intelligence Dossier</span>
          </div>
          <ProfileHero />
        </div>

        {/* Tab Navigation */}
        <ProfileNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Persistent Core Stats */}
        <section className="space-y-10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-3xl font-black tracking-tighter uppercase italic">Performance Core</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time synchronized career metrics</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 text-sky-600 border border-sky-100">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">BWF Verified Standings</span>
            </div>
          </div>
          <PerformanceStats />
        </section>

        {/* Dynamic Section Container */}
        <div className="pt-8 min-h-[600px]">
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
                <>
                  <h2 className="text-3xl font-black tracking-tighter uppercase">Strategic Analytics</h2>
                  <AnalyticsSection />
                </>
              )}
              {activeTab === 'stats' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { label: "Smash Accuracy", val: "94.2%", icon: Target, desc: "Landing within 15cm of sidelines" },
                    { label: "Net Kill Ratio", val: "78.4%", icon: Zap, desc: "Successful finishes from front court" },
                    { label: "Fatigue Index", val: "12%", icon: Activity, desc: "Performance drop after 40 mins" },
                    { label: "Rally Endurance", val: "24.2s", icon: Activity, desc: "Average duration of point winning rallies" },
                    { label: "Service Error Rate", val: "1.2%", icon: Target, desc: "Faults per 100 service points" },
                  ].map((s, i) => (
                    <div key={i} className="glass-panel p-8 rounded-[2.5rem] border-slate-100 hover:border-sky-500/30 transition-all">
                      <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-sky-500 mb-6">
                        <s.icon className="h-6 w-6" />
                      </div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</h4>
                      <p className="text-4xl font-black text-[#0B1F3A] mb-4">{s.val}</p>
                      <p className="text-[11px] font-medium text-slate-500 leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'rankings' && (
                <>
                  <h2 className="text-3xl font-black tracking-tighter uppercase">Ranking Context</h2>
                  <RankingSection />
                </>
              )}
              {activeTab === 'history' && (
                <>
                  <h2 className="text-3xl font-black tracking-tighter uppercase">Circuit History</h2>
                  <TournamentSection />
                </>
              )}
              {activeTab === 'teams' && <TeamSection />}
              {activeTab === 'achievements' && (
                <div className="space-y-16">
                  <div className="text-center space-y-4">
                    <h2 className="text-5xl font-black tracking-tighter uppercase italic">Hall of Fame</h2>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Global career milestones and verified badges</p>
                  </div>
                  <AchievementSection />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <section className="bg-[#0B1F3A] p-20 rounded-[4.5rem] flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none">
            <Zap className="h-[400px] w-[400px] text-sky-400" />
          </div>
          <div className="space-y-6 max-w-2xl relative z-10">
            <h2 className="text-5xl font-black text-white tracking-tighter leading-tight italic">ELEVATE YOUR <br /> INTELLIGENCE.</h2>
            <p className="text-white/60 font-medium text-lg">SmashLive Pro gives you access to biomechanical data, court coverage heatmaps, and opponent simulation AI.</p>
            <Button size="lg" className="bg-sky-500 text-white rounded-full font-black px-12 h-16 text-lg hover:bg-sky-400 shadow-xl border-none">
              GO PRO NOW
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PlayerProfile;