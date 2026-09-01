import React from 'react';
import { Zap, Activity, Target, Flame, Award, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PerformanceStatsProps {
  stats?: {
    matchesPlayed?: number;
    matchesWon?: number;
    matchesLost?: number;
    winRate?: string;
    currentStreak?: number;
    rankingPoints?: number;
    smashes?: number;
    // legacy
    matches?: number;
    wins?: number;
    losses?: number;
    streak?: string | number;
    points?: number;
  };
}

const PerformanceStats = ({ stats }: PerformanceStatsProps) => {
  const played  = stats?.matchesPlayed ?? stats?.matches ?? 0;
  const wins    = stats?.matchesWon    ?? stats?.wins    ?? 0;
  const losses  = stats?.matchesLost   ?? stats?.losses  ?? 0;
  const winRate = stats?.winRate ?? (played > 0 ? `${Math.round((wins / played) * 100)}%` : '0%');
  const streak  = stats?.currentStreak ?? stats?.streak ?? 0;
  const points  = stats?.rankingPoints ?? stats?.points ?? 0;
  const smashes = stats?.smashes ?? 0;

  const streakLabel = typeof streak === 'number'
    ? streak >= 0 ? `${streak}W` : `${Math.abs(streak)}L`
    : String(streak);

  const data = [
    { label: 'Matches',  value: played,     icon: Activity, color: 'text-sky-500' },
    { label: 'Wins',     value: wins,       icon: Award,    color: 'text-green-500' },
    { label: 'Losses',   value: losses,     icon: Target,   color: 'text-red-400' },
    { label: 'Win %',    value: winRate,    icon: Zap,      color: 'text-amber-500' },
    { label: 'Streak',   value: streakLabel, icon: Flame,   color: streak > 0 ? 'text-orange-500' : 'text-slate-400' },
    { label: 'Points',   value: points,     icon: BarChart2, color: 'text-indigo-500' },
    { label: 'Smashes',  value: smashes,    icon: Zap,      color: 'text-sky-400' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {data.map((stat, i) => (
        <div key={i} className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm space-y-2 hover:border-sky-500/20 transition-all">
          <div className="flex items-center gap-2">
            <div className={cn('p-1.5 rounded-lg bg-slate-50', stat.color)}>
              <stat.icon className="h-3.5 w-3.5" />
            </div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
          </div>
          <p className="text-[18px] font-black text-[#0B1F3A] italic leading-none">{String(stat.value)}</p>
        </div>
      ))}
    </div>
  );
};

export default PerformanceStats;
