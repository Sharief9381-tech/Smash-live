"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Calendar, MapPin, Bell, Clock } from 'lucide-react';

const TournamentSection = () => {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="played" className="w-full">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <TabsList className="bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <TabsTrigger value="played" className="rounded-xl px-8 font-black text-xs uppercase data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white">Played</TabsTrigger>
            <TabsTrigger value="following" className="rounded-xl px-8 font-black text-xs uppercase data-[state=active]:bg-[#0B1F3A] data-[state=active]:text-white">Following</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="played" className="mt-8 space-y-4">
          {[
            { name: "BWF World Tour Finals", date: "Dec 2024", cat: "Major", result: "Winner", pos: "1st", stats: "5-0" },
            { name: "Indonesia Open", date: "Nov 2024", cat: "Super 1000", result: "Finalist", pos: "2nd", stats: "4-1" },
            { name: "Denmark Open", date: "Oct 2024", cat: "Super 750", result: "Winner", pos: "1st", stats: "5-0" },
          ].map((t, i) => (
            <div key={i} className="glass-panel p-6 rounded-3xl border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-sky-500/30 transition-all group">
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-sky-500">
                  <Trophy className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="font-black text-[#0B1F3A] text-lg">{t.name}</h4>
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                    <span>{t.date}</span>
                    <span className="h-1 w-1 bg-slate-200 rounded-full" />
                    <span>{t.cat}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-12">
                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase">Record</p>
                  <p className="text-lg font-black text-[#0B1F3A]">{t.stats}</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-sky-500 text-white font-black mb-1">{t.result}</Badge>
                  <p className="text-[10px] font-black text-slate-400 uppercase">{t.pos} Place</p>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="following" className="mt-8 grid md:grid-cols-2 gap-6">
          {[
            { name: "Malaysia Open 2025", venue: "Kuala Lumpur", date: "Jan 07, 2025", status: "Upcoming", img: "https://images.unsplash.com/photo-1626224580175-340ad0e3a242?q=80&w=2070&auto=format&fit=crop" },
            { name: "All England Open", venue: "Birmingham", date: "Mar 11, 2025", status: "Upcoming", img: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2070&auto=format&fit=crop" },
          ].map((t, i) => (
            <div key={i} className="glass-panel rounded-[2.5rem] overflow-hidden border-slate-200 group hover:border-sky-500/30 transition-all">
              <div className="relative aspect-video">
                <img src={t.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <Badge className="absolute top-4 left-4 bg-sky-500 text-white font-black">{t.status}</Badge>
                <div className="absolute bottom-6 left-6 space-y-2">
                  <h4 className="text-2xl font-black text-[#0B1F3A]">{t.name}</h4>
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-sky-500" /> {t.venue}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-sky-500" /> {t.date}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full bg-white/40 backdrop-blur-md text-[#0B1F3A] hover:text-sky-500">
                    <Bell className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TournamentSection;