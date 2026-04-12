"use client";

import React from 'react';
import { 
  Trophy, Activity, Target, 
  Users, Award, BarChart3, ListOrdered 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ProfileNavigation = ({ activeTab, onTabChange }: ProfileNavigationProps) => {
  const sections = [
    { name: 'Analytics', id: 'analytics', icon: BarChart3 },
    { name: 'Rankings', id: 'rankings', icon: ListOrdered },
    { name: 'History', id: 'history', icon: Trophy },
    { name: 'Teams', id: 'teams', icon: Users },
    { name: 'Achievements', id: 'achievements', icon: Award },
  ];

  return (
    <div className="glass-panel p-2 rounded-[2rem] border-slate-200 sticky top-24 z-30 shadow-sm overflow-x-auto">
      <div className="flex items-center justify-between gap-1 min-w-max">
        {sections.map((item) => (
          <button 
            key={item.id} 
            onClick={() => onTabChange(item.id)}
            className={cn(
              "flex items-center justify-center gap-3 py-4 px-6 rounded-2xl transition-all duration-300 group",
              activeTab === item.id 
                ? "bg-[#0B1F3A] text-white shadow-lg" 
                : "text-[#0B1F3A]/60 hover:bg-sky-50 hover:text-sky-600"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5 transition-transform group-hover:scale-110",
              activeTab === item.id ? "text-sky-400" : ""
            )} />
            <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileNavigation;