"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Globe, Trophy, Activity, 
  History, Newspaper, LayoutDashboard 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ProfileNavigation = () => {
  const location = useLocation();
  
  const internalNav = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Live Scores', path: '/live-match/active', icon: Activity },
    { name: 'Tournaments', path: '/tournaments', icon: Trophy },
    { name: 'Global Rankings', path: '/rankings', icon: Globe },
    { name: 'Match Archive', path: '/archive', icon: History },
    { name: 'News Feed', path: '/news', icon: Newspaper },
  ];

  return (
    <div className="glass-panel p-2 rounded-[2rem] border-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-1">
        {internalNav.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              to={item.path}
              className={cn(
                "flex-1 min-w-[140px] flex items-center justify-center gap-3 py-4 px-6 rounded-2xl transition-all duration-300 group",
                isActive 
                  ? "bg-[#0B1F3A] text-white shadow-lg" 
                  : "text-[#0B1F3A]/60 hover:bg-sky-50 hover:text-sky-600"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5",
                isActive ? "text-sky-400" : "group-hover:scale-110 transition-transform"
              )} />
              <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileNavigation;