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
import { ShieldCheck, Zap } from 'lucide-react';

const PlayerProfile = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F3A] pb-32">
      <Navbar />
      
      <main className="container px-4 py-8 space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-12 bg-sky-500 rounded-full" />
            <span className="text-[9px] font-black text-sky-600 uppercase tracking-widest">Athlete Dossier</span>
          </div>
          <ProfileHero />
        </div>

        {/* VERTICAL STACK OF ALL INTEL SECTIONS */}
        <div className="space-y-16">
          {/* Performance Core */}
          <section className="space-y-8">
            <div className="flex items-center justify-between px-2">
              <div className="space-y-1">
                <h2 className="text-2xl font-black tracking-tighter uppercase italic">Performance</h2>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Real-time metrics</p>
              </div>
              <ShieldCheck className="h-6 w-6 text-sky-500" />
            </div>
            <PerformanceStats />
          </section>

          {/* Strategic Analytics */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black tracking-tighter uppercase italic px-2">Analytics</h2>
            <AnalyticsSection />
          </section>

          {/* Global Ranking */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black tracking-tighter uppercase italic px-2 text-sky-600">Ladder Standing</h2>
            <RankingSection />
          </section>

          {/* Circuit History */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black tracking-tighter uppercase italic px-2">History</h2>
            <TournamentSection />
          </section>

          {/* Team Intel */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black tracking-tighter uppercase italic px-2">Team Sync</h2>
            <TeamSection />
          </section>

          {/* Achievements */}
          <section className="space-y-6 pb-12">
            <h2 className="text-2xl font-black tracking-tighter uppercase italic px-2 text-amber-500">Hall of Fame</h2>
            <AchievementSection />
          </section>
        </div>

        {/* CTA */}
        <section className="bg-[#0B1F3A] p-12 rounded-[3.5rem] flex flex-col items-center text-center gap-8 relative overflow-hidden shadow-2xl">
          <Zap className="absolute -right-10 -bottom-10 h-60 w-60 text-sky-400 opacity-10" />
          <h2 className="text-4xl font-black text-white tracking-tighter leading-tight italic uppercase relative z-10">ELEVATE YOUR <br /> INTEL</h2>
          <p className="text-white/60 font-medium text-sm relative z-10">Get access to biomechanical court heatmaps and opponent simulation AI.</p>
          <button className="w-full bg-sky-500 text-white rounded-2xl font-black px-12 h-16 text-lg shadow-xl relative z-10">GO PRO NOW</button>
        </section>
      </main>
    </div>
  );
};

export default PlayerProfile;