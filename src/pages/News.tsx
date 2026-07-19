"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Newspaper, Zap, Clock, ArrowRight, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const News = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container px-6 py-16 space-y-16">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 text-sky-600">
            <Newspaper className="h-4 w-4" />
            <span className="text-xs font-black uppercase tracking-widest">Platform Announcements</span>
          </div>
          <h1 className="text-6xl font-black text-[#0B1F3A] tracking-tighter leading-[0.95]">
            SmashLive <span className="text-sky-500">Pulse</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Stay updated with protocol changes, tournament launches, and system intelligence updates.
          </p>
        </div>

        <div className="py-40 text-center bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
          <Zap className="h-12 w-12 text-slate-200 mx-auto mb-6" />
          <h3 className="text-xl font-black text-[#0B1F3A] uppercase italic">Awaiting Intel</h3>
          <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-2 italic">Global news feed is currently offline</p>
        </div>

        <section className="bg-[#0B1F3A] rounded-[3.5rem] p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          <div className="space-y-6 flex-1 relative z-10 text-white">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-sky-400 fill-current" />
              <span className="text-xs font-black text-sky-400 uppercase tracking-[0.3em]">Operational Readiness</span>
            </div>
            <h2 className="text-4xl font-black tracking-tighter">Synchronize Your Tournaments</h2>
            <p className="text-white/60 font-medium max-w-lg">Launch your own circuit today and populate the global intelligence network with real athlete data.</p>
            <Button size="lg" className="bg-sky-500 text-white rounded-full font-black px-10 h-16 shadow-2xl hover:bg-sky-400 border-none">
              Start Circuit
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default News;