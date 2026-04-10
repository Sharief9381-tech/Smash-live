"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProfileHero from '@/components/profile/ProfileHero';
import PerformanceStats from '@/components/profile/PerformanceStats';
import TournamentSection from '@/components/profile/TournamentSection';
import TeamSection from '@/components/profile/TeamSection';
import AnalyticsSection from '@/components/profile/AnalyticsSection';
import AchievementSection from '@/components/profile/AchievementSection';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap } from 'lucide-react';

const PlayerProfile = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#b6ff2a] selection:text-black">
      <Navbar />
      
      <main className="container px-4 py-12 space-y-20">
        {/* Intro Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-12 bg-[#b6ff2a] rounded-full" />
            <span className="text-xs font-black text-[#b6ff2a] uppercase tracking-[0.4em]">Elite Intelligence Dossier</span>
          </div>
          
          <ProfileHero />
        </motion.div>

        {/* Core Stats Section */}
        <section className="space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black tracking-tighter uppercase">Performance Core</h2>
            <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
              <ShieldCheck className="h-4 w-4 text-[#b6ff2a]" /> Verified Statistics
            </div>
          </div>
          <PerformanceStats />
        </section>

        {/* Analytics Section */}
        <section className="space-y-10">
          <h2 className="text-3xl font-black tracking-tighter uppercase">Strategic Analytics</h2>
          <AnalyticsSection />
        </section>

        {/* Tournaments Section */}
        <section className="space-y-10">
          <h2 className="text-3xl font-black tracking-tighter uppercase">Circuit History</h2>
          <TournamentSection />
        </section>

        {/* Teams Section */}
        <section className="space-y-10">
          <TeamSection />
        </section>

        {/* Achievements Section */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black tracking-tighter uppercase italic">Hall of Fame</h2>
            <p className="text-white/40 font-medium uppercase text-xs tracking-widest">Global career milestones and verified badges</p>
          </div>
          <AchievementSection />
        </section>

        {/* Bottom CTA Banner */}
        <section className="glass-card p-12 rounded-[4rem] bg-gradient-to-br from-[#b6ff2a]/10 via-transparent to-[#00f2ff]/10 border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
          <div className="absolute -right-20 -bottom-20 opacity-5 group-hover:opacity-10 transition-opacity">
            <Zap className="h-80 w-80 text-white" />
          </div>
          
          <div className="space-y-6 max-w-xl relative z-10">
            <h2 className="text-4xl font-black tracking-tighter leading-tight">Compare this performance with global elites?</h2>
            <p className="text-white/60 font-medium">Unlock SmashLive Pro to access head-to-head simulations and deep biomechanical data for any professional player.</p>
            <button className="h-16 px-10 bg-[#b6ff2a] text-black font-black rounded-2xl shadow-[0_20px_40px_rgba(182,255,42,0.1)] hover:scale-105 transition-transform">
              UPGRADE TO PRO STUDIO
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
            {[
              { label: "Data Points", val: "8.4M" },
              { label: "Matches", val: "12k+" },
            ].map((s, i) => (
              <div key={i} className="glass-card p-6 rounded-3xl border-white/10 text-center min-w-[140px]">
                <p className="text-2xl font-black text-white">{s.val}</p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PlayerProfile;