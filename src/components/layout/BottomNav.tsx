"use client";

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Trophy, Radio, ListOrdered, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNav = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) return null;

  const items = [
    { name: 'Court', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Circuit', path: '/tournaments', icon: Trophy },
    { name: 'Studio', path: '/broadcast/center', icon: Radio },
    { name: 'Ladder', path: '/rankings', icon: ListOrdered },
    { name: 'Dossier', path: '/player/me', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden">
      <div className="bg-white/80 backdrop-blur-xl border-t border-slate-100 flex items-center justify-around px-2 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              className="flex flex-col items-center gap-1 min-w-[64px] transition-all active:scale-90"
            >
              <div className={cn(
                "p-2 rounded-2xl transition-all",
                isActive ? "bg-[#0B1F3A] text-sky-400" : "text-slate-400"
              )}>
                <item.icon className="h-6 w-6" />
              </div>
              <span className={cn(
                "text-[9px] font-black uppercase tracking-widest",
                isActive ? "text-[#0B1F3A]" : "text-slate-400"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Safe area padding for newer iPhones */}
      <div className="h-5 bg-white/80 backdrop-blur-xl" />
    </div>
  );
};

export default BottomNav;