"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Share2, UserPlus, Star, GraduationCap, MapPin, Edit3 } from 'lucide-react';

const ProfileHero = () => {
  return (
    <section className="relative glass-panel p-10 rounded-[3rem] border-slate-200 overflow-hidden group">
      {/* Background Glows */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-sky-500/5 blur-[100px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#0B1F3A]/5 blur-[100px] rounded-full" />

      <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Image */}
        <div className="lg:col-span-3 flex justify-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="h-48 w-48 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 p-1 shadow-xl">
              <div className="h-full w-full rounded-full bg-slate-100 flex items-center justify-center text-5xl font-black text-[#0B1F3A] border-4 border-white overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop" 
                  className="w-full h-full object-cover"
                  alt="Player"
                />
              </div>
            </div>
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-2 -right-2 bg-sky-500 text-white h-12 w-12 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
            >
              <Star className="h-6 w-6 fill-current" />
            </motion.div>
          </motion.div>
        </div>

        {/* Center Column: Info */}
        <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-[#0B1F3A] mb-2">Viktor Axelsen</h1>
            <p className="text-sky-600 font-mono text-sm tracking-[0.3em] font-bold uppercase">UID: SMASH_842_INT</p>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm">
            <div className="flex items-center gap-2 text-slate-700 font-bold">
              <span className="text-xl">🇩🇰</span> Denmark
            </div>
            <div className="h-4 w-px bg-slate-200 hidden md:block" />
            <div className="text-slate-500 font-bold">30 Years • Male</div>
            <div className="h-4 w-px bg-slate-200 hidden md:block" />
            <div className="text-slate-500 font-bold italic">Right Handed</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <Badge variant="outline" className="border-sky-200 text-sky-600 font-black uppercase text-[8px]">Category</Badge>
              <span className="text-xs font-black text-[#0B1F3A] uppercase">Men's Singles</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <GraduationCap className="h-4 w-4 text-sky-500" />
              <span className="text-xs font-black text-[#0B1F3A] uppercase">Pro Academy</span>
            </div>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-6">
          <div className="flex gap-4">
            <div className="text-center bg-white border border-slate-100 p-4 rounded-3xl min-w-[100px] shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">World Rank</p>
              <p className="text-3xl font-black text-sky-600">#1</p>
            </div>
            <div className="text-center bg-white border border-slate-100 p-4 rounded-3xl min-w-[100px] shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Points</p>
              <p className="text-3xl font-black text-[#0B1F3A]">105.4k</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 w-full max-w-sm lg:max-w-none">
            <Button className="flex-1 bg-sky-500 text-white font-black h-14 rounded-2xl hover:bg-sky-400 shadow-lg transition-all text-sm uppercase tracking-widest border-none">
              FOLLOW <UserPlus className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="flex-1 border-slate-200 text-[#0B1F3A] font-black h-14 rounded-2xl hover:bg-slate-50 text-sm uppercase tracking-widest">
              EDIT <Edit3 className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-slate-200 hover:bg-slate-50">
              <Share2 className="h-5 w-5 text-[#0B1F3A]" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHero;