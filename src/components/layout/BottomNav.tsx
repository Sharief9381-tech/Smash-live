"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Radio, Activity, ListOrdered, User, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNav = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) return null;

  const items = [
    { name: 'Home', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Tourney', path: '/tournaments', icon: Trophy },
    { name: 'Live', path: '/live-match/active', icon: Activity },
    { name: 'Ranks', path: '/rankings', icon: ListOrdered },
    { name: 'Profile', path: '/player/me', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-lg border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-[68px] px-2 max-w-lg mx-auto">
        {items.map((item) => {
          const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/court');
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all active-press"
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-300",
                isActive ? "bg-[#0B1F3A] text-sky-400 scale-110 shadow-lg" : "text-slate-300"
              )}>
                <item.icon className={cn("h-5 w-5", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
              </div>
              <span className={cn(
                "text-[9px] font-black uppercase tracking-widest",
                isActive ? "text-[#0B1F3A]" : "text-slate-300"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Dynamic Island / Home Bar spacing */}
      <div className="h-safe-bottom bg-white" />
    </div>
  );
};

export default BottomNav;