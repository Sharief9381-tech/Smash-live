"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Share2, UserPlus, Star, GraduationCap, MapPin } from 'lucide-react';

const ProfileHero = () => {
  return (
    <section className="relative glass-card p-10 rounded-[3rem] border-white/5 overflow-hidden group">
      {/* Background Glows */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#b6ff2a]/10 blur-[100px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#00f2ff]/10 blur-[100px] rounded-full" />

      <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Image */}
        <div className="lg:col-span-3 flex justify-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="h-48 w-48 rounded-full bg-gradient-to-br from-[#b6ff2a] to-[#00f2ff] p-1 shadow-[0_0_40px_rgba(182,255,42,0.2)]">
              <div className="h-full w-full rounded-full bg-black flex items-center justify-center text-5xl font-black text-white border-4 border-black/50 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop" 
                  className="w-full h-full object-cover opacity-90"
                  alt="Player"
                />
              </div>
            </div>
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-2 -right-2 bg-[#b6ff2a] text-black h-12 w-12 rounded-full flex items-center justify-center border-4 border-[#0a0a0a] shadow-lg"
            >
              <Star className="h-6 w-6 fill-current" />
            </motion.div>
          </motion.div>
        </div>

        {/* Center Column: Info */}
        <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-white mb-2">Viktor Axelsen</h1>
            <p className="text-[#b6ff2a] font-mono text-sm tracking-[0.3em] font-bold uppercase">UID: SMASH_842_INT</p>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm">
            <div className="flex items-center gap-2 text-white/80 font-bold">
              <span className="text-xl">🇩🇰</span> Denmark
            </div>
            <div className="h-4 w-px bg-white/10 hidden md:block" />
            <div className="text-white/60 font-medium">30 Years • Male</div>
            <div className="h-4 w-px bg-white/10 hidden md:block" />
            <div className="text-white/60 font-medium italic">Right Handed</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
              <Badge variant="outline" className="border-[#00f2ff]/50 text-[#00f2ff] font-black uppercase text-[8px]">Category</Badge>
              <span className="text-xs font-black text-white uppercase">Men's Singles</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
              <GraduationCap className="h-4 w-4 text-[#b6ff2a]" />
              <span className="text-xs font-black text-white uppercase">Pro Academy</span>
            </div>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-6">
          <div className="flex gap-4">
            <div className="text-center bg-white/5 p-4 rounded-3xl min-w-[100px] border border-white/5">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">World Rank</p>
              <p className="text-3xl font-black text-[#b6ff2a]">#1</p>
            </div>
            <div className="text-center bg-white/5 p-4 rounded-3xl min-w-[100px] border border-white/5">
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Points</p>
              <p className="text-3xl font-black text-[#00f2ff]">105.4k</p>
            </div>
          </div>

          <div className="flex gap-3 w-full max-w-sm lg:max-w-none">
            <Button className="flex-1 bg-[#b6ff2a] text-black font-black h-14 rounded-2xl hover:bg-[#b6ff2a]/90 shadow-[0_0_20px_rgba(182,255,42,0.3)] transition-all">
              FOLLOW PLAYER <UserPlus className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-white/10 hover:bg-white/5 hover:border-[#00f2ff]/50">
              <Share2 className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHero;