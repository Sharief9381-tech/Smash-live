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
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <TabsList className="bg-white/5 p-1 rounded-2xl border border-white/5">
            <TabsTrigger value="played" className="rounded-xl px-8 font-black text-xs uppercase data-[state=active]:bg-[#b6ff2a] data-[state=active]:text-black">Played</TabsTrigger>
            <TabsTrigger value="following" className="rounded-xl px-8 font-black text-xs uppercase data-[state=active]:bg-[#b6ff2a] data-[state=active]:text-black">Following</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="played" className="mt-8 space-y-4">
          {[
            { name: "BWF World Tour Finals", date: "Dec 2024", cat: "Major", result: "Winner", pos: "1st", stats: "5-0" },
            { name: "Indonesia Open", date: "Nov 2024", cat: "Super 1000", result: "Finalist", pos: "2nd", stats: "4-1" },
            { name: "Denmark Open", date: "Oct 2024", cat: "Super 750", result: "Winner", pos: "1st", stats: "5-0" },
          ].map((t, i) => (
            <div key={i} className="glass-card p-6 rounded-3xl border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#b6ff2a]/30 transition-all group">
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#b6ff2a]">
                  <Trophy className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="font-black text-white text-lg">{t.name}</h4>
                  <div className="flex items-center gap-4 text-xs font-bold text-white/40 uppercase tracking-widest mt-1">
                    <span>{t.date}</span>
                    <span className="h-1 w-1 bg-white/20 rounded-full" />
                    <span>{t.cat}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-12">
                <div className="text-center">
                  <p className="text-[10px] font-black text-white/40 uppercase">Record</p>
                  <p className="text-lg font-black text-white">{t.stats}</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-[#b6ff2a] text-black font-black mb-1">{t.result}</Badge>
                  <p className="text-[10px] font-black text-white/40 uppercase">{t.pos} Place</p>
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
            <div key={i} className="glass-card rounded-[2.5rem] overflow-hidden border-white/5 group hover:border-[#00f2ff]/30 transition-all">
              <div className="relative aspect-video">
                <img src={t.img} className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <Badge className="absolute top-4 left-4 bg-[#00f2ff] text-black font-black">{t.status}</Badge>
                <div className="absolute bottom-6 left-6 space-y-2">
                  <h4 className="text-2xl font-black text-white">{t.name}</h4>
                  <div className="flex items-center gap-4 text-xs font-bold text-white/80">
                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[#b6ff2a]" /> {t.venue}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-[#b6ff2a]" /> {t.date}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full bg-black/40 backdrop-blur-md text-white hover:text-[#b6ff2a]">
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