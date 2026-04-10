"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, User, ArrowRightLeft, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const TeamSection = () => {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="partners" className="w-full">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h3 className="text-xl font-black text-white flex items-center gap-3">
            <Users className="h-6 w-6 text-[#00f2ff]" /> Team Intelligence
          </h3>
          <TabsList className="bg-white/5 p-1 rounded-xl">
            <TabsTrigger value="partners" className="rounded-lg px-6 font-black text-xs uppercase data-[state=active]:bg-[#00f2ff] data-[state=active]:text-black">Partners</TabsTrigger>
            <TabsTrigger value="opponents" className="rounded-lg px-6 font-black text-xs uppercase data-[state=active]:bg-[#00f2ff] data-[state=active]:text-black">Opponents</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="partners" className="mt-8 grid md:grid-cols-2 gap-6">
          {[
            { name: "Anders Antonsen", team: "Denmark National", matches: 42, wins: 38, rate: 90.4, result: "Gold - European C." },
            { name: "Rasmus Gemke", team: "Denmark National", matches: 12, wins: 8, rate: 66.7, result: "SF - All England" },
          ].map((p, i) => (
            <div key={i} className="glass-card p-8 rounded-[2.5rem] border-white/5 flex gap-8 items-center hover:border-[#00f2ff]/30 transition-all">
              <div className="h-24 w-24 rounded-full bg-white/5 p-1 shrink-0">
                <div className="h-full w-full rounded-full bg-[#00f2ff]/10 flex items-center justify-center text-2xl font-black text-[#00f2ff]">
                  {p.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h4 className="text-xl font-black text-white">{p.name}</h4>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{p.team}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-white/40">Matches</p>
                    <p className="font-black text-white">{p.matches}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black text-white/40">Win %</p>
                    <p className="font-black text-[#b6ff2a]">{p.rate}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black text-white/40">Wins</p>
                    <p className="font-black text-white">{p.wins}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="opponents" className="mt-8 space-y-6">
          {[
            { p1: "Lee Zii Jia", p2: "Malaysia", faced: 24, wins: 18, losses: 6, last: "Won (2-0)", h2h: 75 },
            { p1: "Shi Yuqi", p2: "China", faced: 18, wins: 12, losses: 6, last: "Won (2-1)", h2h: 66 },
          ].map((o, i) => (
            <div key={i} className="glass-card p-8 rounded-[3rem] border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 hover:border-[#00f2ff]/30 transition-all">
              <div className="flex items-center gap-8">
                <div className="flex -space-x-4">
                  <div className="h-16 w-16 rounded-full bg-[#b6ff2a] border-4 border-[#0a0a0a] flex items-center justify-center font-black text-black">VA</div>
                  <div className="h-16 w-16 rounded-full bg-[#00f2ff] border-4 border-[#0a0a0a] flex items-center justify-center font-black text-black">
                    {o.p1.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-black text-white">vs {o.p1}</h4>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{o.p2} • Head-to-Head</p>
                </div>
              </div>

              <div className="flex-1 max-w-md w-full space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-[#b6ff2a]">Axelsen ({o.wins})</span>
                  <span className="text-[#00f2ff]">{o.p1.split(' ')[2] || o.p1} ({o.losses})</span>
                </div>
                <Progress value={o.h2h} className="h-2 bg-white/5" indicatorClassName="bg-[#b6ff2a]" />
                <div className="text-center">
                   <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Head-to-Head Dominance: <span className="text-white">{o.h2h}%</span></p>
                </div>
              </div>

              <div className="text-center md:text-right min-w-[120px]">
                <p className="text-[10px] font-black text-white/40 uppercase">Last Encounter</p>
                <p className="text-lg font-black text-[#b6ff2a]">{o.last}</p>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamSection;