"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Radio, Activity, ListOrdered, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNav = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) return null;

  const items = [
    { name: 'Court', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Studio', path: '/broadcast/center', icon: Radio },
    { name: 'Live', path: '/live-match/active', icon: Activity },
    { name: 'Ladder', path: '/rankings', icon: ListOrdered },
    { name: 'Dossier', path: '/player/me', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4">
      <div className="mx-auto max-w-lg bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="flex items-center justify-around h-[76px] px-3">
          {items.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/player/me' && location.pathname.startsWith('/player/'));
            return (
              <Link 
                key={item.name} 
                to={item.path} 
                className="flex flex-col items-center justify-center flex-1 h-full gap-1.5 transition-all active:scale-90 group"
              >
                <div className={cn(
                  "p-2.5 rounded-2xl transition-all duration-500",
                  isActive 
                    ? "bg-sky-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.4)] scale-110" 
                    : "text-slate-500 group-hover:text-slate-300 group-hover:bg-white/5"
                )}>
                  <item.icon className="h-5 w-5" />
                </div>
                <span className={cn(
                  "text-[9px] font-black uppercase tracking-[0.2em] transition-colors",
                  isActive ? "text-sky-400" : "text-slate-600"
                )}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;