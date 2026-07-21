"use client";

import React from 'react';
import { Target, CheckCircle2, Circle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const DailyChallenges = () => {
  const challenges = [
    { id: 1, task: "Win 2 Matches", reward: "+50 XP", done: true },
    { id: 2, task: "3 Smashes in one set", reward: "+30 XP", done: false },
    { id: 3, task: "Complete 1 Tournament", reward: "+120 XP", done: false },
  ];

  return (
    <div className="app-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="uppercase italic flex items-center gap-2">
          <Target className="h-4 w-4 text-sky-500" /> Daily Missions
        </h3>
        <span className="text-[10px] font-black text-slate-400">01:42:10 LEFT</span>
      </div>

      <div className="space-y-2">
        {challenges.map((c) => (
          <div key={c.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              {c.done ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Circle className="h-4 w-4 text-slate-200" />}
              <span className={`text-[12px] font-bold ${c.done ? 'text-slate-400 line-through' : 'text-[#0B1F3A]'}`}>{c.task}</span>
            </div>
            <Badge variant="outline" className="text-[8px] font-black border-sky-100 text-sky-600 bg-sky-50">{c.reward}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyChallenges;