"use client";

import React from 'react';
import { 
  Trophy, Activity, Target, 
  Users, Award, BarChart3, ListOrdered 
} from 'lucide-react';

const ProfileNavigation = () => {
  const sections = [
    { name: 'Performance', target: 'performance-core', icon: Activity },
    { name: 'Analytics', target: 'strategic-analytics', icon: BarChart3 },
    { name: 'Rankings', target: 'global-rankings', icon: ListOrdered },
    { name: 'History', target: 'circuit-history', icon: Trophy },
    { name: 'Teams', target: 'team-intelligence', icon: Users },
    { name: 'Achievements', target: 'hall-of-fame', icon: Award },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="glass-panel p-2 rounded-[2rem] border-slate-200 sticky top-24 z-30 shadow-sm overflow-x-auto">
      <div className="flex items-center justify-between gap-1 min-w-max">
        {sections.map((item) => (
          <button 
            key={item.name} 
            onClick={() => scrollToSection(item.target)}
            className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl transition-all duration-300 group text-[#0B1F3A]/60 hover:bg-sky-50 hover:text-sky-600"
          >
            <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileNavigation;